import { Select } from "antd";
import DownArrowIcon from "@Assets/icons/down-arrow.svg";

import "./select.scss";

interface SelectInput {
    options: { value: string | boolean; label: string }[];
    placeholder: string;
    className?: string;
    value?: string | null | undefined;
    onChange?: (value: string) => void;
    name?: string;
}
export default function SelectInput({
    options,
    placeholder,
    className,
    value,
    onChange,
    name
}: SelectInput) {
    return (
        <Select
            suffixIcon={<DownArrowIcon />}
            // defaultValue={provinceData[0]}
            className={`cursor-pointer w-[110px] 2xl:w-[140px] h-[44px] cursor-pointer  select-input-con ${className}`}
            placeholder={placeholder || ""}
            // onChange={handleProvinceChange}
            options={options}
            value={value}
            onChange={onChange}
        />
    );
}
