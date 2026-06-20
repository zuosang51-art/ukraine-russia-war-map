let labelMode = false;


function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}


function setArrowMode(mode) {
  window.currentArrowMode = mode;
}


// =========================
// 🟢 标注模式（安全版）
// =========================
function enableLabelMode() {

  if (!window.map) {
    console.error("Map not ready");
    return;
  }

  if (labelMode) {
    console.warn("Label mode already active");
    return;
  }

  labelMode = true;

  alert("Click map to add label");

  const onClick = function(e) {

    const text = prompt("Enter label text:");

    if (!text) {
      labelMode = false;
      map.off("click", onClick);
      return;
    }

    const label = L.marker(e.latlng, {
      icon: L.divIcon({
        className: "custom-label",
        html: `<div class="label-box">${text}</div>`
      }),
      interactive: false
    });

    label.addTo(map);

    labelMode = false;

    map.off("click", onClick);

  };

  map.on("click", onClick);
}
