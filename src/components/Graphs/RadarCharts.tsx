import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const RadarChartComponent = ({
  data = defaultData, // Use default data if none is provided
  radarConfigs = [
    { name: 'Student A', dataKey: 'A' },
    { name: 'Student B', dataKey: 'B' },
  ], // Expect configurations for multiple datasets
}: {
  data?: { subject: string; [key: string]: number | string }[];
  radarConfigs: { name: string; dataKey: string }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} /> {/* Add Tooltip */}
        {radarConfigs.map((config, index) => (
          <Radar
            key={index}
            name={config.name}
            dataKey={config.dataKey}
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
