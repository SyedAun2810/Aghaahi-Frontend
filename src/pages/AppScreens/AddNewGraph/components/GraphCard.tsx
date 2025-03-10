export interface Graph {
    id: number;
    name: string;
    category: string;
    image: string;
  }
  
  interface GraphCardProps {
    graph: Graph;
    onClick: (graph: Graph) => void;
  }
  
  const GraphCard: React.FC<GraphCardProps> = ({ graph, onClick }) => {
    return (
      <div
        onClick={() => onClick(graph)}
        className="cursor-pointer border p-4 rounded-lg shadow-md h-[450px] overflow-hidden flex flex-col justify-between"
      >
        <div>
          <h3 className="font-semibold">{graph.name}</h3>
          <p className="text-sm text-gray-500">{graph.category}</p>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <img
            src={graph.image}
            alt={graph.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    );
  };
  
  export default GraphCard;