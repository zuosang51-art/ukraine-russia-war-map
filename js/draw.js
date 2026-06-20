let drawnItems = new L.FeatureGroup();
let currentLayer = null;

const defaultStyle = {
  color: "#ff3b30",
  weight: 3,
  dashArray: "0"
};

function applyStyle(layer, style) {
  layer.setStyle({
    color: style.color,
    weight: style.weight,
    dashArray: style.dashArray,
    opacity: 1
  });

  layer._styleConfig = style;
}

function initDraw() {

  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polygon: true,
      polyline: true,
      rectangle: true,
      marker: true,
      circle: false,
      circlemarker: false
    }
  });

  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;

    // 🎨 自动分配颜色（增强版）
    const color = getColorByIndex(drawnItems.getLayers().length);

    applyStyle(layer, {
      color: color,
      weight: 3,
      dashArray: "0"
    });

    drawnItems.addLayer(layer);

    // 📏 面积
    if (layer instanceof L.Polygon) {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      layer.bindPopup("Area: " + (area / 1000000).toFixed(2) + " km²");
    }

    layer.bindPopup("Click to edit style");

    // 🎛 点击编辑样式
    layer.on("click", function () {
      openStylePanel(layer);
    });
  });
}
