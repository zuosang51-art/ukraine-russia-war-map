function loadKML(){

  fetch("kml/frontline.kml")
    .then(r=>r.text())
    .then(t=>{

      const xml=new DOMParser().parseFromString(t,"text/xml");

      const coords=xml.getElementsByTagName("coordinates");

      for(let c of coords){

        const pts=c.textContent.trim().split(" ");

        const latlngs=pts.map(p=>{
          const [lng,lat]=p.split(",");
          return [lat,lng];
        });

        L.polyline(latlngs,{
          color:"yellow",
          weight:2
        }).addTo(GIS.map);
      }

    });
}
