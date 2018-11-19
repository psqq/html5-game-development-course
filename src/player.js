import Victor from 'victor';
import Animation from './animation';
import * as viewRect from './view-rect';
import key from 'keymaster';
import * as physicsEngine from './physics-engine';
import { context as ctx } from './canvas';

var body;
var vel = new Victor(0, 0);
var speed = 0.5;

var robowalkAnimation = new Animation({
    images: Array(19).fill("robowalk/robowalk")
        .map((x, i) => x + ("" + i).padStart(2, '0') + '.png'),
    offsetX: -83 / 2,
    offsetY: -83 / 2
});

export function create() {
    body = physicsEngine.addBody(2000, 2000, 83, 83);
}

export function update(dt) {
    robowalkAnimation.update(dt);
    vel.x = vel.y = 0;
    if (key.isPressed('left')) vel.x -= 1;
    if (key.isPressed('right')) vel.x += 1;
    if (key.isPressed('up')) vel.y -= 1;
    if (key.isPressed('down')) vel.y += 1;
    if (vel.length() > 0) {
        vel = vel.norm().multiplyScalar(speed * dt);
    }
    physicsEngine.Body.setVelocity(
        body,
        new physicsEngine.Vector.create(vel.x, vel.y)
    );
    viewRect.centerAt(body.position.x, body.position.y);
}

export function draw() {
    robowalkAnimation.draw(body.position.x, body.position.y);
}

export function drawBody() {
    physicsEngine.drawBody(body, 'blue');
}

export function bindEvents() {
    window.addEventListener('mousemove', (e) => { });
}
