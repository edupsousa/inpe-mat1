'use strict';

var euler = require('./euler');
var rk4 = require('./rk4');
let f, y0, h, a, b;

console.log('\n ** Exemplos de Resolução de Problemas de Valor Inicial. **\n')

console.log(' * Exemplo 1:\n');
console.log('f(x, y) = 2x + 3');
f = (x, y)=>{return 2*x+3};
console.log('y(1) = 1; y(2) = ?');
a=1;
b=2;
y0=1;
console.log('h = 0.5');
h=0.5;
console.log('\nMétodo de Euler:');
console.log(euler(f,a,b,h,y0));
console.log('\nRunge-Kutta de 4ª ordem::');
console.log(rk4(f,a,b,h,y0));
