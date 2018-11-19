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
import SpriteAnimation from './sprite-animation';

var timestamp = 0, timeOfLastUpdate = 0, dt = 0;

var map = new TiledMap('./assets/json/map.json');

var teleporterIdleAnimation;

function update() {
    player.update(dt);
    teleporterIdleAnimation.update(dt);
    viewRect.updateSize();
    physicsEngine.update(dt);
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    viewRect.begin();
    map.drawFromCache();
    // map.drawStaticObjects();
    player.draw();

    teleporterIdleAnimation.draw(2000, 2000);

    // images.findAndDrawSprite('teleporter_idle_0015.png', 2000, 2000);

    // player.drawBody();
    // physicsEngine.drawStaticBodyes();

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

    player.create();
    map.createStaticObjects();

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
