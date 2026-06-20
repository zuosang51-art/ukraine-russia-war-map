window.GIS = {
  ready:false,
  map:null,
  layers:{}
};

function GIS_START(){

  console.log("BOOT");

  const map = L.map("map").setView([48.5,37.7],6);

  window.map = map;
  GIS.map = map;

  GIS.layers.base = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  GIS.layers.kml = L.layerGroup().addTo(map);
  window.kmlLayerGroup = GIS.layers.kml;

  GIS.ready = true;

  console.log("READY");

  document.dispatchEvent(new Event("GIS_READY"));
}
