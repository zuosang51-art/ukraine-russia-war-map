
let drawnItems = new L.FeatureGroup();

let drawing = false;
let start = null;
let preview = null;

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

  // =====================
  // 图形
  // =====================
  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;

    const color = getColorByIndex(drawnItems.getLayers().length);

    layer.setStyle?.({
      color,
      weight: 3,
      opacity: 0.9,
      fillOpacity: 0.3,
      fillColor: color
    });

    drawnItems.addLayer(layer);

    layer.on("click", () => openStylePanel(layer));
  });

  // =====================
  // 箭头绘制（修复版）
  // =====================
  map.on("mousedown", (e) => {

    map.dragging.disable();

    drawing = true;
    start = e.latlng;

    preview = L.polyline([start, start], {
      color: "#00ffe5",
      dashArray: "5,5"
    }).addTo(map);
  });

  map.on("mousemove", (e) => {
    if (!drawing) return;
    preview.setLatLngs([start, e.latlng]);
  });

  map.on("mouseup", (e) => {

    drawing = false;
    map.dragging.enable();

    const end = e.latlng;

    if (preview) map.removeLayer(preview);

    createBattleArrow(
      [start.lat, start.lng],
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
      type
    });

    drawnItems.addLayer(arrow);
  };
}
