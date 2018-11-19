import * as viewRect from './view-rect';

var entities = [];
var factory = {};
var _deferredKill = [];

export function spawnEnitty(typename) {
    var ent = new (factory[typename])();
    entities.push(ent);
    return ent;
}

export function update() {
    for(var ent of entities) {
        if (ent._killed) {
            ent.update();
        } else {
            _deferredKill.push(ent);
        }
    }
    entities = entities.filter(e => !(_deferredKill.indexOf(e) >= 0));
    _deferredKill = [];
}

export function draw() {
    var fudgeVariance = 300;
    var zIndexArray = [];
    var entitiesBucketByZIndex = {};
    for(var ent of entities) {
        if (
            ent.pos.x < viewRect.x - fudgeVariance
            || ent.pos.x > viewRect.x + viewRect.w + fudgeVariance
            || ent.pos.y < viewRect.y - fudgeVariance
            || ent.pos.y > viewRect.y + viewRect.w + fudgeVariance
        ) {
            continue;
        }
        if (zIndexArray.indexOf(ent.zindex) < 0) {
            zIndexArray.push(ent.zindex);
            entitiesBucketByZIndex[ent.zindex] = [];
        }
        entitiesBucketByZIndex[ent.zindex].push(ent);
    }
    zIndexArray.sort((a, b) => a - b);
    for(var zIndex of zIndexArray) {
        for(var ent of entitiesBucketByZIndex[zIndex]) {
            ent.draw();
        }
    }
}
