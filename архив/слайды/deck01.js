// Слайды к лекции 1 «Аналитика как способ думать о бизнесе»
// Запуск: node deck01.js  →  лекция-01.pptx
const pptxgen = require("pptxgenjs");

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "Курс «Продуктовая и маркетинговая аналитика»";
p.title = "Неделя 1 · Аналитика как способ думать о бизнесе";

// Палитра: маркетплейс «Лукошко» — продуктовая зелень + оранжевый акцент розницы
const BG = "FFFFFF", DARK = "103226", PRIMARY = "1E6B47", ACCENT = "E8590C";
const TEXT = "1A2420", MUTED = "5C6B63", TINT = "EDF4EF", LINE = "D8E2DC";
const F = "Arial";
const W = 13.33, H = 7.5, M = 0.6;

const bu = () => ({ code: "2022", indent: 12 });

function base(dark = false) {
  const s = p.addSlide();
  s.background = { color: dark ? DARK : BG };
  return s;
}
function chip(s, txt) {
  s.addText(txt, { x: W - M - 2.6, y: 0.42, w: 2.6, h: 0.3, align: "right", margin: 0,
    fontFace: F, fontSize: 12, bold: true, color: MUTED, charSpacing: 2 });
}
function pageNum(s, n, dark = false) {
  s.addText(String(n).padStart(2, "0"), { x: W - M - 0.7, y: H - 0.5, w: 0.7, h: 0.3,
    align: "right", margin: 0, fontFace: F, fontSize: 12, color: dark ? "7FA08D" : MUTED });
}
function header(s, kicker, title, dark = false) {
  s.addText(kicker.toUpperCase(), { x: M, y: 0.42, w: 8, h: 0.3, margin: 0, fontFace: F,
    fontSize: 12, bold: true, color: ACCENT, charSpacing: 2 });
  s.addText(title, { x: M, y: 0.72, w: W - 2*M - 2.2, h: 0.85, margin: 0, fontFace: F,
    fontSize: 30, bold: true, color: dark ? "FFFFFF" : TEXT });
}
function stat(s, x, y, w, num, label, color = PRIMARY) {
  s.addText(num, { x, y, w, h: 0.95, margin: 0, fontFace: F, fontSize: 54, bold: true, color });
  s.addText(label, { x, y: y + 0.98, w, h: 0.65, margin: 0, fontFace: F, fontSize: 14, color: MUTED });
}


// Мем-компоненты (локальные копии из deck_common)
function memeChat(s, y, header, bubbles, footnote) {
  const px = M, pw = 8.6, ph = 0.62 + bubbles.length * 0.92;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: px, y, w: pw, h: ph, fill: { color: "0E2A1F" }, rectRadius: 0.1 });
  s.addText(header, { x: px + 0.3, y: y + 0.14, w: pw - 0.6, h: 0.35, margin: 0, fontFace: F, fontSize: 13, bold: true, color: "8FC7A8", charSpacing: 1 });
  let by = y + 0.62;
  bubbles.forEach(([side, text]) => {
    const right = side === "r";
    const bw = 6.4;
    const bx = right ? px + pw - bw - 0.28 : px + 0.28;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: 0.78, fill: { color: right ? PRIMARY : "1D4634" }, rectRadius: 0.12 });
    s.addText(text, { x: bx + 0.24, y: by + 0.05, w: bw - 0.48, h: 0.68, margin: 0, fontFace: F, fontSize: 13.5, color: right ? "FFFFFF" : "D9EADF", valign: "middle" });
    by += 0.92;
  });
  if (footnote) s.addText(footnote, { x: M, y: y + ph + 0.25, w: W - 2 * M, h: 0.9, margin: 0, fontFace: F, fontSize: 15.5, italic: true, color: MUTED });
}
function memeDrake(s, y, reject, approve) {
  const ph = 1.55, gap = 0.45;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: W - 2 * M, h: ph, fill: { color: "ECEEEC" }, rectRadius: 0.1 });
  s.addShape(p.shapes.OVAL, { x: M + 0.35, y: y + ph / 2 - 0.33, w: 0.66, h: 0.66, fill: { color: "B3543F" } });
  s.addText("✕", { x: M + 0.35, y: y + ph / 2 - 0.33, w: 0.66, h: 0.66, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 24, bold: true, color: "FFFFFF" });
  s.addText(reject, { x: M + 1.35, y: y + 0.15, w: W - 2 * M - 1.7, h: ph - 0.3, margin: 0, fontFace: F, fontSize: 18, color: "4A4A4A", valign: "middle" });
  const y2 = y + ph + gap;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: y2, w: W - 2 * M, h: ph, fill: { color: TINT }, rectRadius: 0.1 });
  s.addShape(p.shapes.OVAL, { x: M + 0.35, y: y2 + ph / 2 - 0.33, w: 0.66, h: 0.66, fill: { color: PRIMARY } });
  s.addText("✓", { x: M + 0.35, y: y2 + ph / 2 - 0.33, w: 0.66, h: 0.66, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 22, bold: true, color: "FFFFFF" });
  s.addText(approve, { x: M + 1.35, y: y2 + 0.15, w: W - 2 * M - 1.7, h: ph - 0.3, margin: 0, fontFace: F, fontSize: 18, bold: true, color: PRIMARY, valign: "middle" });
}
function memeSplit(s, y, leftHead, leftText, rightHead, rightText) {
  const cw = 5.6, ch = 2.9;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: cw, h: ch, fill: { color: "ECEEEC" }, rectRadius: 0.1 });
  s.addText(leftHead, { x: M + 0.35, y: y + 0.3, w: cw - 0.7, h: 0.55, margin: 0, fontFace: F, fontSize: 24, bold: true, color: "6A6A6A", charSpacing: 2 });
  s.addText(leftText, { x: M + 0.35, y: y + 1.0, w: cw - 0.7, h: ch - 1.3, margin: 0, fontFace: F, fontSize: 16.5, color: "4A4A4A" });
  const x2 = M + cw + 0.6;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: x2, y, w: cw, h: ch, fill: { color: TINT }, rectRadius: 0.1 });
  s.addText(rightHead, { x: x2 + 0.35, y: y + 0.3, w: cw - 0.7, h: 0.55, margin: 0, fontFace: F, fontSize: 24, bold: true, color: ACCENT, charSpacing: 2 });
  s.addText(rightText, { x: x2 + 0.35, y: y + 1.0, w: cw - 0.7, h: ch - 1.3, margin: 0, fontFace: F, fontSize: 16.5, bold: true, color: TEXT });
}

/* ---------- 1. Титул ---------- */
let s = base(true);
s.addText("AI TALENT HUB · ИТМО · БЛОК «ПРОДУКТОВОЕ МЫШЛЕНИЕ»", { x: M, y: 0.9, w: 10, h: 0.35,
  margin: 0, fontFace: F, fontSize: 14, bold: true, color: "8FC7A8", charSpacing: 3 });
s.addText("Продуктовая и маркетинговая аналитика", { x: M, y: 1.45, w: 11.5, h: 1.9, margin: 0,
  fontFace: F, fontSize: 52, bold: true, color: "FFFFFF" });
s.addText([
  { text: "Неделя 1 · ", options: { color: ACCENT, bold: true } },
  { text: "Аналитика как способ думать о бизнесе", options: { color: "CFE0D6" } },
], { x: M, y: 3.45, w: 11, h: 0.5, margin: 0, fontFace: F, fontSize: 22 });
const arc = [
  "Бизнес и роль аналитики", "Система метрик", "Воронка и причинность", "Юнит-экономика",
  "Каналы", "Атрибуция и конкуренты", "Удержание и цена", "Эксперимент и решение",
];
arc.forEach((t, i) => {
  const col = i % 4, row = Math.floor(i / 4);
  const x = M + col * 3.1, y = 4.9 + row * 0.95;
  s.addText(String(i + 1).padStart(2, "0"), { x, y, w: 0.6, h: 0.4, margin: 0, fontFace: F,
    fontSize: 18, bold: true, color: ACCENT });
  s.addText(t, { x: x + 0.62, y: y + 0.02, w: 2.45, h: 0.75, margin: 0, fontFace: F,
    fontSize: 14, color: "CFE0D6" });
});
s.addText("8 лекций + 8 занятий · 3 з.е. · зачёт по мини-проекту", { x: M, y: 6.95, w: 9, h: 0.35,
  margin: 0, fontFace: F, fontSize: 13, color: "7FA08D" });
s.addNotes("Открыть историей с защиты: команда показала отличную модель, первый вопрос комиссии — «а что изменилось в деньгах?». Тишина. Это и есть предмет курса.");

/* ---------- 2. История с защиты ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Зачем этот курс", "«А что изменилось в деньгах?»");
s.addText("Команда обучила рекомендательную модель. Offline-метрики выросли, демонстрация прошла на ура.", { x: M, y: 1.9, w: 11.2, h: 0.75, margin: 0, fontFace: F, fontSize: 20, color: TEXT });
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 2.85, w: 11.2, h: 1.5, fill: { color: TINT }, rectRadius: 0.08 });
s.addText("Первый вопрос комиссии: «А что изменилось в бизнес-метрике?» — в комнате тишина.", { x: M + 0.35, y: 3.05, w: 10.5, h: 1.1, margin: 0, fontFace: F, fontSize: 26, bold: true, color: PRIMARY });
s.addText([
  { text: "Модель была отличная. Ответа не было.", options: { bold: true, color: TEXT, breakLine: true } },
  { text: "Разрыв между «модель работает» и «бизнес стал лучше» — предмет этого курса.", options: { color: MUTED } },
], { x: M, y: 4.75, w: 11.2, h: 1.1, margin: 0, fontFace: F, fontSize: 19, paraSpaceAfter: 8 });
s.addText("Вопрос залу: кто хоть раз обучал модель «потому что было в задании», не спросив, что изменит решение?", { x: M, y: 6.35, w: 11.2, h: 0.6, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 2);
s.addNotes("Разогрев-опрос рук. Смешинка и есть диагноз, который лечим.");

/* ---------- 3. Цель и результаты ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Что обещаем на выходе", "Цель: принимать и защищать продуктовые решения");
const res = [
  ["01", "Переводит задачу бизнеса в гипотезу, а не в «давайте обучим модель»"],
  ["02", "Собирает систему метрик: NSM, дерево, guardrails"],
  ["03", "Читает воронку и когорты, не путая корреляцию с эффектом"],
  ["04", "Считает юнит-экономику в сегментах, зная, когда среднее врёт"],
  ["05", "Оценивает канал привлечения с трекингом и без"],
  ["06", "Понимает, почему last-click врут, и что такое инкрементальность"],
  ["07", "Ставит задачи на удержание и цену, не субсидируя «и так купят»"],
  ["08", "Проектирует проверку эффекта и упаковывает вывод для CPO/CMO"],
];
res.forEach(([n, t], i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * 5.85, y = 2.1 + row * 1.12;
  s.addText(n, { x, y, w: 0.65, h: 0.5, margin: 0, fontFace: F, fontSize: 22, bold: true, color: ACCENT });
  s.addText(t, { x: x + 0.7, y: y + 0.02, w: 4.9, h: 1.0, margin: 0, fontFace: F, fontSize: 15, color: TEXT });
});
s.addShape(p.shapes.LINE, { x: W/2 - 0.05, y: 2.3, w: 0, h: 4.2, line: { color: LINE, width: 1 } });
pageNum(s, 3);

/* ---------- 4. Ценность → деньги ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Как зарабатывает digital-компания", "Ценность → пользователь → деньги");
const chain = [["ЦЕННОСТЬ", "решаем задачу лучше, чем альтернатива"], ["ПОЛЬЗОВАТЕЛЬ", "приходит, остается, возвращается"], ["ДЕНЬГИ", "кто-то платит — и это устойчиво"]];
chain.forEach(([t, d], i) => {
  const x = M + i * 4.0;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.3, w: 3.4, h: 1.9, fill: { color: i === 2 ? PRIMARY : TINT }, rectRadius: 0.08 });
  s.addText(t, { x: x + 0.3, y: 2.6, w: 2.8, h: 0.5, margin: 0, fontFace: F, fontSize: 21, bold: true, color: i === 2 ? "FFFFFF" : PRIMARY });
  s.addText(d, { x: x + 0.3, y: 3.15, w: 2.8, h: 0.9, margin: 0, fontFace: F, fontSize: 14, color: i === 2 ? "D8EFE2" : MUTED });
  if (i < 2) s.addText("→", { x: x + 3.42, y: 2.95, w: 0.6, h: 0.6, margin: 0, fontFace: F, fontSize: 28, bold: true, color: ACCENT });
});
s.addText("Вся аналитика — измерение того, доходит ли ценность до пользователя и конвертируется ли в деньги. Модель может быть рычагом в любом звене: конверсия, отток, средний чек, цена привлечения.", { x: M, y: 4.75, w: 11.4, h: 1.0, margin: 0, fontFace: F, fontSize: 17, color: TEXT });
s.addText("Вопрос залу: возьмите продукт, которым пользовались сегодня. Кто платит? За что? Что случится с деньгами, если завтра уберут любимую фичу?", { x: M, y: 6.15, w: 11.4, h: 0.8, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 4);
s.addNotes("30 секунд на пары, 2–3 ответа вслух.");

/* ---------- 5. Пять моделей монетизации ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Как зарабатывает digital-компания", "Пять моделей монетизации");
const rows = [
  [["Модель"], ["Кто платит"], ["Unit"], ["Ключевая метрика"], ["Примеры"]],
  [["Маркетплейс / комиссия"], ["продавец"], ["заказ"], ["GMV, take rate, повторы"], ["Ozon, Авито, «Лукошко»"]],
  [["Подписка"], ["пользователь"], ["подписчик"], ["MRR, churn, LTV"], ["Netflix, SaaS"]],
  [["Реклама"], ["рекламодатель"], ["внимание"], ["DAU, время, eCPM"], ["соцсети, медиа"]],
  [["Финтех / транзакция"], ["платящий"], ["транзакция"], ["TPV, ARPU"], ["банки, СБП-сервисы"]],
  [["Коммерция / e-com"], ["покупатель"], ["заказ"], ["маржа, оборачиваемость"], ["WB, доставка"]],
];
s.addTable(rows.map((r, ri) => r.map(c => ({
  text: c[0],
  options: ri === 0
    ? { fill: { color: PRIMARY }, color: "FFFFFF", bold: true, fontSize: 14 }
    : { fontSize: 14, color: TEXT, fill: { color: ri % 2 ? "FFFFFF" : TINT } },
}))), { x: M, y: 2.05, w: W - 2*M, colW: [2.6, 2.2, 1.7, 3.0, 2.5], rowH: 0.62,
  border: { pt: 1, color: LINE }, fontFace: F, valign: "middle", margin: 0.08 });
s.addText("Unit — наименьшая единица, на которой можно посчитать заработок. Ошибка выбрать «не тот» unit делает экономику красивой в отчёте и убыточной в кассе (неделя 4).", { x: M, y: 6.35, w: 11.4, h: 0.7, margin: 0, fontFace: F, fontSize: 14, color: MUTED });
pageNum(s, 5);

/* ---------- 6. «Лукошко» ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Сквозной продукт курса", "Маркетплейс «Лукошко»: повседневные товары за 90 минут");
stat(s, M, 2.1, 2.6, "4,2", "млн MAU · DAU/MAU ≈ 0,32");
stat(s, 3.5, 2.1, 2.9, "7,0", "млрд ₽ GMV в месяц");
stat(s, 6.9, 2.1, 2.6, "18%", "take rate — платят продавцы");
stat(s, 9.8, 2.1, 3.0, "9%", "маржа после логистики и промо", ACCENT);
s.addShape(p.shapes.LINE, { x: M, y: 4.15, w: W - 2*M, h: 0, line: { color: LINE, width: 1 } });
s.addText([
  { text: "Unit — заказ. ", options: { bold: true } },
  { text: "Средний чек 1 850 ₽, маржа с заказа ≈ 167 ₽. Активация — первый заказ ≤ 7 дней (26%), aha-момент — второй заказ ≤ 30 дней: удержание ×3.", options: {} },
], { x: M, y: 4.45, w: 11.4, h: 1.1, margin: 0, fontFace: F, fontSize: 18, color: TEXT });
s.addText("На «Лукошке» идёт каждая неделя: воронка (3), экономика (4), каналы (5), атрибуция (6), скидки (7), эксперимент (8). Дома ту же рамку тянете на свой проект.", { x: M, y: 5.9, w: 11.4, h: 0.9, margin: 0, fontFace: F, fontSize: 16, color: MUTED });
pageNum(s, 6);

/* ---------- 7. Кто за что отвечает ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Кто за что отвечает", "Четыре функции — четыре вопроса");
const funcs = [
  ["Продукт", "«Что построить, чтобы ценность росла?»", "конверсия · удержание · активация"],
  ["Маркетинг", "«Как о нас узнают и приходят?»", "CAC · каналы · доля органики"],
  ["Разработка", "«Как делать быстро и не ломать?»", "скорость · надёжность · стоимость фичи"],
  ["DS / ML", "«Какие рычаги автоматизации возможны?»", "качество моделей · эффект в проде"],
];
funcs.forEach(([t, q, m], i) => {
  const y = 2.05 + i * 1.15;
  s.addShape(p.shapes.OVAL, { x: M, y: y + 0.08, w: 0.55, h: 0.55, fill: { color: i === 3 ? ACCENT : PRIMARY } });
  s.addText(String(i + 1), { x: M, y: y + 0.08, w: 0.55, h: 0.55, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 18, bold: true, color: "FFFFFF" });
  s.addText(t, { x: M + 0.85, y, w: 2.4, h: 0.75, margin: 0, fontFace: F, fontSize: 19, bold: true, color: TEXT });
  s.addText(q, { x: 4.1, y, w: 5.4, h: 0.75, margin: 0, fontFace: F, fontSize: 17, color: PRIMARY });
  s.addText(m, { x: 9.7, y: y + 0.03, w: 3.0, h: 0.75, margin: 0, fontFace: F, fontSize: 14, color: MUTED });
  if (i < 3) s.addShape(p.shapes.LINE, { x: M, y: y + 1.0, w: W - 2*M, h: 0, line: { color: LINE, width: 1 } });
});
s.addText("В ATH-проектах вы почти всегда embedded: аналитик — это вы. Курс — про умение быть «переводчиком» между бизнес-вопросом и моделью.", { x: M, y: 6.65, w: 11.4, h: 0.65, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 7);

/* ---------- 8. Чатик заявок ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Как это выглядит в реальности", "Входящие заявки, понедельник 09:47");
memeChat(s, 2.0, "«Лукошко» · продуктовый чат", [
  ["l", "Отток растёт. Внедрим ML-модель удержания? Бюджет 20 млн/год"],
  ["l", "LLM сократит 30% операторов поддержки — я видел демо"],
  ["l", "AUC 0.79! Показываем баннер всем, у кого высокая вероятность покупки"],
  ["r", "…а что должно измениться в деньгах?"],
], "Занятие недели 1: переписываем каждую в гипотезу — вопрос → метрика → guardrail → нужен ли ML вообще.");
pageNum(s, 8);

/* ---------- 8. Эстафета ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Где теряется смысл", "Эстафета со сломанным переводом");
const relay = [
  ["Бизнес", "«Что-то отток растёт»"],
  ["Продакт", "«Нужна churn-модель»"],
  ["DS", "«Обучите классификатор оттока»"],
  ["Через месяц", "AUC 0.87 · отток не сдвинулся"],
];
relay.forEach(([t, d], i) => {
  const x = M + i * 3.0;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 2.3, w: 2.55, h: 1.85, fill: { color: i === 3 ? ACCENT : TINT }, rectRadius: 0.08 });
  s.addText(t, { x: x + 0.22, y: 2.5, w: 2.1, h: 0.4, margin: 0, fontFace: F, fontSize: 14, bold: true, color: i === 3 ? "FFE3D1" : MUTED, charSpacing: 1 });
  s.addText(d, { x: x + 0.22, y: 2.95, w: 2.15, h: 1.05, margin: 0, fontFace: F, fontSize: 16, bold: i === 3, color: i === 3 ? "FFFFFF" : TEXT });
  if (i < 3) s.addText("→", { x: x + 2.56, y: 2.95, w: 0.45, h: 0.6, margin: 0, fontFace: F, fontSize: 24, bold: true, color: MUTED });
});
s.addText("Кто-то должен был спросить: что мы будем делать с предсказанием — и как оно вернёт деньги?", { x: M, y: 4.65, w: 11.4, h: 0.6, margin: 0, fontFace: F, fontSize: 21, bold: true, color: PRIMARY });
s.addText("Эта роль — аналитик в широком смысле. Не «человек-функция качества модели»: сформулировал задачу, построил, измерил эффект, ответил бизнесу.", { x: M, y: 5.5, w: 11.4, h: 0.9, margin: 0, fontFace: F, fontSize: 17, color: TEXT });
pageNum(s, 9);

/* ---------- 9. Пять жанров задач ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Типы задач аналитика", "Пять жанров работы — и главная ошибка новичка в каждом");
const genres = [
  [["Жанр"], ["Вопрос"], ["Артефакт"], ["Ошибка новичка"]],
  [["Дашборд"], ["как дела?"], ["витрина + графики"], ["мониторить всё подряд"]],
  [["Ad-hoc"], ["почему так вышло?"], ["короткий ответ"], ["ответить корреляцией"]],
  [["Исследование"], ["как устроено?"], ["инсайт + рекомендации"], ["копать без связи с решением"]],
  [["Эксперимент"], ["что изменит X?"], ["вывод катить/не катить"], ["оценивать по прокси"]],
  [["Аналитический проект"], ["что делать?"], ["модель + план + эффект"], ["сделать модель вместо ответа"]],
];
s.addTable(genres.map((r, ri) => r.map(c => ({
  text: c[0],
  options: ri === 0
    ? { fill: { color: PRIMARY }, color: "FFFFFF", bold: true, fontSize: 14 }
    : { fontSize: 14, color: TEXT, fill: { color: ri % 2 ? "FFFFFF" : TINT } },
}))), { x: M, y: 2.05, w: W - 2*M, colW: [2.8, 2.7, 3.1, 3.5], rowH: 0.66,
  border: { pt: 1, color: LINE }, fontFace: F, valign: "middle", margin: 0.08 });
s.addText("Аналитика — это спектр, а не «дашборды» и не «ML». Спор о жанре — частая причина конфликтов: ad-hoc ждут за час, проект — за месяц.", { x: M, y: 6.5, w: 11.4, h: 0.6, margin: 0, fontFace: F, fontSize: 14, color: MUTED });
pageNum(s, 10);

/* ---------- 10. Kaggle vs бизнес ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Разные жанры", "«Задача на Kaggle» и «вопрос бизнеса»");
const diffs = [
  ["Метрика", "дана: RMSE, AUC", "надо придумать — это половина задачи"],
  ["Данные", "даны, чистые", "нет; логирование кривое — сначала починить"],
  ["Цена ошибки", "место в лидерборде", "деньги, доверие, иногда люди"],
  ["Финал", "сабмит", "решение, которое кто-то примет и за которое ответит"],
];
s.addText("", { x: M, y: 1.95, w: 0.1, h: 0.1, margin: 0 });
s.addText("KAGGLE", { x: 4.7, y: 1.95, w: 3.2, h: 0.4, margin: 0, fontFace: F, fontSize: 15, bold: true, color: MUTED, charSpacing: 2 });
s.addText("БИЗНЕС", { x: 8.2, y: 1.95, w: 4.2, h: 0.4, margin: 0, fontFace: F, fontSize: 15, bold: true, color: ACCENT, charSpacing: 2 });
diffs.forEach(([t, a, b], i) => {
  const y = 2.5 + i * 1.05;
  s.addText(t, { x: M, y: y + 0.05, w: 3.6, h: 0.6, margin: 0, fontFace: F, fontSize: 19, bold: true, color: TEXT });
  s.addText(a, { x: 4.7, y, w: 3.3, h: 0.9, margin: 0, fontFace: F, fontSize: 15, color: MUTED });
  s.addText(b, { x: 8.2, y, w: 4.4, h: 0.9, margin: 0, fontFace: F, fontSize: 15, color: TEXT });
  if (i < 3) s.addShape(p.shapes.LINE, { x: M, y: y + 0.92, w: W - 2*M, h: 0, line: { color: LINE, width: 1 } });
});
s.addText("Вопрос залу: какой пункт чаще всего игнорируют ML-инженеры?", { x: M, y: 6.75, w: 11.4, h: 0.5, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 11);
s.addNotes("Ответ: первый — метрику берут по умолчанию, потом «AUC вырос, а бизнес нет».");

/* ---------- 11½. Дрейк ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Рефлекс, который лечим весь курс", "«Сначала модель» — не работает");
memeDrake(s, 2.4,
  "Обучить модель, потому что «это в задании»",
  "Сначала спросить: что изменит решение — и кто это заметит в деньгах");
s.addText("Если узнали себя — хорошо: курс ровно про это.", { x: M, y: 6.55, w: 11.4, h: 0.5, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 12);

/* ---------- 11. Фреймворк курса ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ЛЕКЦИЯ");
header(s, "Один фреймворк на весь курс", "Пять шагов — повторяем каждую неделю, каждый раз глубже");
const steps = [
  ["ВОПРОС", "какой вопрос бизнеса? кто и что изменит от ответа?"],
  ["ВОРОНКА", "где в пути пользователя это живёт? где болит?"],
  ["МЕТРИКИ", "чем измерим успех и вред?"],
  ["ЭКОНОМИКА", "сколько стоит и принесёт? в каких сегментах иначе?"],
  ["ПРОВЕРКА", "как докажем эффект? A/B или что-то честнее?"],
];
steps.forEach(([t, d], i) => {
  const y = 2.15 + i * 0.92;
  s.addShape(p.shapes.OVAL, { x: M, y, w: 0.62, h: 0.62, fill: { color: PRIMARY } });
  s.addText(String(i + 1), { x: M, y, w: 0.62, h: 0.62, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 20, bold: true, color: "FFFFFF" });
  s.addText(t, { x: M + 0.95, y: y + 0.02, w: 2.6, h: 0.6, margin: 0, fontFace: F, fontSize: 18, bold: true, color: TEXT, charSpacing: 1 });
  s.addText(d, { x: 4.4, y: y + 0.05, w: 8.2, h: 0.6, margin: 0, fontFace: F, fontSize: 16, color: MUTED });
  if (i < 4) s.addShape(p.shapes.LINE, { x: M + 0.31, y: y + 0.64, w: 0, h: 0.26, line: { color: PRIMARY, width: 1.5 } });
});
s.addText("Над всем — ML-рычаг: в какой точке модель реально нужна, а в какой это карго-культ.", { x: M, y: 6.85, w: 11.4, h: 0.5, margin: 0, fontFace: F, fontSize: 16, bold: true, color: ACCENT });
pageNum(s, 13);

/* ---------- 12. Кейс RecSys: было/стало ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ML-ПРИМЕР");
header(s, "Квартал работы RecSys «Лукошко»", "Offline-метрики выросли. Деньги — нет");
const kpi = [
  [["Метрика"], ["Было"], ["Стало"], ["Δ"]],
  [["NDCG@10 (offline)"], ["0,41"], ["0,49"], ["+20%"]],
  [["CTR главной"], ["6,8%"], ["7,6%"], ["+12%"]],
  [["Конверсия карточка → заказ"], ["8,5%"], ["8,3%"], ["−2%"]],
  [["Доля возвратов"], ["4,1%"], ["5,3%"], ["+29%"]],
  [["GMV на пользователя"], ["1 640 ₽"], ["1 590 ₽"], ["−3%"]],
  [["Маржа на пользователя"], ["148 ₽"], ["139 ₽"], ["−6%"]],
];
s.addTable(kpi.map((r, ri) => r.map((c, ci) => ({
  text: c[0],
  options: ri === 0
    ? { fill: { color: PRIMARY }, color: "FFFFFF", bold: true, fontSize: 14 }
    : { fontSize: 15, bold: ci === 3, color: ri >= 3 && ci === 3 ? ACCENT : (ri < 3 && ci === 3 ? PRIMARY : TEXT), fill: { color: ri % 2 ? TINT : "FFFFFF" } },
}))), { x: M, y: 2.0, w: 8.1, colW: [3.6, 1.4, 1.4, 1.7], rowH: 0.6,
  border: { pt: 1, color: LINE }, fontFace: F, valign: "middle", margin: 0.08 });
s.addText("Что случилось", { x: 9.1, y: 2.0, w: 3.4, h: 0.4, margin: 0, fontFace: F, fontSize: 15, bold: true, color: ACCENT, charSpacing: 1 });
s.addText("Модель оптимизировала клик — и выучила кликбейт: яркие, дешёвые, «как у соседа» товары низкого качества. Клик есть, покупка по инерции, возврат — двойная логистика ≈ 250 ₽ убытка и раздражение.", { x: 9.1, y: 2.45, w: 3.5, h: 3.2, margin: 0, fontFace: F, fontSize: 14, color: TEXT });
s.addText("Целевая функция отвечала на вопрос «на что нажмут», а не «что купят и вернут».", { x: 9.1, y: 5.6, w: 3.5, h: 1.0, margin: 0, fontFace: F, fontSize: 14, italic: true, color: MUTED });
pageNum(s, 14);

/* ---------- 13. Разбор по фреймворку ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ML-ПРИМЕР");
header(s, "Кейс RecSys: разбор", "Пять шагов фреймворка — что пропустили");
const diag = [
  ["ВОПРОС", "не задан: задача была «улучшить рекомендации», а не «увеличить ценность за визит»"],
  ["ВОРОНКА", "смотрели только верх (клик), не смотрели вниз — возвраты, повторные покупки"],
  ["МЕТРИКИ", "не было guardrail: маржа, возвраты, повторный заказ в 30 дней"],
  ["ЭКОНОМИКА", "никто не посчитал: CTR × маржа покупки − маржа возврата"],
  ["ПРОВЕРКА", "катали по offline-метрике; A/B с guardrail поймал бы за 2 недели"],
];
diag.forEach(([t, d], i) => {
  const y = 2.05 + i * 0.82;
  s.addText(t, { x: M, y, w: 2.6, h: 0.6, margin: 0, fontFace: F, fontSize: 15, bold: true, color: PRIMARY, charSpacing: 1 });
  s.addText(d, { x: 3.4, y, w: 9.0, h: 0.7, margin: 0, fontFace: F, fontSize: 16, color: TEXT });
  if (i < 4) s.addShape(p.shapes.LINE, { x: M, y: y + 0.7, w: W - 2*M, h: 0, line: { color: LINE, width: 1 } });
});
s.addText([
  { text: "Кому должно было быть больно: ", options: { bold: true, color: TEXT } },
  { text: "категорийному менеджеру (возвраты = штрафы), логистике (обратный поток), CFO (маржа). Никто из них не был в ревью модели.", options: { color: MUTED } },
], { x: M, y: 6.35, w: 11.4, h: 0.85, margin: 0, fontFace: F, fontSize: 15 });
pageNum(s, 15);

/* ---------- 14. LLM-фича ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ML-ПРИМЕР");
header(s, "Второй кейс, короче", "LLM-фича с отличными evals, которой никто не пользуется");
stat(s, M, 2.3, 3.4, "4,6 / 5", "качество саммари отзывов по evals (разметка)", PRIMARY);
stat(s, 4.4, 2.3, 3.4, "0,4%", "adoption через месяц: 2 человека из 500 в день", ACCENT);
s.addText("Диагноз: фича решала задачу, которой у пользователя нет — отзывы перед покупкой FMCG читают 7%, и «лайк» разметчика ≠ боль покупателя.", { x: M, y: 4.5, w: 11.4, h: 0.85, margin: 0, fontFace: F, fontSize: 18, color: TEXT });
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.5, w: 11.4, h: 1.15, fill: { color: TINT }, rectRadius: 0.08 });
s.addText("Качество модели ≠ ценность фичи. Ценность = (сколько людей в какой боли) × (насколько решает). Считаем до разработки, а не после.", { x: M + 0.35, y: 5.7, w: 10.7, h: 0.8, margin: 0, fontFace: F, fontSize: 18, bold: true, color: PRIMARY });
pageNum(s, 16);

/* ---------- 15. Ожидание/реальность ---------- */
s = base(); chip(s, "НЕДЕЛЯ 1 · ML-ПРИМЕР");
header(s, "Запуск ML-фичи", "Ожидание и реальность");
memeSplit(s, 2.5,
  "ОЖИДАНИЕ", "Evals 4,6/5 — катим на всю базу, все в восторге",
  "РЕАЛЬНОСТЬ", "Adoption 0,4%: разворачивают двое из 500 в день");
s.addText("Ценность фичи = (сколько людей в какой боли) × (насколько она решает). Считаем до разработки, а не после.", { x: M, y: 6.15, w: 11.4, h: 0.7, margin: 0, fontFace: F, fontSize: 15, italic: true, color: MUTED });
pageNum(s, 17);

/* ---------- 15. Домашка (dark closing) ---------- */
s = base(true);
s.addText("НЕДЕЛЯ 1 · ДОМАШКА И ЗАНЯТИЕ", { x: M, y: 0.8, w: 9, h: 0.35, margin: 0, fontFace: F, fontSize: 13, bold: true, color: ACCENT, charSpacing: 3 });
s.addText("Принести: головы. Ноутбук не нужен.", { x: M, y: 1.25, w: 11.5, h: 1.0, margin: 0, fontFace: F, fontSize: 34, bold: true, color: "FFFFFF" });
s.addText("ДОМАШКА — одна страница", { x: M, y: 2.7, w: 6.2, h: 0.4, margin: 0, fontFace: F, fontSize: 15, bold: true, color: "8FC7A8", charSpacing: 1 });
s.addText([
  { text: "Ваш проект магистратуры (или любой знакомый продукт) в бизнес-рамке:", options: { color: "CFE0D6", breakLine: true } },
  { text: "кто пользователь и в чём ценность · кто платит · unit · вопрос бизнеса · гипотеза «если X, то Y» · метрика успеха и вреда · место ML", options: { bold: true, color: "FFFFFF" } },
], { x: M, y: 3.15, w: 6.2, h: 2.4, margin: 0, fontFace: F, fontSize: 17, paraSpaceAfter: 10 });
s.addText("ЗАНЯТИЕ — кейс-воркшоп", { x: 7.4, y: 2.7, w: 5.3, h: 0.4, margin: 0, fontFace: F, fontSize: 15, bold: true, color: "8FC7A8", charSpacing: 1 });
s.addText([
  { text: "Три «заявки на модель» от руководства «Лукошко».", options: { color: "CFE0D6", breakLine: true } },
  { text: "Переписываем в: вопрос → гипотеза → на кого влияет → чем измерим успех и вред → нужен ли ML вообще.", options: { bold: true, color: "FFFFFF", breakLine: true } },
  { text: "Цель недели — сломать рефлекс «сначала модель».", options: { italic: true, color: ACCENT } },
], { x: 7.4, y: 3.15, w: 5.3, h: 2.6, margin: 0, fontFace: F, fontSize: 17, paraSpaceAfter: 10 });
s.addText("Следующая неделя: система метрик — NSM, дерево, guardrails. Практика: retention и когорты на данных «Лукошко».", { x: M, y: 6.6, w: 11.4, h: 0.6, margin: 0, fontFace: F, fontSize: 15, color: "7FA08D" });
pageNum(s, 18, true);

p.writeFile({ fileName: "../неделя-01/лекция-01.pptx" }).then(() => console.log("done"));
