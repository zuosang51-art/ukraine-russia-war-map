
let map;

// 🟢 KML 永久图层（最高层）
let kmlLayerGroup = L.layerGroup();

function initMap() {

  map = L.map("map").setView([48.5, 37.7], 6);

  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 18
  }).addTo(map);

  // 🟢 KML层（始终最高）
  kmlLayerGroup.addTo(map);
  kmlLayerGroup.setZIndex(99999);
}
