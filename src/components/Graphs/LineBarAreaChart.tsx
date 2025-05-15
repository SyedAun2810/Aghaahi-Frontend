import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { fillColors } from './graphConst'; // Import color pool
import utilService from '@Utils/utils.service';

export const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)]; // Utility to get random color

const defaultData = [
  { name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490 },
  { name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590 },
  { name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350 },
  { name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
  { name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
  { name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
];

const ComposedChartComponent = ({
  data = defaultData, // Use default data if none is provided
  areaConfig = { dataKey: 'amt' },
  barConfig = { dataKey: 'pv' },
  lineConfig = { dataKey: 'uv' },
  scatterConfig = { dataKey: 'cnt' },
}: {
  data?: { name: string; [key: string]: number | string }[];
  areaConfig?: { dataKey: string };
  barConfig?: { dataKey: string };
  lineConfig?: { dataKey: string };
  scatterConfig?: { dataKey: string };
}) => {
  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"bg-white dark:bg-[#2D2D2D]"}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend formatter={(value) => utilService.formatAndCapitalizeString(value)} />
        <Area
          type="monotone"
          dataKey={areaConfig.dataKey}
          fill={getRandomColor(fillColors)} // Dynamically set fill color
          stroke={getRandomColor(fillColors)} // Dynamically set stroke color
        />
        <Bar
          dataKey={barConfig.dataKey}
          barSize={20}
          fill={getRandomColor(fillColors)} // Dynamically set fill color
        />
        <Line
          type="monotone"
          dataKey={lineConfig.dataKey}
          stroke={getRandomColor(fillColors)} // Dynamically set stroke color
        />
        <Scatter
          dataKey={scatterConfig.dataKey}
          fill={getRandomColor(fillColors)} // Dynamically set fill color
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartComponent;
