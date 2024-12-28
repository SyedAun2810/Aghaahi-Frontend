import { CustomButton } from "@Components/Button";
import React from "react";
import FilterIcon from "@Assets/icons/filter.svg";

type FilterButtonProps = {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    htmlType?: "button" | "submit" | "reset" | undefined;
};

const FilterButton = ({ className, onClick, htmlType }: FilterButtonProps) => {
    return (
        <button
            className={`border bg-white w-[44px] h-[44px] rounded-[8px] ${className} `}
            onClick={onClick}
            type={htmlType}
        >
            <FilterIcon />
        </button>
    );
};

export default FilterButton;
