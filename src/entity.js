import Victor from 'victor';

export default class Entity {
    constructor() {
        this.pos = new Victor(0, 0);
        this.size = new Victor(0, 0);
        this._killed = false;
    }
    update(dt) {}
}
