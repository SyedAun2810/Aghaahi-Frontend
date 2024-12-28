import React, { ReactNode } from "react";
import UpGraphIcon from "@Assets/icons/upGraphIcon.svg";
import DownGraphIcon from "@Assets/icons/downGraphIcon.svg";
import { Flex, Space } from "antd";

interface AnalyticsCardProps {
    title: string;
    count: number | string;
    up: boolean;
    percentageValue: number | string;
    icon: ReactNode;
    percentTextClassName?: string;
    showFooter: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title,
    count,
    up,
    percentageValue,
    icon,
    percentTextClassName,
    showFooter
}) => {
    return (
        <div className={`bg-light-bg rounded-[8px] p-[20px] h-[150px]`}>
            <Flex justify="space-between">
                <Space size={[0, 14]} direction="vertical" className="w-[100%]">
                    <p className="text-[#202224] font-[400] text-[16px] xl:text-[15px] lg:text-[14px] break-words max-w-[95%]">
                        {title}
                    </p>
                    <h1 className="text-[#202224] font-[500] ">{count}</h1>
                </Space>
                <div className="">{icon && icon}</div>
            </Flex>
            {showFooter ? (
                <Flex align="center" className={`mt-5 h-56px ${percentTextClassName}`}>
                    {up ? <UpGraphIcon /> : <DownGraphIcon />}
                    <p className="text-#606060 ml-1.5 truncate">
                        <span className={up ? "text-success-green" : "text-danger-red"}>
                            {percentageValue}%
                        </span>
                        {up ? " Up" : " Down"} from yesterday
                    </p>
                </Flex>
            ) : null}
        </div>
    );
};

export default AnalyticsCard;
