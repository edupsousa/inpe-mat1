'use strict';
var exemplos = {};

exemplos.interpolacao = function() {
    var GraficoInterpolador = require('./GraficoInterpolador');
    var grafico = new GraficoInterpolador('#grafico', 900, 400, 'tbody#pontos');
    return grafico;
};

exemplos.integracao = function() {
    var ExemploIntegracao = require('./ExemploIntegracao');
    var integracao = new ExemploIntegracao();
    integracao.definirElementosEntrada('#expressao', '#limiteInferior', '#limiteSuperior', '#passos', '#integrar');
    integracao.definirElementosResultado('#secao-resultados', '#ponto-medio', '#trapezio');
    integracao.definirGrafico('#grafico');
    return integracao;
};

exemplos.edo = function() {
    var ExemploEDO = require('./ExemploEDO');
    var edo = new ExemploEDO();
    edo.definirEntradas('#expressao', '#limiteInferior', '#valorInicial', '#limiteSuperior', '#intervalo', '#resolver');
    edo.definirResultados('#tableResultado', '#grafico', '#secao-resultados');
    return edo;
};

window.exemplos = exemplos;