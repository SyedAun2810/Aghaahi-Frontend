import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool
import utilService from '@Utils/utils.service';

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultChartConfig = {
  data: [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ],
  config: [
    { name: 'Student A', dataKey: 'A' },
    { name: 'Student B', dataKey: 'B' },
  ],
};

const RadarChartComponent = ({
  chartConfig = defaultChartConfig, // Use default chart configuration if none is provided
}: {
  chartConfig: {
    data: { subject: string; [key: string]: number | string }[];
    config: { name: string; dataKey: string }[];
  };
}) => {
  const { data, config } = chartConfig;

  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"bg-white dark:bg-[#2D2D2D]"}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
        <Legend formatter={(value) => utilService.formatAndCapitalizeString(value)} />
        {config.map((radarConfig, index) => (
          <Radar
            key={index}
            name={radarConfig.name}
            dataKey={radarConfig.dataKey}
            stroke={getRandomColor(fillColors)} // Dynamically set stroke color
            fill={getRandomColor(fillColors)} // Dynamically set fill color
            fillOpacity={0.6} // Set default fill opacity
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent;
