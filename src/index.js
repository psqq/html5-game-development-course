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
import * as mainloop from './mainloop';
import Minimap from './minimap';
import * as soundManager from './sound-manager';

var map = new TiledMap('./assets/json/map.json');
var minimap = new Minimap({ map });

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
    minimap.drawFromCache();
    // physicsEngine.drawStaticBodyes();
    // physicsEngine.drawDynamicBodyes();
    viewRect.end();
}

async function main() {
    makeAlwaysCanvasFullscreen();
    await images.loadAll();

    soundManager.create();

    await map.loadAndParse();
    map.makeCache();

    viewRect.updateSize();

    physicsEngine.create();
    gameEngine.create();

    map.createStaticObjects();
    map.spawnTeleporters();

    player.create();
    player.bindEvents();

    minimap.makeCache();

    mainloop.setUpdate(update);
    mainloop.setDraw(draw);
    mainloop.run();
}

main();
