let frontlineLayer = null;

// ============================
// 🟢 加载战线底图（GeoJSON）
// ============================
function loadFrontline(url){

  fetch(url)
    .then(r=>r.json())
    .then(data=>{

      if(frontlineLayer){
        map.removeLayer(frontlineLayer);
      }

      frontlineLayer = L.geoJSON(data,{

        style:function(feature){

          return {
            color:"#ff0000",
            weight:2,
            opacity:0.8
          };

        },

        onEachFeature:function(feature,layer){

          if(feature.properties?.name){

            layer.bindPopup(feature.properties.name);

          }

        }

      }).addTo(map);

      frontlineLayer.bringToFront();

    })
    .catch(e=>{
      console.warn("Frontline load failed:",e);
    });
}
