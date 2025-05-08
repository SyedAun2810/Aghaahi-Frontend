import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultChartConfig = {
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
  config: { dataKey: 'value' }, // Only dataKey is dynamic
};

const SimplePieChartComponent = ({
  chartConfig = defaultChartConfig, // Use default chart configuration if none is provided
}: {
  chartConfig: {
    data: { name: string; value: number; fill?: string }[];
    config: { dataKey: string };
  };
}) => {
  const { data, config } = chartConfig;

  const processedData = data.map((entry) => ({
    ...entry,
    fill: entry.fill || getRandomColor(fillColors), // Assign random color if not provided
  }));

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <PieChart>
        <Pie
          data={processedData}
          dataKey={config.dataKey}
          cx="50%" // Static value
          cy="50%" // Static value
          outerRadius={90} // Static value
          label={true} // Static value
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SimplePieChartComponent;
