'use strict';
let math = require('mathjs');
let $ = require('jquery');
let euler = require('../lib/edo/euler');
let rk4 = require('../lib/edo/rk4');
let d3 = require('d3');
window.d3 = d3;
let functionPlot = require('function-plot');

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
        let self = this;
        this.buttonResolver.click(function () {
            self.resolver();
        });
    }
    resolver() {
        this.limparResultados();
        let expressao = this.inputExpressao.val();
        let limiteInferior = parseFloat(this.inputLimiteInferior.val());
        let limiteSuperior = parseFloat(this.inputLimiteSuperior.val());
        let valorInicial = parseFloat(this.inputValorInicial.val());
        let intervalo = parseFloat(this.inputIntervalo.val());
        let funcao = this.gerarFuncao(expressao);
        let resultados = {
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
        let tbody = $('#tableResultado tbody');
        console.log(resultados);
        for (let i = 0; i < resultados.euler.length; i++) {
            let x = resultados.euler[i].x;
            let yEuler = resultados.euler[i].y;
            let yRK4 = resultados.rk4[i].y;
            let tr = $('<tr></tr>');
            tr.append('<td>' + x.toFixed(3) + '</td>');
            tr.append('<td>' + yEuler.toFixed(3) + '</td>');
            tr.append('<td>' + yRK4.toFixed(3) + '</td>');
            tbody.append(tr);
        }
    }
    gerarFuncao(expressao) {
        return function (x, y) {
            let expressaoCompilada = math.compile(expressao);
            return expressaoCompilada.eval({ x: x, y: y });
        }
    }
    plotarGrafico(resultados) {
        let eulerData = this.resultado2Vetor(resultados.euler);
        let rk4Data = this.resultado2Vetor(resultados.rk4);
        let dominio = this.obterDominioGrafico([eulerData, rk4Data]);
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
        let dominio = {
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
        
        let xMargin = (dominio.x[1] - dominio.x[0]) * 0.1;
        let yMargin = (dominio.y[1] - dominio.y[0]) * 0.1;
        dominio.x[0] = Math.floor(dominio.x[0] - xMargin);
        dominio.x[1] = Math.ceil(dominio.x[1] + xMargin);
        dominio.y[0] = Math.floor(dominio.y[0] - yMargin);
        dominio.y[1] = Math.ceil(dominio.y[1] + yMargin);        
        
        return dominio;
    }
}

let edo = new ExemploEDO();
edo.definirEntradas('#expressao', '#limiteInferior', '#valorInicial', '#limiteSuperior', '#intervalo', '#resolver');
edo.definirResultados('#tableResultado', '#grafico', '#secao-resultados');