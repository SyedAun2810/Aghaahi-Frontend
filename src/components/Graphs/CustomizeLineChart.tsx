import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the LineConfig type
interface LineConfig {
  dataKey: string; // The key in the data object to be used for the line
  stroke: string;  // The color of the line
  dot?: React.ReactNode; // Optional custom dot component
}

// Default chart configuration
const defaultChartConfig = {
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
    { dataKey: 'pv', stroke: '#8884d8'},
    { dataKey: 'uv', stroke: '#82ca9d' },
  ],
};

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;
  const color = value > 2500 ? 'red' : 'green';
  return <circle cx={cx} cy={cy} r={5} fill={color} stroke="none" />;
};

const CustomizeLineChart = ({
  chartConfig = defaultChartConfig,
}: {
  chartConfig: { data: any[]; config: LineConfig[] };
}) => {
  const { data, config } = chartConfig;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {config.map((lineConfig: LineConfig, index: number) => (
          <Line
            key={index}
            type="monotone"
            dataKey={lineConfig.dataKey}
            stroke={lineConfig.stroke}
            dot={<CustomizedDot/>}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomizeLineChart;
