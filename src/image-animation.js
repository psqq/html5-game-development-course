import { context as ctx } from './canvas';
import { images } from './images';


export default class ImageAnimation {
    constructor(options) {
        this.images = options.images || [];
        this.frameRate = options.frameRate || 1000 / 30;
        this.offsetX = options.offsetX || 0;
        this.offsetY = options.offsetY || 0;
        this.frameTime = 0;
        this.frame = 0;
    }
    update(dt) {
        this.frameTime += dt;
        if (this.frameTime > this.frameRate) {
            this.frame = (this.frame + 1) % this.images.length;
            this.frameTime = 0;
        }
    }
    draw(x, y) {
        ctx.drawImage(images[this.images[this.frame]], this.offsetX + x, this.offsetY + y);
    }
}
