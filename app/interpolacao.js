'use strict';

let interpolar = require('../lib/interpolacao/interpolar_meg');
let d3 = require('d3');
window.d3 = d3;
let functionPlot = require('function-plot');

class GraficoInterpolador {
    constructor(elemento, largura, altura, elementoTabela) {
        this.polinomios = [];
        this.pontos = [];
        this.opcoes = this.obterOpcoesIniciais(elemento, largura, altura);
        this.instancia = this.definirInstancia(this.opcoes);
        this.registrarEventoClick();
        this.elementoTabela = d3.select(elementoTabela);
    }
    registrarEventoClick() {
        let self = this;
        self.instancia.canvas.on('click', function () {
            let xScale = self.instancia.meta.xScale;
            let yScale = self.instancia.meta.yScale;
            let coordenadas = d3.mouse(this);
            let ponto = [d3.round(xScale.invert(coordenadas[0]), 3), d3.round(yScale.invert(coordenadas[1]), 3)];
            self.pontos.push(ponto);
            let polinomio = self.gerarInterpolacao();
            self.definirInstancia(self.opcoes);
            self.novoPontoTabela(self.pontos.length, ponto[0], ponto[1], polinomio);
        });
    }
    novoPontoTabela(n, x, y, polinomio) {
        let tr = this.elementoTabela.append('tr');
        tr.append('td').text(n);
        tr.append('td').text(x);
        tr.append('td').text(y);
        tr.append('td').text(polinomio);
    }
    gerarInterpolacao() {
        let interpolador = interpolar(this.pontos, 5);
        let polinomioInterpolador = interpolador.p;
        let funcaoInterpoladora = interpolador.f;

        this.opcoes.data.push({
            fnType: 'linear',
            graphType: 'polyline',
            color: 'teal',
            fn: function (p) {
                return funcaoInterpoladora(p.x);
            },
            skipTip: true
        });
        return polinomioInterpolador;
    }
    definirInstancia(opcoes) {
        return functionPlot(opcoes);
    }
    obterOpcoesIniciais(elemento, largura, altura) {
        return {
            target: elemento,
            width: largura,
            height: altura,
            grid: true,
            disableZoom: true,
            xAxis: {
                label: 'eixo - x',
                domain: [-20, 20]
            },
            yAxis: {
                label: 'eixo - y',
                domain: [-10, 10]
            },
            data: [{
                fnType: 'points',
                sampler: 'builtIn',
                points: this.pontos,
                graphType: 'scatter',
                color: 'black',
                attr: {
                    r: '2px',
                },
                skipTip: true
            }],
        };
    }
}

let grafico = new GraficoInterpolador('#grafico', 900, 400, 'tbody#pontos');