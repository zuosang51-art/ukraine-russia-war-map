document.addEventListener("GIS_READY", () => {

  console.log("map module ready");

  L.control.layers(
    {
      "Topographic": GIS.layers.topo,
      "Satellite": GIS.layers.sat,
      "Street": GIS.layers.street
    }
  ).addTo(GIS.map);

});
