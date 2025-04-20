import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { fillColors } from './graphConst'; 

export const getRandomColor = () => fillColors[Math.floor(Math.random() * fillColors.length)]; 

const defaultData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
].map((entry) => ({
  ...entry,
  fill: entry.fill || getRandomColor(), // Assign random color if not provided
}));

const SimplePieChartComponent = ({
  data = defaultData, // Use defaultData if no data is provided
  dataKey,
  cx = '50%',
  cy = '50%',
  outerRadius = 90,
  label = ({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`,
}: {
  data?: { name: string; value: number; fill?: string }[];
  dataKey: string;
  cx?: string;
  cy?: string;
  outerRadius?: number;
  label?: boolean | ((props: any) => string);
}) => {
  const processedData = data.map((entry) => ({
    ...entry,
    fill: entry.fill || getRandomColor(), 
  }));

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <PieChart>
        <Pie
          data={processedData}
          dataKey={dataKey}
          cx={cx}
          cy={cy}
          outerRadius={outerRadius}
          label={label}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SimplePieChartComponent;
