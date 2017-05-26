'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* props: {
*   percent: 0, // 百分比
*   value: 0,  //  具体值
*   width: 250, // 宽度
*   height: 250, // 高度
*   radius: 100, // 半径
*   strokeStyle: '#1EB6F8', // 边颜色
* }
*/

var incre = Math.PI / 18;
var startRadius = -Math.PI / 2; // 12点方向开始
var circumference = Math.PI * 2;
var partCircumference = Math.PI / 2;
var baseAngle = 2 * Math.PI / 360;

var getEndRadius = function getEndRadius(percent) {
  return percent && circumference * percent - partCircumference;
};

// 获得点坐标
var getPointPosition = function getPointPosition(center, radius, percent) {
  var temp = baseAngle * (360 * percent - 90);
  return { x: center.x + radius * Math.cos(temp), y: center.y + radius * Math.sin(temp) };
};

var Ring = function Ring(props) {
  _classCallCheck(this, Ring);

  _initialiseProps.call(this);

  this.setValue(props);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setValue = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _this.strokeStyle = props.strokeStyle || _this.strokeStyle || '#1EB6F8';
    _this.lineWidth = props.lineWidth || _this.lineWidth || 20;
    _this.radius = props.radius || _this.radius || 100;
    _this.width = props.width || 250;
    _this.height = props.height || 250;
    _this.fontSize = props.fontSize || _this.fontSize || 12;
    _this.startRadius = startRadius;
    _this.tmpAngle = _this.startRadius;
    // may change value
    _this.percent = props.percent;
    _this.endRadius = getEndRadius(props.percent);
    _this.x = parseInt(props.width / 2, 10);
    _this.y = parseInt(props.height / 2, 10);
  };

  this.updateRing = function (props) {
    _this.setValue(props);
  };

  this.drwaText = function (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = _this.fontSize + 'px Helvetica Neue For Number';
    ctx.textAlign = 'center';
    var textPosition = getPointPosition({ x: _this.x, y: _this.y }, _this.radius, _this.percent);
    ctx.fillText(_this.percent, textPosition.x, textPosition.y);
  };

  this.drawBase = function (ctx, endRadius) {
    // 绘制
    ctx.clearRect(0, 0, _this.width, _this.height);
    ctx.beginPath();
    ctx.strokeStyle = _this.strokeStyle;
    ctx.arc(_this.x, _this.y, _this.radius, _this.startRadius, endRadius || _this.endRadius, false);
    ctx.lineWidth = _this.lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  this.draw = function (ctx) {
    if (_this.tmpAngle >= _this.endRadius) {
      _this.drwaText(ctx);
      return;
    } else if (_this.tmpAngle + incre > _this.endRadius) {
      _this.tmpAngle = _this.endRadius;
    } else {
      _this.tmpAngle += incre;
    }
    _this.drawBase(ctx, _this.tmpAngle);
    requestAnimationFrame(function () {
      return _this.draw(ctx);
    });
  };
};

exports.default = Ring;