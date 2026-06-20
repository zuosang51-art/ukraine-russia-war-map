let drawnItems = new L.FeatureGroup();

function initDraw() {
  map.addLayer(drawnItems);

  // 🟢 开启箭头绘制模式
  enableArrowDrawing();

  window.createBattleArrow = function(from, to, type) {

    const color = getColorByIndex(drawnItems.getLayers().length);

    const arrow = createArrow(map, from, to, {
      color,
      weight: 3,
      opacity: 1,
      dashArray: "0",
      type: type
    });

    drawnItems.addLayer(arrow);

    return arrow;
  };
}
