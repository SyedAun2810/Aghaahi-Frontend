import _ from "lodash";
import { Dropdown, Menu } from "antd";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import { FunctionComponent, useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import SimpleLineChart from "@Components/Graphs/LineChart";
import ThreeDotsIcon from "@Assets/icons/threedots.svg";
import GraphModal from "../AddNewGraph/components/GraphModal";

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

const AghaahiDashboard: FunctionComponent<Props> = (props) => {
    const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
        lg: _.map(_.range(0, 9), function (item, i) {
            return {
                x: (i % 3) * 8,
                y: Math.floor(i / 3) * 4,
                w: 8,
                h: 8,
                i: i.toString(),
                static: false
            };
        })
    });

    const [mounted, setMounted] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedGraph, setSelectedGraph] = useState(null); 
    const [prompt, setPrompt] = useState(""); 


    useEffect(() => {
        setMounted(true);
    }, []);

    const onLayoutChange = (layout: any, layouts: any) => {
        setLayouts({ ...layouts });
    };

    const handleDelete = (id: string) => {
        console.log("it runs");
        setLayouts((prevLayouts) => {
            const updatedLayout = prevLayouts.lg.filter((item) => item.i !== id);
            return { lg: updatedLayout };
        });
    };

    const handleOpenModal = (graph: any) => {
        setSelectedGraph(graph);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedGraph(null);
        setIsModalOpen(false);
    };
    

    const generateDOM = () => {
        return _.map(layouts.lg, function (l, i) {
            const menu = (
                <Menu>
                    <Menu.Item key="delete" onClick={() => handleDelete(l.i)}>
                        Delete Graph
                    </Menu.Item>
                    <Menu.Item key="edit" onClick={() => handleOpenModal(l.i)}>
                        Edit Graph
                    </Menu.Item>
                </Menu>
            );
            return (
                <div
                    key={l.i}
                    style={{ background: "#ccc", position: "relative", overflow: "hidden" }}
                    className={`custom-grid grid-item ${l.static ? "" : ""} `}
                >
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <button className="absolute top-2 right-2 bg-transparent border-none cursor-pointer">
                            <ThreeDotsIcon
                                height={`${Math.min(l.w, l.h) * 2}px`}
                                width={`${Math.min(l.w, l.h) * 2}px`}
                            />
                        </button>
                    </Dropdown>
                    <div className={"dragMe h-[100%] bg-white"}>
                        <div className="grid-item__title h-[85%]">
                            <h2
                                className="text-black my-2"
                                style={{
                                    fontSize: `${Math.min(l.w, l.h) * 2}px`
                                }}
                            >
                                Sum of Quantity by Category
                            </h2>
                            <SimpleLineChart />
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="mb-4">
            <ResponsiveReactGridLayout
                {...props}
                style={{ background: "#f0f0f0" }}
                layouts={layouts}
                measureBeforeMount={false}
                useCSSTransforms={mounted}
                onLayoutChange={onLayoutChange}
                isDroppable
                isDraggable
                isResizable
                draggableHandle=".grid-item__title"
                rowHeight={30}
                verticalCompact={false}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>

            <GraphModal
                isOpen={isModalOpen}
                graph={selectedGraph}
                prompt={prompt}
                setPrompt={setPrompt}
                onClose={handleCloseModal}
                onAdd={() => {}}
            />
        </div>
    );
};

export default AghaahiDashboard;

AghaahiDashboard.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: (layout: any, layouts: any) => {},
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
    breakpoints: { lg: 1600, md: 1600, sm: 1600, xs: 1600, xxs: 1600 },
    containerPadding: [0, 0]
};
