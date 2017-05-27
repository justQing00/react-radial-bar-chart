import * as React from 'react';
import Ring from './ring';
import { getEventPosition } from './utils/canvas';

export default class RadialBarChart extends React.Component {

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.onMove);
    this.canvas.addEventListener('click', this.onClick);
    this.ring = new Ring({
      width: 600,
      height: 360,
      list: [
        { name: '问题1', percent: 0.85 },
        { name: '问题1', percent: 0.5 },
        { name: '问题2', percent: 0.4 },
        { name: '问题3', percent: 0.3 },
        { name: '问题4', percent: 0.2 },
      ],
    });
    this.ring.draw(this.ctx);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
  }

  onClick = (e) => {
    this.setState({ event: 'click', position: getEventPosition(e) });
  }

  onMove = (e) => {
    this.ring.updateRing({ event: 'mousemove', eventPosition: getEventPosition(e) }, this.ctx);
  }

  render() {
    return (
      <div>
        <canvas width='600' height='360' ref={(canvas) => { this.canvas = canvas; }}/>
      </div>
    );
  }
}
