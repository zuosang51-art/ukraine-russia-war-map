let map;
let layers = {};

function initMap() {

  layers.topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  );

  layers.sat = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  );

  layers.street = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
  );

  map = L.map("map", {
    center: [48.5, 37.7],
    zoom: 6,
    layers: [layers.topo]
  });

  layers.topo.addTo(map);
}

function switchLayer(type) {
  Object.values(layers).forEach(l => map.removeLayer(l));
  layers[type].addTo(map);
}
