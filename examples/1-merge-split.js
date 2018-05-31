'use strict';

const ImplicitTreap = require('../implicit-treap.js');

const treap1 = new ImplicitTreap().fromArray([1, 2, 3, 4, 5]);
const treap2 = new ImplicitTreap().fromArray([10, 9, 8, 7, 6]);

const treap3 = treap1.merge(treap2);
console.log([...treap3]);

const [treap4, treap5] = treap3.split(3);
console.log([...treap4], [...treap5]);
