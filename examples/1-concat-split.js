'use strict';

const ImplicitTreap = require('../implicit-treap.js');

const treap1 = new ImplicitTreap().fromArray([1, 2, 3, 4, 5]);
const treap2 = new ImplicitTreap().fromArray([10, 9, 8, 7, 6]);
const treap3 = new ImplicitTreap().fromArray([11, 12, 13, 14, 15]);

const treap4 = treap1.concat(treap2, treap3);
console.log([...treap4]);

const [treap5, treap6] = treap4.split(8);
console.log([...treap5], [...treap6]);
