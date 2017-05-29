"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getEventPosition = exports.getEventPosition = function getEventPosition(event) {
  var x = null;
  var y = null;
  if (event.layerX || event.layerX === 0) {
    x = event.layerX;
    y = event.layerY;
  } else if (event.offsetX || event.offsetX === 0) {
    x = event.offsetX;
    y = event.offsetY;
  }
  return { x: x, y: y };
};

var getPixelRatio = exports.getPixelRatio = function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};