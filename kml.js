function loadKML(){

  fetch("kml/frontline.kml")
    .then(r=>r.text())
    .then(xmlText=>{

      const xml = new DOMParser()
        .parseFromString(xmlText,"text/xml");

      const coords = xml.getElementsByTagName("coordinates");

      for(let c of coords){

        const pts = c.textContent.trim().split(" ");

        const latlngs = pts.map(p=>{
          const [lng,lat]=p.split(",");
          return [parseFloat(lat),parseFloat(lng)];
        });

        L.polyline(latlngs,{
          color:"yellow"
        }).addTo(map);
      }

    });

}
