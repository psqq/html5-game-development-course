import {
    canvas as can,
    context as ctx,
} from './canvas';

export var x = 0, y = 0, w = 0, h = 0, scale = 1;

export function getxywh() {
    return { x, y, w, h };
}

export function getRect() {
    return {
        left: x, right: x + w,
        top: y, bottom: y + h
    };
}

export function updateSize() {
    w = can.width * (2 - scale);
    h = can.height * (2 - scale);
}

export function setScale(newScale) {
    scale = newScale;
}

export function moveTo(ax, ay) {
    x = ax;
    y = ay;
}

export function centerAt(ax, ay) {
    x = ax - w / 2;
    y = ay - h / 2;
}

export function beginScale() {
    ctx.save();
    ctx.scale(scale, scale);
}

export function endScale() {
    ctx.restore();
}

export function begin() {
    ctx.save();
    ctx.translate(-x, -y);
}

export function end() {
    ctx.restore();
}
