let currentArrowMode = "line";
let drawing = false;
let startPoint = null;
let tempLine = null;

// =========================
// 折叠功能
// =========================
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

// =========================
// 设置模式
// =========================
function setArrowMode(mode) {
  currentArrowMode = mode;
}

// =========================
// 地图事件（核心重写）
// =========================
function enableArrowDrawing() {

  map.on("mousedown", function (e) {

    drawing = true;
    startPoint = e.latlng;

    tempLine = L.polyline([startPoint, startPoint], {
      color: "#00ffe5",
      dashArray: "5,5"
    }).addTo(map);
  });

  map.on("mousemove", function (e) {

    if (!drawing || !tempLine) return;

    tempLine.setLatLngs([startPoint, e.latlng]);
  });

  map.on("mouseup", function (e) {

    if (!drawing) return;

    drawing = false;

    const end = e.latlng;

    map.removeLayer(tempLine);
    tempLine = null;

    createBattleArrow(
      [startPoint.lat, startPoint.lng],
      [end.lat, end.lng],
      currentArrowMode
    );
  });
}
