import Matter from 'matter-js';
import { context as ctx } from './canvas';
import { dt } from './mainloop';

export var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

export var engine, world;

export function addBody(x, y, w, h, options) {
    options = options || {};
    options.density = 1;
    options.friction = 0;
    options.restitution = 1;
    options.inertia = Infinity
    var body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, body);
    return body;
}

export function removeBody(body) {
    Composite.remove(world, body)
}

export function create() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0;
    world.gravity.x = 0;
}

export function update() {
    Engine.update(engine, dt);
}

export function drawBody(body, color = 'black') {
    ctx.beginPath();
    var p = body.vertices[0];
    ctx.moveTo(p.x, p.y);
    for (var i = 1; i < body.vertices.length; i++) {
        p = body.vertices[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function drawDynamicBodyes() {
    var bodies = Composite.allBodies(world);
    for (var b of bodies) {
        drawBody(b, 'green');
    }
}

export function drawStaticBodyes() {
    var bodies = Composite.allBodies(world);
    for (var b of bodies) {
        if (b.isStatic) {
            drawBody(b, 'red');
        }
    }
}
