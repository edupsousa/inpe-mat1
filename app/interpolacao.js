'use strict';

let interpolar = require('../lib/interpolacao/interpolar_meg');
let d3 = require('d3');
window.d3 = d3;
let functionPlot = require('function-plot');

let points = [];

let options = {
    target: '#grafico',
    width: 900,
    height: 400,
    grid: true,
    disableZoom: true,
    xAxis: {
        label: 'eixo - x',
        domain: [-20,20]
    },
    yAxis: {
        label: 'eixo - y',
        domain: [-10,10]
    },
    data: [{
        fnType: 'points',
        sampler: 'builtIn',
        points: points,
        graphType: 'scatter',
        color: 'black',
        attr: {
            r: '2px',
        },
        skipTip: true
    }],
};
let instance = functionPlot(options);
let canvas = instance.canvas;
let xScale = instance.meta.xScale;
let yScale = instance.meta.yScale;

canvas.on('click', adicionarPonto);

let tbodyPontos = d3.select('tbody#pontos');

function adicionarPonto() {
    let coord = d3.mouse(this);
    let point = [d3.round(xScale.invert(coord[0]), 3), d3.round(yScale.invert(coord[1]),3)];
    points.push(point);
    let polinomio = novaInterpolacao();
    functionPlot(options);
    novoPontoTabela(points.length, point[0], point[1], polinomio);
}

function novaInterpolacao() {
    let interpolador = interpolar(points, 5);
    let polinomioInterpolador = interpolador.p;
    let funcaoInterpoladora = interpolador.f;
    
    options.data.push({
        fnType: 'linear',
        graphType: 'polyline',
        color: 'teal',
        fn: function(p) {
            return funcaoInterpoladora(p.x);
        },
        skipTip: true
    });
    return polinomioInterpolador;
}

function novoPontoTabela(n, x, y, polinomio) {
    let tr = tbodyPontos.append('tr');
    tr.append('td').text(n);
    tr.append('td').text(x);
    tr.append('td').text(y);
    tr.append('td').text(polinomio);
}