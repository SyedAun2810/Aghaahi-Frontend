import { AutoComplete } from "antd";
import React, { useRef, useState } from "react";

import "./index.scss";
import DropDownArrow from "@Assets/icons/dropdownIcon.svg";

type TextInputProps = {
    name?: string;
    value?: string;
    mode?: "multiple";
    className?: string;
    disabled?: boolean;
    allowClear?: boolean;
    onClear?: () => void;
    showSearch?: boolean;
    placeholder?: string;
    defaultValue?: string | undefined;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    options?: CategoryOptionType[] | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onSelect?: (value: string, option: CategoryOptionType) => void;
};
type CategoryOptionType = { value: string; label: string; key: number };

const AutoCompleteCustom = ({
    placeholder = "Select a value",
    value,
    disabled = false,
    onChange = () => {},
    options,
    mode,
    allowClear,
    className,
    defaultValue,
    ...rest
}: TextInputProps) => {
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
            <AutoComplete
                {...rest}
                value={value}
                {...(mode && { mode: mode })}
                {...(allowClear && { allowClear: allowClear })}
                options={options}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={defaultValue}
                suffixIcon={<DropDownArrow className="" />}
                className={`custom-autocomplete cursor-pointer w-[110px] 2xl:w-[140px]  ${
                    isOccupied && "active-input"
                } ${className}`}
            />
        </div>
    );
};

export default AutoCompleteCustom;
