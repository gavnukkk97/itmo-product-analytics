// Общий стиль колод курса «Продуктовая и маркетинговая аналитика»
// Использование: const { style } = require("./deck_common")(p, weekTitle);
module.exports = function makeStyle(p, weekTag) {
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
    s.addText(txt, { x: W - M - 2.9, y: 0.42, w: 2.9, h: 0.3, align: "right", margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: MUTED, charSpacing: 2 });
  }
  function pageNum(s, n, dark = false) {
    s.addText(String(n).padStart(2, "0"), { x: W - M - 0.7, y: H - 0.5, w: 0.7, h: 0.3,
      align: "right", margin: 0, fontFace: F, fontSize: 12, color: dark ? "7FA08D" : MUTED });
  }
  function header(s, kicker, title, dark = false) {
    s.addText(kicker.toUpperCase(), { x: M, y: 0.42, w: 8.4, h: 0.3, margin: 0, fontFace: F,
      fontSize: 12, bold: true, color: ACCENT, charSpacing: 2 });
    s.addText(title, { x: M, y: 0.72, w: W - 2 * M - 2.6, h: 0.85, margin: 0, fontFace: F,
      fontSize: 29, bold: true, color: dark ? "FFFFFF" : TEXT });
  }
  function stat(s, x, y, w, num, label, color = PRIMARY) {
    s.addText(num, { x, y, w, h: 0.9, margin: 0, fontFace: F, fontSize: 54, bold: true, color });
    s.addText(label, { x, y: y + 0.95, w, h: 0.8, margin: 0, fontFace: F, fontSize: 14, color: MUTED });
  }
  // таблица: rows = массив массивов строк; первая строка — шапка
  function table(s, rows, x, y, colW, rowH = 0.62, fontSize = 14, w = W - 2 * M) {
    s.addTable(rows.map((r, ri) => r.map(c => ({
      text: c,
      options: ri === 0
        ? { fill: { color: PRIMARY }, color: "FFFFFF", bold: true, fontSize }
        : { fontSize, color: TEXT, fill: { color: ri % 2 ? "FFFFFF" : TINT } },
    }))), { x, y, w, colW, rowH, border: { pt: 1, color: LINE }, fontFace: F, valign: "middle", margin: 0.08 });
  }
  // список строк: [заголовок, описание] с номером/точкой и хайрлайн-разделителем
  function rowsList(s, items, x, y, rowH, titleW, descX, descW, opts = {}) {
    items.forEach(([t, d], i) => {
      const yy = y + i * rowH;
      if (opts.numbered) {
        s.addText(String(i + 1), { x, y: yy, w: 0.55, h: 0.55, margin: 0, fontFace: F,
          fontSize: 20, bold: true, color: opts.numColor || ACCENT });
      }
      s.addText(t, { x: x + (opts.numbered ? 0.7 : 0), y: yy, w: titleW, h: rowH - 0.15,
        margin: 0, fontFace: F, fontSize: opts.titleSize || 18, bold: true, color: TEXT });
      s.addText(d, { x: descX, y: yy + 0.03, w: descW, h: rowH - 0.1, margin: 0, fontFace: F,
        fontSize: opts.descSize || 15, color: MUTED });
      if (i < items.length - 1) s.addShape(p.shapes.LINE, { x, y: yy + rowH - 0.12,
        w: W - 2 * M, h: 0, line: { color: LINE, width: 1 } });
    });
  }
  // пронумерованная вертикальная цепочка (круги с линией между)
  function stepsChain(s, steps, x, y, rowH, titleW, descX, descW) {
    steps.forEach(([t, d], i) => {
      const yy = y + i * rowH;
      s.addShape(p.shapes.OVAL, { x, y: yy, w: 0.62, h: 0.62, fill: { color: PRIMARY } });
      s.addText(String(i + 1), { x, y: yy, w: 0.62, h: 0.62, align: "center", valign: "middle",
        margin: 0, fontFace: F, fontSize: 20, bold: true, color: "FFFFFF" });
      s.addText(t, { x: x + 0.95, y: yy + 0.02, w: titleW, h: rowH - 0.2, margin: 0,
        fontFace: F, fontSize: 18, bold: true, color: TEXT, charSpacing: 1 });
      s.addText(d, { x: descX, y: yy + 0.05, w: descW, h: rowH - 0.1, margin: 0, fontFace: F,
        fontSize: 16, color: MUTED });
      if (i < steps.length - 1) s.addShape(p.shapes.LINE, { x: x + 0.31, y: yy + 0.64, w: 0,
        h: rowH - 0.66, line: { color: PRIMARY, width: 1.5 } });
    });
  }
  // горизонтальные блоки-карточки со стрелками (эстафета/процесс)
  function flowRow(s, items, y, boxW, boxH, opts = {}) {
    items.forEach(([t, d], i) => {
      const x = M + i * (boxW + 0.45);
      const hot = opts.hotLast ? i === items.length - 1 : false;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: boxW, h: boxH,
        fill: { color: hot ? ACCENT : TINT }, rectRadius: 0.08 });
      s.addText(t, { x: x + 0.22, y: y + 0.18, w: boxW - 0.44, h: 0.4, margin: 0, fontFace: F,
        fontSize: 14, bold: true, color: hot ? "FFE3D1" : MUTED, charSpacing: 1 });
      s.addText(d, { x: x + 0.22, y: y + 0.6, w: boxW - 0.4, h: boxH - 0.75, margin: 0,
        fontFace: F, fontSize: opts.bodySize || 16, bold: hot, color: hot ? "FFFFFF" : TEXT });
      if (i < items.length - 1) s.addText("→", { x: x + boxW + 0.02, y: y + boxH / 2 - 0.3,
        w: 0.42, h: 0.6, margin: 0, fontFace: F, fontSize: 24, bold: true, color: MUTED });
    });
  }
  function question(s, txt, y) {
    s.addText(txt, { x: M, y, w: W - 2 * M, h: 0.75, margin: 0, fontFace: F, fontSize: 15,
      italic: true, color: MUTED });
  }
  // тёмный титул недели
  function titleSlide(weekNo, weekTitle, subtitle, footer) {
    const s = base(true);
    s.addText("AI TALENT HUB · ИТМО · БЛОК «ПРОДУКТОВОЕ МЫШЛЕНИЕ»", { x: M, y: 0.9, w: 10, h: 0.35,
      margin: 0, fontFace: F, fontSize: 14, bold: true, color: "8FC7A8", charSpacing: 3 });
    s.addText(weekTitle, { x: M, y: 1.45, w: 11.6, h: 1.9, margin: 0, fontFace: F,
      fontSize: 48, bold: true, color: "FFFFFF" });
    s.addText([{ text: `Неделя ${weekNo} · `, options: { color: ACCENT, bold: true } },
      { text: subtitle, options: { color: "CFE0D6" } }],
      { x: M, y: 3.55, w: 11.4, h: 0.5, margin: 0, fontFace: F, fontSize: 22 });
    s.addText(footer, { x: M, y: 6.95, w: 10, h: 0.35, margin: 0, fontFace: F, fontSize: 13, color: "7FA08D" });
    return s;
  }
  return { BG, DARK, PRIMARY, ACCENT, TEXT, MUTED, TINT, LINE, F, W, H, M, bu,
    base, chip, pageNum, header, stat, table, rowsList, stepsChain, flowRow, question, titleSlide };
};
