
// ============================
// 🟢 KML加载（UTF-8修复版）
// ============================
function loadKML(url) {

  fetch(url)
    .then(res => res.arrayBuffer()) // ⭐关键：不用 text()
    .then(buffer => {

      // 🟢 强制UTF-8解码
      const text = new TextDecoder("utf-8").decode(buffer);

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      // 🟢 检查解析错误
      const parseError = xml.getElementsByTagName("parsererror");

      if (parseError.length > 0) {
        console.error("XML Parse Error - check encoding");
        return;
      }

      const placemarks = xml.getElementsByTagName("Placemark");

      for (let p of placemarks) {

        const coordsNode = p.getElementsByTagName("coordinates")[0];

        if (!coordsNode) continue;

        let raw = coordsNode.textContent;

        // 🟢 清理乱码/不可见字符
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

        layer.addTo(map);

        // 🟢 永远置顶
        layer.bringToFront();

        kmlLayerGroup.addLayer(layer);
      }

      // 🟢 自动缩放
      if (kmlLayerGroup.getLayers().length > 0) {
        map.fitBounds(kmlLayerGroup.getBounds());
      }

    })
    .catch(err => {
      console.error("KML load failed:", err);
    });
}
