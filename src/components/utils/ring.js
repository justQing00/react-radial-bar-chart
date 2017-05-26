const incre = (Math.PI) / 18;
export const startRadius = -Math.PI / 2; // start with 12: 00 direction
const circumference = Math.PI * 2;
const partCircumference = Math.PI / 2;
const baseAngle = (2 * Math.PI) / 360;

const getEndRadius = (percent) => {
  return percent && (((circumference * percent) - partCircumference));
};

// get point position
export const getPointPosition = (center, radius, percent) => {
  const temp = baseAngle * ((360 * percent) - 90);
  return { x: center.x + (radius * Math.cos(temp)), y: center.y + (radius * Math.sin(temp)) };
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
  list.forEach((single, index) => {
    radiusList.push(maxRadius - ((lineWidth + 4) * index));
    tmpAngleList.push(startRadius);
    percentList.push(single.percent);
    nameList.push(single.name);
    endRadiusList.push(getEndRadius(single.percent));
  });
  return { radiusList, tmpAngleList, percentList, nameList, endRadiusList };
};
