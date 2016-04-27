'use strict';

function determinante(matriz) {
    if (matriz.length === 1) {
        return matriz[0][0];
    } else {
        var sum = 0;
        for (var i = 0; i < matriz[0].length; i++) {
            sum += matriz[0][i] * Math.pow(-1, i+2) * determinante(menor(matriz, 0, i));
        }
        return sum;
    }
}

function menor(matriz, l, c) {
    var resultado = [];
    for (var i = 0; i < matriz.length; i++) {
        if (i !== l) {
            resultado.push([]);
            for (var j = 0; j < matriz[i].length; j++) {
                if (j !== c) {
                    resultado[resultado.length-1].push(matriz[i][j]);
                }
            }
        }
    }
    return resultado;
}

module.exports = determinante;