import TexturepackerParser from './texturepacker-parser';
import {
    canvas as can,
    context as ctx,
    makeAlwaysCanvasFullscreen
} from './canvas';
import { loadAllImages } from './images';
import Animation from './animation';
import TiledMap from './tiled-map';
import key from 'keymaster';
import Victor from 'victor';
import * as viewRect from './view-rect';

var timestamp = 0, timeOfLastUpdate = 0, dt = 0;

var cam = { x: 0, y: 0, scale: 1, speed: 1 };

var spriteSheets = {};

var robowalkAnimation = new Animation({
    images: Array(19).fill("robowalk/robowalk")
        .map((x, i) => x + ("" + i).padStart(2, '0') + '.png')
});

var map = new TiledMap('./assets/json/map.json');

function update() {
    robowalkAnimation.update(dt);
    var dir = new Victor(0, 0);
    if (key.isPressed('left')) dir.x -= 1;
    if (key.isPressed('right')) dir.x += 1;
    if (key.isPressed('up')) dir.y -= 1;
    if (key.isPressed('down')) dir.y += 1;
    if (dir.length() > 0) {
        dir = dir.norm().multiplyScalar(cam.speed * dt);
        viewRect.moveTo(viewRect.x + dir.x, viewRect.y + dir.y);
    }
    viewRect.updateSize();
}

key('z', () => viewRect.scale = Math.max(0, viewRect.scale - 0.1));
key('x', () => viewRect.scale += 0.1);

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    viewRect.begin();
    map.drawFromCache();
    robowalkAnimation.draw(50, 50);
    drawSprite('walk_down_0000.png', 200, 100);
    viewRect.end();
}

function drawSprite(spriteName, posX, posY) {
    for (var sheetName in spriteSheets) {
        var sheet = spriteSheets[sheetName];
        var sprite = sheet.getStats(spriteName);
        if (sprite == null) continue;
        __drawSpriteInternal(sprite, sheet, posX, posY);
    }
}

function __drawSpriteInternal(spt, sheet, posX, posY) {
    if (spt == null || sheet == null) return;
    var hlf = {
        x: spt.cx, y: spt.cy
    };
    ctx.drawImage(
        sheet.img,
        spt.x, spt.y, spt.w, spt.h,
        posX + hlf.x, posY + hlf.y, spt.w, spt.h
    );
}

async function main() {
    makeAlwaysCanvasFullscreen();
    await loadAllImages();

    var sheet1 = new TexturepackerParser('./assets/json/grits_effects.json');
    await sheet1.loadAndParse();
    spriteSheets['grits_effects'] = sheet1;

    console.log('./assets/json/grits_effects.json parsed:');

    await map.loadAndParse();
    map.makeCache();

    viewRect.updateSize();

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
