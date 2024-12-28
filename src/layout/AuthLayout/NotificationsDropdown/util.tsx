import { Flex } from "antd";
import { Link } from "react-router-dom";
import { InfiniteData } from "@tanstack/react-query";

import utilService from "@Utils/utils.service";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { NOTIFICATION_DETAIL_DATA, NOTIFICATION_DETAIL_RESPONSE } from "@Utils/types";

import Placeholder from "@Assets/icons/placeholder-colorful.png";
// navigation of notification
const handleNotificationClick = (notification: NOTIFICATION_DETAIL_RESPONSE) => {
    const route = mapEntityTypeToRoute({
        entityType: notification?.code,
        entityData: notification?.data
    });

    return route;
};

export function notificationsNormalizeInfiniteQuery(data: InfiniteData<any>) {
    let dump = data.pages.flatMap((page) => page?.data);
    let dataModified = dump?.map((el) => ({
        key: el?.id,
        style: { paddingRight: 0, paddingLeft: 0, borderBottom: "1px solid #E2E2E2" },
        label: (
            <Link to={handleNotificationClick(el)}>
                <Flex className="py-2 px-1">
                    <div className="mr-3">
                        <img
                            src={el?.data?.FromUserImage || Placeholder}
                            alt=" image"
                            width={45}
                            height={45}
                            style={{ borderRadius: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div>
                        <h1 className="font-[600] text-sm text-dark-main">{el?.title}</h1>
                        <h1 className="font-[600] text-sm text-dark-main">{el?.description}</h1>
                        <p className="mt-2  font-[400] text-sm text-light-text">
                            {utilService.renderDateAndTime(el?.createdOn)}
                        </p>
                    </div>
                </Flex>
            </Link>
        )
    }));
    return dataModified[0] ? dataModified : [];
}

// Function to map entity types to routes
export const mapEntityTypeToRoute = ({
    entityType,
    entityData
}: {
    entityType: number;
    entityData: NOTIFICATION_DETAIL_DATA;
}) => {
    switch (entityType) {
        case 13:
            return `${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT}`;
        case 14:
        case 22:
            return `${NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS}`;
        case 15:
        case 23:
        case 24:
            return `${NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}/${entityData?.EventId}`;
        case 16:
            return `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT}`;
        case 17:
        case 18:
            return `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_DETAILS}/${entityData?.ProductId}`;
        case 19:
        case 20:
        case 21:
            return `${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT_DETAILS}/${entityData?.BannerId}`;
        case 25:
        case 26:
            return `${NavigationRoutes.DASHBOARD_ROUTES.ORDER_DETAILS}/${entityData?.OrderId}`;
        default:
            return "/";
    }
};
