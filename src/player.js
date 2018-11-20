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
    var dx = 0, dy = 0;
    if (key.isPressed('a')) dx -= 1;
    if (key.isPressed('d')) dx += 1;
    if (key.isPressed('w')) dy -= 1;
    if (key.isPressed('s')) dy += 1;
    robotEntity.move(dx, dy);
    viewRect.centerAt(robotEntity.body.position.x, robotEntity.body.position.y);
}

export function bindEvents() {
    window.addEventListener('mousemove', (e) => { });
}
