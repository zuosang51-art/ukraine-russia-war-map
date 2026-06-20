function createArrow(map, from, to, style = {}) {

  const {
    color = "#ff3b30",
    weight = 3,
    dashArray = "0",
    type = "line",
    opacity = 1
  } = style;

  let latlngs = [];

  // ➡️ 直线 / 虚线
  if (type === "line" || type === "dashed") {
    latlngs = [from, to];
  }

  // 🌙 弧线（稳定版：控制点模拟）
  if (type === "arc") {

    const mid = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2
    ];

    const offset = 0.8;

    const control = [
      mid[0] + offset,
      mid[1] + offset
    ];

    latlngs = [from, control, to];
  }

  const layer = L.polyline(latlngs, {
    color,
    weight,
    opacity,
    dashArray: type === "dashed" ? "10,10" : dashArray
  }).addTo(map);

  layer._styleConfig = { color, weight, dashArray, type, opacity };

  layer.on("click", () => {
    if (window.openStylePanel) openStylePanel(layer);
  });

  return layer;
}
