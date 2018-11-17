
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

function loadImage(filename) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

async function main() {
    makeAlwaysCanvasFullscreen();
    var img = await loadImage('./img/ralphyrobot.png');
    console.log('Image loaded!');
}

main();
