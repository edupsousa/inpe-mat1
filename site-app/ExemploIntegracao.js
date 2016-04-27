'use strict';
var d3 = require('d3');
window.d3 = d3;
var $ = require('jquery');
var functionPlot = require('function-plot');
var math = require('mathjs');
var pontoMedio = require('../lib/integral/ponto_medio');
var trapezio = require('../lib/integral/trapezio');

class ExemploIntegracao {
    constructor() {
    }
    definirElementosEntrada(inputExpressao, inputLimiteInferior, inputLimiteSuperior, inputPassos, buttonIntegrar) {
        this.inputExpressao = d3.select(inputExpressao);
        this.inputLimiteInferior = d3.select(inputLimiteInferior);
        this.inputLimiteSuperior = d3.select(inputLimiteSuperior);
        this.inputPassos = d3.select(inputPassos);
        this.buttonIntegrar = d3.select(buttonIntegrar);
        this.registrarEventoIntegrar();
    }
    definirElementosResultado(secaoResultados, textPontoMedio, textTrapezio) {
        this.secaoResultados = $(secaoResultados);
        this.textPontoMedio = d3.select(textPontoMedio);
        this.textTrapezio = d3.select(textTrapezio);
    }
    definirGrafico(graficoTarget) {
        this.graficoTarget = graficoTarget;
    }
    registrarEventoIntegrar() {
        var self = this;
        this.buttonIntegrar.on('click', function () {
            var expressao = self.inputExpressao.node().value;
            var limiteInferior = parseFloat(self.inputLimiteInferior.node().value);
            var limiteSuperior = parseFloat(self.inputLimiteSuperior.node().value);
            var passos = parseFloat(self.inputPassos.node().value);
            var funcao = self.gerarFuncao(expressao);
            var resultados = self.integrar(funcao, limiteInferior, limiteSuperior, passos);
            self.mostrarResultados(resultados);
            self.exibirGrafico(funcao, limiteInferior, limiteSuperior);
        });
    }
    mostrarResultados(resultados) {
        this.textPontoMedio.text(resultados.pontoMedio.toFixed(3));
        this.textTrapezio.text(resultados.trapezio.toFixed(3));
        this.secaoResultados.show('slow');
    }
    integrar(funcao, limiteInferior, limiteSuperior, passos) {
        return {
            trapezio: trapezio(funcao, limiteInferior, limiteSuperior, passos),
            pontoMedio: pontoMedio(funcao, limiteInferior, limiteSuperior, passos),
        };
    }
    gerarFuncao(expressao) {
        return function (x) {
            var expressaoCompilada = math.compile(expressao);
            return expressaoCompilada.eval({ x: x });
        }
    }
    exibirGrafico(funcao, limiteInferior, limiteSuperior) {
        var yMin = Math.min(funcao(limiteInferior), funcao(limiteSuperior));
        var yMax = Math.max(funcao(limiteInferior), funcao(limiteSuperior));
        var horizontalMargin = Math.abs((limiteSuperior - limiteInferior) * 0.1);
        var verticalMargin = Math.abs((yMax - yMin) * 0.1);
        if (horizontalMargin === 0) 
            horizontalMargin = 1;
        if (verticalMargin === 0)
            verticalMargin = 1;
        this.graficoInstance = functionPlot({
            target: '#grafico',
            xAxis: { domain: [limiteInferior - horizontalMargin, limiteSuperior + horizontalMargin] },
            yAxis: { domain: [yMin - verticalMargin, yMax + verticalMargin] },
            grid: true,
            data: [{
                fnType: 'linear',
                graphType: 'polyline',
                fn: function(p) {
                    return funcao(p.x);
                },
                range: [limiteInferior, limiteSuperior],
                closed: true,
                skipTip: true
            }]
        });
    }
};

module.exports = ExemploIntegracao;
