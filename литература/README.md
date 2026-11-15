# Литература и материалы курса

> Книги, каналы, доклады и учебные материалы с привязкой к неделям курса.
> Реальные кейсы с первоисточниками — в [библиотеке кейсов](библиотека-кейсов.md); здесь — книги,
> доклады, каналы и готовые учебные материалы. Ссылки открывались при сборе (ноябрь 2026),
> кроме отмеченных «не открывалось».

Записи лекций — [плейлист на YouTube](https://www.youtube.com/playlist?list=PLPlYipDKg8po).
Темы недель — в [сводке библиотеки кейсов](библиотека-кейсов.md#сводка-по-неделям).

---

## 1. Книги

### 1.1. Основные книги курса

| Книга | Для чего в курсе | Недели |
|---|---|---|
| Кимбалл, Росс — *Инструментарий хранения и анализа данных* | звезда, зерно факта, SCD, e-commerce и clickstream (гл. 1–3, 5, 6, 15; «10 ошибок моделирования», с. 486–490) | 4 |
| Бабушкин, Кравченко — *Machine Learning System Design* | основа недели 11: «есть ли проблема», метрики, дизайн-док; истории про цены (с. 25–28, 53, 174–177, 244) | 11, 13 |
| Xu, Aminian — *ML System Design Interview* | фреймворк дизайна ML-системы, рекомендации и поиск (гл. 1, 4, 6, 7, 8, 10) | 9–11 |
| Aminian, Sheng — *Generative AI System Design Interview* | оценка и дизайн LLM-систем (гл. 1, 4, 6) | 11, 16 |
| Чонг, Чанг — *Как быть успешным в Data Science* | постановка задач ради влияния на бизнес, работа с заказчиком | 1, 11, 15 |
| Гатман — *Разберись в Data Science* | ошибки интерпретации, визуализация (гл. 5, 12–14) | 3, 5 |
| Валиотти — *Аналитика для руководителей* | современный стек данных, иллюстрации архитектуры (рис. 16–27, 73–86) | 4, 15 |
| Тафти — *The Visual Display of Quantitative Information*, *Visual Explanations*, *Beautiful Evidence* | lie factor, data-ink, small multiples, Challenger | 5 |
| **Яу — *Искусство визуализации в бизнесе*** (*Visualize This*, 2011; русское издание МИФ, 2013) | принципы, а не техника: вопрос → адресат → форма; см. §1.2 | 5 |

### 1.2. Яу — что брать на неделю 5

Книга 2011 года: инструменты устарели, около 60–70% объёма — пошаговые туториалы, **про дашборды и BI
в ней нет ничего**. Берём принципы из гл. 1 и 9 и вводные разделы «Что искать» гл. 4–8.

| Идея | Стр. | Как переносим на дашборд «Лукошко» |
|---|---|---|
| Начинать с вопроса, цели и адресата, а не с данных | 38, 337–338 | строка-заказ перед каждым дашбордом: «решение X принимает Y раз в Z, ему нужно увидеть W» |
| Формат зависит от адресата и носителя | 38 | ноутбук аналитика ≠ операционный дашборд ≠ слайд для правления |
| Проверка данных — главная часть работы; выброс — опечатка или история | 21, 30, 269–270 | плитка «качество и свежесть данных»; упражнение «опечатка или история?» |
| Гранулярность и окно времени меняют историю | 27–28, 106–107 | один и тот же GMV по дням / месяцам, за 8 недель / 3 года |
| Общая шкала для сравниваемых панелей | 29–30 | плитки по зонам доставки — с общей осью |
| Подписывать оси: ~60 версий подписей к одному графику на конкурсе FlowingData | 34–36 | упражнение «подпиши оси» на 10 минут |
| Геометрия: столбцы от нуля, круги по площади, мало секторов | 36–37, 109, 126, 131, 146–148 | мост к кейсам Fox News и Reuters |
| Распределения важнее средних; маленькие панели | 146, 218, 225 | средний чек → распределение → панели по категориям (мост к Симпсону, неделя 3) |
| Готовить читателя: заголовок-вывод, вводный абзац, аннотации | 325–329 | заголовок плитки — утверждение; аннотации релизов на временных рядах |
| Указывать источник | 37–38 | источник, время обновления и владелец метрики на каждой плитке |

### 1.3. Инженерия данных — отбор со страницы [dataengineers.pro/books](https://www.dataengineers.pro/books/)

| Книга | О чём | Недели |
|---|---|---|
| Клеппман — *Высоконагруженные приложения* (*Designing Data-Intensive Applications*) | компромиссы систем данных: хранение, репликация, батч и стрим | 4, 11 |
| Рис, Хаусли — *Основы инженерии данных* (*Fundamentals of Data Engineering*) | жизненный цикл данных, DWH / lake / lakehouse — лучший обзор для не-инженеров | 4 |
| Konieczny — *Data Engineering Design Patterns* (2025) | идемпотентность, обработка ошибок, наблюдаемость данных | 4 |
| Macey (ред.) — *97 Things Every Data Engineer Should Know* | короткие эссе практиков — удобно раздавать к семинару | 4 |
| Харенслак, де Руйтер — *Apache Airflow и конвейеры обработки данных* | оркестрация для тех, кто будет строить витрины руками | 4 (доп.) |

### 1.4. Дополнительно

| Книга | Для чего | Недели |
|---|---|---|
| Kohavi, Tang, Xu — *Trustworthy Online Controlled Experiments* | канон A/B: OEC, SRM, Twyman's law; источник многих кейсов библиотеки | 6, 14 |
| Chip Huyen — *Designing Machine Learning Systems* ([курс CS 329S](https://stanford-cs329s.github.io/)) | данные, фичи, деплой, мониторинг, дрейф | 11 |
| Богачёв — *Графики, которые убеждают всех* | русскоязычный учебник по выбору графика | 5 |
| Knaflic — *Storytelling with Data* | сторителлинг и слайд-вывод | 5 |
| Provost, Fawcett — *Data Science for Business* | expected value framework | 1, 8 |

---

## 2. Telegram-каналы для студентов

Проверены на 4 ноября 2026: все живые.

| Канал | О чём | Подписчиков | Лучше всего для недель |
|---|---|---:|---|
| [ProductDo: практика продакта](https://t.me/productdo) | PM из Booking, Flo, Coupang: A/B, ML для продакта, разборы кейсов; много рекламы своих курсов | ~24,9K | 3, 6, 9–10 |
| [Krasinsky](https://t.me/ilya_krasinsky) | юнит-экономика, конверсия, когорты, сквозная аналитика; лучшие кейсы — 2020–2021 | ~26,7K | 1–3, 7 |
| [GoPractice!](https://t.me/gopractice) | продакт, аналитика, ML/AI, разборы (Zillow, VK, Apple ATT) | ~29,2K | 3, 11, 15 |
| [ML for Value (Ваня Максимов)](https://t.me/ml4value) | рекомендации, поиск, промо, цены, A/B — опыт Delivery Club, Wildberries, Яндекс Маркета | ~5,7K | **8–13** |
| [Дата канальи](https://t.me/datarascals) | корпоративные ML-кейсы и провалы; тон резкий | ~6,6K | 11 |
| [Reliable ML (Ирина Голощапова)](https://t.me/reliable_ml) | causal inference, A/B в офлайн-ритейле, ML System Design, дата-стратегия | ~6,6K | 7, 11, 13–14 |
| [Reveal the Data (Рома Бунин)](https://t.me/revealthedata) | дашборды и визуализация | ~27,7K | 5 |
| [AvitoTech](https://t.me/avitotech) · [Ozon Tech](https://t.me/ozon_tech) | инженерные блоги компаний | ~26–30K | 4, 6, 11 |
| [Продукторий (Владимир Меркушев)](https://t.me/vladimir_merkushev) · [Фичизм](https://t.me/fichism) · [Product × Science](https://t.me/product_science) | продуктовые разборы | 6–25K | 3, 15 |

---

## 3. Доклады и курсы

### 3.1. A/B и маркетинг (недели 6–7)

| Доклад | О чём |
|---|---|
| [Бабушкин — «Увеличение чувствительности в A/B с помощью CUPED»](https://www.youtube.com/watch?v=pZpUM08mv-E) | классика на данных X5 |
| [Сахнов — «Геометрическая интерпретация методов снижения дисперсии»](https://www.youtube.com/watch?v=BhxFaMGpVFw) (Data Fest 2020) | CUPED «под капотом» на одной картинке — прямо под блок 4 недели 6 |
| [Леньков (Авито) — «A/B Experimentation Platform»](https://www.youtube.com/watch?v=9UGyCOvQ7Z4) | полный цикл экспериментов в Авито |
| [Красовский (Авито) — «Региональные A/B-тесты»](https://www.youtube.com/watch?v=YeHx5AspRA4) | мост между неделями 6 и 7 |
| [Фандеев (Авито) — «Аналитика перформанса в Авито»](https://www.youtube.com/watch?v=DqEWMCU9rpY) | маркетинговая аналитика в большой компании |
| [Randall Lewis — Ghost Ads](https://www.youtube.com/watch?v=_do6ACKKlnw) | почему PSA-контроль ломается и как делать холдауты |
| [AdKDD 2020, Yahoo — гео-эксперимент на Google UAC](https://www.youtube.com/watch?v=ON7a-Uc5V_w) | бюджет −72%, конверсии −6,6%; подбор пар рынков |
| [Uber, PyData Amsterdam 2019 — synthetic control](https://www.youtube.com/watch?v=j5DoJV5S2Ao) | синтетический контроль по городам, сравнение с DiD |
| [Введение в MMM на Robyn](https://www.youtube.com/watch?v=fGPnFpMGhWc) (Data Science Festival) | практический старт для глубокого трека |

### 3.2. Архитектура данных и ML (недели 4, 11)

| Материал | О чём | Недели |
|---|---|---|
| [Minerva 2.0 and Beyond — Airbnb, слайды](https://microsites.databricks.com/sites/default/files/2022-07/Democratizing-Metrics-at-Airbnb.pdf) | слой метрик: 7k+ метрик, «болото метрик» и переход к расчёту на лету | 4 |
| [LinkedIn — Building a healthy data ecosystem around Kafka and Hadoop](https://www.slideshare.net/yaelgarten/building-a-healthy-data-ecosystem-around-kafka-and-hadoop-lessons-learned-at-linkedin) | трекинг без контрактов → ревью схем → единая платформа метрик | 4 |
| [Широков (Яндекс Такси) — Metric Store as a Boost for AI](https://smartdataconf.ru/talks/20010929-metric-store-as-a-boost-for-ai/), SmartData 2026 | хранилище метрик как основа для AI | 4, 16 |
| [Терова (Яндекс) — Дата-контракты](https://smartdataconf.ru/archive/2025/talks/20008764-datacontracts-data-expectations-without-illusions/), SmartData 2025 | контракты между производителями и потребителями данных | 4 |
| [Оганесян, Огоров (Авито) — self-service витрин](https://smartdataconf.ru/archive/2025/talks/20007750-how-we-provide-self-service-development-and-deployment-of-showcases-in-avito/), SmartData 2025 | как аналитики сами выкатывают витрины | 4 |
| [Наумов (Лемана Тех) — витрины на lakehouse, переезд с Greenplum](https://smartdataconf.ru/talks/20010788-data-marts-on-data-lakehouse-a-major-migration-from-greenplum/) | миграция DWH | 4 |
| [Full Stack Deep Learning 2022 — Data Management](https://fullstackdeeplearning.com/course/2022/lecture-4-data-management/) · [Deployment](https://fullstackdeeplearning.com/course/2022/lecture-5-deployment/) · [Continual Learning](https://fullstackdeeplearning.com/course/2022/lecture-6-continual-learning/) | данные для ML, деплой, мониторинг и дрейф | 4, 11 |
| [Chip Huyen — Data Distribution Shifts and Monitoring](https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html) | типы сдвигов и их обнаружение | 11 |
| [Data Fest 2025 — трек MLOps](https://ods.ai/tracks/df25-mlops) · [трек Reliable ML](https://ods.ai/tracks/df25-reliable-ml) | ML-платформа Авито, мониторинг моделей в проде | 11 |
| [Made With ML](https://madewithml.com/) | бесплатный курс MLOps | 11 (доп.) |

Опорные статьи Хабра к семинарам:
[Авито — жизнь после Vertica](https://habr.com/ru/companies/avito/articles/979836/) ·
[платформа данных Т-Банка](https://habr.com/ru/post/926886/) ·
[DWH в Lamoda](https://habr.com/ru/post/595811/) ·
[YTsaurus](https://habr.com/en/companies/yandex/articles/721526/) ·
[Домклик — Feature Store](https://habr.com/ru/post/908970/) ·
[ML-платформа Авито](https://habr.com/ru/companies/avito/articles/970668/).

### 3.3. Банки кейсов для дизайн-доков (неделя 11)

- [Evidently AI — ML system design database](https://www.evidentlyai.com/ml-system-design): около 800 кейсов ML- и LLM-систем
  из 150+ компаний, фильтр по отрасли и задаче. Студенты берут оттуда прототип для своего дизайн-дока.
- [eugeneyan/applied-ml](https://github.com/eugeneyan/applied-ml): статьи «ML в продакшне» по компаниям и темам.
- Площадки: [SmartData на YouTube](https://www.youtube.com/@SmartDataConf), [архив SmartData](https://smartdataconf.ru/archive/),
  [ODS AI Ru на YouTube](https://www.youtube.com/@ODSAIRu).

---

## 4. Материалы Ильи Красинского (Product Heroes / Rick.ai) по неделям

Публичные материалы Ильи Красинского, разложенные по неделям курса.

| Неделя | Ресурс | Что берём |
|---|---|---|
| 1 | [Шаблон юнит-экономики v5](https://docs.google.com/spreadsheets/d/1LkZZG_flAxLMtK_B4AiYEUC58ZwCs5Lw59oDyi2KSJM) (когорты, P&L, OKR) | эталон таблицы юнит-экономики для домашки |
| 1 | [«Метрики в юнит-экономике. Введение»](https://youtu.be/UM4bzELS0jQ) | вводное видео |
| 2 | [Файл юнит-экономики](https://docs.google.com/spreadsheets/d/1IvPkPMgzj_LGAgDHlgrSbjS_eXCR9KfqTsyvUgNwZEQ): доставка еды, музыкальный сервис, такси | задачи «почему привлечь больше = потерять больше» |
| 2 | Видео: [экономика музыкального сервиса и такси](https://youtu.be/S9tmgI4ab64), [«по старым, новым и потерянным»](https://youtu.be/mf3UfpixpKg), когорты ([сводная](https://youtu.be/SpdCNO3PazQ), [ретеншн](https://youtu.be/n_EmKS9hlIM), [прогноз](https://youtu.be/dfqmrln3TKI)) | домашнее видео перед семинаром по когортам |
| 2 | Шаблоны: [MAU из ретеншна](https://docs.google.com/spreadsheets/d/1oMHljGUYOOw1nMoPWcx-T-BigfRFeubMbBZTpphZqmM), [интернет-магазин обуви (обезличенный)](https://docs.google.com/spreadsheets/d/1yxPBDUs-LhTQ1xMEeF1SwO7jQdk3VE0qSICW1xE8H-k), [SaaS — LTV по когортам](https://docs.google.com/spreadsheets/d/1hbvoGjQSheyCWlDzJNXQ65927EPVwDlEnF64p2YFPyc), [Turbodealer — тарифы](https://docs.google.com/spreadsheets/d/1ZYft8dY6mKiYbDZW7ltRJ542_vPUJOlHDIz9JjemeIo) | готовые кейсы для семинара недели 2 |
| 3 | [Rick.ai — «Конверсия: самая недооценённая метрика»](https://rick.ai/blog/ru/samaia-niedootsieniennaia-i-nieviezuchaia-mietrika-kak-niepravilno-schitaiut-konviersiiu-i-prinimaiut-nieviernyie-rieshieniia/) | +0,3 п.п. конверсии → CAC с 789 до 445 ₽ |
| 3 | [Rick.ai — GA считает метрики по сессиям](https://rick.ai/r/056f4) | «42% вернувшихся» против реального ретеншна 6–9% |
| 3 | [Доклад «О недооценённой конверсии и когортах»](https://www.youtube.com/watch?v=Uwf1-5ZKbhw) (Матемаркетинг) | для желающих |
| 3 | [«Маркетплейсы. Потолок бизнеса»](https://youtu.be/XMAnD3dkZow) + [таблица](https://docs.google.com/spreadsheets/d/1008AdYIwVmjx2i_y1z0JafLLl7mFGCX5mU1WSH5YLeQ) + [юнит-экономика FlowWow](https://docs.google.com/spreadsheets/d/1QAHv6WtnK7--4A_rIGFOQyw1uZEdF-u-veWZoySxwLs) | потолок маркетплейса — прямо про «Лукошко» |
| 6 | [Evan Miller — калькуляторы для A/B](https://www.evanmiller.org/ab-testing/chi-squared.html) | для базового трека |
| 7 | [Rick.ai — какую модель атрибуции выбрать](https://rick.ai/r/f87299), [«Ассоциированные конверсии — зло»](https://www.youtube.com/watch?v=2eoW3LGmJLE) | вилка оценки кампании между моделями атрибуции |
| 7 | Посты В. Абазова «Как оценить влияние без A/B», [ч. 1](https://www.linkedin.com/posts/vladimir-abazov-73863489_analytics-product-abtesting-activity-7089893143499677696-K0ux/), [ч. 3](https://www.linkedin.com/posts/vladimir-abazov-73863489_bigdata-analytics-activity-7095031205590425600-ZPgN/) (не открывались — LinkedIn требует входа) | обзор квазиэкспериментов для чтения |
| 15 | Лист «Objectives & Key Metrics» в шаблоне v5 | OKR, связанные с юнит-экономикой |
