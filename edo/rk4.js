'use strict';

function rk4(f, a, b, h, y0) {
    let steps = (b-a) / h;
    let xy = [{x: a, y: y0}];
    for (let n = 1; n <= steps; n++) {
        let k1 = h * f(xy[n-1].x, xy[n-1].y);
        let k2 = h * f(xy[n-1].x + h / 2, xy[n-1].y + k1 / 2);
        let k3 = h * f(xy[n-1].x + h / 2, xy[n-1].y + k2 / 2);
        let k4 = h * f(xy[n-1].x + h, xy[n-1].y + k3);
        xy[n] = {
            x: xy[n-1].x + h,
            y: xy[n-1].y + 1/6 * (k1 + 2 * (k2 + k3) + k4)
        };
    }
    return xy;
}

module.exports = rk4;