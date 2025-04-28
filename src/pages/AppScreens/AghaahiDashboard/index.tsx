import _ from "lodash";
import { Dropdown, Menu } from "antd";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import { FunctionComponent, useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";
import AnalyticsCard from "@Components/AnalyticsCard/AnalyticsCard";
import ThreeDotsIcon from "@Assets/icons/threedots.svg";
import GraphModal from "../AddNewGraph/components/GraphModal";
import SimpleLineChart from "@Components/Graphs/LineChart";
import TotalProductsIcon from "@Assets/icons/totalProductsIcon.svg";
import PendingOrdersIcon from "@Assets/icons/pendingOrdersIcon.svg";
import TotalEarningsIcon from "@Assets/icons/totalEarningsIcon.svg";
import CompleteOrderIcon from "@Assets/icons/completedOrdersIcon.svg";
import SimplePieChartComponent from "@Components/Graphs/SimplePieChart";
import SimpleBarChartComponent from "@Components/Graphs/SimpleBarChart";
import RadialBarChartComponent from "@Components/Graphs/RadialBarChart";
import RadarChartComponent from "@Components/Graphs/RadarCharts";
import AreaChartComponent from "@Components/Graphs/AreaChartComponent";
import LineBarAreaChartComponent from "@Components/Graphs/LineBarAreaChart";
import CustomizeBarChartComponent from "@Components/Graphs/CustomizeShapeBarChart";

interface Props {
    domElements: any[];
    className?: string;
    rowHeight?: number;
    onLayoutChange?: (layout: any, layouts: any) => void;
    cols?: any;
    breakpoints?: any;
    containerPadding?: number[];
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ShimmerPlaceholder = () => (
    <motion.div
        className="shimmer-placeholder h-full w-full rounded-lg bg-gray-200 animate-pulse"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
    ></motion.div>
);

const shimmerStyles = `
    @keyframes shimmer {
        0% { background-position: -100% 0; opacity: 0; }
        50% { opacity: 1; }
        100% { background-position: 200% 0; opacity: 0; }
    }
    .shimmer-placeholder {
        background: linear-gradient(
            90deg,
            rgba(150, 150, 150, 0.2) 25%,
            rgba(180, 180, 180, 0.4) 50%,
            rgba(150, 150, 150, 0.2) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite ease-in-out;
    }
`;

const defaultLayouts = {
    lg: [
        { w: 4, h: 3, x: 0, y: 0, i: "0", static: false },
        { w: 4, h: 3, x: 8, y: 0, i: "1", static: false },
        { w: 8, h: 8, x: 16, y: 0, i: "2", static: false },
        { w: 4, h: 3, x: 0, y: 3, i: "3", static: false },
        { w: 4, h: 3, x: 8, y: 3, i: "4", static: false },
        { w: 8, h: 8, x: 16, y: 8, i: "5", static: false },
        { w: 8, h: 8, x: 0, y: 6, i: "6", static: false },
        { w: 8, h: 8, x: 8, y: 6, i: "7", static: false },
        { w: 8, h: 8, x: 16, y: 16, i: "8", static: false },
        { w: 8, h: 8, x: 0, y: 14, i: "9", static: false },
        { w: 8, h: 8, x: 8, y: 14, i: "10", static: false },
        { w: 8, h: 8, x: 16, y: 24, i: "11", static: false },
        { w: 8, h: 8, x: 0, y: 22, i: "12", static: false },
    ],
};

const graphData = [
    { id: "0", type: "analyticsCard", title: "Completed Orders", count: 20000, icon: <CompleteOrderIcon /> },
    { id: "1", type: "analyticsCard", title: "Pending Orders", count: 5000, icon: <PendingOrdersIcon /> },
    { id: "2", type: "lineChart", component: <SimpleLineChart /> },
    { id: "3", type: "analyticsCard", title: "Total Products", count: 1500, icon: <TotalProductsIcon /> },
    { id: "4", type: "analyticsCard", title: "Total Earnings", count: "$50,000", icon: <TotalEarningsIcon /> },
    { id: "5", type: "lineChart", component: <SimpleLineChart /> },
    { id: "6", type: "pieChart", component: <SimplePieChartComponent dataKey="value" /> },
    { id: "7", type: "barChart", component: <SimpleBarChartComponent /> },
    { id: "8", type: "radialBarChart", component: <RadialBarChartComponent radarConfig={{ name: "Group A", dataKey: "uv" }} /> },
    { id: "9", type: "radarChart", component: <RadarChartComponent radarConfigs={[{ name: "Student A", dataKey: "A" }]} /> },
    { id: "10", type: "areaChart", component: <AreaChartComponent dataKeys={["uv", "pv", "amt"]} /> },
    { id: "11", type: "lineBarAreaChart", component: <LineBarAreaChartComponent /> },
    { id: "12", type: "customBarChart", component: <CustomizeBarChartComponent /> },
];

const AgaahiDashboard: FunctionComponent<Props> = (props) => {
    const [layouts, setLayouts] = useState(defaultLayouts);
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState(null);

    useEffect(() => {
        const savedLayouts = localStorage.getItem("dashboardLayouts");
        if (savedLayouts) setLayouts(JSON.parse(savedLayouts));
        const timer = setTimeout(() => setMounted(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (mounted) localStorage.setItem("dashboardLayouts", JSON.stringify(layouts));
    }, [layouts, mounted]);

    const handleDelete = (id: string) => {
        setLayouts((prevLayouts) => ({
            ...prevLayouts,
            lg: prevLayouts.lg.filter((item) => item.i !== id),
        }));
    };

    const generateDOM = () =>
        (mounted ? layouts.lg : defaultLayouts.lg).map((layoutItem) => {
            const graph = graphData.find((g) => g.id === layoutItem.i);
            return (
                <div
                    key={layoutItem.i}
                    style={{
                        gridColumn: `span ${layoutItem.w}`,
                        gridRow: `span ${layoutItem.h}`,
                    }}
                    className="rounded-lg shadow-md " // Added box shadow class
                >
                    {mounted && graph ? (
                        <>
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item key="delete" onClick={() => handleDelete(layoutItem.i)}>
                                            Delete Graph
                                        </Menu.Item>
                                        <Menu.Item key="edit" onClick={() => setSelectedGraph(graph)}>
                                            Edit Graph
                                        </Menu.Item>
                                    </Menu>
                                }
                                trigger={["hover"]} // Change trigger to hover
                            >
                                <button
                                    className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
                                    onClick={(e) => e.stopPropagation()} // Prevent drag event propagation
                                >
                                    <ThreeDotsIcon
                                        height={`${Math.min(layoutItem.w, layoutItem.h) * 2}px`}
                                        width={`${Math.min(layoutItem.w, layoutItem.h) * 2}px`}
                                    />
                                </button>
                            </Dropdown>
                            <div className={`dragMe h-full bg-white ${graph.type === "analyticsCard" ? "" : "py-12 "}`}>
                                {graph.type === "analyticsCard" ? (
                                    <AnalyticsCard
                                        title={graph.title}
                                        count={graph.count}
                                        icon={graph.icon}
                                        className="bg-white rounded"
                                    />
                                ) : (
                                    graph.component
                                )}
                            </div>
                        </>
                    ) : (
                        <ShimmerPlaceholder />
                    )}
                </div>
            );
        });

    return (
        <>
            <style>{shimmerStyles}</style>
            <div className="m-2">
                <ResponsiveReactGridLayout
                    {...props}
                    layouts={layouts}
                    onLayoutChange={(layout, allLayouts) => setLayouts(allLayouts)}
                    isDroppable
                    isDraggable
                    isResizable
                    rowHeight={40}
                    compactType="vertical"
                >
                    {generateDOM()}
                </ResponsiveReactGridLayout>
                {isModalOpen && (
                    <GraphModal
                        isOpen={isModalOpen}
                        graph={selectedGraph}
                        onClose={() => setIsModalOpen(false)}
                        onAdd={() => {}}
                    />
                )}
            </div>
        </>
    );
};

export default AgaahiDashboard;

AgaahiDashboard.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: (layout: any, layouts: any) => {},
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
    breakpoints: { lg: 1600, md: 1600, sm: 1600, xs: 1600, xxs: 1600 },
    containerPadding: [0, 0],
};