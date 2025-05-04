import React, { ReactNode, useEffect, useState } from "react";
import { Flex, Space } from "antd";
import { motion } from "framer-motion"; // Import framer-motion for animations
import CompleteOrderIcon from "@Assets/icons/completedOrdersIcon.svg";
interface AnalyticsCardProps {
    title?: string;
    count?: number | string;
    icon: ReactNode;
    className?: string;
    key?: any;
    showDollar?: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title="",
    count = 0,
    icon = <CompleteOrderIcon/>,
    className ,
    key= 0,
    showDollar = false,
}) => {
    const [displayCount, setDisplayCount] = useState(0); // State for animated count

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Duration of the animation in milliseconds
        const increment = Math.ceil(Number(count) / (duration / 50)); // Increment value per frame
        const interval = setInterval(() => {
            start += increment;
            if (start >= Number(count)) {
                setDisplayCount(Number(count)); // Set to final count
                clearInterval(interval); // Clear interval when done
            } else {
                setDisplayCount(start); // Update display count
            }
        }, 20); // Update every 50ms

        return () => clearInterval(interval); // Cleanup on unmount
    }, [count]);

    return (
        <motion.div
            className={`bg-white roundedrounded-[8px] px-[20px] h-full ${className} transition-transform duration-300 hover:scale-105`} // Add hover animation
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
                    <h1 className="text-[#202224] font-[500]">
                        {showDollar && "$"}{displayCount} {/* Conditionally show dollar */}
                    </h1>
                </Space>
                <div>{icon && icon}</div>
            </Flex>
        </motion.div>
    );
};

export default AnalyticsCard;

