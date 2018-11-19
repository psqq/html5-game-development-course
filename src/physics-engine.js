import Matter from 'matter-js';

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine, world;

export function addBody(x, y, w, h, options) {
    options = options || {};
    options.density = 1;
    options.friction = 0;
    options.restitution = 1;
    var body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, body);
    return body;
}

export function removeBody(body) {
    World.remove(body);
}

export function clearForces() {
}

export function create() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0;
    world.gravity.x = 0;
}

export function update(dt) {
    Engine.update(engine, dt);
}
