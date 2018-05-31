'use strict';

const ImplicitTreap = require('../implicit-treap.js');

const treap = new ImplicitTreap().fromArray([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
]);

treap.rangeUpdate(3, 13, node => {
  const temp = node.left;
  node.left = node.right;
  node.right = temp;
});

console.log([...treap]);
