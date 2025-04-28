import { CustomButton } from "@Components/Button";
import AreaChartComponent from "@Components/Graphs/AreaChartComponent";
import Input from "@Components/TextInput/TextInput";
import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "./GraphCard";

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
    const navigate = useNavigate(); 
    const [isGraphGenerated, setIsGraphGenerated] = React.useState(false); // New state for graph generation

    const handleViewResults = () => {
        if (graph && prompt.trim()) {
            const payload = {
                graphId: graph.id,
                prompt: prompt.trim(),
            };
            console.log("Generated Payload:", payload);
            setIsGraphGenerated(true); // Set graph as generated
        }
    };

    const handleAddToDashboard = () => {
        console.log("User pressed 'Yes' to add the graph to the dashboard.");
        navigate("/dashboard")
        onAdd(); // Call the onAdd function
    };

    return (
        <Modal
            title={graph ? `${graph.name} ` : ""}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            {isGraphGenerated ? (
                <div className="text-center">
                    <div className="h-72 mb-4 flex justify-center items-center mt-12">
                        <AreaChartComponent />
                    </div>
                    <div className="flex gap-4 mt-8 justify-center">
                        <CustomButton
                            title="Yes, Add to Dashboard"
                            onClick={handleAddToDashboard}
                            className="text-base w-[45%]"
                        />
                        <CustomButton
                            title="Cancel"
                            onClick={onClose}
                            className="text-base w-[45%]"
                            type="outlined"
                        />
                    </div>
                </div>
            ) : (
                // Default modal content
                graph && (
                    <>
                        <h3 className="mb-4 text-center">{graph.category}</h3>
                        <img
                            src={graph.image}
                            alt={graph.name}
                            className="w-full h-72 object-contain mb-4"
                        />

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
                                onClick={onClose}
                                className="text-base w-[45%]"
                                type="outlined"
                            />
                            <CustomButton
                                title="View Results"
                                onClick={handleViewResults} // Call the new function
                                disabled={!prompt.trim()}
                                className="text-base w-[45%] white"
                            />
                        </div>
                    </>
                )
            )}
        </Modal>
    );
};

export default GraphModal;