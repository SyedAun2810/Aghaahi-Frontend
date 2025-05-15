import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool
import utilService from '@Utils/utils.service';

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultChartConfig = {
  data: [
    { name: '18-24', uv: 31.47, pv: 2400 },
    { name: '25-29', uv: 26.69, pv: 4567 },
    { name: '30-34', uv: 15.69, pv: 1398 },
    { name: '35-39', uv: 8.22, pv: 9800 },
    { name: '40-49', uv: 8.63, pv: 3908 },
    { name: '50+', uv: 2.63, pv: 4800 },
    { name: 'unknown', uv: 6.67, pv: 4800 },
  ],
  dataKey: 'uv', // Default dataKey for RadialBar
};

const legendConfig = {
  iconSize: 10,
  layout: 'vertical',
  verticalAlign: 'middle',
  wrapperStyle: { top: 0, left: 450, lineHeight: '24px' },
};

const barConfig = {
  minAngle: 15,
  label: { position: 'insideStart', fill: '#fff' },
  background: true,
  clockWise: true,
};

const RadialBarChartComponent = ({
  chartConfig = defaultChartConfig, // Use default chart configuration if none is provided
}: {
  chartConfig: {
    data: { name: string; uv: number; pv: number; fill?: string }[];
    dataKey: string;
  };
}) => {
  const { data, dataKey } = chartConfig;

  const processedData = data.map((entry) => ({
    ...entry,
    fill: entry.fill || getRandomColor(fillColors), // Assign random color if not provided
  }));

  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"bg-white dark:bg-[#2D2D2D]"}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={processedData}>
        <RadialBar
          background={barConfig.background}
          dataKey={dataKey}
        />
        <Legend
          iconSize={legendConfig.iconSize}
          layout={legendConfig.layout as any}
          verticalAlign={legendConfig.verticalAlign as any}
          wrapperStyle={legendConfig.wrapperStyle}
          formatter={(value) => utilService.formatAndCapitalizeString(value)}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialBarChartComponent;
