import React, { ReactNode } from "react";
import { Flex, Space } from "antd";
import { motion } from "framer-motion"; // Import framer-motion for animations

interface AnalyticsCardProps {
    title: string;
    count: number | string;
    icon: ReactNode;
    className?: string;
    key: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title,
    count,
    icon,
    className = "",
    key,
}) => {
    return (
        <motion.div
            className={`bg-light-bg rounded-[8px] px-[20px] h-full ${className} transition-transform duration-300 hover:scale-105`} // Add hover animation
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
        >
            <div className="grid-item__title h-6"> </div>
            <Flex justify="space-between">
                <Space size={[0, 14]} direction="vertical" className="w-[100%]">
                    <p className="text-[#202224] font-[500] text-[18px] xl:text-[18px] lg:text-[14px] break-words max-w-[95%]">
                        {title}
                    </p>
                    <h1 className="text-[#202224] font-[500]">{count}</h1>
                </Space>
                <div>{icon && icon}</div>
            </Flex>
        </motion.div>
    );
};

export default AnalyticsCard;

