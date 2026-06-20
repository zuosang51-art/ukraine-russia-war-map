
let map;

// 🟢 KML 永久顶层
let kmlLayerGroup = L.layerGroup();

function initMap() {

  map = L.map("map").setView([48.5, 37.7], 6);

  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png").addTo(map);

  // 🟢 KML层（永远在最上层）
  kmlLayerGroup.addTo(map);
  kmlLayerGroup.setZIndex(99999);
}
