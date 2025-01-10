import { Collapse } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import DragItem from "@Components/DragItem";
import { DRAG_TYPE } from "@Constants/app";

const { Panel } = Collapse;

const dragOptions = [
  { id: 1, label: DRAG_TYPE.PARAGRAPH },
  { id: 2, label: DRAG_TYPE.TEXT_AREA },
  { id: 3, label: DRAG_TYPE.CHECKBOX },
  { id: 4, label: DRAG_TYPE.RADIO },
  { id: 5, label: DRAG_TYPE.DROP_DOWN },
  { id: 6, label: DRAG_TYPE.NOTE }
];

const BasicFields = () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <UpOutlined />)}
      expandIconPosition={"end"}
      className="collapse-container"
    >
      <Panel header={<p className="font-18 hr-mb-8 poppins-semibold">Add New Field</p>} key={"1"}>
        {dragOptions?.map((opt: { id: number; label: string }) => (
          <DragItem type={opt.label} key={opt.id} />
        ))}
      </Panel>
    </Collapse>
  );
};

export default BasicFields;
