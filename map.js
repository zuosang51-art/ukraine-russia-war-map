window.onload = function(){

  const map = L.map("map").setView([48.5,37.7],6);

  GIS.map = map;

  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  );

  const sat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );

  L.control.layers({
    "OSM":osm,
    "Topo":topo,
    "Satellite":sat
  }).addTo(map);

  GIS.drawn = new L.FeatureGroup();
  map.addLayer(GIS.drawn);

  initDraw();
};
