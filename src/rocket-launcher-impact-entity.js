import Entity from './entity';
import SpriteAnimation from './sprite-animation';
import * as physicsEngine from './physics-engine';
import Victor from 'victor';
import { context as ctx } from './canvas';
import * as soundManager from './sound-manager';


export default class RocketLauncherImpactEntity extends Entity {
    constructor(o) {
        _.defaults(o, {
            x: 0, y: 0
        });
        super(o);
        this.animations = {
            'impact': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'rocket_launcher_impact_',
                count: 30,
                suffix: '.png',
                loop: false,
            }),
        }
        this.currentAnimation = 'impact';
        soundManager.play('sfx_wpn_cannon2');
    }
    update() {
        if (this.animations[this.currentAnimation].done) {
            this.kill();
            return;
        }
        this.animations[this.currentAnimation].update();
    }
    draw() {
        this.animations[this.currentAnimation].draw(
            this.pos.x, this.pos.y
        );
    }
}
