let currentLayer = null;

function openStylePanel(layer) {

  currentLayer = layer;

  const s = layer._styleConfig || {
    color: "#ff3b30",
    weight: 3,
    opacity: 0.8,
    fillOpacity: 0.3,
    fillColor: "#ff3b30"
  };

  document.getElementById("panel").innerHTML = `
    <h3>Style Editor</h3>

    <label>Stroke Color</label>
    <input type="color" id="color" value="${s.color}">

    <label>Fill Color</label>
    <input type="color" id="fillColor" value="${s.fillColor || s.color}">

    <label>Weight</label>
    <input type="range" id="weight" min="1" max="10" value="${s.weight}">

    <label>Stroke Opacity</label>
    <input type="range" id="opacity" min="0.1" max="1" step="0.1" value="${s.opacity}">

    <label>Fill Opacity</label>
    <input type="range" id="fillOpacity" min="0.1" max="1" step="0.1" value="${s.fillOpacity}">

    <button onclick="applyLayerStyle()">Apply</button>
  `;
}

function applyLayerStyle() {

  if (!currentLayer) return;

  const style = {
    color: document.getElementById("color").value,
    fillColor: document.getElementById("fillColor").value,
    weight: +document.getElementById("weight").value,
    opacity: +document.getElementById("opacity").value,
    fillOpacity: +document.getElementById("fillOpacity").value
  };

  currentLayer.setStyle({
    color: style.color,
    weight: style.weight,

    // ⭐关键修复
    opacity: style.opacity,
    fillOpacity: style.fillOpacity,
    fillColor: style.fillColor
  });

  currentLayer._styleConfig = style;
}
