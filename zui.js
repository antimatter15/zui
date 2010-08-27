var scale=1;
var tx = innerWidth/2, ty = innerHeight/2;
var sx = innerWidth/2, sy = innerHeight/2;

document.onmousewheel = function(e){
  if(e.wheelDelta){
    if(e.wheelDelta > 0) scale *= e.wheelDelta/100;
    if(e.wheelDelta < 0) scale /= (-e.wheelDelta/100);
  }
  if(scale < 0.05){
    //loadPage(historystack);
    history.go(-1);
  }
  
  showTransform();
  e.preventDefault();
}


window.onpopstate = function(e){
  loadPage(e.state.url);
}

function showTransform(){
  document.body.style.webkitTransform='scale('+scale+') translate('+(innerWidth/2-tx)+'px,'+(innerHeight/2-ty)+'px)';
  
  var cel = document.elementFromPoint(innerWidth/2,innerHeight/2);
  var minsize = 0.30;
  if(cel.nodeName == 'A' && cel.offsetWidth * scale > minsize  * innerWidth &&
  cel.offsetHeight * scale > minsize * innerHeight){
    console.log('clicky');
    loadPage(cel.href);
    history.pushState({url: cel.href}, cel.href, cel.href);
  }
}


function loadPage(href){
  var xhr = new XMLHttpRequest();
  xhr.open('get', href, true);
  xhr.onload = function(){
    document.body.innerHTML = xhr.responseText;
    showTransform();
  }
  xhr.send(null);
  scale = 1;
  tx = innerWidth/2;
  ty = innerHeight/2;
  sx = innerWidth/2; 
  sy = innerHeight/2;
  showTransform();
}

var dragging = false;
document.onmousemove=function(e){
  if(dragging){
    tx += (sx - e.pageX) / scale;
    ty += (sy - e.pageY) / scale;
    sx = e.pageX;
    sy = e.pageY;
    showTransform();
    e.preventDefault();
    e.stopPropagation();
  }
}

document.onmousedown = function(e){
  dragging = true;
  sx = e.pageX;
  sy = e.pageY;
  e.preventDefault();
}

document.onclick = function(e){
  e.preventDefault();
}

document.onmouseup = function(e){
  dragging = false;
  e.preventDefault();
}
