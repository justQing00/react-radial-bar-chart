import * as React from 'react';

export default class ToolTip extends React.Component {
  render() {
    const { x, y, ringInfo } = this.props;
    if (!ringInfo) return null;
    const { name, percent, backgroundColor } = ringInfo;
    return (
      <div style={{ ...Rectstyle, top: y, left: x }}>
        <div style={headerStyle}>{name}</div>
        <div style={{ position: 'relative' }}>
          <span style={{ ...iconStyle, backgroundColor: backgroundColor || 'rgb(211,0,57)' }}></span>
          <div style={valueStyle}>{`占比: ${percent}`}</div>
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
