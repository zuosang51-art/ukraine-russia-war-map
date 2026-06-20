document.addEventListener(
"DOMContentLoaded",
function(){

    console.log("APP LOAD");

    // 🟢 防止 Leaflet 初始化冲突
    if(typeof initMap !== "function"){
        console.error("initMap not found - map.js failed to load");
        return;
    }

    // 🟢 防止重复初始化
    if(window.__MAP_INITED__){
        console.warn("Map already initialized");
        return;
    }

    window.__MAP_INITED__ = true;

    // 🟢 初始化地图
    initMap();


    // 🟢 延迟初始化附加功能（避免 map 未 ready）
    setTimeout(()=>{

        if(typeof initDraw === "function"){
            initDraw();
        }

        if(typeof initUI === "function"){
            initUI?.();
        }

        if(typeof initArrow === "function"){
            initArrow?.();
        }

    },300);

});
