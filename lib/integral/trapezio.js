'use strict';

function trapezio(f, a, b, steps) {
    var h = (b - a) / steps;
    var sum = f(a) + f(b);
    for (var n = 1; n < steps; n++) {
        var x = a + h * n;
        sum += 2 * f(x);
    }
    return (h / 2) * sum;
}

module.exports = trapezio;