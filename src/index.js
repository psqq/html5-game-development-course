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
import { el, mount, unmount } from 'redom';
import * as debug from './debug';

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

var dots = [];
var loadingEl = el(
    'span',
    {
        style: {
            position: 'fixed',
            left: '10px',
            right: '10px',
            'font-size': '20pt',
        }
    },
    'Loading...',
);
var loadingAnimId;

function startLoading() {
    mount(document.body, loadingEl);
    // loadingAnimId = setInterval(() => {
    //     dots.push('.');
    //     if (dots.length > 3) dots = [];
    //     loadingEl.textContent = 'Loading' + dots.join('');
    // }, 500);
}

function finishLoading() {
    unmount(document.body, loadingEl);
    // clearInterval(loadingAnimId);
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

    finishLoading();

    mainloop.setUpdate(update);
    mainloop.setDraw(draw);
    mainloop.run();
}

debug.init();
startLoading();
main();
