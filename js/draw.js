document.addEventListener("GIS_READY",()=>{

  const drawn = new L.FeatureGroup().addTo(GIS.map);
  
  const control = new L.Control.Draw({
    edit:{featureGroup:drawn},
    draw:{polygon:true,rectangle:true,polyline:true,marker:true}
  });

  GIS.map.addControl(control);

  GIS.map.on(L.Draw.Event.CREATED,(e)=>{
    drawn.addLayer(e.layer);
  });

});
