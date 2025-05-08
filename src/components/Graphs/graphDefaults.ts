export const lineChartDefaults = {
  data: [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ],
  config: [
    { dataKey: 'pv', stroke: '#8884d8' },
    { dataKey: 'uv', stroke: '#82ca9d' },
  ],
};

export const barChartDefaults = {
  data: [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ],
  bars: [
    { dataKey: 'pv', fill: '#8884d8' },
    { dataKey: 'uv', fill: '#82ca9d' },
  ],
};

export const pieChartDefaults = {
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
  dataKey: 'value',
  cx: '50%',
  cy: '50%',
  outerRadius: 90,
  fill: '#8884d8',
  label: ({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`, // Custom label function to display percentage
};

export const radialBarChartDefaults = {
  data: [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
    { name: 'unknown', uv: 6.67, pv: 4800, fill: '#ffc658' },
  ],
  barConfig: {
    minAngle: 15,
    label: { position: 'insideStart', fill: '#fff' },
    background: true,
    clockWise: true,
    dataKey: 'uv',
  },
};

export const radarChartDefaults = {
  data: [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ],
  radarConfig: { name: 'Mike', dataKey: 'A', stroke: '#8884d8', fill: '#8884d8', fillOpacity: 0.6 },
};
