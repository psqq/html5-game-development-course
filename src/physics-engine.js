import Matter from 'matter-js';
import { context as ctx } from './canvas';

export var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Bodies = Matter.Bodies;

var engine, world;
var staticBodies = [];

export function addBody(x, y, w, h, options) {
    options = options || {};
    options.density = 1;
    options.friction = 0;
    options.restitution = 1;
    options.inertia = Infinity
    var body = Bodies.rectangle(x + w / 2, y + h / 2, w, h, options);
    if (options.isStatic) {
        staticBodies.push(body);
    }
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

export function drawStaticBodyes() {
    for (var b of staticBodies) {
        drawBody(b, 'red');
    }
}
