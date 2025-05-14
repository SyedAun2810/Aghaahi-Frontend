export interface Graph {
    id: number;
    name: string;
    category: string;
    Component: React.ReactNode;
    defaultData: any;
  }
  
  interface GraphCardProps {
    graph: Graph;
    onClick: (graph: Graph) => void;
  }
  
  const GraphCard: React.FC<GraphCardProps> = ({ graph, onClick }) => {
    return (
      <div
        onClick={() => onClick(graph)}
        className="cursor-pointer border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md h-[500px] overflow-hidden flex flex-col justify-between bg-white dark:bg-[#212121] hover:shadow-lg transition-shadow duration-200"
      >
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{graph.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 my-2">{graph.category}</p>
        </div>
        <div className="flex-grow flex items-center justify-center my-4">
          {graph.Component}
        </div>
      </div>
    );
  };
  
  export default GraphCard;