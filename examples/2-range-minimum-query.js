'use strict';

const ImplicitTreap = require('../implicit-treap.js');

const min = (a, b) => (a < b ? a : b);

const treap = new ImplicitTreap(node => {
  node.min = node.data;
  if (node.left) node.min = min(node.min, node.left.min);
  if (node.right) node.min = min(node.min, node.right.min);
}).fromArray([66, 49, 10, 20, 35, 58, 99, 13, 28, 77]);

console.log(treap.rangeQuery(4, 8, 'min'));
