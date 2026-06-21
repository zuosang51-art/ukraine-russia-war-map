let map;
let mode = "line";
let start = null;
let colorIndex = 0;

const colors = [
 "#ff0000","#ff4d4d","#ff7a00","#ffb347","#ffff00",
 "#00ff00","#00ffff","#0000ff","#8000ff","#ffffff"
];

// =========================
// 🟢 INIT MAP
// =========================
window.onload = function(){

  map = L.map("map").setView([48.5,37.7],6);

  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const sat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );

  const topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  );

  L.control.layers({
    "OSM":osm,
    "Satellite":sat,
    "Topo":topo
  }).addTo(map);

  bindEvents();
};

// =========================
// 🟢 事件绑定
// =========================
function bindEvents(){

  map.on("mousedown",e=>{
    start = e.latlng;
  });

  map.on("mouseup",e=>{
    if(!start)return;

    const end = e.latlng;

    draw(start,end);

    start=null;
  });
}

// =========================
// 🟢 绘制核心
// =========================
function draw(a,b){

  const color = colors[colorIndex++ % colors.length];

  if(mode==="line"){
    L.polyline([a,b],{color}).addTo(map);
  }

  if(mode==="dash"){
    L.polyline([a,b],{
      color,
      dashArray:"6 6"
    }).addTo(map);
  }

  if(mode==="arrow"){
    drawArrow(a,b,color);
  }

  if(mode==="arc"){
    const mid = {
      lat:(a.lat+b.lat)/2 + 0.2,
      lng:(a.lng+b.lng)/2
    };

    const curve = bezier(a,mid,b);

    L.polyline(curve,{color}).addTo(map);
  }
}

// =========================
// 🟢 弧线
// =========================
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

// =========================
// 🟢 箭头（稳定版）
// =========================
function drawArrow(a,b,color){

  const dx=b.lng-a.lng;
  const dy=b.lat-a.lat;

  const len=Math.sqrt(dx*dx+dy*dy);
  if(len===0)return;

  const ux=dx/len;
  const uy=dy/len;

  const px=-uy*0.3;
  const py=ux*0.3;

  L.polyline([a,b],{color}).addTo(map);

  L.polygon([
    [b.lat,b.lng],
    [b.lat-ux*0.4+px,b.lng-uy*0.4+py],
    [b.lat-ux*0.8,b.lng-uy*0.8],
    [b.lat-ux*0.4-px,b.lng-uy*0.4-py]
  ],{
    color,
    fillColor:color,
    fillOpacity:0.7
  }).addTo(map);
}

// =========================
// 🟢 MODE
// =========================
function setMode(m){
  mode=m;
}
