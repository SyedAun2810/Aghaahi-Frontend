import React, { ReactNode } from "react";
import { Select as CustomSelect } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ArrowDown from "@Assets/icons/dropdownIcon.svg";

// import "./Select.scss";

type SelectProps = {
  children?: ReactNode;
  placeholder?: string;
  className?: string;
  value?: string | number;
  mode?: "multiple" | "tags";
  disabled?: boolean;
  onChange?: (
    e?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string | number,
    option?: any
  ) => void;
  icon?: boolean;
  defaultValue?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | number | string;
  label?: string;
  options?: Array<object> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  btnColor?: "gray" | "blue" | "white" | "green" | "lightGray" | "red";
  showSearch?: boolean;
  showArrow?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  defaultParentElement?: boolean;
  [key: string]: any;
};

const Select: React.FC<SelectProps> = ({
  className = "",
  btnColor = "gray",
  placeholder = "Enter Placeholder Text",
  mode,
  disabled,
  onChange = () => {},
  children,
  onBlur,
  defaultValue,
  options,
  showArrow = true,
  icon = <ArrowDown />,
  showSearch = false,
  loading = false,
  allowClear = false,
  value,
  defaultParentElement,
  ...rest
}) => {
  return (
    <div>
      <CustomSelect
        {...rest}
        disabled={disabled}
        onChange={onChange}
        // placeholder={placeholder}
        showSearch={showSearch}
        mode={mode}
        defaultValue={defaultValue}
        value={value}
        suffixIcon={showArrow && !loading ? icon : <LoadingOutlined />}
        onBlur={onBlur}
        className={`hr-select ${className} ${btnColor}-select`}
        popupClassName="hr-select-dropdown"
        options={options}
        loading={loading}
        allowClear={allowClear}
        getPopupContainer={defaultParentElement ? () => document.body : (trigger) => trigger.parentElement}
      >
        {children}
      </CustomSelect>
    </div>
  );
};

export default Select;
