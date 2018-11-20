import Victor from 'victor';
import ImageAnimation from './image-animation';
import * as viewRect from './view-rect';
import key from 'keymaster';
import * as physicsEngine from './physics-engine';
import { context as ctx } from './canvas';
import { dt } from './mainloop';
import * as gameEngine from './game-engine';
import RobotEntity from './robot-entity';
import RocketLauncherProjectileEntity from './rocket-launcher-projectile-entity';

var robotEntity;

export function create() {
    robotEntity = gameEngine.spawnEnitty(
        new RobotEntity({
            x: 2900, y: 2050
        })
    );
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
    window.addEventListener('mousedown', (e) => {
        var mousePos = new Victor(viewRect.x + e.clientX, viewRect.y + e.clientY);
        var dir = mousePos.subtract(robotEntity.pos).norm();
        var spawnPos = robotEntity.pos.clone().add(dir.clone().multiplyScalar(robotEntity.size.x));
        gameEngine.spawnEnitty(
            new RocketLauncherProjectileEntity({
                x: spawnPos.x, y: spawnPos.y,
                direction: dir,
            })
        );
    });
}
