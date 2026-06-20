function openStylePanel(layer) {

  currentLayer = layer;

  const style = layer._styleConfig || {
    color: "#ff3b30",
    weight: 3,
    dashArray: "0"
  };

  document.getElementById("panel").innerHTML = `
    <h3>Style Editor</h3>

    <label>Color</label>
    <input type="color" id="color" value="${style.color}">

    <label>Width</label>
    <input type="range" id="weight" min="1" max="12" value="${style.weight}">

    <label>Line Type</label>
    <select id="dash">
      <option value="0">Solid</option>
      <option value="10,10">Dashed</option>
      <option value="15,5,2,5">Dash-Dot</option>
    </select>

    <button onclick="applyLayerStyle()">Apply</button>
  `;

  document.getElementById("dash").value = style.dashArray;
}

function applyLayerStyle() {
  if (!currentLayer) return;

  const style = {
    color: document.getElementById("color").value,
    weight: parseInt(document.getElementById("weight").value),
    dashArray: document.getElementById("dash").value
  };

  currentLayer.setStyle(style);
  currentLayer._styleConfig = style;
}
