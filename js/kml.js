
document.getElementById("kmlInput").addEventListener("change", function(e) {

  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {

    const xml = new DOMParser().parseFromString(evt.target.result, "text/xml");

    const placemarks = xml.getElementsByTagName("Placemark");

    for (let p of placemarks) {

      const coordsNode = p.getElementsByTagName("coordinates")[0];

      if (!coordsNode) continue;

      const raw = coordsNode.textContent.trim();

      const points = raw.split(/\s+/).map(c => {

        const [lng, lat] = c.split(",").map(Number);

        return [lat, lng]; // ✔ Leaflet格式
      });

      if (points.length < 2) continue;

      const layer = L.polyline(points, {
        color: "yellow",
        weight: 3
      });

      layer.addTo(map);

      // ⭐ 强制置顶
      layer.bringToFront();

      kmlLayerGroup.addLayer(layer);
    }

    map.fitBounds(kmlLayerGroup.getBounds());
  };

  reader.readAsText(file);
});
