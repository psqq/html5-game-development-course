
var entities = [];
var factory = {};

export function spawnEnitty(typename) {
    var ent = new (factory[typename])();
    entities.push(ent);
    return ent;
}

export function update() {
    for(var ent of entities) {
        ent.update();
    }
}
