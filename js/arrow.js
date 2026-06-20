function createArrow(map, from, to, style = {}) {

  const {
    color,
    weight,
    dashArray,
    type,
    opacity
  } = style;

  let latlngs = [];

  if (type === "line" || type === "dashed") {
    latlngs = [from, to];
  }

  if (type === "arc") {

    const mid = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2
    ];

    latlngs = [
      from,
      [mid[0] + 0.8, mid[1] + 0.8],
      to
    ];
  }

  const layer = L.polyline(latlngs, {
    color,
    weight,
    opacity,
    dashArray: type === "dashed" ? "10,10" : dashArray
  }).addTo(map);

  layer._styleConfig = style;

  layer.on("click", () => openStylePanel(layer));

  return layer;
}
