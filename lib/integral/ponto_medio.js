'use strict';

function pontoMedio(f, a, b, steps) {
    var h = (b - a) / steps; 
    var sum = 0;
    for (var n = 0; n < steps; n++) {
        var x0 = a + h * n;
        var x1 = x0 + h;
        sum += h*f((x0+x1)/2);
    }
    return sum;
}

module.exports = pontoMedio;