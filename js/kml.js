
// ============================
// 🟢 GitHub KML加载器
// ============================
function loadKML(url) {

  fetch(url)
    .then(res => res.text())
    .then(text => {

      const xml = new DOMParser().parseFromString(text, "text/xml");

      const placemarks = xml.getElementsByTagName("Placemark");

      for (let p of placemarks) {

        const coordsNode = p.getElementsByTagName("coordinates")[0];

        if (!coordsNode) continue;

        const raw = coordsNode.textContent.trim();

        const points = raw.split(/\s+/).map(c => {

          const [lng, lat] = c.split(",").map(Number);
          return [lat, lng];
        });

        if (points.length < 2) return;

        const layer = L.polyline(points, {
          color: "yellow",
          weight: 3
        });

        layer.addTo(map);

        // 🟢 永远置顶
        layer.bringToFront();

        kmlLayerGroup.addLayer(layer);
      }

      // 🟢 自动缩放到KML
      map.fitBounds(kmlLayerGroup.getBounds());
    })
    .catch(err => {
      console.error("KML load failed:", err);
    });
}
