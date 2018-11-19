import Entity from './entity';
import _ from 'lodash';
import * as physicsEngine from './physics-engine';
import SpriteAnimation from './sprite-animation';
import Victor from 'victor';

export default class RobotEntity extends Entity {
    constructor(o) {
        _.defaults(o, {
            x: 0, y: 0,
            w: 68, h: 68,
        });
        super(o);
        this.body = physicsEngine.addBody(o.x, o.y, o.w, o.h);
        this.speed = 3;
        this.moving = true;
        this.animations = {
            'walk_down': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_down_',
                count: 30,
                suffix: '.png',
            }),
            'walk_up': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_up_',
                count: 30,
                suffix: '.png',
            }),
            'walk_left': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_left_',
                count: 30,
                suffix: '.png',
            }),
            'walk_right': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_right_',
                count: 30,
                suffix: '.png',
            }),
        };
        this.currentAnimation = 'walk_down';
    }
    moveLeft() {
        this.moving = true;
        this.setVelocity(new Victor(-this.speed, 0));
        this.currentAnimation = 'walk_left';
    }
    moveRight() {
        this.moving = true;
        this.setVelocity(new Victor(this.speed, 0));
        this.currentAnimation = 'walk_right';
    }
    moveUp() {
        this.moving = true;
        this.setVelocity(new Victor(0, -this.speed));
        this.currentAnimation = 'walk_up';
    }
    moveDown() {
        this.moving = true;
        this.setVelocity(new Victor(0, this.speed));
        this.currentAnimation = 'walk_down';
    }
    stopMoving() {
        this.moving = false;
        this.setVelocity(new Victor(0, 0));
    }
    update() {
        if (this.moving) {
            this.animations[this.currentAnimation].update();
        }
    }
    draw() {
        this.animations[this.currentAnimation].draw(
            this.body.position.x, this.body.position.y
        );
    }
}
