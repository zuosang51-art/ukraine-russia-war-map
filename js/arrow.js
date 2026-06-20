// =========================
// 🟢 稳定版凸四边形箭头
// =========================
function createArrow(map, from, to, style) {

  const color = style?.color || "#ff0000";

  const lat1 = from[0], lng1 = from[1];
  const lat2 = to[0], lng2 = to[1];

  // =========================
  // 🟢 防 NaN
  // =========================
  const dx = lng2 - lng1;
  const dy = lat2 - lat1;

  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0 || isNaN(len)) {
    console.warn("Arrow skipped: invalid length");
    return null;
  }

  const ux = dx / len;
  const uy = dy / len;

  const px = -uy * 0.5;
  const py = ux * 0.5;

  // =========================
  // 🟢 箭头头部（更稳定比例）
  // =========================
  const arrowHead = L.polygon([
    [lat2, lng2],

    [lat2 - ux * 0.4 + px, lng2 - uy * 0.4 + py],

    [lat2 - ux * 0.9, lng2 - uy * 0.9],

    [lat2 - ux * 0.4 - px, lng2 - uy * 0.4 - py]

  ], {

    color: color,

    weight: 2,

    fillColor: color,

    fillOpacity: 0.9,

    opacity: 1

  }).addTo(map);

  // =========================
  // 🟢 主线
  // =========================
  const line = L.polyline([from, to], {

    color: color,

    weight: style?.weight || 3,

    opacity: 1

  }).addTo(map);

  // =========================
  // 🟢 组合层
  // =========================
  const group = L.layerGroup([line, arrowHead]);

  group._styleConfig = style;

  return group;
}
