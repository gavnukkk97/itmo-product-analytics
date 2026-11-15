#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор синтетического датасета маркетплейса «Лукошко» для занятий 2, 4, 6, 7, 8.

Все числа согласованы с 00-сквозной-продукт.md (там — «канонические» цифры бизнеса,
здесь — сэмплированная выгрузка, на которой эти цифры воспроизводятся по порядку величины).

Запуск:  python generate_dataset.py
Выход:   CSV-файлы рядом со скриптом. Seed фиксирован (42) — датасет детерминирован.
"""

import numpy as np
import pandas as pd
from pathlib import Path

RNG = np.random.default_rng(42)
OUT = Path(__file__).resolve().parent

N_USERS = 40_000                      # размер выборки пользователей
REG_START = pd.Timestamp("2025-08-01")
REG_END = pd.Timestamp("2026-08-15")
BONUS_WINDOW = (pd.Timestamp("2025-11-20"), pd.Timestamp("2025-12-01"))  # «Чёрная пятница»

# Каналы: доля новых пользователей, качество трафика
CHANNELS = {
    #                доля   p(заказ ≤7д)  hazard откр.  ежемес. маржа ₽   CAC ₽
    "organic":      (0.39,   0.30,         0.10,          210,             0),
    "ctx_brand":    (0.14,   0.34,         0.11,          200,           380),
    "ctx_category": (0.17,   0.24,         0.14,          150,           950),
    "social":       (0.10,   0.18,         0.17,          110,          1150),
    "cpa":          (0.12,   0.16,         0.19,           95,          1400),
    "influencer":   (0.05,   0.28,         0.12,          185,          1900),
    "tv":           (0.03,   0.20,         0.15,          140,          None),
}
CHANNEL_NAMES = list(CHANNELS)
CHANNEL_P = np.array([c[0] for c in CHANNELS.values()])
CHANNEL_P = CHANNEL_P / CHANNEL_P.sum()


def pick_channel(n):
    return RNG.choice(CHANNEL_NAMES, size=n, p=CHANNEL_P)


# ---------------------------------------------------------------- users
def make_users():
    reg = pd.to_datetime(
        REG_START + (REG_END - REG_START) * RNG.random(N_USERS)
    ).normalize()
    ch = pick_channel(N_USERS)
    u = pd.DataFrame({"user_id": np.arange(1, N_USERS + 1), "reg_date": reg, "channel": ch})

    # «охотники за промо»: ведут себя только на скидках, чаще в дешёвых каналах
    promo_base = 0.16
    promo_channel_bias = u["channel"].map(
        {"cpa": 0.42, "social": 0.30, "ctx_category": 0.20, "ctx_brand": 0.10,
         "organic": 0.10, "influencer": 0.12, "tv": 0.15}
    )
    u["promo_hunter"] = RNG.random(N_USERS) < promo_channel_bias

    # бонус-когорта «Чёрной пятницы» — хуже по retention (см. занятие 2)
    u["bf_cohort"] = (u["reg_date"] >= BONUS_WINDOW[0]) & (u["reg_date"] <= BONUS_WINDOW[1])

    p7 = u["channel"].map({k: v[1] for k, v in CHANNELS.items()}).to_numpy()
    p7 = np.where(u["bf_cohort"], p7 * 1.25, p7)          # промо поднимает первый заказ…
    u["activated_7d"] = RNG.random(N_USERS) < p7
    return u


# ---------------------------------------------------------------- activity (занятие 2)
def make_activity(u):
    """user_id, reg_date, active_date — для retention-кривых, когорт и DAU/MAU."""
    rows = []
    for i, r in u.iterrows():
        reg = r["reg_date"]
        # первые 30 дней: больше активности у активированных и не-промо
        if r["activated_7d"]:
            base = 0.55 if not r["promo_hunter"] else 0.40
        else:
            base = 0.10 if not r["promo_hunter"] else 0.06
        if r["bf_cohort"]:
            base *= 0.45                      # промо-когорта выгорает
        hazard = CHANNELS[r["channel"]][2]    # ежемесячное «вымирание»
        days = []
        for d in range(120):
            day = reg + pd.Timedelta(days=d)
            p = base * (1 - hazard) ** (d / 30)
            if RNG.random() < p:
                days.append(day)
        if not days:
            days = [reg]                      # день регистрации всегда активен
        rows.append(pd.DataFrame({"user_id": r["user_id"], "reg_date": reg,
                                  "active_date": pd.to_datetime(days)}))
        if i % 8000 == 0:
            print(f"  activity: {i}/{N_USERS}")
    df = pd.concat(rows, ignore_index=True)
    return df[df["active_date"] <= pd.Timestamp("2026-08-15")]


# ---------------------------------------------------------------- orders (занятие 4)
def make_orders(u):
    """order_id, user_id, order_date, gmv, margin, items, is_first_order."""
    act_by_user = ACT.groupby("user_id")["active_date"].agg(list).to_dict()
    rows = []
    for i, r in u.iterrows():
        days_all = act_by_user.get(r["user_id"])
        if days_all is None or len(days_all) == 0:
            continue
        if r["channel"] in ("organic", "influencer"):
            orders_per_month = RNG.gamma(2.2, 1.1)
        elif r["promo_hunter"]:
            orders_per_month = RNG.gamma(2.0, 0.9)     # часто, но только с промо
        else:
            orders_per_month = RNG.gamma(1.8, 0.9)
        n = int(orders_per_month * 12 * (0.5 if not r["activated_7d"] else 1.0))
        n = min(n, len(days_all))
        if n == 0:
            continue
        days = days_all
        chosen = RNG.choice(days, size=n, replace=False)
        margin_mean = CHANNELS[r["channel"]][3]
        if r["promo_hunter"]:
            margin_mean = 40                            # промо съедает маржу
        margins = RNG.normal(margin_mean, 55, size=n).clip(-80, None)
        gmv = RNG.normal(1850, 900, size=n).clip(300, None)
        o = pd.DataFrame({
            "user_id": r["user_id"],
            "order_date": pd.to_datetime(chosen),
            "gmv": gmv.round(0),
            "margin": margins.round(0),
            "items": RNG.poisson(3.2, size=n).clip(1, None),
        }).sort_values("order_date")
        o["order_id"] = np.arange(1, len(o) + 1)
        o["is_first_order"] = False
        o.iloc[0, o.columns.get_loc("is_first_order")] = True
        rows.append(o)
        if i % 8000 == 0:
            print(f"  orders: {i}/{N_USERS}")
    return pd.concat(rows, ignore_index=True)


# ---------------------------------------------------------------- spend (занятие 5)
def make_channels_spend():
    months = pd.period_range("2025-08", "2026-08", freq="M")
    spend_month = {"ctx_brand": 3.2, "ctx_category": 9.8, "social": 6.9,
                   "cpa": 10.1, "influencer": 5.7, "tv": 12.0}      # млн ₽/мес
    rows = []
    for m in months:
        for ch, sp in spend_month.items():
            cac = CHANNELS[ch][4]
            if cac is None:
                new_cust = None
            else:
                new_cust = int(sp * 1e6 / cac * RNG.normal(1.0, 0.08))
            rows.append({"month": str(m), "channel": ch, "spend_mln_rub": sp,
                         "new_customers": new_cust})
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- attribution (занятие 6)
def make_ad_paths(u):
    """
    Пути касаний для конверсий. Зашитые эффекты:
      - retarget почти всегда стоит последним (ловит готовых) → last-click его переоценивает;
      - influencer стоит первым (запускает путь)          → last-click его недооценивает;
      - geo-тест (geo_test.csv) показывает «честную» инкрементальность: retarget ≈ 0, influencer ≈ +12%.
    """
    conv = u[u["activated_7d"]].sample(min(8_000, int(u["activated_7d"].sum())), random_state=42).copy()
    path_ch = RNG.choice(["ctx_brand", "ctx_category", "social", "cpa", "retarget", "influencer"],
                         size=(len(conv), 12),
                         p=[0.18, 0.22, 0.12, 0.16, 0.20, 0.12])
    has_touch = RNG.random((len(conv), 12)) < np.linspace(0.35, 0.05, 12)  # позже — реже
    rows = []
    for j in range(len(conv)):
        touches = [c for c, h in zip(path_ch[j], has_touch[j]) if h]
        if not touches:
            touches = ["organic"]
        # retarget: с вероятностью 0.85 добавляем последним
        if RNG.random() < 0.85:
            touches.append("retarget")
        # influencer: с вероятностью 0.30 добавляем первым
        if RNG.random() < 0.30:
            touches = ["influencer"] + touches
        rows.append({"path_id": j + 1,
                     "user_id": conv.iloc[j]["user_id"],
                     "path": " > ".join(touches),
                     "n_touches": len(touches),
                     "converted": 1})
    return pd.DataFrame(rows)


def make_geo_test():
    """Geo-эксперимент: 20 регионов с influencer+retarget, 20 контрольных, 8 недель."""
    rows = []
    for reg in range(40):
        is_test = reg < 20
        base_orders = RNG.normal(50_000, 8_000)
        for w in range(8):
            orders = base_orders * (1.06 if is_test else 1.0) * RNG.normal(1.0, 0.02)
            rows.append({"region": f"R{reg:02d}", "week": w + 1,
                         "group": "test" if is_test else "control",
                         "orders": int(orders), "spend_mln_rub": 1.8 if is_test else 0.2})
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- скидки (занятие 7)
def make_discount_experiment(u):
    """
    Промокод 300 ₽ на 2-й заказ, случайные 12 000 активных пользователей, 50/50.
    Латентные сегменты (моделям НЕ видны напрямую):
      sure_thing 60%: купят и так (p≈0.55)
      persuadable 15%: скидка решает (0.15 → 0.40)   ← единственные, кому она реально нужна
      lost_cause 25%: не купят (p≈0.03)
    Response-модель по фичам тянет в sure_thing → субсидирует лояльных. В этом смысл занятия.
    """
    sample = u[u["activated_7d"]].sample(min(8_000, int(u["activated_7d"].sum())), random_state=7).copy()
    seg = RNG.choice(["sure_thing", "persuadable", "lost_cause"], size=len(sample), p=[0.6, 0.15, 0.25])
    group = RNG.choice(["control", "treatment"], size=len(sample))
    p_base = np.select([seg == "sure_thing", seg == "persuadable", seg == "lost_cause"], [0.55, 0.15, 0.03])
    p_treat = np.select([seg == "sure_thing", seg == "persuadable", seg == "lost_cause"], [0.58, 0.40, 0.035])
    p = np.where(group == "treatment", p_treat, p_base)
    second_order = RNG.random(len(sample)) < p
    # наблюдаемые фичи: с ними response-модель «уедет» в sure_thing
    n_orders_before = np.select([seg == "sure_thing", seg == "persuadable", seg == "lost_cause"], [5, 2, 1]) \
        + RNG.poisson(1.5, len(sample))
    days_since = np.select([seg == "sure_thing", seg == "persuadable", seg == "lost_cause"], [6, 14, 21]) \
        + RNG.normal(0, 3, len(sample))
    return pd.DataFrame({
        "user_id": sample["user_id"].to_numpy(),
        "channel": sample["channel"].to_numpy(),
        "group": group,
        "n_orders_before": n_orders_before.clip(0),
        "days_since_last_order": days_since.round(1).clip(1, None),
        "promo_hunter": sample["promo_hunter"].to_numpy().astype(int),
        "second_order_30d": second_order.astype(int),
    })


# ---------------------------------------------------------------- A/B (занятие 8)
def make_ab_test():
    """«Купить сейчас» в карточке: конверсия +6.2%, но AOV −4.1% и больше одиночных заказов."""
    rows = []
    for d in range(14):
        date = pd.Timestamp("2026-08-11") + pd.Timedelta(days=d)
        for g in ["control", "treatment"]:
            card_views = int(RNG.normal(120_000, 6_000))
            conv = 0.085 * (1.062 if g == "treatment" else 1.0) * RNG.normal(1.0, 0.015)
            orders = int(card_views * conv)
            aov = 1850 * (0.959 if g == "treatment" else 1.0) * RNG.normal(1.0, 0.01)
            single_share = 0.52 * (1.09 if g == "treatment" else 1.0) * RNG.normal(1.0, 0.02)
            rows.append({"date": str(date.date()), "group": g, "card_views": card_views,
                         "orders": orders, "gmv": int(orders * aov),
                         "single_item_orders": int(orders * single_share)})
    return pd.DataFrame(rows)


if __name__ == "__main__":
    print("users…");    users = make_users()
    print("activity…"); ACT = make_activity(users)
    print("orders…");   orders = make_orders(users)
    print("spend…");    spend = make_channels_spend()
    print("paths…");    paths = make_ad_paths(users)
    print("geo…");      geo = make_geo_test()
    print("discount…"); disc = make_discount_experiment(users)
    print("ab…");       ab = make_ab_test()

    users.to_csv(OUT / "users.csv", index=False)
    ACT.to_csv(OUT / "activity.csv", index=False)
    orders.to_csv(OUT / "orders.csv", index=False)
    spend.to_csv(OUT / "channels_spend.csv", index=False)
    paths.to_csv(OUT / "ad_paths.csv", index=False)
    geo.to_csv(OUT / "geo_test.csv", index=False)
    disc.to_csv(OUT / "discount_experiment.csv", index=False)
    ab.to_csv(OUT / "ab_test.csv", index=False)
    print("Готово:", OUT)
