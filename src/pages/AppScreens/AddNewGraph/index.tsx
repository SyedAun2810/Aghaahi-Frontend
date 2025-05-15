import { useState } from "react";
import { Col, Flex, Row } from "antd";
import GraphCard from "./components/GraphCard";
import GraphModal from "./components/GraphModal";
import Select from "@Components/CustomSelect/CustomSelect";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import SimpleLineChart from "@Components/Graphs/LineChart";
import AreaChartComponent from "@Components/Graphs/AreaChartComponent";
import CustomizeLineChart from "@Components/Graphs/CustomizeLineChart";
import SimpleBarChartComponent from "@Components/Graphs/SimpleBarChart";
import CustomizeBarChartComponent from "@Components/Graphs/CustomizeShapeBarChart";
import LineBarAreaChartComponent from "@Components/Graphs/LineBarAreaChart";
import SimplePieChartComponent from "@Components/Graphs/SimplePieChart";
import RadarChartComponent from "@Components/Graphs/RadarCharts";
import RadialBarChartComponent from "@Components/Graphs/RadialBarChart";
import AnalyticsCard from "@Components/AnalyticsCard/AnalyticsCard";
import { lineChartDefaults, barChartDefaults, pieChartDefaults } from "@Components/Graphs/graphDefaults";
import CompleteOrderIcon from "@Assets/icons/completedOrdersIcon.svg";

const graphs = [
  { 
    id: 1, 
    name: "Line Chart", 
    category: "Line Chart", 
    Component: <SimpleLineChart chartConfig={lineChartDefaults} />,
    defaultData: lineChartDefaults
  },
  { 
    id: 2, 
    name: "Stacked Area Chart", 
    category: "Line Chart", 
    Component: <AreaChartComponent chartConfig={{ 
      data: lineChartDefaults.data, 
      config: [
        { dataKey: 'uv', stroke: '#8884d8' },
        { dataKey: 'pv', stroke: '#82ca9d' },
        { dataKey: 'amt', stroke: '#ffc658' }
      ]
    }} />,
    defaultData: {
      data: lineChartDefaults.data,
      config: [
        { dataKey: 'uv', stroke: '#8884d8' },
        { dataKey: 'pv', stroke: '#82ca9d' },
        { dataKey: 'amt', stroke: '#ffc658' }
      ]
    }
  },
  // { 
  //   id: 3, 
  //   name: "Customize Line Chart", 
  //   category: "Line Chart", 
  //   Component: <CustomizeLineChart chartConfig={lineChartDefaults} />,
  //   defaultData: lineChartDefaults
  // },
  { 
    id: 4, 
    name: "Simple Bar Chart", 
    category: "Bar Chart", 
    Component: <SimpleBarChartComponent chartConfig={{ data: barChartDefaults.data, config: barChartDefaults.bars.map(bar => ({ dataKey: bar.dataKey })) }} />,
    defaultData: barChartDefaults
  },
  { 
    id: 5, 
    name: "Customize Shape Bar Chart", 
    category: "Bar Chart", 
    Component: <CustomizeBarChartComponent chartConfig={{ data: barChartDefaults.data, config: barChartDefaults.bars.map(bar => ({ dataKey: bar.dataKey })) }} />,
    defaultData: barChartDefaults
  },
  { 
    id: 6, 
    name: "Line And Bar Chart", 
    category: "Bar Chart", 
    Component: <LineBarAreaChartComponent />,
    defaultData: {
      data: [
        { name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490 },
        { name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590 },
        { name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350 },
        { name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
        { name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
        { name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380 }
      ],
      areaConfig: { dataKey: 'amt' },
      barConfig: { dataKey: 'pv' },
      lineConfig: { dataKey: 'uv' },
      scatterConfig: { dataKey: 'cnt' }
    }
  },
  { 
    id: 7, 
    name: "Pie Chart", 
    category: "Pie Chart", 
    Component: <SimplePieChartComponent chartConfig={{ data: pieChartDefaults.data, config: { dataKey: pieChartDefaults.dataKey } }} />,
    defaultData: pieChartDefaults
  },
  { 
    id: 9, 
    name: "Radar Chart", 
    category: "Others", 
    Component: <RadarChartComponent radarConfigs={[{ name: "Student A", dataKey: "A" }]} />,
    defaultData: {
      radarConfigs: [{ name: "Student A", dataKey: "A" }]
    }
  },
  // { 
  //   id: 10, 
  //   name: "Radial Chart", 
  //   category: "Others", 
  //   Component: <RadialBarChartComponent chartConfig={{ data: [
  //     { name: '18-24', uv: 31.47, pv: 2400 },
  //     { name: '25-29', uv: 26.69, pv: 4567 },
  //     { name: '30-34', uv: 15.69, pv: 1398 },
  //     { name: '35-39', uv: 8.22, pv: 9800 },
  //     { name: '40-49', uv: 8.63, pv: 3908 },
  //     { name: '50+', uv: 2.63, pv: 4800 },
  //     { name: 'unknown', uv: 6.67, pv: 4800 }
  //   ], dataKey: 'uv' }} />,
  //   defaultData: {
  //     data: [
  //       { name: '18-24', uv: 31.47, pv: 2400 },
  //       { name: '25-29', uv: 26.69, pv: 4567 },
  //       { name: '30-34', uv: 15.69, pv: 1398 },
  //       { name: '35-39', uv: 8.22, pv: 9800 },
  //       { name: '40-49', uv: 8.63, pv: 3908 },
  //       { name: '50+', uv: 2.63, pv: 4800 },
  //       { name: 'unknown', uv: 6.67, pv: 4800 }
  //     ],
  //     dataKey: 'uv'
  //   }
  // },
  { 
    id: 11, 
    name: "Analytics Card", 
    category: "Others", 
    Component: <AnalyticsCard title="Sample Analytics" count={1000} icon={<CompleteOrderIcon />} fromLibrary={true} />,
    defaultData: {
      title: "Sample Analytics",
      count: 1000,
      icon: <CompleteOrderIcon />
    }
  }
];

const categories = ["All", "Line Chart", "Bar Chart", "Pie Chart", "Others"];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenModal = (graph) => {
    setSelectedGraph(graph);
    setIsModalOpen(true);
    setPrompt("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGraph(null);
    setPrompt("");
  };

  const handleAddToDashboard = () => {
    //console.log(`Graph ID: ${selectedGraph.id}`);
    //console.log(`Prompt: ${prompt}`);
    handleCloseModal();
  };

  const filteredGraphs = graphs.filter((graph) => {
    const matchesSearch = graph.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || graph.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Flex className="w-full px-4 py-2 gap-4 z-10" align="center" justify="center">
        <CustomSearch
          debounceSearch={(text) => setSearchQuery(text)}
          className="w-[40%] h-[64px]"
          placeholder="Search by name..."
        />

        <Select
          value={selectedCategory}
          className="w-[200px] h-[64px]"
          onChange={(value) => setSelectedCategory(value)}
          options={categories.map((category) => ({ label: category, value: category }))}
        />
      </Flex>

      <Row gutter={[16, 16]} className="border-bottom pb-6 px-4 mt-6">
        {filteredGraphs.length > 0 ? (
          filteredGraphs.map((graph) => (
            <Col key={graph.id} span={8}>
              <GraphCard graph={graph} onClick={handleOpenModal} />
            </Col>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No graphs found.</p>
        )}
      </Row>

      <GraphModal
        isOpen={isModalOpen}
        graph={selectedGraph}
        prompt={prompt}
        setPrompt={setPrompt}
        onClose={handleCloseModal}
        onAdd={handleAddToDashboard}
      />
    </>
  );
};

export default Dashboard;