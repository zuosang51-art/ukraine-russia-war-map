
// =========================
// 🟢 凸四边形箭头（核心重写）
// =========================
function createArrow(map, from, to, style) {

  const color = style.color;

  const lat1 = from[0], lng1 = from[1];
  const lat2 = to[0], lng2 = to[1];

  const dx = lng2 - lng1;
  const dy = lat2 - lat1;

  const len = Math.sqrt(dx*dx + dy*dy);

  const ux = dx / len;
  const uy = dy / len;

  const px = -uy * 0.3;
  const py = ux * 0.3;

  // =========================
  // 🟢 四边形箭头（凸形）
  // =========================
  const arrowHead = L.polygon([
    [lat2, lng2],
    [lat2 - ux * 0.4 + px, lng2 - uy * 0.4 + py],
    [lat2 - ux * 0.8, lng2 - uy * 0.8],
    [lat2 - ux * 0.4 - px, lng2 - uy * 0.4 - py]
  ], {
    color,
    fillColor: color,
    fillOpacity: 0.8,
    weight: 2
  }).addTo(map);

  // =========================
  // 🟢 线
  // =========================
  const line = L.polyline([from, to], {
    color,
    weight: 3,
    opacity: 1
  }).addTo(map);

  const group = L.layerGroup([line, arrowHead]);

  group._styleConfig = style;

  return group;
}
