import Victor from 'victor';
import Animation from './animation';
import * as viewRect from './view-rect';
import key from 'keymaster';

var position = new Victor(2000, 2000);
var speed = 0.5;

var robowalkAnimation = new Animation({
    images: Array(19).fill("robowalk/robowalk")
        .map((x, i) => x + ("" + i).padStart(2, '0') + '.png'),
    offsetX: -83/2,
    offsetY: -83/2
});

export function update(dt) {
    robowalkAnimation.update(dt);
    var dir = new Victor(0, 0);
    if (key.isPressed('left')) dir.x -= 1;
    if (key.isPressed('right')) dir.x += 1;
    if (key.isPressed('up')) dir.y -= 1;
    if (key.isPressed('down')) dir.y += 1;
    if (dir.length() > 0) {
        dir = dir.norm().multiplyScalar(speed * dt);
        position = position.add(dir);
    }
    viewRect.centerAt(position.x, position.y);
}

export function draw() {
    robowalkAnimation.draw(position.x, position.y);
}

export function bindEvents() {
    window.addEventListener('mousemove', (e) => { });
}
