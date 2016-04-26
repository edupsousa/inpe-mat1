'use strict';
let ExemploIntegracao = require('./ExemploIntegracao');
let integracao = new ExemploIntegracao();
integracao.definirElementosEntrada('#expressao', '#limiteInferior', '#limiteSuperior', '#passos', '#integrar');
integracao.definirElementosResultado('#secao-resultados', '#ponto-medio', '#trapezio');
integracao.definirGrafico('#grafico');
