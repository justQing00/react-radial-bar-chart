'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorConversionRgb = require('color-conversion-rgb');

var _ring = require('./utils/ring');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* props: {
    list: [
      { name: 'Q1', percent: 0.5, backgroundColor: '' },
      { name: 'Q2', percent: 0.4, backgroundColor: '' },
      { name: 'Q3', percent: 0.3, backgroundColor: '' },
      { name: 'Q4', percent: 0.2, backgroundColor: '' },
    ],
    lineWidth: 20,
    width: 250,
    height: 250,
    radius: 100,

    isGradient: false,
    labelStyle: '#333',
    dataStyle: '#fff',
    tooltipStyle: {},
    title: '',
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

    _this.labelStyle = props.labelStyle || _this.labelStyle || '#333';
    _this.dataStyle = props.dataStyle || _this.dataStyle || '#fff';
    if (_this.isGradient === undefined) {
      _this.isGradient = props.isGradient === undefined ? false : props.isGradient;
    } else {
      _this.isGradient = props.isGradient === undefined ? _this.isGradient : props.isGradient;
    }
    _this.axisName = props.axisName || _this.axisName;

    _this.ratio = props.ratio || _this.ratio || 1;
    _this.list = props.list || _this.list || [];
    _this.width = props.width || _this.width || 250;
    _this.height = props.height || _this.height || 250;
    _this.fontSize = props.fontSize || _this.fontSize || 12;
    _this.x = parseInt(_this.width / 2, 10);
    _this.y = parseInt(_this.height / 2, 10);
    _this.eventPosition = props.eventPosition;
    _this.event = props.event;
    // generate
    var maxHalf = parseInt(Math.min(_this.width, _this.height) / 2, 10) * 0.8;
    _this.lineWidth = (0, _ring.getLineWidth)({ list: _this.list, max: maxHalf });
    _this.distance = _this.lineWidth / 2;
    if (_this.lineWidth <= 0) {
      throw new Error('node width or height is too small to calculate');
    }
    _this.maxRadius = maxHalf - _this.lineWidth / 2;
    var object = (0, _ring.generateListObject)({ list: _this.list, maxRadius: _this.maxRadius, lineWidth: _this.lineWidth, distance: _this.distance });
    _this.radiusList = object.radiusList;
    _this.tmpAngleList = object.tmpAngleList;
    _this.percentList = object.percentList;
    _this.nameList = object.nameList;
    _this.endRadiusList = object.endRadiusList;
    _this.strokeStyleList = object.strokeStyleList;
  };

  this.update = function (props, ctx) {
    _this.setValue(props);
    _this.currentRing = (0, _ring.inWitchRing)({
      radiusList: _this.radiusList,
      endRadiusList: _this.endRadiusList,
      eventPosition: _this.eventPosition,
      center: { x: _this.x, y: _this.y },
      lineWidth: _this.lineWidth,
      ratio: _this.ratio,
      distance: _this.distance
    });
    _this.draw(ctx);
    return _this.list[_this.currentRing];
  };

  this.drawText = function (ctx) {
    var length = _this.radiusList.length;
    var realFontSize = _this.fontSize * _this.ratio;
    ctx.font = realFontSize + 'px Helvetica Neue For Number';
    ctx.textAlign = 'end';
    ctx.fillStyle = _this.labelStyle;
    for (var i = 0; i < length; i += 1) {
      ctx.fillText(_this.nameList[i] + ' ', _this.x, _this.y - _this.radiusList[i] + realFontSize / 4); // name show
    }
    ctx.textAlign = 'center';
    ctx.fillText(_this.axisName || '', _this.x, _this.maxRadius / 8 + realFontSize / 4);

    ctx.fillStyle = _this.dataStyle;
    for (var _i = 0; _i < length; _i += 1) {
      ctx.save();
      var tempPercent = _this.percentList[_i];
      var textPosition = (0, _ring.getPointPosition)({
        center: { x: _this.x, y: _this.y },
        radius: _this.radiusList[_i],
        percent: tempPercent,
        fontSize: realFontSize
      });
      ctx.textAlign = (0, _ring.getTextAlignPercent)(tempPercent);
      ctx.translate(textPosition.x, textPosition.y); // change center point
      ctx.rotate((0, _ring.getRotate)({ endRadius: _this.endRadiusList[_i], percent: tempPercent }));
      ctx.fillText((0, _ring.getTextPercent)(tempPercent), 0, 0); // percent show
      ctx.restore();
    }
  };

  this.drawBase = function (ctx) {
    var useEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // draw stroke
    ctx.translate(0, 0); // change center point
    ctx.clearRect(0, 0, _this.width, _this.height);
    var length = _this.endRadiusList.length;
    for (var i = 0; i < length; i += 1) {
      ctx.beginPath();
      ctx.lineWidth = _this.lineWidth;
      if (_this.currentRing === i) {
        ctx.strokeStyle = (0, _colorConversionRgb.getHoverRgbColor)(_this.strokeStyleList[i]);
      } else if (_this.isGradient) {
        var start = _this.maxRadius / 8 + (_this.maxRadius - _this.radiusList[i]);
        var end = _this.maxRadius / 8 + (_this.maxRadius + _this.radiusList[i]);
        var gradient = ctx.createLinearGradient(0, start, 0, end);
        gradient.addColorStop('0', (0, _colorConversionRgb.getHoverRgbColor)(_this.strokeStyleList[i], 1));
        gradient.addColorStop('1', (0, _colorConversionRgb.getHoverRgbColor)(_this.strokeStyleList[i], 0.56));
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = _this.strokeStyleList[i];
      }
      ctx.arc(_this.x, _this.y, _this.radiusList[i], _ring.startRadius, !useEnd ? _this.tmpAngleList[i] : _this.endRadiusList[i], false);
      ctx.stroke();
      ctx.closePath();
    }
  };

  this.drawInit = function (ctx) {
    // for animation, wait...
    if ((0, _ring.changeTmpAngle)(_this.tmpAngleList, _this.endRadiusList)) {
      _this.drawText(ctx);
      return;
    }
    _this.drawBase(ctx);
    requestAnimationFrame(function () {
      return _this.draw(ctx);
    });
  };

  this.draw = function (ctx) {
    _this.drawBase(ctx, true);
    _this.drawText(ctx);
  };
};

exports.default = Ring;