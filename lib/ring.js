'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ring = require('./utils/ring');

var _color = require('./utils/color');

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

    _this.list = props.list || _this.list || [];
    _this.lineWidth = props.lineWidth || _this.lineWidth || 20;
    _this.width = props.width || _this.width || 250;
    _this.height = props.height || _this.height || 250;
    _this.fontSize = props.fontSize || _this.fontSize || 12;
    _this.x = parseInt(_this.width / 2, 10);
    _this.y = parseInt(_this.height / 2, 10);
    _this.eventPosition = props.eventPosition;
    _this.event = props.event;
    // generate
    var maxRadius = Math.min(_this.width, _this.height) / 2 - _this.lineWidth * 2;
    var object = (0, _ring.generateListObject)({ list: _this.list, maxRadius: maxRadius, lineWidth: _this.lineWidth });
    _this.radiusList = object.radiusList;
    _this.tmpAngleList = object.tmpAngleList;
    _this.percentList = object.percentList;
    _this.nameList = object.nameList;
    _this.endRadiusList = object.endRadiusList;
    _this.strokeStyleList = object.strokeStyleList;
  };

  this.updateRing = function (props, ctx) {
    _this.currentRing = (0, _ring.inWitchRing)({
      radiusList: _this.radiusList,
      eventPosition: _this.eventPosition,
      center: { x: _this.x, y: _this.y },
      lineWidth: _this.lineWidth
    });
    _this.setValue(props);
    _this.draw(ctx);
    return _this.list[_this.currentRing];
  };

  this.drawText = function (ctx) {
    var length = _this.radiusList.length;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = _this.fontSize + 'px Helvetica Neue For Number';
    ctx.textAlign = 'end';
    for (var i = 0; i < length; i += 1) {
      ctx.fillText(_this.nameList[i] + ' ', _this.x, _this.y - _this.radiusList[i] - (_this.fontSize - _this.lineWidth) / 2); // name show
    }
    for (var _i = 0; _i < length; _i += 1) {
      ctx.save();
      var tempPercent = _this.percentList[_i];
      var textPosition = (0, _ring.getPointPosition)({
        center: { x: _this.x, y: _this.y },
        radius: _this.radiusList[_i],
        percent: tempPercent,
        lineWidth: _this.lineWidth,
        fontSize: _this.fontSize
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
        ctx.strokeStyle = (0, _color.getHoverRgbColor)(_this.strokeStyleList[i]);
      } else {
        ctx.strokeStyle = _this.strokeStyleList[i];
      }
      ctx.arc(_this.x, _this.y, _this.radiusList[i], _ring.startRadius, !useEnd ? _this.tmpAngleList[i] : _this.endRadiusList[i], false);
      ctx.stroke();
      ctx.closePath();
    }
  };

  this.drawInit = function (ctx) {
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