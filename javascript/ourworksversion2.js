// our work version 2 rotation
// You can change global variables here:
var radius = 550; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 150; // width of images (unit: px)
var imgHeight = 150; // height of images (unit: px)


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);
// init(1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
// var aVid = ospin.getElementsByTagName('video');
// var aEle = [...aImg, ...aVid]; // combine 2 arrays
var aEle = [...aImg];

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length-1) / 4 + "s";
  }
}


function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}



var sX,sY, nX, desX = 0,
    tX = 0,
    tY = 0;



// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}



// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX;
        // nY = e.clientY;
    desX = nX - sX;
    // desY = nY - sY;
    tX += desX * 0.1;
    // tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    // sY = nY;
  };
};
