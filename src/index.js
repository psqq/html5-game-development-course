import TexturepackerParser from './texturepacker-parser';
import {
    canvas as can,
    context as ctx,
    makeAlwaysCanvasFullscreen
} from './canvas';
import { loadAllImages } from './images';
import TiledMap from './tiled-map';
import key from 'keymaster';
import * as viewRect from './view-rect';
import * as player from './player';

var timestamp = 0, timeOfLastUpdate = 0, dt = 0;

var spriteSheets = {};

var map = new TiledMap('./assets/json/map.json');

function update() {
    player.update(dt);
    viewRect.updateSize();
}

// key('z', () => {
//     viewRect.setScale(Math.max(0, viewRect.scale - 0.1));
// });
// key('x', () =>{
//     viewRect.setScale(viewRect.scale + 0.1);
// });

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    viewRect.begin();
    map.drawFromCache();
    player.draw();
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
