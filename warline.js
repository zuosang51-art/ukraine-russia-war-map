let start=null;

function bindEvents(){

  GIS.map.on("mousedown",e=>{
    start = e.latlng;
  });

  GIS.map.on("mouseup",e=>{
    if(!start)return;

    const end = e.latlng;

    drawWarLine(start,end);

    start=null;
  });
}

function drawWarLine(a,b){

  const color = colors[GIS.colorIndex++ % colors.length];

  if(GIS.mode==="line"){
    L.polyline([a,b],{color}).addTo(GIS.map);
  }

  if(GIS.mode==="dash"){
    L.polyline([a,b],{
      color,
      dashArray:"6 6"
    }).addTo(GIS.map);
  }

  if(GIS.mode==="arrow"){
    drawArrow(a,b,color);
  }

  if(GIS.mode==="arc"){
    const mid = {
      lat:(a.lat+b.lat)/2 + 0.2,
      lng:(a.lng+b.lng)/2
    };

    const curve = bezier(a,mid,b);

    L.polyline(curve,{color}).addTo(GIS.map);
  }
}

function bezier(p0,p1,p2){

  const pts=[];

  for(let t=0;t<=1;t+=0.05){

    pts.push([
      (1-t)*(1-t)*p0.lat + 2*(1-t)*t*p1.lat + t*t*p2.lat,
      (1-t)*(1-t)*p0.lng + 2*(1-t)*t*p1.lng + t*t*p2.lng
    ]);
  }

  return pts;
}
