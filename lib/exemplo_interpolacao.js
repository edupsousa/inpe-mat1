'use strict';

var interpolar = require('./interpolacao/interpolar_meg');

console.log('\n ** Exemplos de Interpolação com Método de Eliminação Gaussiana. **\n')
let pontos;

console.log('\n * Exemplo 1:\n');
console.log('Interpolar {(-1,4),(0,1),(2,-1)}:');
pontos = [[-1,4],[0,1],[2,-1]];
console.log(interpolar(pontos));

console.log('\n * Exemplo 2:\n');
console.log('Interpolar {(-3,14),(1,-2/3),(3,0)}:');
pontos = [[-3,14],[1,-2/3],[3,0]];
console.log(interpolar(pontos));