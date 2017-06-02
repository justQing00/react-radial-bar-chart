'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDom = _interopRequireWildcard(_reactDom);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadialBarChart.__proto__ || Object.getPrototypeOf(RadialBarChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      ringInfo: null,
      eventPosition: null,
      width: null,
      height: null
    }, _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      var ringInfo = _this.ring.updateRing({ event: 'onClick', eventPosition: (0, _canvas.getEventPosition)(e) }, _this.ctx);
      if (onClick && ringInfo) onClick(e, ringInfo);
    }, _this.onMove = function (e) {
      var onHover = _this.props.onHover;

      var eventPosition = (0, _canvas.getEventPosition)(e);
      var ringInfo = _this.ring.updateRing({ event: 'onMove', eventPosition: eventPosition }, _this.ctx);
      if (onHover && ringInfo) onHover(e, ringInfo);
      _this.setState({ ringInfo: ringInfo, eventPosition: eventPosition });
    }, _this.resize = function () {
      var ratio = (0, _canvas.getPixelRatio)(_this.ctx);
      var _this$state = _this.state,
          width = _this$state.width,
          height = _this$state.height;

      var $parentNode = ReactDom.findDOMNode(_this).parentNode;
      var clientWidth = $parentNode.clientWidth;
      var clientHeight = $parentNode.clientHeight;
      var newWidth = clientWidth * ratio;
      var newHeight = clientHeight * ratio;
      _this.canvas.width = newWidth;
      _this.canvas.height = newHeight;
      _this.ring.updateRing(Object.assign(_extends({}, _this.props), { width: newWidth, height: newHeight, ratio: ratio }), _this.ctx);
      if (width !== clientWidth || height !== clientHeight) {
        _this.setState({ width: clientWidth, height: clientHeight, ringInfo: null, eventPosition: null });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadialBarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ctx = this.canvas.getContext('2d');
      this.canvas.addEventListener('mousemove', this.onMove);
      this.canvas.addEventListener('click', this.onClick);
      this.ring = new _ring2.default(this.props);
      window.addEventListener('resize', this.resize);
      this.resize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.ring.updateRing(nextProps, this.ctx);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvas.removeEventListener('mousemove', this.onMove, false);
      this.canvas.removeEventListener('click', this.onClick, false);
      window.removeEventListener('resize', this.resize, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          ringInfo = _state.ringInfo,
          eventPosition = _state.eventPosition,
          width = _state.width,
          height = _state.height;
      var _props = this.props,
          tooltip = _props.tooltip,
          title = _props.title,
          tooltipStyle = _props.tooltipStyle;

      return React.createElement(
        'div',
        { style: { position: 'relative', width: '100%', height: '100%' } },
        React.createElement(_tooltip2.default, _extends({
          width: width,
          height: height,
          tooltip: tooltip,
          title: title,
          ringInfo: ringInfo,
          tooltipStyle: tooltipStyle
        }, eventPosition)),
        React.createElement('canvas', { style: { position: 'absolute', width: width, height: height }, ref: function ref(canvas) {
            _this2.canvas = canvas;
          } })
      );
    }
  }]);

  return RadialBarChart;
}(React.Component);

exports.default = RadialBarChart;