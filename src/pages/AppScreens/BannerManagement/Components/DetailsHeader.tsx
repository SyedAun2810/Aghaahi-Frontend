import { Flex } from "antd";
import { useNavigate } from "react-router-dom";

import BackIcon from "@Assets/icons/backIcon.svg";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

export default function DetailsHeader({ orderId }: { orderId: number }) {
    const navigate = useNavigate();
    return (
        <Flex align="center" gap={"middle"} justify="space-between" className="border-bottom pb-4">
            <Flex align="center" gap={"middle"}>
                <BackIcon
                    className="cursor-pointer mt-[3px]"
                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT)}
                />
                <h1 className="font-[500] text-xxl text-dark-main">Request #{orderId}</h1>
            </Flex>
        </Flex>
    );
}
