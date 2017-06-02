import * as React from 'react';
import * as ReactDom from 'react-dom';

const defaultFormatter = (ringInfo) => {
  return `占比: ${ringInfo.percent}`;
};

const getPosition = ({ width, height, x, y, clientWidth, clientHeight }) => {
  if (!clientWidth || !clientHeight) return { x, y };
  let newX = x;
  let newY = y;
  if (x + clientWidth > width) {
    newX = x - 20 - clientWidth;
  }
  if (y + clientHeight > height) {
    newY = y - 20 - clientHeight;
  }
  return { x: newX, y: newY };
};

export default class ToolTip extends React.Component {

  componentDidUpdate() {
    const $tooltip = ReactDom.findDOMNode(this);
    if (!$tooltip) return;
    this.clientWidth = $tooltip.clientWidth;
    this.clientHeight = $tooltip.clientHeight;
  }

  render() {
    const { x, y, ringInfo, title, tooltip, width, height, tooltipStyle } = this.props || {};
    if (!ringInfo) return null;
    const { backgroundColor } = ringInfo;

    const { formatter = defaultFormatter, show = true } = tooltip || {};
    const tooltipText = formatter(ringInfo);

    const postion = getPosition({ width, height, x, y, clientWidth: this.clientWidth, clientHeight: this.clientHeight });
    return (
      <div style={show ? { ...Object.assign(Rectstyle, tooltipStyle), top: `${postion.y + 20}px`, left: `${postion.x + 20}px` } : { display: 'none' }}>
        {title ? <div style={headerStyle}>{title}</div> : null}
        {tooltipText ?
          <div style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            <span style={{ ...iconStyle, backgroundColor: backgroundColor || 'rgb(211,0,57)' }}></span>
            <div style={valueStyle}>{tooltipText}</div>
          </div> : null
        }
      </div>
    );
  }
}

const Rectstyle = {
  position: 'absolute',
  zIndex: 2,
  width: 'auto',
  height: 'auto',
  display: 'inline-block',
  backgroundColor: 'rgba(0,0,0,0.65)',
  pointerEvents: 'none',
  padding: '5px',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#fff',
};

const headerStyle = {
  color: '#fff',
};

const iconStyle = {
  position: 'absolute',
  width: '9px',
  height: '9px',
  borderRadius: '100%',
  top: '7px',
};

const valueStyle = {
  paddingLeft: '15px',
};
