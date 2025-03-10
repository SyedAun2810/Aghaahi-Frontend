import LineChart from "@Assets/images/graphImges/linecharts/line-chart.png";
import StackedAreaChart from "@Assets/images/graphImges/linecharts/stacked-area-chart.png";
import CustomizeLineChart from "@Assets/images/graphImges/linecharts/customize-line-chart.png";

import SimpleBarChart from "@Assets/images/graphImges/barcharts/simple-bar-chart.png";
import CustomizeShapeBarChart from "@Assets/images/graphImges/barcharts/customize-shape-bar-chart.png";
import LineAndBarChart from "@Assets/images/graphImges/barcharts/line-and-bar-chart.png";

import PieChart from "@Assets/images/graphImges/PieChart/piechart.png";

import GeoChart from "@Assets/images/graphImges/others/geo-graph.png";
import RadarChart from "@Assets/images/graphImges/others/radar-chart.png";
import RadialChart from "@Assets/images/graphImges/others/radial-chart.png";

const graphImages = () => {
  return {
    lineCharts: {
      LineChart,
      StackedAreaChart,
      CustomizeLineChart
    },
    barCharts: {
      SimpleBarChart,
      CustomizeShapeBarChart,
      LineAndBarChart
    },
    pieCharts: {
      PieChart
    },
    otherCharts: {
      GeoChart,
      RadarChart,
      RadialChart
    }
  };
};

export default graphImages;