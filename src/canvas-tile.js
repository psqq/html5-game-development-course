
export default class CanvasTile {
    constructor(width, height) {
        this.x = -1;
        this.y = -1;
        this.w = width;
        this.h = height;
        this.can = document.createElement('canvas');
        this.ctx = this.can.getContext('2d');
        this.can.width = width;
        this.can.height = height;
    }
    isVisible() { }
}
