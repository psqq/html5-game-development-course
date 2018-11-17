
var can = document.querySelector('canvas');
var ctx = can.getContext('2d');

function setFullscreenSizeForCanvas() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}

function makeAlwaysCanvasFullscreen() {
    setFullscreenSizeForCanvas();
    window.addEventListener('resize', setFullscreenSizeForCanvas);
}

makeAlwaysCanvasFullscreen();
