import TexturepackerParser from './texturepacker-parser';
import {
    canvas as can,
    context as ctx,
    makeAlwaysCanvasFullscreen
} from './canvas';
import { loadAllImages } from './images';
import Animation from './animation';
import TiledMap from './tiled-map';

var timestamp = 0, timeOfLastUpdate = 0, dt = 0;

var spriteSheets = {};

var robowalkAnimation = new Animation({
    images: Array(19).fill("robowalk/robowalk")
        .map((x, i) => x + ("" + i).padStart(2, '0') + '.png')
});

var map = new TiledMap('./assets/json/map.json');

function update() {
    robowalkAnimation.update(dt);
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    robowalkAnimation.draw(50, 50);
    drawSprite('walk_down_0000.png', 200, 100);
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

    spriteSheets['grits_effects'] = new TexturepackerParser('./assets/json/grits_effects.json');
    await spriteSheets['grits_effects'].loadAndParse();

    console.log('./assets/json/grits_effects.json parsed:');
    console.log(spriteSheets['grits_effects']);
    console.log(spriteSheets['grits_effects'].sprites);
    console.log(spriteSheets['grits_effects'].sprites[123]);

    await map.loadAndParse();
    console.log('map', map);
    console.log(map.getTilePacket(1));

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
