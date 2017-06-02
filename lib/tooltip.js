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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultFormatter = function defaultFormatter(ringInfo) {
  return '\u5360\u6BD4: ' + ringInfo.percent;
};

var getPosition = function getPosition(_ref) {
  var width = _ref.width,
      height = _ref.height,
      x = _ref.x,
      y = _ref.y,
      clientWidth = _ref.clientWidth,
      clientHeight = _ref.clientHeight;

  if (!clientWidth || !clientHeight) return { x: x, y: y };
  var newX = x;
  var newY = y;
  if (x + clientWidth > width) {
    newX = x - 20 - clientWidth;
  }
  if (y + clientHeight > height) {
    newY = y - 20 - clientHeight;
  }
  return { x: newX, y: newY };
};

var ToolTip = function (_React$Component) {
  _inherits(ToolTip, _React$Component);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    return _possibleConstructorReturn(this, (ToolTip.__proto__ || Object.getPrototypeOf(ToolTip)).apply(this, arguments));
  }

  _createClass(ToolTip, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var $tooltip = ReactDom.findDOMNode(this);
      if (!$tooltip) return;
      this.clientWidth = $tooltip.clientWidth;
      this.clientHeight = $tooltip.clientHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref2 = this.props || {},
          x = _ref2.x,
          y = _ref2.y,
          ringInfo = _ref2.ringInfo,
          title = _ref2.title,
          tooltip = _ref2.tooltip,
          width = _ref2.width,
          height = _ref2.height,
          tooltipStyle = _ref2.tooltipStyle;

      if (!ringInfo) return null;
      var backgroundColor = ringInfo.backgroundColor;

      var _ref3 = tooltip || {},
          _ref3$formatter = _ref3.formatter,
          formatter = _ref3$formatter === undefined ? defaultFormatter : _ref3$formatter,
          _ref3$show = _ref3.show,
          show = _ref3$show === undefined ? true : _ref3$show;

      var tooltipText = formatter(ringInfo);

      var postion = getPosition({ width: width, height: height, x: x, y: y, clientWidth: this.clientWidth, clientHeight: this.clientHeight });
      return React.createElement(
        'div',
        { style: show ? _extends({}, Object.assign(Rectstyle, tooltipStyle), { top: postion.y + 20 + 'px', left: postion.x + 20 + 'px' }) : { display: 'none' } },
        title ? React.createElement(
          'div',
          { style: headerStyle },
          title
        ) : null,
        tooltipText ? React.createElement(
          'div',
          { style: { position: 'relative', whiteSpace: 'nowrap' } },
          React.createElement('span', { style: _extends({}, iconStyle, { backgroundColor: backgroundColor || 'rgb(211,0,57)' }) }),
          React.createElement(
            'div',
            { style: valueStyle },
            tooltipText
          )
        ) : null
      );
    }
  }]);

  return ToolTip;
}(React.Component);

exports.default = ToolTip;


var Rectstyle = {
  position: 'absolute',
  zIndex: 2,
  width: 'auto',
  height: 'auto',
  display: 'inline-block',
  backgroundColor: 'rgba(0,0,0,0.65)',
  pointerEvents: 'none',
  padding: '5px',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#fff'
};

var headerStyle = {
  color: '#fff'
};

var iconStyle = {
  position: 'absolute',
  width: '9px',
  height: '9px',
  borderRadius: '100%',
  top: '7px'
};

var valueStyle = {
  paddingLeft: '15px'
};