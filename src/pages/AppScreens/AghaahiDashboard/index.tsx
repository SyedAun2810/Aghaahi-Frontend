import { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import graphImages from "../AddNewGraph/helpers/graphImages";

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
        x: (i % 3) * 8, // 3 items per row in a 24-column grid
        y: Math.floor(i / 3) * 4,
        w: 8, // Each div takes 8/24 of the row
        h: 8, // Initial height, will adjust according to content
        i: i.toString(),
        static: false,
      };
    }),
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts });
  };

  // Handle container deletion
  const handleDelete = (id: string) => {
    console.log("it runs");
    setLayouts((prevLayouts) => {
      const updatedLayout = prevLayouts.lg.filter((item) => item.i !== id);
      return { lg: updatedLayout };
    });
  };

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      const graphImage = graphImages().lineCharts.LineChart; 
      return (
        <div
          key={l.i}
          style={{ background: "#ccc", position: "relative", overflow: "hidden" }}
          className={`custom-grid grid-item ${l.static ? "" : ""} `} // Adjust the height of each grid item
        >
          <div className={"dragMe"}>
            <span className="text">{`Div ${i + 1}`}</span>
          </div>

          <div className="grid-item__title">
            <h3>Heading {i + 1}</h3>
            <p>This is some text inside the container {i + 1}.</p>
          </div>
          <div className="grid-item__image">
            <img
              src={graphImage}
              alt={`Graph ${i + 1}`}
              className="w-full h-32 object-contain mt-2"
              style={{ objectFit: "contain" }}
            />
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
        rowHeight={30} // Adjust the row height to better fit the content
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default AghaahiDashboard;

AghaahiDashboard.defaultProps = {
  className: "layout",
  rowHeight: 30, // Adjust the row height to better fit the content
  onLayoutChange: (layout: any, layouts: any) => {},
  cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
  breakpoints: { lg: 1600, md: 1600, sm: 1600, xs: 1600, xxs: 1600 },
  containerPadding: [0, 0],
};