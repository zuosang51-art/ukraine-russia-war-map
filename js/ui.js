document.addEventListener("GIS_READY",()=>{

  window.enableLabelMode = function(){

    const text = prompt("Label:");
    if(!text) return;

    GIS.map.on("click", function handler(e){

      L.marker(e.latlng,{
        icon:L.divIcon({
          className:"",
          html:"<div style='color:#0ff;background:#000a;padding:2px;border:1px solid #0ff'>"+text+"</div>"
        })
      }).addTo(GIS.map);

      GIS.map.off("click", handler);

    });

  };

});
