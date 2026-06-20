let drawnItems = new L.FeatureGroup();

let drawingArrow = false;
let startLatLng = null;
let previewLine = null;

function initDraw() {

  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polygon: true,
      rectangle: true,
      polyline: false,
      circle: false,
      marker: true
    }
  });

  map.addControl(drawControl);

  // 🟢 图形绘制
  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;
    const color = getColorByIndex(drawnItems.getLayers().length);

    layer.setStyle?.({
      color,
      weight: 3,
      opacity: 0.8,
      fillOpacity: 0.3,
      fillColor: color
    });

    layer._styleConfig = { color, weight: 3, opacity: 0.8, fillOpacity: 0.3, fillColor: color };

    drawnItems.addLayer(layer);

    layer.on("click", () => openStylePanel(layer));
  });

  // 🟢 箭头绘制（已修复拖动问题）
  map.on("mousedown", (e) => {

    map.dragging.disable();

    drawingArrow = true;
    startLatLng = e.latlng;

    previewLine = L.polyline([startLatLng, startLatLng], {
      color: "#00ffe5",
      dashArray: "5,5"
    }).addTo(map);
  });

  map.on("mousemove", (e) => {
    if (!drawingArrow || !previewLine) return;
    previewLine.setLatLngs([startLatLng, e.latlng]);
  });

  map.on("mouseup", (e) => {

    drawingArrow = false;

    map.dragging.enable();

    const end = e.latlng;

    if (previewLine) map.removeLayer(previewLine);

    createBattleArrow(
      [startLatLng.lat, startLatLng.lng],
      [end.lat, end.lng],
      currentArrowMode
    );
  });

  window.createBattleArrow = function(from, to, type) {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      opacity: 1,
      dashArray: "0",
      type
    });

    drawnItems.addLayer(arrow);

    return arrow;
  };
}
