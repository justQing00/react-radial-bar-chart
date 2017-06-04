'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactChartCanvas = require('react-chart-canvas');

var _reactChartCanvas2 = _interopRequireDefault(_reactChartCanvas);

var _ring = require('./ring');

var _ring2 = _interopRequireDefault(_ring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadialBarChart = function RadialBarChart(props) {
  return React.createElement(_reactChartCanvas2.default, _extends({ Chart: _ring2.default }, props));
};

exports.default = RadialBarChart;