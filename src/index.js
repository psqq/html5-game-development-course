import {
    canvas as can,
    context as ctx,
    makeAlwaysCanvasFullscreen
} from './canvas';
import * as images from './images';
import TiledMap from './tiled-map';
import * as viewRect from './view-rect';
import * as player from './player';
import * as physicsEngine from './physics-engine';
import * as gameEngine from './game-engine';
import SpriteAnimation from './sprite-animation';
import * as mainloop from './mainloop';

var map = new TiledMap('./assets/json/map.json');

var teleporterIdleAnimation;

function update() {
    player.update();
    gameEngine.update();
    viewRect.updateSize();
    physicsEngine.update();
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    viewRect.begin();
    map.drawFromCache();
    gameEngine.draw();
    // physicsEngine.drawStaticBodyes();
    // physicsEngine.drawDynamicBodyes();
    viewRect.end();
}

async function main() {
    makeAlwaysCanvasFullscreen();
    await images.loadAll();

    console.log('teleporter_idle_0015.png', images.findSprite('teleporter_idle_0015.png'));

    teleporterIdleAnimation = new SpriteAnimation({
        spriteNames: Array(16).fill("teleporter_idle_")
            .map((x, i) => x + ("" + i).padStart(4, '0') + '.png'),
    });

    await map.loadAndParse();
    map.makeCache();

    viewRect.updateSize();

    physicsEngine.create();

    map.createStaticObjects();
    map.spawnTeleporters();

    player.create();
    player.bindEvents();

    mainloop.setUpdate(update);
    mainloop.setDraw(draw);
    mainloop.run();
}

main();
