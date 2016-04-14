'use strict';

var meg = require('../sistema_linear/meg');

function polinomio(a, b) {
    let p = 'f(x) = ';
    for (let i = b.length - 1; i >= 0; i--) {
        let potencia = b.length - (b.length - i);
        if (b[i] !== 0) {
            if (i < b.length - 1)
                p += (b[i] > 0 ? '+' : '-' );
            p += Math.abs(b[i]);
            if (potencia >= 1) {
                p += 'x';
                if (potencia >= 2) {
                    p += '^' + potencia; 
                }
            }
        }
    }
    return p;
}

function interpolar(pontos) {
   let a = [];
   let b = [];
   for (let i = 0; i < pontos.length; i++) {
       a.push([]);
       b.push(pontos[i][1]);
       for (let j = 0; j < pontos.length; j++) {
            a[a.length - 1].push(Math.pow(pontos[i][0],j));
       }
   }
   var resultado = meg(a, b);
   return polinomio(resultado.a, resultado.b);
}

module.exports = interpolar;