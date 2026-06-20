window.GIS = {
  ready: false,
  map: null,
  layers: {}
};

function GIS_START() {

  console.log("GIS BOOT");

  const map = L.map("map", {
    zoomControl: true,
    preferCanvas: true
  });

  map.setView([48.5, 37.7], 6);

  GIS.map = map;
  window.map = map;

  // 地图层
  GIS.layers.topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  GIS.layers.sat = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  );

  GIS.layers.street = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
  );

  // KML层（最高）
  GIS.layers.kml = L.layerGroup().addTo(map);
  window.kmlLayerGroup = GIS.layers.kml;

  GIS.ready = true;

  console.log("GIS READY");

  document.dispatchEvent(new Event("GIS_READY"));
}
