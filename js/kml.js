

function loadKMLFromURL(url) {

  fetch(url)
    .then(res => res.text())
    .then(text => {

      const xml = new DOMParser().parseFromString(text, "text/xml");

      const placemarks = xml.getElementsByTagName("Placemark");

      for (let p of placemarks) {

        const coords = p.getElementsByTagName("coordinates")[0]?.textContent;

        if (!coords) continue;

        const points = coords.trim().split(/\s+/).map(c => {
          const [lng, lat] = c.split(",").map(Number);
          return [lat, lng];
        });

        const layer = L.polyline(points, {
          color: "yellow",
          weight: 3
        }).addTo(map);

        kmlLayerGroup.addLayer(layer);

        layer.bringToFront();
      }
    });
}
