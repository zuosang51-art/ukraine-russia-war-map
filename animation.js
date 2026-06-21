function toggleAnim(){
  GIS.anim = !GIS.anim;
  alert("Animation: " + GIS.anim);
}

function animateLine(line){

  let i=0;

  const interval=setInterval(()=>{

    if(!GIS.anim){
      clearInterval(interval);
      return;
    }

    i++;

    if(i>line.length){
      clearInterval(interval);
    }

  },100);
}
