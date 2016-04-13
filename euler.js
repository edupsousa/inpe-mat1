'use strict';

function euler(f, a, b, h, y0) {
    let steps = (b-a) / h;
    let xy = [{x: a, y: y0}];
    for (let n = 1; n <= steps; n++) {
        xy[n] = {
            x: xy[n-1].x + h,
            y: xy[n-1].y + h * f(xy[n-1].x, xy[n-1].y)
        };
    }
    return xy;
}

module.exports = euler;