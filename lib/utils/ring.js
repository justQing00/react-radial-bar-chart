'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inWitchRing = exports.generateListObject = exports.changeTmpAngle = exports.getLineWidth = exports.getTextPercent = exports.getTextAlignPercent = exports.getRotate = exports.getPointPosition = exports.startRadius = undefined;

var _color = require('./color');

var incre = Math.PI / 18;
var circumference = Math.PI * 2;
var baseAngle = 2 * Math.PI / 360;
var partCircumference = Math.PI / 2;
var startRadius = exports.startRadius = -partCircumference; // start with 12: 00 direction

var getEndRadius = function getEndRadius(percent) {
  return percent && circumference * percent - partCircumference;
};

// percent direct out
var isPercentDirectOut = function isPercentDirectOut(percent) {
  return percent <= 0.25 || percent > 0.75;
};

// get point position
var getPointPosition = exports.getPointPosition = function getPointPosition(_ref) {
  var center = _ref.center,
      radius = _ref.radius,
      percent = _ref.percent,
      fontSize = _ref.fontSize;

  var angle = baseAngle * (360 * percent - 90);
  var realRadius = null;
  if (isPercentDirectOut(percent)) {
    // percent direction is not same
    realRadius = radius - fontSize / 2;
  } else {
    realRadius = radius + fontSize / 4; // back to orign size calc
  }
  return { x: center.x + realRadius * Math.cos(angle), y: center.y + realRadius * Math.sin(angle) };
};

// get rotate
var getRotate = exports.getRotate = function getRotate(_ref2) {
  var endRadius = _ref2.endRadius,
      percent = _ref2.percent;

  if (isPercentDirectOut(percent)) {
    // percent direction is not same
    return endRadius - startRadius;
  }
  return endRadius + startRadius;
};

var getTextAlignPercent = exports.getTextAlignPercent = function getTextAlignPercent(percent) {
  if (isPercentDirectOut(percent)) {
    return 'end';
  }
  return 'start';
};

var getTextPercent = exports.getTextPercent = function getTextPercent(percent) {
  if (isPercentDirectOut(percent)) {
    return percent + ' ';
  }
  return ' ' + percent;
};

var getLineWidth = exports.getLineWidth = function getLineWidth(_ref3) {
  var list = _ref3.list,
      max = _ref3.max;

  var len = list.length;
  var distanceLen = (len - 1) / 2;
  return parseFloat((max - 16) / (len + distanceLen), 10);
};

// temp Angle change
var changeTmpAngle = exports.changeTmpAngle = function changeTmpAngle(tmpAngleList, endRadiusList) {
  var num = 0;
  var length = endRadiusList.length;
  for (var i = 0; i < length; i += 1) {
    if (tmpAngleList[i] >= endRadiusList[i]) {
      num += 1;
    } else if (tmpAngleList[i] + incre > endRadiusList[i]) {
      tmpAngleList[i] = endRadiusList[i];
    } else {
      tmpAngleList[i] += incre;
    }
  }
  return num === length;
};

var generateListObject = exports.generateListObject = function generateListObject(_ref4) {
  var list = _ref4.list,
      maxRadius = _ref4.maxRadius,
      lineWidth = _ref4.lineWidth,
      distance = _ref4.distance;

  var radiusList = [];
  var tmpAngleList = [];
  var percentList = [];
  var nameList = [];
  var endRadiusList = [];
  var strokeStyleList = [];
  list.forEach(function (single, index) {
    radiusList.push(maxRadius - (lineWidth + distance) * index);
    tmpAngleList.push(startRadius);
    percentList.push(single.percent);
    nameList.push(single.name);
    endRadiusList.push(getEndRadius(single.percent));
    strokeStyleList.push(single.backgroundColor || (0, _color.randomColor)(index));
  });
  return { radiusList: radiusList, tmpAngleList: tmpAngleList, percentList: percentList, nameList: nameList, endRadiusList: endRadiusList, strokeStyleList: strokeStyleList };
};

var inWitchRing = exports.inWitchRing = function inWitchRing(_ref5) {
  var radiusList = _ref5.radiusList,
      endRadiusList = _ref5.endRadiusList,
      eventPosition = _ref5.eventPosition,
      center = _ref5.center,
      lineWidth = _ref5.lineWidth,
      ratio = _ref5.ratio,
      distance = _ref5.distance;

  if (!eventPosition) return null;
  var x = eventPosition.x * ratio - center.x;
  var y = eventPosition.y * ratio - center.y;
  var pRadius = Math.sqrt(x * x + y * y); // point radius
  var halfLineWidth = lineWidth / 2;
  for (var i = 0; i < radiusList.length; i += 1) {
    var beginRadius = radiusList[i] - halfLineWidth - distance;
    var endRadius = radiusList[i] + halfLineWidth;
    if (pRadius >= beginRadius && pRadius <= endRadius && checkPointInRing({ x: x, y: y, endRadius: endRadiusList[i] })) {
      return i;
    }
  }
  return null;
};

// point is in this ring
var checkPointInRing = function checkPointInRing(_ref6) {
  var x = _ref6.x,
      y = _ref6.y,
      endRadius = _ref6.endRadius;

  var xyangle = Math.atan(y / x) * (180 / Math.PI);
  return endRadius > getEndRadius(getRealAngleByQuadrant({ xyangle: xyangle, x: x, y: y }) / 360);
};

var getRealAngleByQuadrant = function getRealAngleByQuadrant(_ref7) {
  var xyangle = _ref7.xyangle,
      x = _ref7.x,
      y = _ref7.y;

  if (x >= 0 && y >= 0) {
    return 90 - xyangle;
  } else if (x >= 0 && y < 0) {
    return 90 + xyangle;
  } else if (x < 0 && y < 0) {
    return 270 - xyangle;
  }
  return 270 + xyangle;
};