'use strict';
var math = require('mathjs');
var $ = require('jquery');
var euler = require('../lib/edo/euler');
var rk4 = require('../lib/edo/rk4');
var d3 = require('d3');
window.d3 = d3;
var functionPlot = require('function-plot');

class ExemploEDO {
    construct() { }
    definirEntradas(idExpressao, idLimiteInferior, idValorInicial, idLimiteSuperior, idIntervalo, idResolver) {
        this.inputExpressao = $(idExpressao);
        this.inputLimiteInferior = $(idLimiteInferior);
        this.inputValorInicial = $(idValorInicial);
        this.inputLimiteSuperior = $(idLimiteSuperior);
        this.inputIntervalo = $(idIntervalo);
        this.buttonResolver = $(idResolver);
        this.registrarEventoResolver();
    }
    registrarEventoResolver() {
        var self = this;
        this.buttonResolver.click(function () {
            self.resolver();
        });
    }
    resolver() {
        this.limparResultados();
        var expressao = this.inputExpressao.val();
        var limiteInferior = parseFloat(this.inputLimiteInferior.val());
        var limiteSuperior = parseFloat(this.inputLimiteSuperior.val());
        var valorInicial = parseFloat(this.inputValorInicial.val());
        var intervalo = parseFloat(this.inputIntervalo.val());
        var funcao = this.gerarFuncao(expressao);
        var resultados = {
            euler: euler(funcao, limiteInferior, limiteSuperior, intervalo, valorInicial),
            rk4: rk4(funcao, limiteInferior, limiteSuperior, intervalo, valorInicial)
        }
        this.preencherTabelaResultados(resultados);
        this.plotarGrafico(resultados);
        this.mostrarResultados();
    }
    definirResultados(idTableResultado, idGrafico, idSecaoResultados) {
        this.tableResultado = $(idTableResultado);
        this.idGrafico = idGrafico;
        this.secaoResultados = $(idSecaoResultados);
    }
    mostrarResultados() {
        this.secaoResultados.show('slow');
    }
    limparResultados() {
        this.tableResultado.children('tbody').empty();
    }
    preencherTabelaResultados(resultados) {
        var tbody = this.tableResultado.children('tbody');
        for (var i = 0; i < resultados.euler.length; i++) {
            var x = resultados.euler[i].x;
            var yEuler = resultados.euler[i].y;
            var yRK4 = resultados.rk4[i].y;
            var tr = $('<tr></tr>');
            tr.append('<td>' + x.toFixed(3) + '</td>');
            tr.append('<td>' + yEuler.toFixed(3) + '</td>');
            tr.append('<td>' + yRK4.toFixed(3) + '</td>');
            tbody.append(tr);
        }
    }
    gerarFuncao(expressao) {
        return function (x, y) {
            var expressaoCompilada = math.compile(expressao);
            return expressaoCompilada.eval({ x: x, y: y });
        }
    }
    plotarGrafico(resultados) {
        var eulerData = this.resultado2Vetor(resultados.euler);
        var rk4Data = this.resultado2Vetor(resultados.rk4);
        var dominio = this.obterDominioGrafico([eulerData, rk4Data]);
        functionPlot({
            target: this.idGrafico,
            grid: true,
            xAxis: {
                domain: dominio.x
            },
            yAxis: {
                domain: dominio.y
            },
            data: [{
                points: eulerData,
                fnType: 'points',
                graphType: 'scatter',
                color: '#0000ff'
            },{
                points: rk4Data,
                fnType: 'points',
                graphType: 'scatter',
                color: '#ff0000'
            }]
        })
    }
    resultado2Vetor(resultado) {
        return resultado.map(function(ponto) {
            return [ponto.x, ponto.y];
        });
    }
    obterDominioGrafico(data) {
        var dominio = {
            x : [],
            y : []
        }
        data.forEach(function(dataSet) {
           dataSet.forEach(function(point) {
               if (dominio.x[0] === undefined || dominio.x[0] > point[0]) {
                   dominio.x[0] = point[0];
               }
               if (dominio.x[1] === undefined || dominio.x[1] < point[0]) {
                   dominio.x[1] = point[0];
               }
               if (dominio.y[0] === undefined || dominio.y[0] > point[1]) {
                   dominio.y[0] = point[1];
               }
               if (dominio.y[1] === undefined || dominio.y[1] < point[1]) {
                   dominio.y[1] = point[1];
               }
           });
        });
        
        var xMargin = (dominio.x[1] - dominio.x[0]) * 0.1;
        var yMargin = (dominio.y[1] - dominio.y[0]) * 0.1;
        dominio.x[0] = Math.floor(dominio.x[0] - xMargin);
        dominio.x[1] = Math.ceil(dominio.x[1] + xMargin);
        dominio.y[0] = Math.floor(dominio.y[0] - yMargin);
        dominio.y[1] = Math.ceil(dominio.y[1] + yMargin);        
        
        return dominio;
    }
}

module.exports = ExemploEDO;