import {
    canvas as can,
    context as ctx,
} from './canvas';

export var x = 0, y = 0, w = 0, h = 0, scale = 1;

export function getRect() {
    return {
        left: x, right: x + w,
        top: y, bottom: y + h
    };
}

export function updateSize() {
    w = can.width;
    h = can.height;
}

export function moveTo(ax, ay) {
    x = ax;
    y = ay;
}

export function centerAt(ax, ay) {
    x = ax - can.width / 2;
    y = ay - can.height / 2;
}

export function begin() {
    ctx.save();
    ctx.translate(-x, -y);
    ctx.scale(scale, scale);
}

export function end() {
    ctx.restore();
}
