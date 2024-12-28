import { Col, Row } from "antd";

import utilService from "@Utils/utils.service";
import AnalyticsCard from "@Components/AnalyticsCard/AnalyticsCard";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import { AnalyticalBoxesFilterDataTypes } from "../useDashboardContainer";

import TotalProductsIcon from "@Assets/icons/totalProductsIcon.svg";
import PendingOrdersIcon from "@Assets/icons/pendingOrdersIcon.svg";
import TotalEarningsIcon from "@Assets/icons/totalEarningsIcon.svg";
import CompleteOrderIcon from "@Assets/icons/completedOrdersIcon.svg";

export default function AnalyticalBoxes({
    data,
    isLoading,
    filterData
}: {
    data: any;
    isLoading: boolean;
    filterData: AnalyticalBoxesFilterDataTypes;
}) {
    if (isLoading) {
        return <ProgressLoader />;
    }
    const { getValueOrDashes, getValueDollarAppendedOrDashes } = utilService;
    return (
        <Row gutter={[20, 20]} className="pt-4">
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <AnalyticsCard
                    title="Completed Orders"
                    count={getValueOrDashes(data?.completedOrders)}
                    icon={<CompleteOrderIcon />}
                    percentageValue={getValueOrDashes(data?.completedOrdersPercentageChange)}
                    up={data?.completedOrdersPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <AnalyticsCard
                    title="Total Products"
                    icon={<TotalProductsIcon />}
                    count={getValueOrDashes(data?.products)}
                    percentageValue={getValueOrDashes(data?.productsPercentageChange)}
                    up={data?.productsPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <AnalyticsCard
                    title="Pending Orders "
                    icon={<PendingOrdersIcon />}
                    count={getValueOrDashes(data?.pendingOrders)}
                    percentageValue={getValueOrDashes(data?.pendingOrdersPercentageChange)}
                    up={data?.pendingOrdersPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <AnalyticsCard
                    title="Total Earnings"
                    icon={<TotalEarningsIcon />}
                    count={getValueDollarAppendedOrDashes(data?.earnings)}
                    percentageValue={getValueOrDashes(data?.earningsPercentageChange)}
                    up={data?.earningsPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
        </Row>
    );
}
