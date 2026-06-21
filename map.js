function initMap(){

  const map = L.map("map").setView([48.5,37.7],6);

  GIS.map = map;

  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const sat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );

  const topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  );

  L.control.layers({
    "OSM":osm,
    "SAT":sat,
    "TOPO":topo
  }).addTo(map);

  bindEvents();
}
