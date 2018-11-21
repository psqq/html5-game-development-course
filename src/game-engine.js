import * as viewRect from './view-rect';
import * as physicsEngine from './physics-engine';

export var entities = [];
var _deferredKill = [];

export function create() {
    physicsEngine.Events.on(
        physicsEngine.engine,
        "collisionStart",
        (event) => {
            for (var pair of event.pairs) {
                var a = pair.bodyA, b = pair.bodyB;
                if (a.userData
                    && a.userData.entity
                    && a.userData.entity.onTouch
                ) {
                    a.userData.entity.onTouch(b);
                }
                if (b.userData
                    && b.userData.entity
                    && b.userData.entity.onTouch
                ) {
                    b.userData.entity.onTouch(a);
                }
            }
        }
    );
}

export function spawnEnitty(ent) {
    entities.push(ent);
    return ent;
}

export function update() {
    for (var ent of entities) {
        if (!ent._killed) {
            if (ent.update) ent.update();
        } else {
            _deferredKill.push(ent);
        }
    }
    if (_deferredKill.length > 0) {
        entities = entities.filter(e => !(_deferredKill.indexOf(e) >= 0));
    }
    _deferredKill = [];
}

export function draw() {
    var fudgeVariance = 300;
    var zIndexArray = [];
    var entitiesBucketByZIndex = {};
    for (var ent of entities) {
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
    for (var zIndex of zIndexArray) {
        for (var ent of entitiesBucketByZIndex[zIndex]) {
            if (ent.draw) ent.draw();
        }
    }
}
