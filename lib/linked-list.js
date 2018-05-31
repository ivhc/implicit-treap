'use strict';

// Queue

function Queue() {
  this.first = null;
  this.last = null;
}

Queue.prototype.push = function(item) {
  if (this.first) {
    this.last.next = { next: null, item };
    this.last = this.last.next;
  } else this.first = this.last = { next: null, item };
};

Queue.prototype.pop = function() {
  if (!this.first) return null;
  const item = this.first.item;
  this.first = this.first.next;
  if (!this.first) this.last = null;
  return item;
};

Queue.prototype.empty = function() {
  return !this.first;
};

// Stack

function Stack() {
  this.last = null;
}

Stack.prototype.push = function(item) {
  this.last = { prev: this.last, item };
};

Stack.prototype.pop = function() {
  if (!this.last) return null;
  const item = this.last.item;
  this.last = this.last.prev;
  return item;
};

module.exports = { Queue, Stack };
