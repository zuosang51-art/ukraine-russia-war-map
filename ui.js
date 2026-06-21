function setMode(m){
  GIS.mode=m;
}

function clearAll(){
  GIS.map.eachLayer(l=>{
    if(l instanceof L.Polyline || l instanceof L.Polygon){
      GIS.map.removeLayer(l);
    }
  });
}
