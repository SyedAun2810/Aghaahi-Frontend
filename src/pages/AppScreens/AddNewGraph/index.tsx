import { useState } from "react";
import { Col, Flex, Row } from "antd";
import GraphCard from "./components/GraphCard";
import graphImages from "./helpers/graphImages";
import GraphModal from "./components/GraphModal";
import Select from "@Components/CustomSelect/CustomSelect";
import CustomSearch from "@Components/CustomSearch/CustomSearch";

const graphs = [
  { id: 1, name: "Line Chart", category: "Line Chart", image: graphImages().lineCharts.LineChart },
  { id: 2, name: "Stacked Area Chart", category: "Line Chart", image: graphImages().lineCharts.StackedAreaChart },
  { id: 3, name: "Customize Line Chart", category: "Line Chart", image: graphImages().lineCharts.CustomizeLineChart },
  { id: 4, name: "Simple Bar Chart", category: "Bar Chart", image: graphImages().barCharts.SimpleBarChart },
  { id: 5, name: "Customize Shape Bar Chart", category: "Bar Chart", image: graphImages().barCharts.CustomizeShapeBarChart },
  { id: 6, name: "Line And Bar Chart", category: "Bar Chart", image: graphImages().barCharts.LineAndBarChart },
  { id: 7, name: "Pie Chart", category: "Pie Chart", image: graphImages().pieCharts.PieChart },
  // { id: 8, name: "Geo Chart", category: "Others", image: graphImages().otherCharts.GeoChart },
  { id: 9, name: "Radar Chart", category: "Others", image: graphImages().otherCharts.RadarChart },
  { id: 10, name: "Radial Chart", category: "Others", image: graphImages().otherCharts.RadialChart },
  { id: 11, name: "Card", category: "Others", image: graphImages().otherCharts.MetricsCard },
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
    console.log(`Graph ID: ${selectedGraph.id}`);
    console.log(`Prompt: ${prompt}`);
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
          className="w-[40%]"
          placeholder="Search by name..."
        />

        <Select
          value={selectedCategory}
          className="w-[200px] h-[44px]"
          onChange={(value) => setSelectedCategory(value)}
          options={categories.map((category) => ({ label: category, value: category }))}
        />
      </Flex>

      <Row gutter={[16, 16]} className="border-bottom pb-6 px-4">
        {filteredGraphs.length > 0 ? (
          filteredGraphs.map((graph) => (
            <Col key={graph.id} span={6}>
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