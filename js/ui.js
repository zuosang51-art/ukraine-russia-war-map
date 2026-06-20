let currentLayer = null;

function openStylePanel(layer) {

  currentLayer = layer;

  const s = layer._styleConfig || {
    color: "#ff3b30",
    weight: 3,
    opacity: 1,
    dashArray: "0"
  };

  document.getElementById("panel").innerHTML = `
    <h3>Style Editor</h3>

    <label>Color</label>
    <input type="color" id="color" value="${s.color}">

    <label>Weight</label>
    <input type="range" id="weight" min="1" max="10" value="${s.weight}">

    <label>Opacity</label>
    <input type="range" id="opacity" min="0.1" max="1" step="0.1" value="${s.opacity}">

    <label>Type</label>
    <select id="dash">
      <option value="0">Solid</option>
      <option value="10,10">Dashed</option>
      <option value="15,5,2,5">Dash-Dot</option>
    </select>

    <button onclick="applyLayerStyle()">Apply</button>
  `;

  document.getElementById("dash").value = s.dashArray;
}

function applyLayerStyle() {

  if (!currentLayer) return;

  const style = {
    color: document.getElementById("color").value,
    weight: +document.getElementById("weight").value,
    opacity: +document.getElementById("opacity").value,
    dashArray: document.getElementById("dash").value
  };

  currentLayer.setStyle(style);
  currentLayer._styleConfig = style;
}
