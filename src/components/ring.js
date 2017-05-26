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

const incre = (Math.PI) / 18;
const startRadius = -Math.PI / 2; // start with 12: 00 direction
const circumference = Math.PI * 2;
const partCircumference = Math.PI / 2;
const baseAngle = (2 * Math.PI) / 360;

const getEndRadius = (percent) => {
  return percent && (((circumference * percent) - partCircumference));
};

// get point position
const getPointPosition = (center, radius, percent) => {
  const temp = baseAngle * ((360 * percent) - 90);
  return { x: center.x + (radius * Math.cos(temp)), y: center.y + (radius * Math.sin(temp)) };
};

// temp Angle change
const changeTmpAngle = (tmpAngleList, endRadiusList) => {
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

export default class Ring {
  constructor(props) {
    this.setValue(props);
  }

  setValue = (props = {}) => {
    const list = props.list || [];
    this.strokeStyle = props.strokeStyle || this.strokeStyle || '#1EB6F8';
    this.lineWidth = props.lineWidth || this.lineWidth || 20;
    this.width = props.width || 250;
    this.height = props.height || 250;
    this.fontSize = props.fontSize || this.fontSize || 12;
    this.startRadius = startRadius;

    const maxRadius = (Math.min(this.width, this.height) / 2) - (this.lineWidth * 2);
    this.radiusList = list.map((single, index) => { return (maxRadius - ((this.lineWidth + 4) * index)); });
    this.tmpAngleList = list.map(() => this.startRadius);
    // may change value
    this.percentList = list.map(single => single.percent || 0);
    this.endRadiusList = list.map(single => getEndRadius(single.percent));
    this.x = parseInt(props.width / 2, 10);
    this.y = parseInt(props.height / 2, 10);
  }

  updateRing = (props) => {
    this.setValue(props);
  }

  drawText = (ctx) => {
    const length = this.radiusList.length;
    for (let i = 0; i < length; i += 1) {
      const tempPercent = this.percentList[i];
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.font = `${this.fontSize}px Helvetica Neue For Number`;
      ctx.textAlign = 'center';
      const textPosition = getPointPosition({ x: this.x, y: this.y }, this.radiusList[i], tempPercent);
      ctx.fillText(tempPercent, textPosition.x, textPosition.y);
    }
  }

  drawBase = (ctx) => { // 绘制
    ctx.clearRect(0, 0, this.width, this.height);
    const length = this.endRadiusList.length;
    for (let i = 0; i < length; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = this.strokeStyle;
      ctx.arc(this.x, this.y, this.radiusList[i], this.startRadius, this.tmpAngleList[i], false);
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
      ctx.closePath();
    }
  }

  draw = (ctx) => {
    if (changeTmpAngle(this.tmpAngleList, this.endRadiusList)) {
      this.drawText(ctx);
      return;
    }
    this.drawBase(ctx);
    requestAnimationFrame(() => this.draw(ctx));
  }
}
