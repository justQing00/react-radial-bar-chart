'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
      lineWidth = _ref.lineWidth,
      fontSize = _ref.fontSize;

  var angle = baseAngle * (360 * percent - 90);
  var realRadius = null;
  if (isPercentDirectOut(percent)) {
    // percent direction is not same
    realRadius = radius - (lineWidth - fontSize) / 2;
  } else {
    realRadius = radius + (lineWidth - fontSize) / 2;
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

var generateListObject = exports.generateListObject = function generateListObject(_ref3) {
  var list = _ref3.list,
      maxRadius = _ref3.maxRadius,
      lineWidth = _ref3.lineWidth;

  var radiusList = [];
  var tmpAngleList = [];
  var percentList = [];
  var nameList = [];
  var endRadiusList = [];
  list.forEach(function (single, index) {
    radiusList.push(maxRadius - (lineWidth + 4) * index);
    tmpAngleList.push(startRadius);
    percentList.push(single.percent);
    nameList.push(single.name);
    endRadiusList.push(getEndRadius(single.percent));
  });
  return { radiusList: radiusList, tmpAngleList: tmpAngleList, percentList: percentList, nameList: nameList, endRadiusList: endRadiusList };
};