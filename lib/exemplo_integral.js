var trapezio = require('./integral/trapezio');
var pontoMedio = require('./integral/ponto_medio');
var f, a, b, h;
console.log('\n ** Exemplos de Integração Numérica por Ponto Médio e Trapézio. **\n')

console.log(' * Exemplo 1:\n');
console.log('Integrar -0.2x^3+0.125x^2-3x+5 entre 0 e 10 com 5 passos.');

f = (x)=>{ return -0.2*Math.pow(x,3)+0.125*Math.pow(x,2)-3*x+5; }
a = 0;
b = 10;
steps = 5;

console.log('Ponto Médio: ' + pontoMedio(f, a, b, steps));
console.log('Trapézio: ' + trapezio(f, a, b, steps));