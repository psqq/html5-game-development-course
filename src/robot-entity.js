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
        this.body.userData = { entity: this };
        this.speed = 5;
        this.moving = true;
        this.animDuration = 300;
        this.animations = {
            'walk_down': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_down_',
                count: 30,
                suffix: '.png',
                duration: this.animDuration,
            }),
            'walk_up': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_up_',
                count: 30,
                suffix: '.png',
                duration: this.animDuration,
            }),
            'walk_left': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_left_',
                count: 30,
                suffix: '.png',
                duration: this.animDuration,
            }),
            'walk_right': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'walk_right_',
                count: 30,
                suffix: '.png',
                duration: this.animDuration,
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
    move(dx, dy) {
        if (dx == 0 && dy == 0) {
            this.stopMoving();
            return;
        }
        if (dx < 0 && dy == 0) this.moveLeft();
        else if (dx > 0 && dy == 0) this.moveRight();
        else if (dy < 0 && dx == 0) this.moveUp();
        else if (dy > 0 && dx == 0) this.moveDown();
        else {
            this.moving = true;
            var vel = new Victor(dx, dy);
            this.setVelocity(vel.norm().multiplyScalar(this.speed));
        }
    }
    stopMoving() {
        this.moving = false;
        this.setVelocity(new Victor(0, 0));
    }
    update() {
        this.pos.x = this.body.position.x;
        this.pos.y = this.body.position.y;
        if (this.moving) {
            this.animations[this.currentAnimation].update();
        }
    }
    draw() {
        this.animations[this.currentAnimation].draw(
            this.pos.x, this.pos.y
        );
    }
}
