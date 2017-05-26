import { startRadius, getPointPosition, changeTmpAngle, generateListObject } from './utils/ring';

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
    this.x = parseInt(props.width / 2, 10);
    this.y = parseInt(props.height / 2, 10);
    // generate
    const maxRadius = (Math.min(this.width, this.height) / 2) - (this.lineWidth * 2);
    const object = generateListObject({ list, maxRadius, lineWidth: this.lineWidth });
    this.radiusList = object.radiusList;
    this.tmpAngleList = object.tmpAngleList;
    this.percentList = object.percentList;
    this.nameList = object.nameList;
    this.endRadiusList = object.endRadiusList;
  }

  updateRing = (props) => {
    this.setValue(props);
  }

  drawText = (ctx) => {
    const length = this.radiusList.length;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = `${this.fontSize}px Helvetica Neue For Number`;
    ctx.textAlign = 'center';
    for (let i = 0; i < length; i += 1) {
      const tempPercent = this.percentList[i];
      const textPosition = getPointPosition({ x: this.x, y: this.y }, this.radiusList[i], tempPercent);
      ctx.fillText(tempPercent, textPosition.x, textPosition.y); // percent show
      ctx.fillText(this.nameList[i], this.x, (this.y - this.radiusList[i]) - ((this.fontSize - this.lineWidth) / 2)); // name show
    }
  }

  drawBase = (ctx) => { // 绘制
    ctx.clearRect(0, 0, this.width, this.height);
    const length = this.endRadiusList.length;
    for (let i = 0; i < length; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = this.strokeStyle;
      ctx.arc(this.x, this.y, this.radiusList[i], startRadius, this.tmpAngleList[i], false);
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
