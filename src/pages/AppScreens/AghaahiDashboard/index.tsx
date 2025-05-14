import _ from "lodash";
import { Dropdown, Menu, message } from "antd";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import React, { FunctionComponent, useState, useEffect, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { useDashboardGraphData, useRenderGeneratedGraph } from "./useDashboardContainer";
import { queryClient } from "@Api/Client";
import { queryKeys } from "@Constants/queryKeys";

interface Props {
    domElements: any[];
    className?: string;
    rowHeight?: number;
    onLayoutChange?: (layout: any) => void;
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
        { w: 4, h: 3, x: 0, y: 0, i: "200", static: false, minW: 4, minH: 3 },
        { w: 4, h: 3, x: 8, y: 0, i: "1", static: false, minW: 4, minH: 3 },
    ],
};

interface GraphData {
    chart_id: number;
    type: string;
    title?: string;
    count?: number;
    icon?: React.ReactNode;
    showDollar?: boolean;
    chart?: {
        meta_info?: string;
        y_axis?: string;
    };
    data?: any[];
}

interface LayoutItem {
    w: number;
    h: number;
    x: number;
    y: number;
    i: string;
    static: boolean;
    minW: number;
    minH: number;
    chart_id: number;
}

const graphData = [
    { id: "0", type: "analyticsCard", title: "Completed Orders", count: 20000, icon: <CompleteOrderIcon /> },
    { id: "1", type: "analyticsCard", title: "Pending Orders", count: 5000, icon: <PendingOrdersIcon /> },
    { id: "2", type: "lineChart", component: <SimpleLineChart /> },
    { id: "3", type: "analyticsCard", title: "Total Products", count: 1500, icon: <TotalProductsIcon /> },
    { id: "4", type: "analyticsCard", title: "Total Earnings", count: 50000, icon: <TotalEarningsIcon />, showDollar: true },
    { id: "5", type: "lineChart", component: <SimpleLineChart /> },
    { id: "6", type: "pieChart", component: <SimplePieChartComponent dataKey="value" /> },
    { id: "7", type: "barChart", component: <SimpleBarChartComponent /> },
    { id: "8", type: "radialBarChart", component: <RadialBarChartComponent radarConfig={{ name: "Group A", dataKey: "uv" }} /> },
    { id: "9", type: "radarChart", component: <RadarChartComponent radarConfigs={[{ name: "Student A", dataKey: "A" }]} /> },
    { id: "10", type: "areaChart", component: <AreaChartComponent dataKeys={["uv", "pv", "amt"]} /> },
    { id: "11", type: "lineBarAreaChart", component: <LineBarAreaChartComponent /> },
    { id: "12", type: "customBarChart", component: <CustomizeBarChartComponent /> },
    { id: "13", type: "customBarChart", component: <CustomizeBarChartComponent /> },
    { id: "14", type: "areaChart", component: <AreaChartComponent dataKeys={["uv", "pv", "amt"]} /> },
];

const AgaahiDashboard: FunctionComponent<Props> = (props) => {
    const { renderGeneratedGraph, layoutData, isFetchingLayout, graphDataFromBackend, isFetchingGraphData } = useRenderGeneratedGraph();
    const location = useLocation();

    const [layouts, setLayouts] = useState<{ lg: LayoutItem[] }>({ lg: [] });
    const [latestLayoutChanges, setLatestLayoutChanges] = useState<{ lg: LayoutItem[] } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState<GraphData | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLayoutChanging, setIsLayoutChanging] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { mutate: updateLayout, isLoading: isUpdatingLayout } = useUpdateLayout((data: any) => { });

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            queryClient.invalidateQueries({ queryKey: [queryKeys.dashboard.getLayout] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.dashboard.getGraphData] });
        }
    }, [location.pathname]);

    useEffect(() => {
        if (layoutData && layoutData.lg && layoutData.lg.length > 0) {
            const transformedLayouts = {
                lg: layoutData.lg.map((item: any, index: number) => ({
                    w: item.width,
                    h: item.height,
                    x: item.position_x,
                    y: item.position_y,
                    i: index.toString(),
                    static: item.is_static,
                    minW: 4,
                    minH: 3,
                    chart_id: item.chart_id,
                })),
            };
            setLayouts(transformedLayouts);
        }
    }, [layoutData]);

    const handleLayoutChange = useCallback((layout: any, allLayouts: any) => {
        if (isEditMode) {
            setIsLayoutChanging(true);

            // Create a new layout that preserves chart_id
            const updatedLayouts = {
                lg: layout.map((item: any) => {
                    // Find the original layout item to get the chart_id
                    const originalItem = layouts.lg.find((orig: LayoutItem) => orig.i === item.i);
                    return {
                        ...item,
                        chart_id: originalItem?.chart_id || 0,
                        minW: 4,
                        minH: 3,
                        static: false
                    };
                })
            };

            setLatestLayoutChanges(updatedLayouts);
            setLayouts(updatedLayouts);
        }
    }, [isEditMode, layouts]);

    const handleDelete = (id: string) => {
        if (isEditMode) {
            const updatedLayouts = {
                lg: layouts.lg.filter((item: LayoutItem) => item.i !== id),
            };
            setLayouts(updatedLayouts);
            handleSaveChanges(updatedLayouts);
            // Wait for state update to complete before saving changes
            // setTimeout(() => {
            //     handleSaveChanges();
            // }, 1000);
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Enter" && isEditMode) {
            const payload = mapLayoutsToApiFormat(layouts);
            console.log("Payload to be sent to API:", payload); // Log the payload
        }
    };

    const handleSaveChanges = useCallback((updatedLayouts: any) => {
        let payload = null;
        if (updatedLayouts) {
            payload = mapLayoutsToApiFormat(updatedLayouts);
        } else {
            payload = mapLayoutsToApiFormat(layouts);
        }

        if (payload) {
            updateLayout({ layouts: payload });
        }

        setIsEditMode(false);
        setIsLayoutChanging(false);
        setLatestLayoutChanges(null);
    }, [latestLayoutChanges, layouts, updateLayout]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [layouts, isEditMode]);
    console.log("main layouts", layouts);
    const mapLayoutsToApiFormat = (layouts: any) => {

        console.log("layouts", layouts);
        if (!layouts?.lg?.length) {
            return []
        }

        if (!layoutData?.lg?.length || layouts?.lg[0].i === 200) {
            return null;
        }

        // Create a map for faster lookups
        const layoutDataMap = new Map(
            layoutData.lg.map((item: any) => [item.chart_id, item])
        );

        return layouts.lg.map((layoutItem: LayoutItem) => {
            const matchingLayout = layoutDataMap.get(layoutItem.chart_id);
            if (!matchingLayout) {
                return null;
            }

            return {
                id: matchingLayout.id,
                breakpoint: "lg",
                width: layoutItem.w,
                height: layoutItem.h,
                position_x: layoutItem.x,
                position_y: layoutItem.y,
                is_static: layoutItem.static,
                grid_i: matchingLayout.grid_i,
                employee_id: matchingLayout.employee_id || 0,
                chart_id: matchingLayout.chart_id || 0,
                chart: {
                    id: matchingLayout.chart?.id || 0,
                    x_axis: matchingLayout.chart?.x_axis || "",
                    y_axis: matchingLayout.chart?.y_axis || "",
                    sql_query: matchingLayout.chart?.sql_query || "",
                    meta_info: matchingLayout.chart?.meta_info || "",
                    chart_id: matchingLayout.chart?.chart_id || 0,
                },
            };
        }).filter(Boolean); // Remove null entries
    };

    const generateDOM = useCallback(() => {
        return (layouts.lg || []).map((layoutItem: LayoutItem) => {
            const graph = graphDataFromBackend?.find((g: GraphData) => g.chart_id === layoutItem.chart_id);
            const metaData = JSON.parse(graph?.chart?.meta_info || '{}');

            return (
                <div
                    key={layoutItem.i}
                    style={{
                        gridColumn: `span ${layoutItem.w}`,
                        gridRow: `span ${layoutItem.h}`,
                    }}
                    className="rounded-lg shadow-md"
                >
                    {isEditMode && (
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="delete" onClick={() => handleDelete(layoutItem.i)}>
                                        Delete Graph
                                    </Menu.Item>
                                    <Menu.Item key="edit" onClick={() => {
                                        message.info('Edit Graph feature is under development');
                                        setSelectedGraph(graph || null);
                                    }}>
                                        Edit Graph
                                    </Menu.Item>
                                </Menu>
                            }
                            trigger={["hover"]}
                        >
                            <button
                                className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ThreeDotsIcon
                                    height={`${Math.min(layoutItem.w, layoutItem.h) * 2}px`}
                                    width={`${Math.min(layoutItem.w, layoutItem.h) * 2}px`}
                                />
                            </button>
                        </Dropdown>
                    )}
                    {graph ? (
                        <div className={`dragMe h-full bg-white ${metaData.chart_id === 11 ? "" : "py-12"}`}>
                            {graph.type === "analyticsCard" ? (
                                <AnalyticsCard
                                    title={graph.title || ""}
                                    count={graph.count || 0}
                                    icon={graph.icon}
                                    showDollar={graph.showDollar}
                                    className="bg-white rounded"
                                />
                            ) : (
                                renderGeneratedGraph(graph)
                            )}
                        </div>
                    ) : (
                        <ShimmerPlaceholder />
                    )}
                </div>
            );
        });
    }, [layouts, graphDataFromBackend, isEditMode, renderGeneratedGraph]);

    return (
        <>
            <style>{shimmerStyles}</style>
            <div className="m-2">
                <button
                    className="fixed right-6 bottom-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-2 z-10"
                    onClick={() => {
                        if (isEditMode) {
                            handleSaveChanges(); // Save changes and log payload
                        } else {
                            setIsEditMode(true); // Enter edit mode
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        {isEditMode ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        )}
                    </svg>
                    {isEditMode ? "Save Changes" : "Enter Edit Mode"}
                </button>
                <ResponsiveReactGridLayout
                    {...props}
                    layouts={{ lg: layouts.lg }}
                    onLayoutChange={handleLayoutChange}
                    isDroppable={isEditMode}
                    isDraggable={isEditMode}
                    isResizable={isEditMode}
                    rowHeight={40}
                    compactType="vertical"
                    preventCollision={true}
                >
                    {generateDOM()}
                </ResponsiveReactGridLayout>
                {isModalOpen && (
                    <GraphModal
                        isOpen={isModalOpen}
                        graph={selectedGraph}
                        onClose={() => setIsModalOpen(false)}
                        onAdd={() => { }}
                    />
                )}
            </div>
        </>
    );
};

AgaahiDashboard.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: (layout: any) => { },
    cols: { lg: 24 }, // Only `lg` is defined
    breakpoints: { lg: 1600 }, // Only `lg` is defined
    containerPadding: [0, 0],
};

export const useUpdateLayout = ({ onSuccess }: any) => {
    return useMutation(
        async (payload: any) => {
            const response = await updateLayout(payload); // Await the API call
            return response; // Return the response
        },
        {
            onSuccess: ({ ok, response, data }: any) => {
                if (ok) {
                    onSuccess(data); // Corrected the typo here
                }
            },
            onError: (err: any) => {
                console.error("Error in sendPrompt:", err);
                throw err;
            },
        }
    );
};

async function updateLayout(payload: any) {
    const response = await ApiService.put(
        `${API_CONFIG_URLS.DASHBOARD.UPDATE_LAYOUT}`, payload
    );

    return response;
}

export default AgaahiDashboard;

