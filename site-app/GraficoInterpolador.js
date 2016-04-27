'use strict';
var interpolar = require('../lib/interpolacao/interpolar_meg');
var d3 = require('d3');
window.d3 = d3;
var functionPlot = require('function-plot');

class GraficoInterpolador {
    constructor(elemento, largura, altura, elementoTabela) {
        this.pontos = [];
        this.opcoes = this.obterOpcoesIniciais(elemento, largura, altura);
        this.instancia = this.definirInstancia(this.opcoes);
        this.registrarEventoClick();
        this.elementoTabela = d3.select(elementoTabela);
    }
    registrarEventoClick() {
        var self = this;
        self.instancia.canvas.on('click', function () {
            var ponto = self.adicionarPonto(d3.mouse(this));
            var interpolacao = self.gerarInterpolacao();
            self.adicionarInterpolacao(interpolacao);
            self.novoPontoTabela(self.pontos.length, ponto[0], ponto[1], interpolacao.p);
        });
    }
    adicionarPonto(coordenadas) {
        var xScale = this.instancia.meta.xScale;
        var yScale = this.instancia.meta.yScale;
        var ponto = [d3.round(xScale.invert(coordenadas[0]), 3), d3.round(yScale.invert(coordenadas[1]), 3)];
        this.pontos.push(ponto);
        return ponto;
    }
    novoPontoTabela(n, x, y, polinomio) {
        var tr = this.elementoTabela.append('tr');
        tr.append('td').text(n);
        tr.append('td').text(x);
        tr.append('td').text(y);
        tr.append('td').text(polinomio);
    }
    
    adicionarInterpolacao(interpolacao) {
        this.opcoes.data.push({
            fnType: 'linear',
            graphType: 'polyline',
            color: 'teal',
            fn: function (p) {
                return interpolacao.f(p.x);
            },
            skipTip: true
        });
        this.definirInstancia(this.opcoes);
    }
    gerarInterpolacao() {
        return interpolar(this.pontos);
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

module.exports = GraficoInterpolador;