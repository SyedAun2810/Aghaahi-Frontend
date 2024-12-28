import { Input } from "antd";
import React, { ChangeEvent, useState } from "react";

import SearchIcon from "@Assets/icons/searchIcon.svg";

interface CustomSearchProps {
    debounceSearch: (value: string) => void;
    className?: string;
    placeholder?: string;
}

let timeoutId: number;
const CustomSearch: React.FC<CustomSearchProps> = ({
    debounceSearch,
    className,
    placeholder = "Search"
}) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            debounceSearch(e.currentTarget.value);
        }, 500);
    };

    return (
        <div className="w-full">
            <Input
                allowClear
                placeholder={placeholder}
                className={`w-full md:w-72 2xl:w-72 h-[44px] p-2 custom-search ${className}`}
                onChange={handleSearchChange}
                prefix={<SearchIcon className="ml-2 mr-2" />}
                value={searchText}
            />
        </div>
    );
};

export default CustomSearch;
