'use strict';
let d3 = require('d3');
window.d3 = d3;
let functionPlot = require('function-plot');
let math = require('mathjs');
let pontoMedio = require('../lib/integral/ponto_medio');
let trapezio = require('../lib/integral/trapezio');

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
    definirElementosResultado(textPontoMedio, textTrapezio) {
        this.textPontoMedio = d3.select(textPontoMedio);
        this.textTrapezio = d3.select(textTrapezio);
    }
    definirGrafico(graficoTarget) {
        this.graficoTarget = graficoTarget;
    }
    registrarEventoIntegrar() {
        let self = this;
        this.buttonIntegrar.on('click', function () {
            let expressao = self.inputExpressao.node().value;
            let limiteInferior = parseFloat(self.inputLimiteInferior.node().value);
            let limiteSuperior = parseFloat(self.inputLimiteSuperior.node().value);
            let passos = parseFloat(self.inputPassos.node().value);
            let funcao = self.gerarFuncao(expressao);
            let resultados = self.integrar(funcao, limiteInferior, limiteSuperior, passos);
            self.mostrarResultados(resultados);
            self.exibirGrafico(funcao, limiteInferior, limiteSuperior);
        });
    }
    mostrarResultados(resultados) {
        this.textPontoMedio.text(resultados.pontoMedio.toFixed(3));
        this.textTrapezio.text(resultados.trapezio.toFixed(3));
    }
    integrar(funcao, limiteInferior, limiteSuperior, passos) {
        return {
            trapezio: trapezio(funcao, limiteInferior, limiteSuperior, passos),
            pontoMedio: pontoMedio(funcao, limiteInferior, limiteSuperior, passos),
        };
    }
    gerarFuncao(expressao) {
        return function (x) {
            let expressaoCompilada = math.compile(expressao);
            return expressaoCompilada.eval({ x: x });
        }
    }
    exibirGrafico(funcao, limiteInferior, limiteSuperior) {
        let yMin = Math.min(funcao(limiteInferior), funcao(limiteSuperior));
        let yMax = Math.max(funcao(limiteInferior), funcao(limiteSuperior));
        let horizontalMargin = Math.abs((limiteSuperior - limiteInferior) * 0.1);
        let verticalMargin = Math.abs((yMax - yMin) * 0.1);
        console.log(yMin, yMax);
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
let txtExpressao = d3.select('input#expressao');
let txtLimiteInferior = d3.select('input#limiteInferior');
let txtLimiteSuperior = d3.select('input#limiteSuperior');
let txtPassos = d3.select('input#passos');

let resultadoPontoMedio = d3.select('#ponto-medio');
let resultadoTrapezio = d3.select('#trapezio');

let integracao = new ExemploIntegracao();
integracao.definirElementosEntrada('#expressao', '#limiteInferior', '#limiteSuperior', '#passos', '#integrar');
integracao.definirElementosResultado('#ponto-medio', '#trapezio');
integracao.definirGrafico('#grafico');
