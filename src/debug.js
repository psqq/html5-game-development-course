import Entity from './entity';
import _ from 'lodash';
import * as physicsEngine from './physics-engine';
import SpriteAnimation from './sprite-animation';
import Victor from 'victor';
import * as gameEngine from './game-engine';
import * as player from './player';
import * as images from './images';

var px, py;

class DebugEntity extends Entity {
    constructor(o) {
        o = o || {};
        updatePlayerCoords();
        _.defaults(o, {
            x: px, y: py, zindex: 100
        });
        super(o);
        this.px = this.pos.x;
        this.py = this.pos.y;
        this.o = o;
    }
}

class SpriteEntity extends DebugEntity {
    constructor(o) {
        super(o);
    }
    draw() {
        images.findAndDrawSprite(this.o.spriteName, this.px, this.py);
    }
}

function updatePlayerCoords() {
    px = player.robotEntity.pos.x;
    py = player.robotEntity.pos.y;
}

function addSprite(name) {
    gameEngine.spawnEnitty(new SpriteEntity({
        spriteName: name,
    }));
}

function printPlayerCoord() {
    console.log(player.robotEntity.pos);
}

var addToWindow = { addSprite, printPlayerCoord };

export function init() {
    window.d = {
        ge: gameEngine
    };
    for (var k in addToWindow) {
        window.d[k] = addToWindow[k];
    }
}
