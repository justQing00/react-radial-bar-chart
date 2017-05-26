/*
* props: {
*   percent: 0, // 百分比
*   value: 0,  //  具体值
*   width: 250, // 宽度
*   height: 250, // 高度
*   radius: 100, // 半径
*   strokeStyle: '#1EB6F8', // 边颜色
* }
*/

const incre = (Math.PI) / 18;
const startRadius = -Math.PI / 2; // 12点方向开始
const circumference = Math.PI * 2;
const partCircumference = Math.PI / 2;
const baseAngle = (2 * Math.PI) / 360;

const getEndRadius = (percent) => {
  return percent && (((circumference * percent) - partCircumference));
};

// 获得点坐标
const getPointPosition = (center, radius, percent) => {
  const temp = baseAngle * ((360 * percent) - 90);
  return { x: center.x + (radius * Math.cos(temp)), y: center.y + (radius * Math.sin(temp)) };
};

export default class Ring {
  constructor(props) {
    this.setValue(props);
  }

  setValue = (props = {}) => {
    this.strokeStyle = props.strokeStyle || this.strokeStyle || '#1EB6F8';
    this.lineWidth = props.lineWidth || this.lineWidth || 20;
    this.radius = props.radius || this.radius || 100;
    this.width = props.width || 250;
    this.height = props.height || 250;
    this.fontSize = props.fontSize || this.fontSize || 12;
    this.startRadius = startRadius;
    this.tmpAngle = this.startRadius;
    // may change value
    this.percent = props.percent;
    this.endRadius = getEndRadius(props.percent);
    this.x = parseInt(props.width / 2, 10);
    this.y = parseInt(props.height / 2, 10);
  }

  updateRing = (props) => {
    this.setValue(props);
  }

  drwaText = (ctx) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = this.fontSize + 'px Helvetica Neue For Number';
    ctx.textAlign = 'center';
    const textPosition = getPointPosition({ x: this.x, y: this.y }, this.radius, this.percent);
    ctx.fillText(this.percent, textPosition.x, textPosition.y);
  }

  drawBase = (ctx, endRadius) => { // 绘制
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.arc(this.x, this.y, this.radius, this.startRadius, endRadius || this.endRadius, false);
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  draw = (ctx) => {
    if (this.tmpAngle >= this.endRadius) {
      this.drwaText(ctx);
      return;
    } else if (this.tmpAngle + incre > this.endRadius) {
      this.tmpAngle = this.endRadius;
    } else {
      this.tmpAngle += incre;
    }
    this.drawBase(ctx, this.tmpAngle);
    requestAnimationFrame(() => this.draw(ctx));
  }
}
