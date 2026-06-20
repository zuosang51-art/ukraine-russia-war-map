
// =========================
// 🟢 KML加载器
// =========================
document.getElementById("kmlInput").addEventListener("change", function(e) {

  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {

    const parser = new DOMParser();
    const xml = parser.parseFromString(evt.target.result, "text/xml");

    const placemarks = xml.getElementsByTagName("Placemark");

    for (let p of placemarks) {

      const coords = p.getElementsByTagName("coordinates")[0]?.textContent;

      if (!coords) continue;

      const points = coords.trim().split(" ").map(c => {
        const [lng, lat] = c.split(",");
        return [parseFloat(lat), parseFloat(lng)];
      });

      // 🟢 永久最高层
      const layer = L.polyline(points, {
        color: "yellow",
        weight: 3
      });

      layer.addTo(map);
      layer.bringToFront(); // ⭐关键：永远置顶

      kmlLayerGroup.addLayer(layer);
    }
  };

  reader.readAsText(file);
});
