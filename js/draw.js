let drawnItems = new L.FeatureGroup();

function initDraw() {

  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polygon: true,
      polyline: true,
      rectangle: true,
      circle: false,
      marker: true,
      circlemarker: false
    }
  });

  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {

    const layer = e.layer;
    drawnItems.addLayer(layer);

    // 面积计算
    if (layer instanceof L.Polygon) {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      layer.bindPopup("Area: " + (area / 1000000).toFixed(2) + " km²");
    }

    // 标签编辑
    layer.bindPopup(`
      <div class="popup">
        <b>战线标记</b><br>
        可插入图片 / 视频<br>
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" width="150"/>
      </div>
    `);
  });
}
