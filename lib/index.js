'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _ring = require('./ring');

var _ring2 = _interopRequireDefault(_ring);

var _canvas = require('./utils/canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadialBarChart = function (_React$Component) {
  _inherits(RadialBarChart, _React$Component);

  function RadialBarChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadialBarChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadialBarChart.__proto__ || Object.getPrototypeOf(RadialBarChart)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      var ringInfo = _this.ring.updateRing({ event: 'onClick', eventPosition: (0, _canvas.getEventPosition)(e) }, _this.ctx);
      if (onClick && ringInfo) onClick(e, ringInfo);
    }, _this.onMove = function (e) {
      var onHover = _this.props.onHover;

      var ringInfo = _this.ring.updateRing({ event: 'onMove', eventPosition: (0, _canvas.getEventPosition)(e) }, _this.ctx);
      if (onHover && ringInfo) onHover(e, ringInfo);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadialBarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ctx = this.canvas.getContext('2d');
      this.canvas.addEventListener('mousemove', this.onMove);
      this.canvas.addEventListener('click', this.onClick);
      this.ring = new _ring2.default({
        width: 600,
        height: 360,
        list: [{ name: '问题1', percent: 0.85 }, { name: '问题2', percent: 0.5 }, { name: '问题2', percent: 0.5 }, { name: '问题3', percent: 0.4 }, { name: '问题4', percent: 0.3 }, { name: '问题5', percent: 0.2 }]
      });
      this.ring.drawInit(this.ctx);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvas.removeEventListener('mousemove', this.onMove, false);
      this.canvas.removeEventListener('click', this.onClick, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement('canvas', { width: '600', height: '360', ref: function ref(canvas) {
            _this2.canvas = canvas;
          } })
      );
    }
  }]);

  return RadialBarChart;
}(React.Component);

exports.default = RadialBarChart;