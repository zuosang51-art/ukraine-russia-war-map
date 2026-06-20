let drawMode = "line";

function setDraw(m){
  drawMode = m;
}

// 面积/多边形
function initDraw(){

  const drawControl = new L.Control.Draw({
    edit:{featureGroup:drawnItems},
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
      color:"#00ffe5",
      fillOpacity:0.3
    });

    drawnItems.addLayer(layer);

  });

  // 箭头绘制
  let start=null;

  map.on("mousedown",(e)=>start=e.latlng);

  map.on("mouseup",(e)=>{
    if(!start)return;
    createArrow(start,e.latlng);
    start=null;
  });
}
