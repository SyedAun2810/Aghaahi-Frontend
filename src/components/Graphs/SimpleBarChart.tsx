import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { fillColors } from './graphConst';
import utilService from '@Utils/utils.service';

const defaultChartConfig = {
  data: [
    { name: 'Category 1', uv: 500 },
    { name: 'Category 2', uv: 400 },
    { name: 'Category 3', uv: 300 },
  ],
  config: [{ dataKey: 'uv' }],
};

const getUniqueColorsForData = (dataLength: number, colorPool: string[]) => {
  const repeatedColors = [];
  const pool = [...colorPool];

  while (repeatedColors.length < dataLength) {
    if (pool.length === 0) pool.push(...colorPool); // reset pool when exhausted
    const index = Math.floor(Math.random() * pool.length);
    repeatedColors.push(pool[index]);
    pool.splice(index, 1);
  }

  return repeatedColors;
};

const BarChartComponent = ({
  chartConfig = defaultChartConfig,
}: {
  chartConfig: {
    data: { name: string; [key: string]: number | string }[];
    config: { dataKey: string }[];
  };
}) => {
  const { data, config } = chartConfig;

  const barColors = useMemo(() => {
    return getUniqueColorsForData(data.length, fillColors);
  }, [data.length]);

  const isSingleSeries = config.length === 1;

  return (
    <ResponsiveContainer width="100%" height="100%" className="bg-white dark:bg-[#2D2D2D]">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend formatter={(value) => utilService.formatAndCapitalizeString(value)} />
        
        {isSingleSeries ? (
          <Bar dataKey={config[0].dataKey}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
          </Bar>
        ) : (
          config.map((barConfig, index) => (
            <Bar
              key={index}
              dataKey={barConfig.dataKey}
              fill={fillColors[index % fillColors.length]}
            />
          ))
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
