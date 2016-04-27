'use strict';
var interpolar = require('../lib/interpolacao/interpolar_meg');
var d3 = require('d3');
window.d3 = d3;
var functionPlot = require('function-plot');

function GraficoInterpolador(elemento, largura, altura, elementoTabela) {
    this.pontos = [];
    this.opcoes = this.obterOpcoesIniciais(elemento, largura, altura);
    this.instancia = this.definirInstancia(this.opcoes);
    this.registrarEventoClick();
    this.elementoTabela = d3.select(elementoTabela);
}

GraficoInterpolador.prototype.registrarEventoClick = function registrarEventoClick() {
    var self = this;
    self.instancia.canvas.on('click', function () {
        var ponto = self.adicionarPonto(d3.mouse(this));
        var interpolacao = self.gerarInterpolacao();
        self.adicionarInterpolacao(interpolacao);
        self.novoPontoTabela(self.pontos.length, ponto[0], ponto[1], interpolacao.p);
    });
};

GraficoInterpolador.prototype.adicionarPonto = function adicionarPonto(coordenadas) {
    var xScale = this.instancia.meta.xScale;
    var yScale = this.instancia.meta.yScale;
    var ponto = [d3.round(xScale.invert(coordenadas[0]), 3), d3.round(yScale.invert(coordenadas[1]), 3)];
    this.pontos.push(ponto);
    return ponto;
};

GraficoInterpolador.prototype.novoPontoTabela = function novoPontoTabela(n, x, y, polinomio) {
    var tr = this.elementoTabela.append('tr');
    tr.append('td').text(n);
    tr.append('td').text(x);
    tr.append('td').text(y);
    tr.append('td').text(polinomio);
};

GraficoInterpolador.prototype.adicionarInterpolacao = function adicionarInterpolacao(interpolacao) {
    this.opcoes.data.push({
        fnType: 'linear',
        graphType: 'polyline',
        color: 'teal',
        fn: function fn(p) {
            return interpolacao.f(p.x);
        },
        skipTip: true
    });
    this.definirInstancia(this.opcoes);
};

GraficoInterpolador.prototype.gerarInterpolacao = function gerarInterpolacao() {
    return interpolar(this.pontos);
};

GraficoInterpolador.prototype.definirInstancia = function definirInstancia(opcoes) {
    return functionPlot(opcoes);
};

GraficoInterpolador.prototype.obterOpcoesIniciais = function obterOpcoesIniciais(elemento, largura, altura) {
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
                r: '2px'
            },
            skipTip: true
        }]
    };
};

module.exports = GraficoInterpolador;