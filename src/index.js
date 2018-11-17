
var can = document.querySelector('canvas');
var ctx = can.getContext('2d');
var where = './assets/images/robowalk/';
var assets = [
    'robowalk00.png', 'robowalk01.png', 'robowalk02.png',
    'robowalk03.png', 'robowalk04.png', 'robowalk05.png',
    'robowalk06.png', 'robowalk07.png', 'robowalk08.png',
    'robowalk09.png', 'robowalk10.png', 'robowalk11.png',
    'robowalk12.png', 'robowalk13.png', 'robowalk14.png',
    'robowalk15.png', 'robowalk16.png', 'robowalk17.png',
    'robowalk18.png'
];
var images = [];
var frameRate = 1000 / 30;
var frameTime = 0;
var frame = 0;
var timestamp = 0, timeOfLastUpdate = 0, dt = 0;

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

function update() {
    frameTime += dt;
    if (frameTime > frameRate) {
        frame = (frame + 1) % images.length;
        frameTime = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.drawImage(images[frame], 50, 50);
}

async function main() {
    makeAlwaysCanvasFullscreen();
    var promises = [];
    for(var filename of assets) {
        promises.push(loadImage(where + filename));
    }
    images = await Promise.all(promises);
    // mainloop
    function go() {
        timestamp = performance.now();
        dt = timestamp - timeOfLastUpdate;
        timeOfLastUpdate = timestamp;
        update();
        draw();
        requestAnimationFrame(go);
    }
    timeOfLastUpdate = performance.now();
    requestAnimationFrame(go);
}

main();
