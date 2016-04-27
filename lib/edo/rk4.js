'use strict';

function rk4(f, a, b, h, y0) {
    var steps = (b-a) / h;
    var xy = [{x: a, y: y0}];
    for (var n = 1; n <= steps; n++) {
        var k1 = h * f(xy[n-1].x, xy[n-1].y);
        var k2 = h * f(xy[n-1].x + h / 2, xy[n-1].y + k1 / 2);
        var k3 = h * f(xy[n-1].x + h / 2, xy[n-1].y + k2 / 2);
        var k4 = h * f(xy[n-1].x + h, xy[n-1].y + k3);
        xy[n] = {
            x: xy[n-1].x + h,
            y: xy[n-1].y + 1/6 * (k1 + 2 * (k2 + k3) + k4)
        };
    }
    return xy;
}

module.exports = rk4;