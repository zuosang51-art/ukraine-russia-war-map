let map;

let layers={};


let kmlLayerGroup;



function initMap(){



    layers.topo =
    L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
        maxZoom:18
    });



    layers.sat =
    L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    );



    layers.street =
    L.tileLayer(
    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    );





    map=L.map(
    "map",
    {

        center:[48.5,37.7],

        zoom:6,

        layers:[
            layers.topo
        ]

    });





    /*
       图层切换
    */


    L.control.layers(

    {

    "Topographic":

    layers.topo,


    "Satellite":

    layers.sat,


    "Street":

    layers.street


    }

    ).addTo(map);





    /*
      KML最高层
    */


    kmlLayerGroup =
    L.layerGroup();


    kmlLayerGroup.addTo(map);





    /*
      修复白屏
    */


    setTimeout(()=>{


        map.invalidateSize();



    },500);



}
