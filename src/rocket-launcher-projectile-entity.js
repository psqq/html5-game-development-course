import Entity from './entity';
import SpriteAnimation from './sprite-animation';
import * as physicsEngine from './physics-engine';
import Victor from 'victor';
import { context as ctx } from './canvas';


export default class RocketLauncherProjectileEntity extends Entity {
    constructor(o) {
        _.defaults(o, {
            x: 0, y: 0,
            w: 112, h: 76,
            direction: new Victor(1, 0)
        });
        o.w = o.h = 10;
        super(o);
        this.body = physicsEngine.addBody(o.x, o.y, o.w, o.h);
        this.speed = 8;
        this.velocity = o.direction.clone().multiplyScalar(this.speed);
        this.setVelocity(this.velocity);
        this.animations = {
            'projectile': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'rocket_launcher_projectile_',
                count: 8,
                suffix: '.png',
            }),
        }
        this.currentAnimation = 'projectile';
    }
    update() {
        this.pos.x = this.body.position.x;
        this.pos.y = this.body.position.y;
        this.animations[this.currentAnimation].update();
    }
    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.velocity.angle() + Math.PI);
        this.animations[this.currentAnimation].draw(
            0, 0
        );
        ctx.restore();
    }
}
