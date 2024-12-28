import { Select } from "antd";
import React, { useCallback, useRef, useState } from "react";

import "./index.scss";
import DropDownArrow from "@Assets/icons/dropdownIcon.svg";

type TextInputProps = {
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    name?: string;
    className?: string;
    label: string;
    options?: Array<object> | undefined;
    mode?: "multiple";
    allowClear?: boolean;
    defaultValue?: string | undefined;
};

const CustomSelectInput: React.FC<TextInputProps> = ({
    placeholder = "Select a value",
    label,
    value,
    disabled = false,
    onChange = () => {},
    options,
    mode,
    allowClear,
    className,
    defaultValue,
    ...rest
}) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isOccupied = focus || (value && value.length !== 0);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            onFocus={() => {
                setFocus(true);
            }}
            onBlur={() => setFocus(false)}
            onClick={handleClick}
        >
            <p className="absolute top-1 z-10 text-xs text-light-text pl-[17px] pt-[4px]">
                {label}
            </p>
            <Select
                {...rest}
                value={value}
                {...(mode && { mode: mode })}
                {...(allowClear && { allowClear: allowClear })}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                defaultValue={defaultValue}
                suffixIcon={<DropDownArrow className="" />}
                className={`custom-select  ${isOccupied && "active-input"} ${
                    !mode && "not-multi-select"
                } ${className}`}
                disabled={disabled}
            />
        </div>
    );
};

export default CustomSelectInput;
