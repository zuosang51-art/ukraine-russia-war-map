function toggleTool(){
  alert("toolbar toggle placeholder");
}

function addLabel(latlng,text){

  L.marker(latlng,{
    icon:L.divIcon({
      className:"",
      html:`<div style="
        background:black;
        color:#0ff;
        border:1px solid #0ff;
        padding:2px;
      ">${text}</div>`
    })
  }).addTo(map);
}
