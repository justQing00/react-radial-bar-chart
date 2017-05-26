"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var incre = Math.PI / 18;
var startRadius = exports.startRadius = -Math.PI / 2; // start with 12: 00 direction
var circumference = Math.PI * 2;
var partCircumference = Math.PI / 2;
var baseAngle = 2 * Math.PI / 360;

var getEndRadius = function getEndRadius(percent) {
  return percent && circumference * percent - partCircumference;
};

// get point position
var getPointPosition = exports.getPointPosition = function getPointPosition(center, radius, percent) {
  var temp = baseAngle * (360 * percent - 90);
  return { x: center.x + radius * Math.cos(temp), y: center.y + radius * Math.sin(temp) };
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

var generateListObject = exports.generateListObject = function generateListObject(_ref) {
  var list = _ref.list,
      maxRadius = _ref.maxRadius,
      lineWidth = _ref.lineWidth;

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