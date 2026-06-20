function createArrow(from,to){

  const dx = to.lng-from.lng;
  const dy = to.lat-from.lat;

  const len = Math.sqrt(dx*dx+dy*dy);

  const ux = dx/len;
  const uy = dy/len;

  const px = -uy*0.3;
  const py = ux*0.3;

  L.polyline([from,to],{color:"red"}).addTo(map);

  L.polygon([
    [to.lat,to.lng],
    [to.lat-ux*0.4+px,to.lng-uy*0.4+py],
    [to.lat-ux*0.8,to.lng-uy*0.8],
    [to.lat-ux*0.4-px,to.lng-uy*0.4-py]
  ],{
    color:"red",
    fillOpacity:0.7
  }).addTo(map);
}
