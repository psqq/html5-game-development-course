import Entity from './entity';
import SpriteAnimation from './sprite-animation';

export default class TeleporterEntity extends Entity {
    constructor(o) {
        _.defaults(o, {
            x: 0, y: 0,
            w: 96, h: 96,
        });
        super(o);
        this.animations = {
            'idle': new SpriteAnimation({
                fromTemplate: true,
                prefix: 'teleporter_idle_',
                count: 16,
                suffix: '.png',
            }),
        }
        this.currentAnimation = 'idle';
    }
    update() {
        this.animations[this.currentAnimation].update();
    }
    draw() {
        this.animations[this.currentAnimation].draw(
            this.pos.x, this.pos.y
        );
    }
}
