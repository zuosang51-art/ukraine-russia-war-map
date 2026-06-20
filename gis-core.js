let map;
let layers = {};
let drawnItems;

function initGIS(){

  map = L.map("map").setView([48.5,37.7],6);

  layers.topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  layers.sat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );

  layers.osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  L.control.layers({
    "Topo":layers.topo,
    "Satellite":layers.sat,
    "OSM":layers.osm
  }).addTo(map);

  drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  window.map = map;
}
