// ============================
// 🟢 安全KML加载系统
// ============================
function loadKML(url) {

  if (!map) {
    console.error("Map not ready");
    return;
  }

  if (!window.kmlLayerGroup) {
    window.kmlLayerGroup = L.layerGroup().addTo(map);
  }

  fetch(url)
    .then(res => res.arrayBuffer())
    .then(buffer => {

      const text = new TextDecoder("utf-8").decode(buffer);

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const parseError = xml.getElementsByTagName("parsererror");

      if (parseError.length > 0) {
        console.error("KML parse error");
        return;
      }

      const placemarks = xml.getElementsByTagName("Placemark");

      if (!placemarks || placemarks.length === 0) {
        console.warn("Empty KML");
        return;
      }

      let allLayers = [];

      for (let p of placemarks) {

        const coordsNode = p.getElementsByTagName("coordinates")[0];

        if (!coordsNode) continue;

        let raw = coordsNode.textContent;

        raw = raw
          .replace(/^\s+|\s+$/g, "")
          .replace(/\n/g, " ")
          .replace(/\r/g, " ");

        const points = raw.split(/\s+/).map(c => {

          const parts = c.split(",");

          if (parts.length < 2) return null;

          const lng = parseFloat(parts[0]);
          const lat = parseFloat(parts[1]);

          if (isNaN(lat) || isNaN(lng)) return null;

          return [lat, lng];
        }).filter(Boolean);

        if (points.length < 2) continue;

        const layer = L.polyline(points, {

          color: "yellow",
          weight: 3,
          opacity: 0.9

        });

        // ❗只加入 group，不直接 addTo(map)
        kmlLayerGroup.addLayer(layer);

        allLayers.push(layer);
      }

      // 🟢 强制最高层
      kmlLayerGroup.bringToFront();

      // 🟢 安全缩放
      try {
        if (allLayers.length > 0) {
          const group = L.featureGroup(allLayers);
          map.fitBounds(group.getBounds());
        }
      } catch (e) {
        console.warn("fitBounds skipped:", e);
      }

      console.log("KML loaded:", allLayers.length);

    })
    .catch(err => {
      console.error("KML load failed:", err);
    });
}
