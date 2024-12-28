import { Switch } from "antd";
import { useState } from "react";

interface CustomSwitchProps {
    className?: string;
    isChecked?: boolean;
    handleUpdate: (params: any) => void;
    data?: any;
    statusMap?: { true: string; false: string };
    isDisabled?: boolean;
    loading?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    className = "",
    isChecked = false,
    data,
    handleUpdate,
    statusMap,
    isDisabled,
    loading = false
}) => {
    return (
        <Switch
            className={`${className} w-[10px]`}
            checked={isChecked}
            onChange={handleUpdate}
            disabled={isDisabled}
            loading={loading}
        />
    );
};

export default CustomSwitch;
