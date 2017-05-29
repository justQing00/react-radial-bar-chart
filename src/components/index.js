import * as React from 'react';
import * as ReactDom from 'react-dom';
import ToolTip from './tooltip';
import Ring from './ring';
import { getEventPosition, getPixelRatio } from './utils/canvas';

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
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillReceiveProps(nextProps) {
    this.ring.updateRing({ list: nextProps.list }, this.ctx);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
    window.removeEventListener('resize', this.resize, false);
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

  resize = () => {
    const ratio = getPixelRatio(this.ctx);
    const { width, height } = this.state;
    const $parentNode = ReactDom.findDOMNode(this).parentNode;
    const clientWidth = $parentNode.clientWidth;
    const clientHeight = $parentNode.clientHeight;
    const newWidth = clientWidth * ratio;
    const newHeight = clientHeight * ratio;
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.ring.updateRing({ width: newWidth, height: newHeight, ratio }, this.ctx);
    if (width !== clientWidth || height !== clientHeight) {
      this.setState({ width: clientWidth, height: clientHeight, ringInfo: null, eventPosition: null });
    }
  }

  render() {
    const { ringInfo, eventPosition, width, height } = this.state;
    const { tooltip } = this.props;
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'inline-block' }}>
        <ToolTip width={width} height={height} tooltip={tooltip} ringInfo={ringInfo} {...eventPosition}/>
        <canvas style={{ position: 'absolute', width, height }}ref={(canvas) => { this.canvas = canvas; }}/>
      </div>
    );
  }
}
