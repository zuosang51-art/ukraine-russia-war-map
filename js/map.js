// =========================
// MAP CORE
// =========================


let map;


let topoLayer;
let satLayer;
let streetLayer;

let kmlLayerGroup;

function initMap(){

    console.log("Map start");

    // 防止重复初始化

    if(map){

        return;

    }
    map = L.map("map",{

        zoomControl:true,

        preferCanvas:true

    });

    map.setView(

        [48.5,37.7],

        6

    );

    // 地形

    topoLayer =
    L.tileLayer(

    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",

    {

    maxZoom:18

    }

    );

    // 卫星

    satLayer =
    L.tileLayer(

    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"

    );

    // 城镇

    streetLayer =
    L.tileLayer(

    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"

    );

    // 默认地形

    topoLayer.addTo(map);

    // 图层按钮

    L.control.layers(

    {

    "地形":

    topoLayer,

    "卫星":

    satLayer,


    "城镇":

    streetLayer

    }

    )

    .addTo(map);

    // KML最高层

    kmlLayerGroup =
    L.layerGroup();


    kmlLayerGroup.addTo(map);


    // 强制刷新

    setTimeout(()=>{


        map.invalidateSize();


        console.log("Map ready");


    },1000);



}
