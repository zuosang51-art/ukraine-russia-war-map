let drawnItems = new L.FeatureGroup();

function applyStyle(layer, style) {

  if (layer.setStyle) {
    layer.setStyle(style);
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

  // 🆕 战线箭头API（接入UI模式）
  window.createBattleArrow = function(from, to, type) {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      opacity: 1,
      dashArray: "0",
      type: type || currentArrowMode
    });

    drawnItems.addLayer(arrow);

    return arrow;
  };
}
