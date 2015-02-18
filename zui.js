var tx=0, ty=0,
  sx=innerWidth/2,
  sy=innerHeight/2,
  mx=innerWidth/2,
  my=innerHeight/2;

var eps = 0.1;
var y0 = 0, x0 = 0, x1 = innerWidth, y1 = innerHeight;
var tar;

document.onmousewheel=function(a){
  var s = Math.exp(a.wheelDelta / 500)
  
  x0 = (x0 - mx) * s + mx
  x1 = (x1 - mx) * s + mx

  y0 = (y0 - my) * s + my
  y1 = (y1 - my) * s + my

  var scale = (y1-y0)/innerHeight;
  if(scale < eps) history.go(-1);

  showTransform();
  a.preventDefault()
};
window.onpopstate=function(a){
  loadPage(a.state.url)
};
function showTransform(){
  var s = (y1-y0)/innerHeight; // same as (x1-x0)/innerWidth

  document.body.style.webkitTransform="scale("+s+") translate("+x0/s+"px,"+y0/s+"px)";
  document.body.style.webkitTransformOrigin = "0 0";
  document.body.style.overflow = 'hidden'
  
  if(tar && tar.nodeName == 'A' && 1/s < eps){
    // console.log("clicky");
    loadPage(tar.href);
    history.pushState({url:tar.href},tar.href,tar.href)
  }

} 
function loadPage(a){
  var b=new XMLHttpRequest;
  b.open("get",a,true);
  document.body.innerHTML=''
  b.onload=function(){
    document.body.innerHTML=b.responseText;
    resetParameters()
    showTransform()
  };
  b.send(null);
  resetParameters()
  showTransform()
}
var dragging=false;
document.onmousemove=function(a){
  mx = a.pageX
  my = a.pageY
  tar = a.target;

  if(dragging){
    var s = (y1-y0)/innerHeight;
    var dx = (sx-a.pageX),
      dy = (sy-a.pageY);

    x0-=dx;
    x1-=dx;
    y0-=dy;
    y1-=dy;
    sx=a.pageX;
    sy=a.pageY;
    showTransform();
    a.preventDefault();
    a.stopPropagation()
  }
}; 

function resetParameters(){
  tx=0;
  ty=0;
  sx=innerWidth/2;
  sy=innerHeight/2;
  y0 = 0, x0 = 0, 
  x1 = innerWidth;
  y1 = innerHeight;
  showTransform()
}
window.onresize = function(){
  resetParameters()
}
document.onmousedown=function(a){
  dragging=true;
  sx=a.pageX;
  sy=a.pageY;
  a.preventDefault()
};
document.onclick=function(a){
  a.preventDefault()
};
document.onmouseup=function(a){
  dragging=false;
  a.preventDefault()
};