let drawnItems = new L.FeatureGroup();
let currentLayer = null;

// 默认样式
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
    edit: {
      featureGroup: drawnItems
    },
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

    applyStyle(layer, defaultStyle);

    drawnItems.addLayer(layer);

    // 面积计算
    if (layer instanceof L.Polygon) {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      layer.bindPopup("Area: " + (area / 1000000).toFixed(2) + " km²");
    }

    layer.bindPopup("Click to edit style");

    layer.on("click", function () {
      openStylePanel(layer);
    });
  });
}
