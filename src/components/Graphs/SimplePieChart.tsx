import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const defaultData1 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const defaultData2 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const PieChartComponent = ({ data1 = defaultData1, data2 = defaultData2 }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data1}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={data2 ? 60 : 90}
          fill="#8884d8"
        />
        {data2 && (
          <Pie
            data={data2}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
