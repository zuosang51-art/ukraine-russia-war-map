function initDraw(){

  const map = GIS.map;

  const drawControl = new L.Control.Draw({
    edit:{featureGroup:GIS.drawn},
    draw:{
      polygon:true,
      rectangle:true,
      polyline:true,
      marker:true
    }
  });

  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED,(e)=>{
    const layer = e.layer;

    layer.setStyle?.({
      color:GIS.style.color,
      weight:GIS.style.width,
      opacity:GIS.style.opacity,
      fillOpacity:0.3
    });

    GIS.drawn.addLayer(layer);
  });

  let start=null;

  map.on("mousedown",e=>start=e.latlng);

  map.on("mouseup",e=>{
    if(!start)return;

    if(GIS.mode==="arrow"){
      drawArrow(start,e.latlng);
    }

    start=null;
  });
}
