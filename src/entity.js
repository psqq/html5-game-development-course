import Victor from 'victor';
import * as physicsEngine from './physics-engine';
import _ from 'lodash';

export default class Entity {
    constructor(o) {
        o = o || {};
        _.defaults(o, { zindex: 0, x: 0, y: 0, w: 0, h: 0 });
        this.pos = new Victor(o.x, o.y);
        this.size = new Victor(o.w, o.h);
        this._killed = false;
        this.zindex = o.zindex;
        this.body = null;
    }
    kill() {
        if (this._killed) return;
        this._killed = true;
        if (this.body) physicsEngine.removeBody(this.body);
    }
    setVelocity(vel) {
        physicsEngine.Body.setVelocity(
            this.body,
            new physicsEngine.Vector.create(vel.x, vel.y)
        );
    }
    onTouch(body) { }
    update() { }
    draw() { }
}
