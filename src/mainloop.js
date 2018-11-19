
export var timestamp = 0, dt = 0;

var timeOfLastUpdate = 0;

var update, draw;

export function setUpdate(updateFunction) {
    update = updateFunction;
}

export function setDraw(drawFunction) {
    draw = drawFunction;
}

export function run() {
    function go() {
        timestamp = performance.now();
        dt = timestamp - timeOfLastUpdate;
        timeOfLastUpdate = timestamp;
        if (update) update();
        if (draw) draw();
        requestAnimationFrame(go);
    }
    timeOfLastUpdate = performance.now();
    requestAnimationFrame(go);
}
