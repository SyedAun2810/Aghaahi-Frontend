import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const AreaChartComponent = ({
  data = defaultData, // Use default data if none is provided
  dataKeys = ['uv', 'pv', 'amt'], // Default data keys for areas
}: {
  data?: { name: string; [key: string]: number | string }[];
  dataKeys?: string[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {dataKeys.map((dataKey, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={dataKey}
            stroke={getRandomColor(fillColors)} // Dynamically set stroke color
            fill={getRandomColor(fillColors)} // Dynamically set fill color
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
