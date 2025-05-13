import { CustomButton } from "@Components/Button";
import AreaChartComponent from "@Components/Graphs/AreaChartComponent";
import Input from "@Components/TextInput/TextInput";
import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "./GraphCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import NotificationService from "@Services/NotificationService";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import GraphConst, { strokeColors } from "@Components/Graphs/graphConst";
import { Console } from "console";
import { dummyChartConfig } from "@Components/Graphs/LineChart";
import { s } from "framer-motion/dist/types.d-DDSxwf0n";
import { queryKeys } from "@Constants/queryKeys";


interface GraphModalProps {
    isOpen: boolean;
    graph: Graph | null;
    prompt: string;
    setPrompt: (prompt: string) => void;
    onClose: () => void;
    onAdd: () => void;
}

const GraphModal: React.FC<GraphModalProps> = ({
    isOpen,
    graph,
    prompt,
    setPrompt,
    onClose,
    onAdd,
}) => {
// Fetch layout data
    const navigate = useNavigate();
    const [isGraphGenerated, setIsGraphGenerated] = React.useState(false);
    const [generatedGraphData, setGeneratedGraphData] = React.useState<any>(null);
    const { graphs } = GraphConst();
    //console.log("Graphs:", graphs);

    const { mutate: saveChart, isLoading: isSavingChart } = useSaveChart(() => {
        //console.log("Chart saved successfully.");
        navigate("/dashboard");
        onAdd(); // Call the onAdd function
    });

    const handleClose = () => {
        setIsGraphGenerated(false); // Reset graph generation state
        setGeneratedGraphData(null); // Clear generated graph data
        onClose(); // Call the original onClose function
    };

    const handleViewResults = () => {
        if (graph && prompt.trim()) {
            const payload = {
                chart_id: graph.id,
                user_prompt: prompt.trim(),
            };
            generateGraph(payload);
            //console.log("Generated Payload:", payload);
        }
    };

    const { mutate: generateGraph, isLoading: isGeneratingGraph } = useGenerateGraph((data: any) => {

        //console.log("Graph Data:", data); // Log the
        setGeneratedGraphData(data); // Save backend data
        setIsGraphGenerated(true); // Set graph as generated
    });

    const handleAddToDashboard = () => {
        if (!generatedGraphData) return;

        const payload = {
            chart_id: generatedGraphData.chartId,
            sql_query: generatedGraphData.sql_query,
            chart_name: generatedGraphData.metadata?.title || "Untitled Chart",
            x_axis: generatedGraphData.xAxisKey || "",
            y_axis: generatedGraphData.yAxisKeys,
            meta_info: generatedGraphData?.metadata || {},
        };

        //console.log("Saving chart with payload:", payload);
        saveChart(payload); // Call the saveChart mutation
    };

    const renderGeneratedGraph = () => {
        if (!generatedGraphData) return null;
        //console.log("Generated Graph Data:", generatedGraphData); 
        const graphEntry = graphs.find((g) => g.id === generatedGraphData.chartId); // Find the graph by ID
        if (!graphEntry) return <p>Graph not found</p>; // Handle invalid ID

        const GraphComponent = graphEntry?.Component; 
        //console.log(GraphComponent)
        let title =generatedGraphData?.metadata?.title;
        let props:any = {}
        if(graphEntry.id === 11) {
            let key = generatedGraphData?.yAxisKeys[0];
            let count = generatedGraphData?.data[0][key];
            props.title = title;
            props.count = count;
            props.key = key;
        }
        else if(graphEntry.id === 1) {
            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = generatedGraphData.yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)], // Select a random color for each item
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
            // console
            // props = dummyChartConfig;
        }
        else if(graphEntry.id === 2) {
            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = generatedGraphData.yAxisKeys.map((item) => ({
                dataKey: item,
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;

            //console.log({props})
            // console
            // props = dummyChartConfig;
        }
        else if(graphEntry.id === 3) {
            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = generatedGraphData.yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)], // Select a random color for each item
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
            // console
            // props = dummyChartConfig;
        }
        else if(graphEntry.id === 4) {
            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = generatedGraphData.yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)], // Select a random color for each item
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
            // console
            // props = dummyChartConfig;
        }
        else if(graphEntry.id === 5) {

            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = generatedGraphData.yAxisKeys.map((item) => ({
                dataKey: item,
                stroke: strokeColors[Math.floor(Math.random() * strokeColors.length)], // Select a random color for each item
            }));
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
            // console
            // props = dummyChartConfig;
        }
        else if(graphEntry.id === 7) {

            const chartConfig : any = {};
            let xaxisKey = generatedGraphData?.xAxisKey;

            let config = {dataKey: generatedGraphData.yAxisKeys[0]};
            chartConfig.data = generatedGraphData?.data.map((item) => ({
                ...item,
                name: !isNaN(Date.parse(item[xaxisKey])) // Check if the string can be parsed as a valid date
                    ? new Date(item[xaxisKey]).toISOString().split('T')[0] // Extract only the date part
                    : item[xaxisKey], // Keep it as is if not a valid date string
                // stroke: color, // Uncomment if needed
            }));

            chartConfig.config = config;
            props.chartConfig = chartConfig;
            // console
            // props = dummyChartConfig;
        }
        //console.log(props)
        return React.cloneElement(GraphComponent, {...props}); // Pass backend data as props
    };

    return (
        <Modal
            title={graph ? <span className="text-gray-900 dark:text-white text-2xl font-bold ">{graph.name}</span> : ""}
            open={isOpen}
            onCancel={handleClose}
            footer={null}
            width={1000}
        >
            {isGraphGenerated ? (
                <div className="text-center">
                    <div className="h-[400px] mb-4 flex justify-center items-center mt-12">
                        {renderGeneratedGraph()}
                    </div>
                    <div className="flex gap-4 mt-8 justify-center">
                        <CustomButton
                            title="Yes, Add to Dashboard"
                            onClick={handleAddToDashboard}
                            className="text-base w-[45%]"
                            isLoading={isSavingChart}
                        />
                        <CustomButton
                            title="Cancel"
                            onClick={handleClose}
                            className="text-base w-[45%]"
                            type="outlined"
                        />
                    </div>
                </div>
            ) : (
                graph && (
                    <>
                        <h2 className="mb-4 text-center text-gray-900 dark:text-white mt-6">{graph.category}</h2>
                        <div className="h-[400px] mb-4 flex justify-center items-center">
                            {graph.Component}
                        </div>

                        <Input
                            label="Prompt"
                            placeholder="Enter prompt here"
                            type="textarea"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <div className="flex gap-4 mt-8 justify-center">
                            <CustomButton
                                title="Cancel"
                                onClick={handleClose}
                                className="text-base w-[45%]"
                                type="outlined"
                            />
                            <CustomButton
                                title="View Results"
                                onClick={handleViewResults}
                                disabled={!prompt.trim()}
                                className="text-base w-[45%] white"
                                isLoading={isGeneratingGraph}
                            />
                        </div>
                    </>
                )
            )}
        </Modal>
    );
};

export const useGenerateGraph = (onSuccess: (data?: any) => void) => {
    return useMutation(
        (payload: any) => generateGraph(payload), // Mutation function
        {
            onSuccess: ({ ok, response, data }: any, payload: any) => {
                if (ok) {
                    //console.log("Verify Data");
                    onSuccess(data);
                    return data;
                }
                //console.log("error", response);
                NotificationService.error(response?.message);
                throw response.message;
            },
            onError: (err: any) => {
                throw err;
            },
        }
    );
};

async function generateGraph(payload: any) {
    const response = await ApiService.postWithoutHandleResponse(API_CONFIG_URLS.DASHBOARD.GENERATE_GRAPH, payload);
    return response;
}

export const useSaveChart = (onSuccess: () => void) => {
    return useMutation(
        (payload: any) => saveChart(payload), // Mutation function
        {
            onSuccess: ({ ok, response }: any) => {
                if (ok) {
                    onSuccess();
                } else {
                    //console.log("Error saving chart:", response);
                    NotificationService.error(response?.message);
                }
            },
            onError: (err: any) => {
                console.error("Error:", err);
                NotificationService.error("Failed to save the chart.");
            },
        }
    );
};

async function saveChart(payload: any) {
    const response = await ApiService.postWithoutHandleResponse(API_CONFIG_URLS.DASHBOARD.SAVE_GRAPH, payload);
    return response;
}

export default GraphModal;