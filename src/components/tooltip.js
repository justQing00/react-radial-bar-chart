const defaultFormatter = (ringInfo) => {
  return [{ key: '占比', value: ringInfo.percent }];
};

const ToolTip = (props) => {
  const { x, y, ringInfo, tooltip } = props || {};
  if (!ringInfo) return null;
  const { name, backgroundColor } = ringInfo;
  const { formatter = defaultFormatter, show = true } = tooltip || {};
  return (
    <div style={show ? { ...Rectstyle, top: y, left: x } : { display: 'none' }}>
      <div style={headerStyle}>{name}</div>
      {formatter(ringInfo).map(({ key, value }) => {
        return (
          <div key={key} style={{ position: 'relative' }}>
            <span style={{ ...iconStyle, backgroundColor: backgroundColor || 'rgb(211,0,57)' }}></span>
            <div style={valueStyle}>{`${key}: ${value}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ToolTip;

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
