const incre = (Math.PI) / 18;
const circumference = Math.PI * 2;
const baseAngle = (2 * Math.PI) / 360;
const partCircumference = Math.PI / 2;

export const startRadius = -partCircumference; // start with 12: 00 direction

const getEndRadius = (percent) => {
  return percent && (((circumference * percent) - partCircumference));
};

// get point position
export const getPointPosition = ({ center, radius, percent, lineWidth, fontSize }) => {
  const temp = baseAngle * ((360 * percent) - 90);
  return { x: center.x + ((radius - (((lineWidth - fontSize) / 2))) * Math.cos(temp)), y: (center.y + ((radius - (((lineWidth - fontSize) / 2))) * Math.sin(temp))) };
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
