import { Dropdown } from "antd";
import React from "react";

import DropdownIcon from "@Assets/icons/dropdownIcon.svg";

type DropDownIcons = {
    items:any,
    children:React.ReactNode
}
const CustomDropdown: React.FC<DropDownIcons> = ({ items,children}) => {
    
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow className="cursor">
      <div className="d-flex-row align-center">
        {children}
        <DropdownIcon />
      </div>
    </Dropdown>
  );
};

export default CustomDropdown;
