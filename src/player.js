import Victor from 'victor';
import ImageAnimation from './image-animation';
import * as viewRect from './view-rect';
import key from 'keymaster';
import * as physicsEngine from './physics-engine';
import { context as ctx } from './canvas';
import { dt } from './mainloop';
import * as gameEngine from './game-engine';

var robotEntity;

export function create() {
    robotEntity = gameEngine.spawnEnitty('robot', {
        x: 2000, y: 2000
    });
}

export function update() {
    if (key.isPressed('a')) {
        robotEntity.moveLeft();
    } else if (key.isPressed('d')) {
        robotEntity.moveRight();
    } else if (key.isPressed('w')) {
        robotEntity.moveUp();
    }
    else if (key.isPressed('s')) {
        robotEntity.moveDown();
    }
    else {
        robotEntity.stopMoving();
    }
    viewRect.centerAt(robotEntity.body.position.x, robotEntity.body.position.y);
}

export function bindEvents() {
    window.addEventListener('mousemove', (e) => { });
}
