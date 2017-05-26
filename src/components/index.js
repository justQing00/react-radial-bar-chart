import * as React from 'react';
import Ring from './ring';

export default class BarChart extends React.Component {

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    this.ring = new Ring({ width: 600, height: 360, percent: 0.5 });
    this.ring.draw(ctx);
  }

  render() {
    return (
      <div>
        <canvas width='600' height='360' ref={(canvas) => { this.canvas = canvas; }}/>
      </div>
    );
  }
}
