import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { Modal } from "antd";
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
    onAdd
}) => {
    return (
        <Modal
            title={graph ? `${graph.name} (ID: ${graph.id})` : ""}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={600} // Increase the width of the modal
        >
            {graph && (
                <>
                    <h3 className="mb-4 text-center">{graph.category}</h3>
                    <img
                        src={graph.image}
                        alt={graph.name}
                        className="w-full h-72 object-contain mb-4" // Lower the size of the image
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
                            onClick={onAdd}
                            disabled={!prompt.trim()}
                            className="text-base w-[45%] white"
                        />
                    </div>
                </>
            )}
        </Modal>
    );
};

export default GraphModal;
