import { Button } from "antd";
import { useContext } from "react";

import { useDrag } from "react-dnd";

import {
  CheckSquareOutlined,
  EditOutlined,
  DownSquareOutlined,
  AlignLeftOutlined,
  FileTextOutlined,
  ExceptionOutlined
} from "@ant-design/icons";

import "./DragItem.scss";

import { capitalizedString, generateUniqueId } from "@Utils/utils.service";
import { FormContext } from "@Pages/AppScreens/AghaahiDashboard/FormContext";
import { CHILD_TYPE, CONTEXT_ACTIONS, defaultFieldObject, DRAG_TYPE } from "@Constants/app";

const _renderText = (type: string) => {
  switch (type) {
    case DRAG_TYPE.PARAGRAPH:
      return "Paragraph";
    case DRAG_TYPE.TEXT_AREA:
      return "Text Area";
    case DRAG_TYPE.CHECKBOX:
      return "Check Box";
    case DRAG_TYPE.RADIO:
      return "Radio";
    case DRAG_TYPE.DROP_DOWN:
      return "Dropdown";
    case DRAG_TYPE.NOTE:
      return "Note";
  }
};

const _renderIcon = (type: string) => {
  switch (type) {
    case DRAG_TYPE.PARAGRAPH:
      return <AlignLeftOutlined className="hr-mr-10" />;
    case DRAG_TYPE.TEXT_AREA:
      return <FileTextOutlined className="hr-mr-10" />;
    case DRAG_TYPE.CHECKBOX:
      return <CheckSquareOutlined className="hr-mr-10" />;
    case DRAG_TYPE.RADIO:
      return <EditOutlined className="hr-mr-10" />;
    case DRAG_TYPE.DROP_DOWN:
      return <DownSquareOutlined className="hr-mr-10" />;
    case DRAG_TYPE.NOTE:
      return <ExceptionOutlined />;
  }
};

function DragItem({ type = DRAG_TYPE.PARAGRAPH }: { type?: string }) {
  const { state, dispatch } = useContext(FormContext);

  const {
    formDetails: { sections }
  } = state;

  function reOrderFields(sections: Array<any>) {
    const updatedSections = sections.map((section: any) => {
      const filteredFields = Object.entries(section.fields)?.filter((field) => field[1]?.sectionId);
      const updatedFields = Object.fromEntries(filteredFields);
      return { ...section, fields: updatedFields };
    });

    dispatch({
      type: CONTEXT_ACTIONS.RE_ORDER_FIELDS,
      payload: {
        sections: updatedSections
      }
    });
  }

  const generateTextField = () => {
    const unique_id = generateUniqueId();
    let childId = generateUniqueId();

    return {
      ...defaultFieldObject,
      id: unique_id,
      label: capitalizedString(type),
      type,
      ...(CHILD_TYPE.includes(type) && {
        options: [
          {
            id: childId,
            label: "Option 1",
            value: childId,
            checked: false,
            error: ""
          }
        ]
      })
    };
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: DRAG_TYPE.FIELD,
    item: () => {
      const textField = generateTextField();
      return { ...textField, isNewItem: true, index: -1 };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end(draggedItem, monitor) {
      if (!monitor.didDrop()) reOrderFields(sections);
    }
  });

  const onFieldFinish = () => {};
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Button
      ref={dragRef}
      draggable
      style={{ opacity }}
      onClick={onFieldFinish}
      className="common-button"
      icon={_renderIcon(type)}
    >
      {_renderText(type)}
    </Button>
  );
}

export default DragItem;
