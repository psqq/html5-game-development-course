
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
    entities = entities.filter(e1 => _deferredKill.findIndex(e2 => e1 === e2) < 0);
    _deferredKill = [];
}
