let map;
let layers = {};

function initMap() {

  layers.topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png");
  layers.sat = L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}");
  layers.street = L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}");

  map = L.map("map", {
    center: [48.5, 37.7],
    zoom: 6,
    layers: [layers.topo]
  });

  layers.topo.addTo(map);

  // 🟢 右上角图层控制
  const LayerControl = L.Control.extend({
    options: { position: "topright" },

    onAdd: function () {
      const div = L.DomUtil.create("div", "layer-box");

      div.innerHTML = `
        <button id="t">Topo</button>
        <button id="s">Sat</button>
        <button id="st">Street</button>
      `;

      L.DomEvent.disableClickPropagation(div);
      return div;
    }
  });

  map.addControl(new LayerControl());

  setTimeout(() => {
    document.getElementById("t").onclick = () => switchLayer("topo");
    document.getElementById("s").onclick = () => switchLayer("sat");
    document.getElementById("st").onclick = () => switchLayer("street");
  }, 100);
}

function switchLayer(type) {
  Object.values(layers).forEach(l => map.removeLayer(l));
  layers[type].addTo(map);
}
