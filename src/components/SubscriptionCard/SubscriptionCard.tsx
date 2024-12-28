import { CustomButton } from "@Components/Button";
import React from "react";

export type SubscriptionCardProps = {
    title: string;
    subTitle: string;
    duration: string;
    amount: number | string;
    onBtnClick?: () => void;
    disable?: boolean;
    isProductAdvertisement?: boolean;
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
    title,
    subTitle,
    duration,
    amount,
    onBtnClick,
    disable = false
}) => {
    return (
        <div
            className={`border-stroke-light h-[250px] border rounded-[12px] pt-[30px] pb-[60px] px-[20px] relative ${
                disable ? "opacity-50 " : ""
            }`}
        >
            <p className="text-large font-[600] text-dark-main max-w-[80%]">{title}</p>
            <p className="text-xs text-light-text mt-2">{subTitle}</p>
            <p className="text-xs font-[600] text-dark-main mt-4">
                Duration: <span className="text-xs text-light-text">{duration}</span>
            </p>
            <h1 className="text-heading font-[600] text-dark-main mt-6">{amount}</h1>
            <CustomButton
                className={`min-w-[30%]  w-auto max-w-[80%] absolute left-[50%] top-[87%] transform translate-x-[-50%] ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
                title="Purchase Now"
                onClick={onBtnClick}
                disabled={disable}
            />
        </div>
    );
};

export default SubscriptionCard;
