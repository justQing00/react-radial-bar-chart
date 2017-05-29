import { randomColor } from './color';

const incre = (Math.PI) / 18;
const circumference = Math.PI * 2;
const baseAngle = (2 * Math.PI) / 360;
const partCircumference = Math.PI / 2;

export const startRadius = -partCircumference; // start with 12: 00 direction

const getEndRadius = (percent) => {
  return percent && (((circumference * percent) - partCircumference));
};

// percent direct out
const isPercentDirectOut = (percent) => {
  return percent <= 0.25 || percent > 0.75;
};

// get point position
export const getPointPosition = ({ center, radius, percent, lineWidth, fontSize }) => {
  const angle = baseAngle * ((360 * percent) - 90);
  let realRadius = null;
  if (isPercentDirectOut(percent)) { // percent direction is not same
    realRadius = radius - (fontSize / 2);
  } else {
    realRadius = radius + (fontSize / 2);
  }
  return { x: center.x + (realRadius * Math.cos(angle)), y: (center.y + (realRadius * Math.sin(angle))) };
};

// get rotate
export const getRotate = ({ endRadius, percent }) => {
  if (isPercentDirectOut(percent)) {  // percent direction is not same
    return endRadius - startRadius;
  }
  return endRadius + startRadius;
};

export const getTextAlignPercent = (percent) => {
  if (isPercentDirectOut(percent)) {
    return 'end';
  }
  return 'start';
};

export const getTextPercent = (percent) => {
  if (isPercentDirectOut(percent)) {
    return `${percent} `;
  }
  return ` ${percent}`;
};

export const getLineWidth = ({ list, max }) => {
  return parseInt((max - 16) / list.length, 10) - 4;
};

// temp Angle change
export const changeTmpAngle = (tmpAngleList, endRadiusList) => {
  let num = 0;
  const length = endRadiusList.length;
  for (let i = 0; i < length; i += 1) {
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

export const generateListObject = ({ list, maxRadius, lineWidth }) => {
  const radiusList = [];
  const tmpAngleList = [];
  const percentList = [];
  const nameList = [];
  const endRadiusList = [];
  const strokeStyleList = [];
  list.forEach((single, index) => {
    radiusList.push(maxRadius - ((lineWidth + 4) * index));
    tmpAngleList.push(startRadius);
    percentList.push(single.percent);
    nameList.push(single.name);
    endRadiusList.push(getEndRadius(single.percent));
    strokeStyleList.push(single.backgroundColor || randomColor(index));
  });
  return { radiusList, tmpAngleList, percentList, nameList, endRadiusList, strokeStyleList };
};

export const inWitchRing = ({ radiusList, endRadiusList, eventPosition, center, lineWidth, ratio }) => {
  if (!eventPosition) return null;
  const x = (eventPosition.x * ratio) - center.x;
  const y = (eventPosition.y * ratio) - center.y;
  const pRadius = Math.sqrt((x * x) + (y * y)); // point radius
  const halfLineWidth = lineWidth / 2;
  for (let i = 0; i < radiusList.length; i += 1) {
    const beginRadius = radiusList[i] - halfLineWidth;
    const endRadius = radiusList[i] + halfLineWidth;
    if (pRadius >= beginRadius && pRadius <= endRadius && checkPointInRing({ x, y, endRadius: endRadiusList[i] })) {
      return i;
    }
  }
  return null;
};

// point is in this ring
const checkPointInRing = ({ x, y, endRadius }) => {
  const xyangle = Math.atan(y / x) * (180 / Math.PI);
  return endRadius > getEndRadius(getRealAngleByQuadrant({ xyangle, x, y }) / 360);
};

const getRealAngleByQuadrant = ({ xyangle, x, y }) => {
  if (x >= 0 && y >= 0) {
    return 90 - xyangle;
  } else if (x >= 0 && y < 0) {
    return 90 + xyangle;
  } else if (x < 0 && y < 0) {
    return 270 - xyangle;
  }
  return 270 + xyangle;
};
