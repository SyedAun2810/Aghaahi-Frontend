import React from "react";
import GraphConst, { strokeColors } from "@Components/Graphs/graphConst";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useRenderGeneratedGraph = () => {
    const { data: layoutData, isFetching: isFetchingLayout } = useLayout();
    const { data: graphDataFromBackend, isFetching: isFetchingGraphData } = useDashboardGraphData();
    const { graphs } = GraphConst();

    const renderGeneratedGraph = React.useCallback((generatedGraphData: any) => {
        if (!generatedGraphData) return null;
        
        let graphId = parseInt(generatedGraphData?.chart?.chart_id);
        const yAxisRaw = generatedGraphData?.chart?.y_axis;
        const metaData = JSON.parse(generatedGraphData?.chart?.meta_info || '{}');
        

        const yAxisKeys = yAxisRaw ? JSON.parse(yAxisRaw) : [];
        
        const graphEntry = graphs.find((g) => g.id === graphId);
        if (!graphEntry) return <p>Graph not found</p>;

        const GraphComponent = graphEntry?.Component;
        let title = metaData?.meta_info?.title;
        let props: any = {};

        if (graphId === 11) {
            let key = yAxisKeys[0];
            let count = generatedGraphData?.data[0][key];
            props.title = title;
            props.count = count;
            props.key = key;
            props.fromLibrary = false;
        } else if ([1, 3, 4, 5].includes(graphId)) {
            const chartConfig: any = {};
            let xaxisKey = generatedGraphData?.chart?.x_axis;            ;
            console.log("xaxisKey", xaxisKey);
            let config = yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)],
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey]))
                    ? new Date(item[xaxisKey]).toISOString().split("T")[0]
                    : item[xaxisKey],
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
        } else if (graphId === 7) {
            const chartConfig: any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = { dataKey: yAxisKeys[0] };
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey]))
                    ? new Date(item[xaxisKey]).toISOString().split("T")[0]
                    : item[xaxisKey],
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
        }

        return React.cloneElement(GraphComponent, { ...props });
    }, [graphs]);

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
    }, {
        staleTime: 30000, // Keep data fresh for 30 seconds
        cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
};

async function getDashboardGraphData() {
    const response = await ApiService.get(`${API_CONFIG_URLS.DASHBOARD.DASHBOARD_DATA}`);
    return response;
}
