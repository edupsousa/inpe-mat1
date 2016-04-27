'use strict';

function euler(f, a, b, h, y0) {
    var steps = (b-a) / h;
    var xy = [{x: a, y: y0}];
    for (var n = 1; n <= steps; n++) {
        xy[n] = {
            x: xy[n-1].x + h,
            y: xy[n-1].y + h * f(xy[n-1].x, xy[n-1].y)
        };
    }
    return xy;
}

module.exports = euler;