import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultChartConfig = {
  data: [
    { name: 'Category 1', uv: 500, pv: 300, amt: 200 },
    { name: 'Category 2', uv: 400, pv: 200, amt: 300 },
    { name: 'Category 3', uv: 300, pv: 400, amt: 100 },
  ],
  config: [
    { dataKey: 'uv' },
    { dataKey: 'pv' },
  ],
};

const BarChartComponent = ({
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
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {config.map((barConfig, index) => (
          <Bar
            key={index}
            dataKey={barConfig.dataKey}
            fill={getRandomColor(fillColors)} // Assign random color dynamically
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
