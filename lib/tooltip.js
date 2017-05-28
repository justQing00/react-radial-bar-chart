'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultFormatter = function defaultFormatter(ringInfo) {
  return [{ key: '占比', value: ringInfo.percent }];
};

var ToolTip = function (_React$Component) {
  _inherits(ToolTip, _React$Component);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    return _possibleConstructorReturn(this, (ToolTip.__proto__ || Object.getPrototypeOf(ToolTip)).apply(this, arguments));
  }

  _createClass(ToolTip, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          x = _props.x,
          y = _props.y,
          ringInfo = _props.ringInfo,
          tooltip = _props.tooltip;

      if (!ringInfo) return null;
      var name = ringInfo.name,
          backgroundColor = ringInfo.backgroundColor;

      var _ref = tooltip || {},
          _ref$formatter = _ref.formatter,
          formatter = _ref$formatter === undefined ? defaultFormatter : _ref$formatter,
          _ref$show = _ref.show,
          show = _ref$show === undefined ? true : _ref$show;

      return React.createElement(
        'div',
        { style: show ? _extends({}, Rectstyle, { top: y, left: x }) : { display: 'none' } },
        React.createElement(
          'div',
          { style: headerStyle },
          name
        ),
        formatter(ringInfo).map(function (_ref2) {
          var key = _ref2.key,
              value = _ref2.value;

          return React.createElement(
            'div',
            { key: key, style: { position: 'relative' } },
            React.createElement('span', { style: _extends({}, iconStyle, { backgroundColor: backgroundColor || 'rgb(211,0,57)' }) }),
            React.createElement(
              'div',
              { style: valueStyle },
              key + ': ' + value
            )
          );
        })
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
  borderRadius: '6px',
  padding: '10px',
  pointerEvents: 'none'
};

var headerStyle = {
  color: '#fff'
};

var iconStyle = {
  position: 'absolute',
  width: '6px',
  height: '6px',
  borderRadius: '100%',
  top: '6px'
};

var valueStyle = {
  paddingLeft: '12px',
  color: '#fff'
};