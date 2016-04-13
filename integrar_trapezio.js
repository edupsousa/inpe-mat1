'use strict';

function integrarTrapezio(f, a, b, h) {
    let steps = (b-a) / h;
    let sum = f(a) + f(b);
    for (let n = 1; n < steps; n++) {
        let x = a + h * n;
        sum += 2 * f(x);
    }
    return (h / 2) * sum;
}

module.exports = integrarTrapezio;