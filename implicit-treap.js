'use strict';

const { Queue, Stack } = require('./lib/linked-list.js');

function ImplicitTreap(recalc) {
  this.recalc = recalc || (() => {});
  this.root = null;
}

ImplicitTreap.prototype.node = function(data) {
  const node = {
    data,
    priority: Math.random(),
    size: 1,
    left: null,
    right: null,
    queue: new Queue()
  };
  this.recalc(node);
  return node;
};

ImplicitTreap.prototype._recalc = function(node) {
  node.size = 1;
  if (node.left) node.size += node.left.size;
  if (node.right) node.size += node.right.size;
  this.recalc(node);
};

ImplicitTreap.prototype._push = function(node) {
  if (!node) return;
  while (!node.queue.empty()) {
    const fn = node.queue.pop();
    fn(node);
    if (node.left) node.left.queue.push(fn);
    if (node.right) node.right.queue.push(fn);
  }
};

ImplicitTreap.prototype._merge = function(left, right) {
  this._push(left);
  this._push(right);
  if (!left) return right;
  if (!right) return left;
  if (left.priority > right.priority) {
    left.right = this._merge(left.right, right);
    this._recalc(left);
    return left;
  } else {
    right.left = this._merge(left, right.left);
    this._recalc(right);
    return right;
  }
};

ImplicitTreap.prototype._split = function(index, node) {
  this._push(node);
  let temp = null, left, right;
  const currentIndex = (node.left ? node.left.size : 0) + 1;
  if (currentIndex <= index) {
    if (node.right === null) right = null;
    else [temp, right] = this._split(index - currentIndex, node.right);
    left = node;
    left.right = temp;
    this._recalc(left);
  } else {
    if (node.left === null) left = null;
    else [left, temp] = this._split(index, node.left);
    right = node;
    right.left = temp;
    this._recalc(right);
  }
  return [left, right];
};

ImplicitTreap.prototype.insert = function(pos, data) {
  if (!this.root) {
    this.root = this.node(data);
    return;
  }
  const [left, right] = this._split(pos, this.root);
  this.root = this._merge(this._merge(left, this.node(data)), right);
};

ImplicitTreap.prototype.push = function(data) {
  this.insert(this.root ? this.root.size : 0, data);
};

ImplicitTreap.prototype.fromArray = function(array) {
  this.root = null;
  for (const element of array) this.push(element);
  return this;
};

ImplicitTreap.prototype.remove = function(pos) {
  const [oldLeft, right] = this._split(pos, this.root);
  const [left, removedNode] = this._split(pos - 1, oldLeft);
  this.root = this._merge(left, right);
  return removedNode.data;
};

ImplicitTreap.prototype.get = function(index) {
  let node = this.root;
  while (true) {
    this._push(node);
    const currentIndex = (node.left ? node.left.size : 0) + 1;
    if (currentIndex === index) return node.data;
    else if (currentIndex > index) node = node.left;
    else {
      index -= currentIndex;
      node = node.right;
    }
  }
};

ImplicitTreap.prototype.merge = function(right) {
  this.root = this._merge(this.root, right.root);
  return this;
};

ImplicitTreap.prototype.split = function(index) {
  const left = new ImplicitTreap(this.recalc);
  const right = new ImplicitTreap(this.recalc);
  [left.root, right.root] = this._split(index, this.root);
  return [left, right];
};

ImplicitTreap.prototype.rangeQuery = function(l, r, query) {
  const [leftMiddle, right] = this._split(r, this.root);
  const [left, middle] = this._split(l - 1, leftMiddle);
  const answer = middle[query];
  this.root = this._merge(this._merge(left, middle), right);
  return answer;
};

ImplicitTreap.prototype.rangeUpdate = function(l, r, fn) {
  const [leftMiddle, right] = this._split(r, this.root);
  const [left, middle] = this._split(l - 1, leftMiddle);
  middle.queue.push(fn);
  this.root = this._merge(this._merge(left, middle), right);
};

ImplicitTreap.prototype[Symbol.iterator] = function() {
  const nodes = new Stack();
  const labels = new Stack();
  let node = this.root;
  let label = 0;
  return {
    next: () => {
      while (label === 2) {
        node = nodes.pop();
        label = labels.pop();
      }
      if (!node) return { done: true };
      if (label === 0) {
        this._push(node);
        while (node.left) {
          nodes.push(node);
          labels.push(1);
          node = node.left;
          this._push(node);
        }
      }
      const value = node.data;
      if (node.right) {
        nodes.push(node);
        labels.push(2);
        node = node.right;
        label = 0;
      } else {
        node = nodes.pop();
        label = labels.pop();
      }
      return { value, done: false };
    }
  };
};

module.exports = ImplicitTreap;
