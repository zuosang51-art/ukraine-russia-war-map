
let map;
let kmlLayerGroup;

function initMap() {

  map = L.map("map").setView([48.5, 37.7], 6);

  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png").addTo(map);

  // 🟢 KML顶层
  kmlLayerGroup = L.layerGroup().addTo(map);

  // 🟢 强制最高层级
  kmlLayerGroup.setZIndex = function () {
    return this;
  };
}
