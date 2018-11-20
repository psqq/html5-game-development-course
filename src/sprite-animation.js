import * as images from './images';
import { dt } from './mainloop';
import pad from 'pad';

export default class SpriteAnimation {
    constructor(o) {
        if (o.fromTemplate) {
            o.spriteNames = [];
            for (var i = 0; i < o.count; i++) {
                var num = pad(4, "" + i, '0');
                o.spriteNames.push(
                    `${o.prefix}${num}${o.suffix}`
                );
            }
        }
        this.spriteNames = o.spriteNames || [];
        this.findedSprites = [];
        for (var spriteName of this.spriteNames) {
            this.findedSprites.push(images.findSprite(spriteName));
        }
        if (o.duration) {
            o.frameRate = o.duration / this.findedSprites.length;
        }
        this.frameRate = o.frameRate || 1000 / 30;
        this.offsetX = o.offsetX || 0;
        this.offsetY = o.offsetY || 0;
        this.frameTime = 0;
        this.frame = 0;
    }
    update() {
        this.frameTime += dt;
        if (this.frameTime > this.frameRate) {
            this.frame = (this.frame + 1) % this.findedSprites.length;
            this.frameTime = 0;
        }
    }
    draw(x, y) {
        var findResult = this.findedSprites[this.frame];
        images.drawSprite(
            findResult.sprite, findResult.sheet,
            this.offsetX + x, this.offsetY + y
        );
    }
}
