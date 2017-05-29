import * as React from 'react';
import * as ReactDom from 'react-dom';

const defaultFormatter = (ringInfo) => {
  return [{ key: '占比', value: ringInfo.percent }];
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
    const { x, y, ringInfo, tooltip, width, height } = this.props || {};
    if (!ringInfo) return null;
    const { name, backgroundColor } = ringInfo;
    const { formatter = defaultFormatter, show = true } = tooltip || {};
    const list = formatter(ringInfo);
    if (!(list instanceof Array)) {
      throw new Error('formatter must return array');
    }
    const postion = getPosition({ width, height, x, y, clientWidth: this.clientWidth, clientHeight: this.clientHeight });
    return (
      <div style={show ? { ...Rectstyle, top: postion.y, left: postion.x } : { display: 'none' }}>
        <div style={headerStyle}>{name}</div>
        <div>
          {list.map(({ key, value }) => {
            return (
              <div key={key} style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                <span style={{ ...iconStyle, backgroundColor: backgroundColor || 'rgb(211,0,57)' }}></span>
                <div style={valueStyle}>{`${key}: ${value}`}</div>
              </div>
            );
          })}
        </div>
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
  borderRadius: '6px',
  padding: '10px',
  pointerEvents: 'none',
};

const headerStyle = {
  color: '#fff',
};

const iconStyle = {
  position: 'absolute',
  width: '6px',
  height: '6px',
  borderRadius: '100%',
  top: '6px',
};

const valueStyle = {
  paddingLeft: '12px',
  color: '#fff',
};
