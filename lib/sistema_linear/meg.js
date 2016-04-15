'use strict';
var determinante = require('../matriz/determinante');

function meg(a, b) {
    if (determinante(a) === 0)
        return false;
        
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = i + 1; j < a.length; j++) {
            let pivo = a[j][i] / a[i][i];
            for (let k = 0; k < a.length; k++) {
                a[j][k] = a[j][k] - pivo * a[i][k]; 
            }
            b[j] = b[j] - pivo * b[i];
        }
    }
    
    let r = {};
    for (let k = b.length - 1; k >= 0; k--) {
        b[k] = b[k] / a[k][k];
        a[k][k] = 1;
        for (let j = k - 1; j >= 0; j--) {
            b[j] = b[j] - a[j][k] * b[k];
            a[j][k] = 0;
        }
    }
    
    return {
        a: a,
        b: b
    };
}

module.exports = meg;