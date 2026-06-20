// =========================
// 🟢 GLOBAL MAP CORE（稳定版）
// =========================

let map;

let topoLayer;
let satLayer;
let streetLayer;

// 🟢 必须挂全局（防 kml.js 先执行）
window.kmlLayerGroup = window.kmlLayerGroup || null;


function initMap(){

    console.log("Map start");

    // =====================
    // 🟢 防重复初始化（增强版）
    // =====================
    if (window.__MAP_INITED__) {
        console.warn("Map already initialized");
        return;
    }

    window.__MAP_INITED__ = true;



    // =====================
    // 🟢 创建地图
    // =====================
    map = L.map("map",{

        zoomControl:true,
        preferCanvas:true

    });

    window.map = map;



    map.setView([48.5,37.7], 6);



    // =====================
    // 🟢 瓦片层
    // =====================

    topoLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        { maxZoom:18 }
    );


    satLayer = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    );


    streetLayer = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    );



    topoLayer.addTo(map);



    // =====================
    // 🟢 图层控制
    // =====================
    L.control.layers(
        {
            "地形": topoLayer,
            "卫星": satLayer,
            "城镇": streetLayer
        }
    ).addTo(map);



    // =====================
    // 🟢 KML层（最高层修复）
    // =====================

    if (!window.kmlLayerGroup) {
        window.kmlLayerGroup = L.layerGroup();
    }

    kmlLayerGroup = window.kmlLayerGroup;

    kmlLayerGroup.addTo(map);

    // 🟢 强制创建 overlay pane（防遮挡）
    map.createPane("kmlPane");
    map.getPane("kmlPane").style.zIndex = 650;



    // =====================
    // 🟢 修复渲染
    // =====================
    setTimeout(()=>{

        map.invalidateSize();

        console.log("Map ready");

    },500);



    // =====================
    // 🟢 对外暴露
    // =====================
    window.map = map;

}
