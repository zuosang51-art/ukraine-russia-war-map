function createArrow(map, from, to, style = {}) {

  const {
    color = "#ff3b30",
    weight = 3,
    dashArray = "0",
    type = "line" // line | dashed | arc
  } = style;

  let layer;

  // ➡️ 直线 / 虚线箭头
  if (type === "line" || type === "dashed") {

    layer = L.polyline([from, to], {
      color,
      weight,
      dashArray: type === "dashed" ? "10,10" : dashArray
    }).addTo(map);
  }

  // 🌙 弧线箭头
  if (type === "arc") {

    const mid = [
      (from[0] + to[0]) / 2 + 0.5,
      (from[1] + to[1]) / 2 + 0.5
    ];

    layer = L.curve(
      ['M', from, 'Q', mid, to],
      { color, weight, dashArray }
    ).addTo(map);
  }

  layer._styleConfig = { color, weight, dashArray, type };

  layer.on("click", () => {
    if (window.openStylePanel) openStylePanel(layer);
  });

  return layer;
}
