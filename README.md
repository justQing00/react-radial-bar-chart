# react-radial-bar-chart
环形柱状图(玉玦图) by canvas

### How to use
```javascript
import RadialBarChart from 'react-radial-bar-chart';

<RingBarChart />

```
### RadialBarChart Props
```javascript
{
  list: [ // example
    { name: 'Q1', percent: 0.5 },
    { name: 'Q2', percent: 0.4 },
    { name: 'Q3', percent: 0.3 },
    { name: 'Q4', percent: 0.2 },
  ],
  lineWidth: 20, // default
  width: 250,  // default
  height: 250,  // default
  radius: 100,  // default
  strokeStyle: '#1EB6F8',  // default
}
```

### Inspiration From

In a project I have to make a React `RadialBarChart` compoment, and I found [radial-bar](http://antv.alipay.com/g2/demo/16-polar/radial-bar.html). But I do not need import all of it just for `radial-bar`, so I write one.

### CheckList
##### 0.1.1
* draw single ring (finish)
* multi ring (finish)
* draw value at the end of ring (finish)
* draw ring name at the begin of ring (finish)
* value text in ring vertical center
* value text rotate for read
* click event for each ring
* size adaptation
* random color for different ring
* floating effect
* Tooltip and more info
* word and chart more clearly

### Changelog

