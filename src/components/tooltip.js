import * as React from 'react';

export default class ToolTip extends React.Component {
  render() {
    const { x, y, ringInfo } = this.props;
    if (!ringInfo) return null;
    const { name, percent, backgroundColor } = ringInfo;
    return (
      <div style={{ ...Rectstyle, top: y, left: x }}>
        <div style={headerStyle}>{name}</div>
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
};

const headerStyle = {
  color: '#fff',
};
