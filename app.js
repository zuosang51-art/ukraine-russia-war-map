document.addEventListener(
"DOMContentLoaded",
()=>{


    initMap();



    setTimeout(()=>{


        if(typeof initDraw==="function"){

            initDraw();

        }



    },300);



});
