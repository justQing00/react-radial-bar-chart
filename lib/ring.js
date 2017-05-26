'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ring = require('./utils/ring');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* props: {
    list: [
      { name: 'Q1', percent: 0.5 },
      { name: 'Q2', percent: 0.4 },
      { name: 'Q3', percent: 0.3 },
      { name: 'Q4', percent: 0.2 },
    ],
    lineWidth: 20,
    width: 250,
    height: 250,
    radius: 100,
    strokeStyle: '#1EB6F8',
* }
*/

var Ring = function Ring(props) {
  _classCallCheck(this, Ring);

  _initialiseProps.call(this);

  this.setValue(props);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setValue = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var list = props.list || [];
    _this.strokeStyle = props.strokeStyle || _this.strokeStyle || '#1EB6F8';
    _this.lineWidth = props.lineWidth || _this.lineWidth || 20;
    _this.width = props.width || 250;
    _this.height = props.height || 250;
    _this.fontSize = props.fontSize || _this.fontSize || 12;
    _this.x = parseInt(props.width / 2, 10);
    _this.y = parseInt(props.height / 2, 10);
    // generate
    var maxRadius = Math.min(_this.width, _this.height) / 2 - _this.lineWidth * 2;
    var object = (0, _ring.generateListObject)({ list: list, maxRadius: maxRadius, lineWidth: _this.lineWidth });
    _this.radiusList = object.radiusList;
    _this.tmpAngleList = object.tmpAngleList;
    _this.percentList = object.percentList;
    _this.nameList = object.nameList;
    _this.endRadiusList = object.endRadiusList;
  };

  this.updateRing = function (props) {
    _this.setValue(props);
  };

  this.drawText = function (ctx) {
    var length = _this.radiusList.length;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = _this.fontSize + 'px Helvetica Neue For Number';
    ctx.textAlign = 'center';
    for (var i = 0; i < length; i += 1) {
      var tempPercent = _this.percentList[i];
      var textPosition = (0, _ring.getPointPosition)({ x: _this.x, y: _this.y }, _this.radiusList[i], tempPercent);
      ctx.fillText(tempPercent, textPosition.x, textPosition.y); // percent show
      ctx.fillText(_this.nameList[i], _this.x, _this.y - _this.radiusList[i] - (_this.fontSize - _this.lineWidth) / 2); // name show
    }
  };

  this.drawBase = function (ctx) {
    // 绘制
    ctx.clearRect(0, 0, _this.width, _this.height);
    var length = _this.endRadiusList.length;
    for (var i = 0; i < length; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = _this.strokeStyle;
      ctx.arc(_this.x, _this.y, _this.radiusList[i], _ring.startRadius, _this.tmpAngleList[i], false);
      ctx.lineWidth = _this.lineWidth;
      ctx.stroke();
      ctx.closePath();
    }
  };

  this.draw = function (ctx) {
    if ((0, _ring.changeTmpAngle)(_this.tmpAngleList, _this.endRadiusList)) {
      _this.drawText(ctx);
      return;
    }
    _this.drawBase(ctx);
    requestAnimationFrame(function () {
      return _this.draw(ctx);
    });
  };
};

exports.default = Ring;