

let labelMode = false;

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function setArrowMode(mode) {
  currentArrowMode = mode;
}

// =========================
// 🟢 标注模式
// =========================
function enableLabelMode() {
  labelMode = true;
  alert("Click map to add label");

  map.once("click", function(e) {

    const text = prompt("Enter label text:");

    if (!text) return;

    L.marker(e.latlng, {
      icon: L.divIcon({
        className: "custom-label",
        html: text
      })
    }).addTo(map);

    labelMode = false;
  });
}
