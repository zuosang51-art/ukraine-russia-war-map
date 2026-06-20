let drawnItems = new L.FeatureGroup();

let drawingArrow = false;
let startLatLng = null;
let previewLine = null;

function initDraw() {

  map.addLayer(drawnItems);

  // =========================
  // 🟢 画图工具（polygon/rect）
  // =========================
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

  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;

    const color = getColorByIndex(drawnItems.getLayers().length);

    // ⭐⭐⭐关键修复：面 + 线统一样式
    layer.setStyle?.({
      color: color,
      weight: 3,

      // ✔ 线透明度
      opacity: 0.8,

      // ✔ 面透明度（关键修复）
      fillOpacity: 0.3,

      fillColor: color
    });

    layer._styleConfig = {
      color,
      weight: 3,
      opacity: 0.8,
      fillOpacity: 0.3,
      fillColor: color
    };

    drawnItems.addLayer(layer);

    layer.on("click", () => openStylePanel(layer));
  });

  // =========================
  // 🟢 箭头绘制（修复版）
  // =========================
  map.on("mousedown", (e) => {

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

    if (!drawingArrow) return;

    drawingArrow = false;

    const end = e.latlng;

    map.removeLayer(previewLine);
    previewLine = null;

    createBattleArrow(
      [startLatLng.lat, startLatLng.lng],
      [end.lat, end.lng],
      currentArrowMode
    );
  });

  // =========================
  // API
  // =========================
  window.createBattleArrow = function(from, to, type) {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      opacity: 0.9,
      dashArray: "0",
      type
    });

    drawnItems.addLayer(arrow);

    return arrow;
  };
}
