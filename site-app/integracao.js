'use strict';
let d3 = require('d3');
let math = require('mathjs');
let pontoMedio = require('../lib/integral/ponto_medio');
let trapezio = require('../lib/integral/trapezio');

let txtExpressao = d3.select('input#expressao');
let txtLimiteInferior = d3.select('input#limiteInferior');
let txtLimiteSuperior = d3.select('input#limiteSuperior');
let txtPassos = d3.select('input#passos');

let resultadoPontoMedio = d3.select('#ponto-medio');
let resultadoTrapezio = d3.select('#trapezio');

d3.select('button#integrar').on('click', function() {
    let expressao = txtExpressao.node().value;
    let limiteInferior = parseFloat(txtLimiteInferior.node().value);
    let limiteSuperior = parseFloat(txtLimiteSuperior.node().value);
    let passos = parseFloat(txtPassos.node().value);
    
    let funcao = gerarFuncaoDaExpressao(expressao);
    
    let resultado = {
        trapezio: trapezio(funcao, limiteInferior, limiteSuperior, passos),
        pontoMedio: pontoMedio(funcao, limiteInferior, limiteSuperior, passos),
    };
    
    resultadoPontoMedio.text(resultado.pontoMedio.toFixed(3));
    resultadoTrapezio.text(resultado.trapezio.toFixed(3));
    
});

function gerarFuncaoDaExpressao(expressao) {
    return function(x) {
        let expressaoCompilada = math.compile(expressao);
        return expressaoCompilada.eval({x: x});
    }
}