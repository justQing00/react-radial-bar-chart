import { getHoverRgbColor } from 'color-conversion-rgb';

import {
  getPointPosition, getRotate, getTextAlignPercent, getTextPercent, getLineWidth,
  startRadius, changeTmpAngle, generateListObject, inWitchRing
} from './utils/ring';

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

    isGradient: false,
    labelStyle: '#333',
    dataStyle: '#fff',
    tooltipStyle: {},
    title: '',
* }
*/

export default class Ring {
  constructor(props) {
    this.setValue(props);
  }

  setValue = (props = {}) => {
    this.labelStyle = props.labelStyle || this.labelStyle || '#333';
    this.dataStyle = props.dataStyle || this.dataStyle || '#fff';
    if (this.isGradient === undefined) {
      this.isGradient = props.isGradient === undefined ? false : props.isGradient;
    } else {
      this.isGradient = props.isGradient === undefined ? this.isGradient : props.isGradient;
    }
    this.axisName = props.axisName || this.axisName;

    this.ratio = props.ratio || this.ratio || 1;
    this.list = props.list || this.list || [];
    this.width = props.width || this.width || 250;
    this.height = props.height || this.height || 250;
    this.fontSize = props.fontSize || this.fontSize || 12;
    this.x = parseInt(this.width / 2, 10);
    this.y = parseInt(this.height / 2, 10);
    this.eventPosition = props.eventPosition;
    this.event = props.event;
    // generate
    const maxHalf = parseInt(Math.min(this.width, this.height) / 2, 10) * 0.8;
    this.lineWidth = getLineWidth({ list: this.list, max: maxHalf });
    this.distance = this.lineWidth / 2;
    if (this.lineWidth <= 0) {
      throw new Error('node width or height is too small to calculate');
    }
    this.maxRadius = maxHalf - (this.lineWidth / 2);
    const object = generateListObject({ list: this.list, maxRadius: this.maxRadius, lineWidth: this.lineWidth, distance: this.distance });
    this.radiusList = object.radiusList;
    this.tmpAngleList = object.tmpAngleList;
    this.percentList = object.percentList;
    this.nameList = object.nameList;
    this.endRadiusList = object.endRadiusList;
    this.strokeStyleList = object.strokeStyleList;
  }

  update = (props, ctx) => {
    this.setValue(props);
    this.currentRing = inWitchRing({
      radiusList: this.radiusList,
      endRadiusList: this.endRadiusList,
      eventPosition: this.eventPosition,
      center: { x: this.x, y: this.y },
      lineWidth: this.lineWidth,
      ratio: this.ratio,
      distance: this.distance,
    });
    this.draw(ctx);
    return this.list[this.currentRing];
  }

  drawText = (ctx) => {
    const length = this.radiusList.length;
    const realFontSize = this.fontSize * this.ratio;
    ctx.font = `${realFontSize}px Helvetica Neue For Number`;
    ctx.textAlign = 'end';
    ctx.fillStyle = this.labelStyle;
    for (let i = 0; i < length; i += 1) {
      ctx.fillText(`${this.nameList[i]} `, this.x, ((this.y - this.radiusList[i]) + (realFontSize / 4))); // name show
    }
    ctx.textAlign = 'center';
    ctx.fillText(this.axisName || '', this.x, (this.maxRadius / 8) + (realFontSize / 4));

    ctx.fillStyle = this.dataStyle;
    for (let i = 0; i < length; i += 1) {
      ctx.save();
      const tempPercent = this.percentList[i];
      const textPosition = getPointPosition({
        center: { x: this.x, y: this.y },
        radius: this.radiusList[i],
        percent: tempPercent,
        fontSize: realFontSize,
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
        ctx.strokeStyle = getHoverRgbColor(this.strokeStyleList[i]);
      } else if (this.isGradient) {
        const start = (this.maxRadius / 8) + (this.maxRadius - this.radiusList[i]);
        const end = (this.maxRadius / 8) + (this.maxRadius + this.radiusList[i]);
        const gradient = ctx.createLinearGradient(0, start, 0, end);
        gradient.addColorStop('0', getHoverRgbColor(this.strokeStyleList[i], 1));
        gradient.addColorStop('1', getHoverRgbColor(this.strokeStyleList[i], 0.56));
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = this.strokeStyleList[i];
      }
      ctx.arc(this.x, this.y, this.radiusList[i], startRadius, !useEnd ? this.tmpAngleList[i] : this.endRadiusList[i], false);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawInit = (ctx) => { // for animation, wait...
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
