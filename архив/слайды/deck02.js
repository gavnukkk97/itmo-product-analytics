// Неделя 2 — Система метрик продукта
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "Курс «Продуктовая и маркетинговая аналитика»";
const st = require("./deck_common")(p, "неделя 2");
const { M, W, H, PRIMARY, ACCENT, TEXT, MUTED, TINT, LINE, DARK } = st;

/* 1. Титул */
let s = st.titleSlide(2, "Система метрик продукта", "NSM, дерево метрик, guardrails", "8 лекций + 8 занятий · 3 з.е. · зачёт по мини-проекту");
const arc2 = ["Когорты и retention", "Stickiness DAU/MAU", "Proxy и guardrails", "Метрика-договор"];
arc2.forEach((t, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  s.addText(String(i + 1).padStart(2, "0"), { x: M + col * 4.6, y: 4.9 + row * 0.9, w: 0.6, h: 0.4, margin: 0, fontFace: st.F, fontSize: 18, bold: true, color: ACCENT });
  s.addText(t, { x: M + col * 4.6 + 0.62, y: 4.92 + row * 0.9, w: 3.6, h: 0.7, margin: 0, fontFace: st.F, fontSize: 14, color: "CFE0D6" });
});
st.pageNum(s, 1, true);

/* 2. Метрика = договор */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Зачем метрика", "Метрика — это не число, а договор");
s.addText("Спор «стало лучше или хуже» без договора — спор о вкусах. Договор фиксируется гипотезой If / Then / Because:", { x: M, y: 1.95, w: 11.4, h: 0.75, margin: 0, fontFace: st.F, fontSize: 19, color: TEXT });
st.flowRow(s, [["IF", "сделаем X"], ["THEN", "метрика Y изменится на Z"], ["BECAUSE", "механизм: почему это сработает"]], 2.9, 3.6, 1.7, { bodySize: 17 });
s.addText("«Because» — самое ценное: без механизма это не гипотеза, а надежда.", { x: M, y: 5.0, w: 11.4, h: 0.5, margin: 0, fontFace: st.F, fontSize: 19, bold: true, color: PRIMARY });
s.addText("И число ≠ метрика: метрика — число с вопросом, владельцем и горизонтом.", { x: M, y: 5.65, w: 11.4, h: 0.5, margin: 0, fontFace: st.F, fontSize: 16, color: MUTED });
st.pageNum(s, 2);

/* 3. Четыре требования */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Какой должна быть рабочая метрика", "Четыре требования");
st.rowsList(s, [
  ["Отражает ценность", "«сессии» — активность; «заказы» — ценность"],
  ["Сравнима между сегментами", "скачет от состава трафика → барометр с треснувшим стеклом"],
  ["Движущая, не запаздывающая", "реагирует на действия раньше, чем на это отреагируют деньги"],
  ["Не геймится дёшево", "любая метрика — инструкция «как хорошо выглядеть»"],
], M, 2.0, 1.12, 4.6, 5.4, 6.0, { numbered: true });
st.question(s, "Вопрос залу: как обмануть метрику «средняя скорость доставки заказа»?", 6.7);
st.pageNum(s, 3);

/* 4. NSM */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "North Star Metric", "Одна метрика ценности, на которую смотрят все");
s.addText("NSM — сколько ценности продукт доставляет пользователям (и через это — деньгам). Одна — потому что она снимает конфликты целей между командами.", { x: M, y: 1.95, w: 11.4, h: 0.8, margin: 0, fontFace: st.F, fontSize: 18, color: TEXT });
const nsm = [["Airbnb", "забронированные ночи"], ["Spotify", "время прослушивания — тут время и есть ценность"], ["WhatsApp", "отправленные сообщения"], ["Авито", "состоявшиеся сделки (не контакты!)"]];
nsm.forEach(([t, d], i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * 5.85, y = 3.0 + row * 1.15;
  s.addText(t, { x, y, w: 2.0, h: 0.5, margin: 0, fontFace: st.F, fontSize: 19, bold: true, color: PRIMARY });
  s.addText(d, { x: x + 2.05, y: y + 0.03, w: 3.7, h: 1.0, margin: 0, fontFace: st.F, fontSize: 14, color: MUTED });
});
s.addText("NSM «Лукошко»: заказов в месяц на активного покупателя — частота отражает закрытую бытовую потребность и тянет GMV.", { x: M, y: 5.5, w: 11.4, h: 0.8, margin: 0, fontFace: st.F, fontSize: 17, bold: true, color: ACCENT });
st.pageNum(s, 4);

/* 5. Почему время в приложении — плохой NSM */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Анти-пример", "Почему «время в приложении» — чаще плохой NSM");
st.rowsList(s, [
  ["Это вход, а не ценность", "легко растёт при плохом UX: дольше ищешь товар"],
  ["Не монетизируется напрямую", "кроме медиа и рекламных моделей"],
  ["Геймится механиками", "и выжигает когорту — см. кейс пушей в конце лекции"],
], M, 2.1, 1.2, 4.9, 5.6, 5.9, { numbered: true, numColor: ACCENT });
s.addText("Исключение — медиа/рекламные модели: там время потребления и есть ценность.", { x: M, y: 5.9, w: 11.4, h: 0.5, margin: 0, fontFace: st.F, fontSize: 16, color: MUTED });
st.pageNum(s, 5);

/* 6. Тест на NSM */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Проверка кандидата", "Тест на NSM: три вопроса");
st.stepsChain(s, [
  ["×2 ?", "если метрика вырастет вдвое — станем ли мы богаче?"],
  ["плохой продукт?", "растёт ли она и у плохого продукта?"],
  ["понятно всем?", "понимает ли её менеджер первого уровня?"],
], M, 2.15, 1.5, 3.0, 4.7, 7.9);
s.addText("Три «да» — рабочая NSM. Любое «нет» — метрика-вход или vanity.", { x: M, y: 6.8, w: 11.4, h: 0.5, margin: 0, fontFace: st.F, fontSize: 16, color: MUTED });
st.pageNum(s, 6);

/* 7. Дерево метрик «Лукошко» */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Дерево метрик", "От денег к действию пользователя");
const tree = [
  ["GMV / маржа в месяц", "цель бизнеса — за неё отвечают все"],
  ["покупатели × частота × чек", "три ветви: маркетинг · продукт · ассортимент"],
  ["активация ≤7д (26%) · 2-й заказ ≤30д (34%)", "input-метрики конкретных команд"],
  ["скорость выдачи · цены · промо", "операционные рычаги"],
];
tree.forEach(([t, d], i) => {
  const y = 2.0 + i * 1.05;
  const x = M + i * 0.55;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: 9.6 - i * 0.55, h: 0.8, fill: { color: i === 0 ? PRIMARY : TINT }, rectRadius: 0.06 });
  s.addText(t, { x: x + 0.25, y: y + 0.1, w: 8.9 - i * 0.55, h: 0.6, margin: 0, fontFace: st.F, fontSize: 16, bold: i < 2, color: i === 0 ? "FFFFFF" : TEXT });
  s.addText(d, { x: 10.6, y: y + 0.12, w: 2.5, h: 0.6, margin: 0, fontFace: st.F, fontSize: 12.5, color: MUTED });
});
s.addText("В мобильной среде то же называют пирамидой метрик: NSM на вершине, 3–4 уровня входов вниз.", { x: M, y: 6.45, w: 11.4, h: 0.5, margin: 0, fontFace: st.F, fontSize: 15, color: MUTED });
st.pageNum(s, 7);

/* 8. Output vs input */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Правила дерева", "Output сверху — input внизу");
st.rowsList(s, [
  ["Output — отвечают все", "деньги, NSM; если input вырос, а output нет — сломан «провод»"],
  ["Input — у каждой владелец", "конкретная команда отвечает за конкретный вход"],
  ["Ветвей — 3–5, не 20", "дерево, где всё важно, — это не дерево, а дашборд"],
  ["Вопрос — «из чего?»", "а не «что бы ещё положить»"],
], M, 2.05, 1.15, 4.9, 5.6, 5.9, { numbered: true });
st.pageNum(s, 8);

/* 9. Пантеон метрик */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Пантеон", "Пять типов метрик и их горизонты");
st.table(s, [
  ["Тип", "Вопрос", "Примеры", "Горизонт"],
  ["Продуктовые", "доставляем ли ценность", "retention, активация, частота", "недели"],
  ["Бизнес-короткие", "растём ли сейчас", "GMV, маржа, CAC", "месяц"],
  ["Бизнес-длинные", "выживем ли", "LTV, payback, LTV/CAC", "кварталы"],
  ["Операционные", "всё ли работает", "SLA доставки, crash rate", "часы"],
  ["Маркетинговые", "умеем ли покупать рост", "CAC по каналам, доля органики", "месяц"],
], M, 2.0, [2.4, 3.1, 4.2, 2.1]);
st.pageNum(s, 9);

/* 10. AARRR / RARRA */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Карта, не религия", "AARRR и RARRA");
s.addText([
  { text: "AARRR — Acquisition, Activation, Retention, Revenue, Referral. ", options: { bold: true } },
  { text: "Тащит «расти вшиву»: сначала трафик, потом разберёмся.", options: {} },
], { x: M, y: 2.0, w: 11.4, h: 0.8, margin: 0, fontFace: st.F, fontSize: 18, color: TEXT });
s.addText([
  { text: "RARRA — Retention, Referral, Revenue, Activation, Acquisition. ", options: { bold: true } },
  { text: "Напоминает: удержание дешевле привлечения.", options: {} },
], { x: M, y: 2.9, w: 11.4, h: 0.8, margin: 0, fontFace: st.F, fontSize: 18, color: TEXT });
s.addText("Рабочее использование: чек-лист покрытия — у каждой стадии 1–2 метрики. Для зрелого «Лукошко» фокус — R + R: удержание и рефералы; привлечение живёт в маркетинге (недели 5–6).", { x: M, y: 4.0, w: 11.4, h: 1.1, margin: 0, fontFace: st.F, fontSize: 17, color: TEXT });
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.4, w: 11.4, h: 1.1, fill: { color: TINT }, rectRadius: 0.08 });
s.addText("Правило: для каждой стадии воронки должно быть 1–2 метрики с владельцем. Пустая стадия = слепая зона.", { x: M + 0.35, y: 5.6, w: 10.7, h: 0.75, margin: 0, fontFace: st.F, fontSize: 17, bold: true, color: PRIMARY });
st.pageNum(s, 10);

/* 11. Когорты */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Когорты", "Любое среднее без когорт — улика, а не вывод");
s.addText("Когорта — группа пользователей, объединённая датой события (регистрация) или свойством (канал, устройство).", { x: M, y: 2.0, w: 11.4, h: 0.8, margin: 0, fontFace: st.F, fontSize: 18, color: TEXT });
s.addText("Зачем резать:", { x: M, y: 3.0, w: 4, h: 0.45, margin: 0, fontFace: st.F, fontSize: 17, bold: true, color: PRIMARY });
st.rowsList(s, [
  ["Качество новых когорт падает", "средний retention «улучшается» из-за свежих когорт"],
  ["Каналы дают разное качество", "средний CAC и LTV прячут плохой канал"],
  ["Промо-когорта размывает картину", "«Чёрная пятница» держится вдвое хуже — увидим на занятии"],
], M, 3.55, 1.0, 5.2, 5.8, 5.7);
st.pageNum(s, 11);

/* 12. Retention */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Retention", "Форма кривой и плато");
s.addText("n-day retention — доля когорты, вернувшаяся в день n. Кривая: резкое падение в первые дни → плато. Плато = продукт «держит».", { x: M, y: 2.0, w: 11.4, h: 0.85, margin: 0, fontFace: st.F, fontSize: 18, color: TEXT });
s.addText("Полезный приём — «flatten the curve»: сравнивать не day-7, а высоту плато. Ранний d7 и плато — разные сигналы; решение — по плато.", { x: M, y: 3.1, w: 11.4, h: 0.9, margin: 0, fontFace: st.F, fontSize: 17, color: TEXT });
st.stat(s, M, 4.4, 5.0, "26%", "активация «Лукошко»: первый заказ ≤ 7 дней");
st.stat(s, 6.6, 4.4, 5.6, "×3", "разница в retention 6 мес у доехавших до 2-го заказа", ACCENT);
st.pageNum(s, 12);

/* 13. DAU/MAU */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Stickiness", "DAU/MAU бывает адекватен частоте потребности");
st.table(s, [
  ["Метрика", "«Лукошко»", "Когда нормальна"],
  ["DAU/MAU ≈ 0,32", "хорошо для FMCG", "бытовые потребности — часто"],
  ["DAU/MAU ≈ 0,05", "нормально для авиабилетов", "редкие события"],
  ["WAU/MAU", "лучше для low-frequency", "покупки 1–2 раза в месяц"],
], M, 2.0, [3.0, 4.0, 5.0]);
st.rowsList(s, [
  ["DAU растёт от регистраций", "смотрите DAU по когортам"],
  ["MAU «тянется» долгожителями", "размазывает свежие провалы"],
  ["Мобильный словарь", "sticky factor = DAU/MAU · PCU/ACU · RPR · LTD"],
], M, 4.55, 0.95, 5.4, 6.0, 5.5);
st.pageNum(s, 13);

/* 14. Proxy + guardrails */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ЛЕКЦИЯ");
st.header(s, "Для ML-фич", "Proxy + guardrails — до старта");
st.rowsList(s, [
  ["Proxy-метрика", "короткий предвестник длинного эффекта: «добавления в корзину из выдачи» вместо GMV через квартал. Связь с целевой метрикой — проверена на истории"],
  ["Guardrail", "метрика вреда, которая не должна проехать: маржа, возвраты, время выдачи, отписки. Ставится ДО запуска, порог — ДО запуска"],
], M, 2.05, 1.75, 3.4, 4.6, 7.9, { numbered: false, titleSize: 19, descSize: 15 });
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.75, w: 11.4, h: 1.15, fill: { color: TINT }, rectRadius: 0.08 });
s.addText("Правило курса: каждая ML-фича получает 1 proxy-метрику и 2–3 guardrail до старта. Не можете выбрать guardrail — не понимаете, чем фича может навредить.", { x: M + 0.35, y: 5.95, w: 10.7, h: 0.8, margin: 0, fontFace: st.F, fontSize: 16, bold: true, color: PRIMARY });
st.pageNum(s, 14);

/* 15. Кейс пушей */
s = st.base(); st.chip(s, "НЕДЕЛЯ 2 · ML-ПРИМЕР");
st.header(s, "Engagement-оптимизация, которая сожгла когорту", "CRM «Лукошко»: целевая — open rate 7 дней");
st.table(s, [
  ["Вариант", "Push/нед", "Open rate", "Отписки/мес", "Retention d30", "Маржа/юзер/мес"],
  ["Было (фикс. 3 пула)", "3", "11,2%", "1,8%", "34%", "148 ₽"],
  ["Стало (модель, до 12)", "9,7", "14,9%", "4,6%", "27%", "121 ₽"],
], M, 2.0, [3.1, 1.4, 1.6, 1.8, 1.8, 2.0], 0.7, 14);
s.addText([
  { text: "Open rate вырос — модель «успешна» по своей целевой. ", options: { bold: true } },
  { text: "Но она выучила механику (больше пушей → больше открытий), а раздражение копится с лагом. Retention d30 смотрят с задержкой — его не включили в цикл оптимизации.", options: {} },
], { x: M, y: 4.3, w: 11.4, h: 1.4, margin: 0, fontFace: st.F, fontSize: 17, color: TEXT });
s.addText("Разбор: proxy без проверенной связи с целевой метрикой + guardrail постфактум. Та же ошибка, что у RecSys недели 1 — на другом участке воронки.", { x: M, y: 5.9, w: 11.4, h: 0.9, margin: 0, fontFace: st.F, fontSize: 16, italic: true, color: MUTED });
st.pageNum(s, 15);

/* 16. Финал */
s = st.base(true);
s.addText("НЕДЕЛЯ 2 · ДОМАШКА И ЗАНЯТИЕ", { x: M, y: 0.8, w: 9, h: 0.35, margin: 0, fontFace: st.F, fontSize: 13, bold: true, color: ACCENT, charSpacing: 3 });
s.addText("Ноутбук: retention, когорты, дерево метрик", { x: M, y: 1.25, w: 11.5, h: 1.0, margin: 0, fontFace: st.F, fontSize: 34, bold: true, color: "FFFFFF" });
s.addText("ДОМАШКА — дерево метрик своего проекта", { x: M, y: 2.7, w: 6.2, h: 0.4, margin: 0, fontFace: st.F, fontSize: 15, bold: true, color: "8FC7A8", charSpacing: 1 });
s.addText([
  { text: "NSM + тест на NSM · дерево: 3–5 input-ветвей с владельцами · 2 guardrail для гипотетической ML-фичи (с порогами) · какая метрика геймится первой?", options: { bold: true, color: "FFFFFF" } },
], { x: M, y: 3.15, w: 6.2, h: 2.2, margin: 0, fontFace: st.F, fontSize: 17 });
s.addText("ЗАНЯТИЕ — ноутбук на данных «Лукошко»", { x: 7.4, y: 2.7, w: 5.3, h: 0.4, margin: 0, fontFace: st.F, fontSize: 15, bold: true, color: "8FC7A8", charSpacing: 1 });
s.addText([
  { text: "DAU/MAU и stickiness · retention-кривые по каналам · когортная матрица · расследование провала когорты · график-враньё vs график для CPO.", options: { bold: true, color: "FFFFFF" } },
], { x: 7.4, y: 3.15, w: 5.3, h: 2.4, margin: 0, fontFace: st.F, fontSize: 17 });
s.addText("Следующая неделя: воронка, точки роста и почему цифры врут — Симпсон, конфаундеры, сломанное логирование.", { x: M, y: 6.6, w: 11.4, h: 0.6, margin: 0, fontFace: st.F, fontSize: 15, color: "7FA08D" });
st.pageNum(s, 16, true);

p.writeFile({ fileName: "../неделя-02/лекция-02.pptx" }).then(() => console.log("done"));
