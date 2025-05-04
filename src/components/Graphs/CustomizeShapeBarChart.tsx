import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

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
    { dataKey: 'uv' },
    { dataKey: 'pv' },
  ],
};

const CustomizeBarChartComponent = ({
  chartConfig = defaultChartConfig, // Use default chart configuration if none is provided
}: {
  chartConfig: {
    data: { name: string; [key: string]: number | string }[];
    config: { dataKey: string }[];
  };
}) => {
  const { data, config } = chartConfig;

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {config.map((barConfig, index) => (
          <Bar
            key={index}
            dataKey={barConfig.dataKey}
            fill={fillColors[index % fillColors.length]} // Assign color dynamically
            shape={<TriangleBar />}
            label={{ position: 'top' }}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={fillColors[idx % fillColors.length]} />
            ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomizeBarChartComponent;
