'use strict';

var meg = require('../sistema_linear/meg');

function polinomio(a, b) {
    var p = '';
    for (var i = b.length - 1; i >= 0; i--) {
        var potencia = b.length - (b.length - i);
        if (b[i] !== 0) {
            if (i < b.length - 1 || b[i] < 0)
                p += (b[i] > 0 ? '+' : '-' );
            
            p += Math.abs(b[i]).toFixed(3);
            
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

function funcao(a, b) {
    return function(valor) {
        var resultado = 0;
        for (var i = b.length - 1; i >= 0; i--) {
            var potencia = b.length - (b.length - i);
            resultado += b[i] * Math.pow(valor, potencia);
        }
        return resultado;
    }
}

function interpolar(pontos) {
   var a = [];
   var b = [];
   for (var i = 0; i < pontos.length; i++) {
       a.push([]);
       b.push(pontos[i][1]);
       for (var j = 0; j < pontos.length; j++) {
            a[a.length - 1].push(Math.pow(pontos[i][0],j));
       }
   }
   var resultado = meg(a, b);
   
   if (resultado === false) {
       return false;
   }
        
   return {
        p: polinomio(resultado.a, resultado.b),
        f: funcao(resultado.a, resultado.b)
   };

}

module.exports = interpolar;