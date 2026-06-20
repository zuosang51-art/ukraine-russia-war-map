
let drawnItems;
let drawing = false;
let start = null;
let preview = null;


function initDraw() {

  // =====================
  // 🟢 防止重复初始化
  // =====================
  if (!map) {
    console.error("Map not ready");
    return;
  }

  if (!drawnItems) {
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
  }


  // =====================
  // 🟢 检查 Leaflet Draw
  // =====================
  if (!L.Control.Draw) {
    console.error("Leaflet Draw plugin missing");
    return;
  }


  const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polygon: true,
      rectangle: true,
      polyline: true,
      circle: false,
      marker: true
    }
  });

  map.addControl(drawControl);


  // =====================
  // 🟢 图形创建
  // =====================
  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;

    const color = getColorByIndex(drawnItems.getLayers().length);

    if (layer.setStyle) {

      layer.setStyle({
        color,
        weight: 3,
        opacity: 0.9,
        fillOpacity: 0.3,
        fillColor: color
      });

    }

    drawnItems.addLayer(layer);

    layer.on("click", () => openStylePanel(layer));

  });


  // =====================
  // 🟢 箭头绘制（修复冲突版）
  // =====================

  map.on("mousedown", onDrawStart);
  map.on("mousemove", onDrawMove);
  map.on("mouseup", onDrawEnd);


  function onDrawStart(e) {

    drawing = true;
    start = e.latlng;

    preview = L.polyline([start, start], {
      color: "#00ffe5",
      dashArray: "6,6",
      weight: 2
    }).addTo(map);

  }


  function onDrawMove(e) {

    if (!drawing || !preview) return;

    preview.setLatLngs([start, e.latlng]);

  }


  function onDrawEnd(e) {

    if (!drawing) return;

    drawing = false;
    map.dragging.enable();

    const end = e.latlng;

    if (preview) {
      map.removeLayer(preview);
      preview = null;
    }


    if (!start || !end) return;


    createBattleArrow(
      [start.lat, start.lng],
      [end.lat, end.lng],
      currentArrowMode
    );

  }


  // =====================
  // 🟢 全局箭头创建
  // =====================
  window.createBattleArrow = function(from, to, type) {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      opacity: 1,
      type
    });

    if (arrow) {
      drawnItems.addLayer(arrow);
    }

  };

}
