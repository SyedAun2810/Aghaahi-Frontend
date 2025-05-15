import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRandomColor } from "./AreaChartComponent";
import { strokeColors } from "./graphConst";
import utilService from '@Utils/utils.service';

// Define the LineConfig type
interface LineConfig {
  dataKey: string; // The key in the data object to be used for the line
  stroke: string;  // The color of the line
}
// Dummy data for demonstration purposes
export const dummyChartConfig = {
  data: [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ],
  config: [
    { dataKey: "pv", stroke: "#8884d8" },
    { dataKey: "uv", stroke: "#82ca9d" },
    { dataKey: "amt", stroke: "#ffc658" },
  ],
};

// Adapted LineChart component to accept data from props
const SimpleLineChart = ({
  chartConfig = dummyChartConfig,
}: {
  chartConfig?: { data: any[]; config: LineConfig[] };
}) => {
  let { data, config } = chartConfig;

  if(!config){
    config = dummyChartConfig.config;
  }

  //console.log("LineChart data: ", data);  

  return (
    <ResponsiveContainer width="100%" height="100%" className={"bg-white dark:bg-[#2D2D2D]"}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend formatter={(value) => utilService.formatAndCapitalizeString(value)} />
        {config.map((lineConfig: LineConfig, index: number) => (
          <Line
            key={index}
            type="monotone"
            dataKey={lineConfig.dataKey}
            stroke={getRandomColor(strokeColors)}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;