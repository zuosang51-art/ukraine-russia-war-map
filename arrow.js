function drawArrow(a,b,color){

  const dx=b.lng-a.lng;
  const dy=b.lat-a.lat;

  const len=Math.sqrt(dx*dx+dy*dy);
  if(len===0)return;

  const ux=dx/len;
  const uy=dy/len;

  const px=-uy*0.3;
  const py=ux*0.3;

  L.polyline([a,b],{color}).addTo(GIS.map);

  L.polygon([
    [b.lat,b.lng],
    [b.lat-ux*0.4+px,b.lng-uy*0.4+py],
    [b.lat-ux*0.8,b.lng-uy*0.8],
    [b.lat-ux*0.4-px,b.lng-uy*0.4-py]
  ],{
    color,
    fillColor:color,
    fillOpacity:0.7
  }).addTo(GIS.map);
}
