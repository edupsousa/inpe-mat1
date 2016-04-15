'use strict';

function pontoMedio(f, a, b, h) {
    let steps = (b-a) / h;
    let sum = 0;
    for (let n = 0; n < steps; n++) {
        let x0 = a + h * n;
        let x1 = x0 + h;
        sum += h*f((x0+x1)/2);
    }
    return sum;
}

module.exports = pontoMedio;