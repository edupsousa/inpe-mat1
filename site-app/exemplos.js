'use strict';
var exemplos = {};

exemplos.interpolacao = function() {
    let GraficoInterpolador = require('./GraficoInterpolador');
    let grafico = new GraficoInterpolador('#grafico', 900, 400, 'tbody#pontos');
    return grafico;
};

exemplos.integracao = function() {
    let ExemploIntegracao = require('./ExemploIntegracao');
    let integracao = new ExemploIntegracao();
    integracao.definirElementosEntrada('#expressao', '#limiteInferior', '#limiteSuperior', '#passos', '#integrar');
    integracao.definirElementosResultado('#secao-resultados', '#ponto-medio', '#trapezio');
    integracao.definirGrafico('#grafico');
    return integracao;
};

exemplos.edo = function() {
    let ExemploEDO = require('./ExemploEDO');
    let edo = new ExemploEDO();
    edo.definirEntradas('#expressao', '#limiteInferior', '#valorInicial', '#limiteSuperior', '#intervalo', '#resolver');
    edo.definirResultados('#tableResultado', '#grafico', '#secao-resultados');
    return edo;
};

window.exemplos = exemplos;