import React from "react";
import GraphConst, { strokeColors } from "@Components/Graphs/graphConst";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useRenderGeneratedGraph = (generatedGraphData: any) => {

    generatedGraphData = {};
    // graphs = [];
    const { data: layoutData, isFetching: isFetchingLayout } = useLayout();
    const { data: graphDataFromBackend, isFetching: isFetchingGraphData } = useDashboardGraphData();
    const { graphs } = GraphConst();

    const renderGeneratedGraph = (generatedGraphData: any) => {
        let graphId = parseInt(generatedGraphData?.chart?.chart_id);
        const yAxisRaw = generatedGraphData?.chart?.y_axis;
        const metaData = JSON.parse(generatedGraphData?.chart?.meta_info || '{}');

       const yAxisKeys = yAxisRaw ? JSON.parse(yAxisRaw) : [];
        // return null;
        if (!generatedGraphData) return null;
        //console.log("Generated Graph Data:", generatedGraphData);
        const graphEntry = graphs.find((g) => g.id === graphId); // Find the graph by ID
        if (!graphEntry) return <p>Graph not found</p>; // Handle invalid ID

        const GraphComponent = graphEntry?.Component;
        //console.log(GraphComponent);
        let title = metaData?.meta_info?.title;
        let props: any = {};

        if (graphId === 11) {
            let key = yAxisKeys[0];
            let count = generatedGraphData?.data[0][key];
            props.title = title;
            props.count = count;
            props.key = key;
        } else if ([1, 3, 4, 5].includes(graphId)) {
            const chartConfig: any = {};
            let xaxisKey = generatedGraphData?.x_axis?.xAxisKey;

            let config = yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)], // Select a random color for each item
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split("T")[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
        } else if (graphId === 2) {
            const chartConfig: any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = yAxisKeys.map((item) => ({
                dataKey: item,
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split("T")[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
        } else if (graphId === 7) {
            const chartConfig: any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = { dataKey: yAxisKeys[0] };
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split("T")[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
        }

        //console.log(props);
        return React.cloneElement(GraphComponent, { ...props }); // Pass backend data as props
    };

    return {
        renderGeneratedGraph,
        layoutData,
        isFetchingLayout,
        graphDataFromBackend,
        isFetchingGraphData
    };
};











































export const useLayout = () => {
    return useQuery([queryKeys.dashboard.getLayout], async () => {
        const { ok, data } = await getLayout();
        if (ok) {
            // Transform the layout data keys

            //console.log("From hook ", data.data)
            const transformedData = data?.data.map((item: any) => ({
                w: item.width,
                h: item.height,
                x: item.position_x,
                y: item.position_y,
                i: item.grid_i.toString(),
                static: item.is_static,
                ...item, // Keep the rest of the object keys
            }));
            const dataToReturn = {
                lg: transformedData,

            }
            return dataToReturn;
        }
        throw new Error("Failed to fetch layout data");
    });
};

async function getLayout() {
    const response = await ApiService.get(`${API_CONFIG_URLS.DASHBOARD.LAYOUT}`);
    return response;
}

export const useDashboardGraphData = () => {
    return useQuery([queryKeys.dashboard.getGraphData], async () => {
        const { ok, data } = await getDashboardGraphData();
        if (ok) {
            return data?.data;
        }
        throw new Error("Failed to fetch dashboard graph data");
    });
};

async function getDashboardGraphData() {
    const response = await ApiService.get(`${API_CONFIG_URLS.DASHBOARD.DASHBOARD_DATA}`);
    return response;
}
