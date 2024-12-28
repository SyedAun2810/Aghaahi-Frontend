import { Flex } from "antd";
import React from "react";
import BackIcon from "@Assets/icons/backIcon.svg";
import { useNavigate } from "react-router-dom";
const RequestBannerHeader = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Flex align="center" gap={"middle"} className="border-bottom pb-4">
                <BackIcon className="cursor-pointer mt-[3px]" onClick={() => navigate(-1)} />
                <h1 className="font-[500] text-xxl text-dark-main">
                    Request a Banner to Advertise
                </h1>
            </Flex>
        </div>
    );
};

export default RequestBannerHeader;
