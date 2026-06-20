let drawnItems = new L.FeatureGroup();
let currentLayer = null;

function applyStyle(layer, style) {

  if (layer.setStyle) {
    layer.setStyle({
      color: style.color,
      weight: style.weight,
      opacity: style.opacity,
      dashArray: style.dashArray
    });
  }

  layer._styleConfig = style;
}

function initDraw() {

  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polygon: true,
      polyline: false,
      rectangle: true,
      marker: true,
      circle: false
    }
  });

  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;

    applyStyle(layer, {
      color: getColorByIndex(drawnItems.getLayers().length),
      weight: 3,
      opacity: 1,
      dashArray: "0"
    });

    drawnItems.addLayer(layer);

    layer.on("click", () => openStylePanel(layer));
  });

  // 🟡 战线箭头API
  window.createBattleArrow = function(from, to, type = "line") {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      dashArray: "0",
      type,
      opacity: 1
    });

    drawnItems.addLayer(arrow);

    return arrow;
  };
}
