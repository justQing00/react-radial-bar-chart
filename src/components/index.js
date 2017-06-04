import ReactChartCanvas from 'react-chart-canvas';
import Ring from './ring';

const RadialBarChart = (props) => {
  return <ReactChartCanvas Chart={Ring} {...props}/>;
};

export default RadialBarChart;
