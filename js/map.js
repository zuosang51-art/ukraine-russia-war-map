document.addEventListener("GIS_READY",()=>{

  L.control.layers({
    "Base": GIS.layers.base
  }).addTo(GIS.map);

});
