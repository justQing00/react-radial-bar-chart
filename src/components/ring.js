import {
  getPointPosition, getRotate, getTextAlignPercent, getTextPercent,
  startRadius, changeTmpAngle, generateListObject, inWitchRing
} from './utils/ring';

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
    this.list = props.list || this.list || [];
    this.strokeStyle = props.strokeStyle || this.strokeStyle || '#1EB6F8';
    this.lineWidth = props.lineWidth || this.lineWidth || 20;
    this.width = props.width || this.width || 250;
    this.height = props.height || this.height || 250;
    this.fontSize = props.fontSize || this.fontSize || 12;
    this.x = parseInt(this.width / 2, 10);
    this.y = parseInt(this.height / 2, 10);
    this.eventPosition = props.eventPosition;
    this.event = props.event;
    // generate
    const maxRadius = (Math.min(this.width, this.height) / 2) - (this.lineWidth * 2);
    const object = generateListObject({ list: this.list, maxRadius, lineWidth: this.lineWidth });
    this.radiusList = object.radiusList;
    this.tmpAngleList = object.tmpAngleList;
    this.percentList = object.percentList;
    this.nameList = object.nameList;
    this.endRadiusList = object.endRadiusList;
  }

  updateRing = (props, ctx) => {
    this.currentRing = inWitchRing({
      radiusList: this.radiusList,
      eventPosition: this.eventPosition,
      center: { x: this.x, y: this.y },
      lineWidth: this.lineWidth,
    });
    this.setValue(props);
    this.draw(ctx);
    return this.list[this.currentRing];
  }

  drawText = (ctx) => {
    const length = this.radiusList.length;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = `${this.fontSize}px Helvetica Neue For Number`;
    ctx.textAlign = 'end';
    for (let i = 0; i < length; i += 1) {
      ctx.fillText(`${this.nameList[i]} `, this.x, (this.y - this.radiusList[i]) - ((this.fontSize - this.lineWidth) / 2)); // name show
    }
    for (let i = 0; i < length; i += 1) {
      ctx.save();
      const tempPercent = this.percentList[i];
      const textPosition = getPointPosition({
        center: { x: this.x, y: this.y },
        radius: this.radiusList[i],
        percent: tempPercent,
        lineWidth: this.lineWidth,
        fontSize: this.fontSize,
      });
      ctx.textAlign = getTextAlignPercent(tempPercent);
      ctx.translate(textPosition.x, textPosition.y); // change center point
      ctx.rotate(getRotate({ endRadius: this.endRadiusList[i], percent: tempPercent }));
      ctx.fillText(getTextPercent(tempPercent), 0, 0); // percent show
      ctx.restore();
    }
  }

  drawBase = (ctx, useEnd = false) => { // draw stroke
    ctx.translate(0, 0); // change center point
    ctx.clearRect(0, 0, this.width, this.height);
    const length = this.endRadiusList.length;
    for (let i = 0; i < length; i += 1) {
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      if (this.currentRing === i) {
        ctx.strokeStyle = 'rgba(30, 182, 248, 0.65)';
      } else {
        ctx.strokeStyle = this.strokeStyle;
      }
      ctx.arc(this.x, this.y, this.radiusList[i], startRadius, !useEnd ? this.tmpAngleList[i] : this.endRadiusList[i], false);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawInit = (ctx) => {
    if (changeTmpAngle(this.tmpAngleList, this.endRadiusList)) {
      this.drawText(ctx);
      return;
    }
    this.drawBase(ctx);
    requestAnimationFrame(() => this.draw(ctx));
  }

  draw = (ctx) => {
    this.drawBase(ctx, true);
    this.drawText(ctx);
  }
}
