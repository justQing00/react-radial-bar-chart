import * as React from 'react';
import Ring from './ring';

export default class BarChart extends React.Component {

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    this.ring = new Ring({
      width: 600,
      height: 360,
      list: [
        { name: '问题1', percent: 0.5 },
        { name: '问题2', percent: 0.4 },
        { name: '问题3', percent: 0.3 },
        { name: '问题4', percent: 0.2 },
      ],
    });
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
