import * as React from 'react';
import ToolTip from 'react-chart-tooltip';
import { RadialChartAdapt, getEventPosition } from 'react-chart-adapt';
import Ring from './ring';

export default class RadialBarChart extends React.Component {

  state = {
    ringInfo: null,
    eventPosition: null,
    width: null,
    height: null,
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.onMove);
    this.canvas.addEventListener('click', this.onClick);
    this.ring = new Ring(this.props);
    this.adapt.resize();
  }

  componentWillReceiveProps(nextProps) {
    this.ring.updateRing(nextProps, this.ctx);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
  }

  onClick = (e) => {
    const { onClick } = this.props;
    const ringInfo = this.ring.updateRing({ event: 'onClick', eventPosition: getEventPosition(e) }, this.ctx);
    if (onClick && ringInfo) onClick(e, ringInfo);
  }

  onMove = (e) => {
    const { onHover } = this.props;
    const eventPosition = getEventPosition(e);
    const ringInfo = this.ring.updateRing({ event: 'onMove', eventPosition }, this.ctx);
    if (onHover && ringInfo) onHover(e, ringInfo);
    this.setState({ ringInfo, eventPosition });
  }

  resize = ({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight }) => {
    const { width, height } = this.state;
    this.canvas.width = ratioWidth;
    this.canvas.height = ratioHeight;
    if (this.ring) this.ring.updateRing(Object.assign({ ...this.props }, { width: ratioWidth, height: ratioHeight, ratio }), this.ctx);
    if (width !== clientWidth || height !== clientHeight) {
      this.setState({ width: clientWidth, height: clientHeight, ringInfo: null, eventPosition: null });
    }
  }

  render() {
    const { ringInfo, eventPosition, width, height } = this.state;
    const { tooltip, title, tooltipStyle } = this.props;
    return (
      <RadialChartAdapt
        ref={(adapt) => { this.adapt = adapt; }}
        onResize={this.resize}
        ctx={this.ctx}
      >
        <ToolTip
          width={width}
          height={height}
          tooltip={tooltip}
          title={title}
          info={ringInfo}
          tooltipStyle={tooltipStyle}
          {...eventPosition}
        />
        <canvas style={{ position: 'absolute', width, height }} ref={(canvas) => { this.canvas = canvas; }}/>
      </RadialChartAdapt>
    );
  }
}
