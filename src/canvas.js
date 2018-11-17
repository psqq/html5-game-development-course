
export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export function setFullscreenSizeForCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function makeAlwaysCanvasFullscreen() {
    setFullscreenSizeForCanvas();
    window.addEventListener('resize', setFullscreenSizeForCanvas);
}
