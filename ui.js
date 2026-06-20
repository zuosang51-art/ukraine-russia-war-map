function setMode(m){
  GIS.mode=m;
}

function toggleLabel(){
  GIS.map.once("click",e=>{
    const text=prompt("Label:");
    if(!text)return;

    L.marker(e.latlng,{
      icon:L.divIcon({
        html:`<div style="
          background:#000a;
          color:#0ff;
          border:1px solid #0ff;
          padding:2px;
        ">${text}</div>`
      })
    }).addTo(GIS.map);
  });
}
