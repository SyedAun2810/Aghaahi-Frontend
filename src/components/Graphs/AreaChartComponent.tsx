import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fillColors } from './graphConst'; // Import color pool
import utilService from '@Utils/utils.service';

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
const defaultConfig = [
  { dataKey: 'pv', stroke: '#8884d8' },
  { dataKey: 'uv', stroke: '#82ca9d' },
  { dataKey: 'amt', stroke: '#ffc658' },
];

const AreaChartComponent = ({
  chartConfig = { data: defaultData, config: defaultConfig }, // Ensure default values for chartConfig
}: {
  chartConfig: { data: any[]; config: { dataKey: string; stroke: string }[] };
}) => {
  let { data, config } = chartConfig;

  //console.log("AreaChart data: ", data); // Log the data for debugging
  //console.log("AreaChart config: ", config); // Log the config for debugging
  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"bg-white dark:bg-[#2D2D2D]"}>
      <AreaChart
        data={data} // Use the passed data
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend formatter={(value) => utilService.formatAndCapitalizeString(value)} />
        {config.map((areaConfig, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={areaConfig.dataKey} // Use the dataKey from config
            stroke={areaConfig.stroke || getRandomColor(fillColors)} // Use stroke from config or random color
            fill={getRandomColor(fillColors)} // Dynamically set fill color
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
