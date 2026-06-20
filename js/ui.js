
let currentArrowMode = "line";

function toggleSidebar() {

  const el = document.getElementById("sidebar");

  if (el.classList.contains("expanded")) {
    el.classList.remove("expanded");
    el.classList.add("collapsed");
  } else {
    el.classList.remove("collapsed");
    el.classList.add("expanded");
  }
}

function setArrowMode(mode) {
  currentArrowMode = mode;
}
