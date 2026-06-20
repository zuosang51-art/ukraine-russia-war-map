const COLOR_SYSTEM = {
  red:    ["#ffebee","#ffcdd2","#ef9a9a","#e57373","#f44336","#d32f2f"],
  orange: ["#fff3e0","#ffe0b2","#ffcc80","#ffb74d","#ff9800","#f57c00"],
  yellow: ["#fffde7","#fff9c4","#fff59d","#fff176","#ffeb3b","#fbc02d"],
  green:  ["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#4caf50","#2e7d32"],
  cyan:   ["#e0f7fa","#b2ebf2","#80deea","#4dd0e1","#00bcd4","#00838f"],
  blue:   ["#e3f2fd","#bbdefb","#90caf9","#64b5f6","#2196f3","#1565c0"],
  purple: ["#f3e5f5","#e1bee7","#ce93d8","#ba68c8","#9c27b0","#6a1b9a"],
  brown:  ["#efebe9","#d7ccc8","#bcaaa4","#a1887f","#795548","#4e342e"],
  gray:   ["#fafafa","#eeeeee","#e0e0e0","#bdbdbd","#757575","#424242"],
  black:  ["#000000","#0a0a0a","#121212","#1a1a1a","#222222","#2b2b2b"],
  white:  ["#ffffff","#fefefe","#f8f8f8","#f2f2f2","#eaeaea","#dddddd"]
};

// 扁平颜色池
const FLAT_COLORS = Object.values(COLOR_SYSTEM).flat();

// 战术配色规则
const COLOR_RULES = {
  attack: COLOR_SYSTEM.red,
  defense: COLOR_SYSTEM.blue,
  advance: COLOR_SYSTEM.orange,
  control: COLOR_SYSTEM.green,
  neutral: COLOR_SYSTEM.gray,
  encircle: COLOR_SYSTEM.purple,
  unknown: COLOR_SYSTEM.yellow
};

function getColorByIndex(i) {
  return FLAT_COLORS[i % FLAT_COLORS.length];
}

function getColorByType(type, index = 0) {
  const group = COLOR_RULES[type] || FLAT_COLORS;
  return group[index % group.length];
}
