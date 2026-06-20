
let map;

let layers = {};

let kmlLayerGroup = L.layerGroup();

function initMap() {

    console.log("Map Init");

    // 地形图
    layers.topo = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    );

    // 卫星图
    layers.sat = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
            maxZoom: 20
        }
    );

    // 城镇图
    layers.street = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
            maxZoom: 20
        }
    );

    map = L.map("map", {

        center: [48.5, 37.7],

        zoom: 6,

        zoomControl: true

    });

    layers.topo.addTo(map);

    // KML顶层
    kmlLayerGroup.addTo(map);

    // 右上角图层切换
    const LayerControl = L.Control.extend({

        options: {
            position: "topright"
        },

        onAdd() {

            const div = L.DomUtil.create(
                "div",
                "layer-box"
            );

            div.innerHTML = `
                <button id="btnTopo">Topo</button>
                <button id="btnSat">Sat</button>
                <button id="btnStreet">Street</button>
            `;

            L.DomEvent.disableClickPropagation(div);

            return div;
        }

    });

    map.addControl(new LayerControl());

    setTimeout(() => {

        document.getElementById("btnTopo").onclick = () => switchLayer("topo");

        document.getElementById("btnSat").onclick = () => switchLayer("sat");

        document.getElementById("btnStreet").onclick = () => switchLayer("street");

    }, 100);

    // 强制刷新地图尺寸
    setTimeout(() => {

        map.invalidateSize();

    }, 500);

    setTimeout(() => {

        map.invalidateSize();

    }, 1000);

    console.log("Map Ready");
}

function switchLayer(type) {

    Object.values(layers).forEach(layer => {

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }

    });

    layers[type].addTo(map);
}
