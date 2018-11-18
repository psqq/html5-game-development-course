
export function intersectRect(r1, r2) {
    return
        !(r2.left > r1.right || r1.left > r2.right)
        || !(r2.top > r1.bottom || r1.top > r2.bottom);
}
