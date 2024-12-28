import { Col, Row } from "antd";

import EarningTickIcon from "@Assets/icons/earningTickIcon.svg";

import AnalyticsCard from "@Components/AnalyticsCard/AnalyticsCard";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import utilService from "@Utils/utils.service";
import { MyEarningFilterDataTypes } from "../useMyEarningsContainer";

const getValueDollarAppendedOrDashes = (data: number | null | undefined) => {
    return !utilService.isNullOrUndefined(data) ? `$${Math.abs(data?.toFixed(2))}` : "--";
};

const getValueOrDashes = (data: number | null | undefined) => {
    return !utilService.isNullOrUndefined(data) ? Math.abs(data?.toFixed(2)) : "--";
};

export default function AnalyticalBoxes({
    data,
    isLoading,
    filterData
}: {
    data: any;
    isLoading: boolean;
    filterData: MyEarningFilterDataTypes;
}) {
    if (isLoading) {
        return <ProgressLoader />;
    }
    return (
        <Row gutter={[20, 0]} className="pt-4">
            <Col span={8}>
                <AnalyticsCard
                    title="Available Amount (Order Amount + Shipping Amount)"
                    count={getValueDollarAppendedOrDashes(data?.payoutAmountAvailable)}
                    icon={<EarningTickIcon />}
                    percentageValue={getValueOrDashes(data?.payoutAmountAvailablePercentageChange)}
                    up={data?.payoutAmountAvailablePercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
            <Col span={8}>
                <AnalyticsCard
                    title="Total Earnings"
                    count={getValueDollarAppendedOrDashes(data?.completedOrdersAmount)}
                    icon={<EarningTickIcon />}
                    percentageValue={getValueOrDashes(data?.completedOrdersAmountPercentageChange)}
                    up={data?.completedOrdersAmountPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
            <Col span={8}>
                <AnalyticsCard
                    title="Payout Requested"
                    count={getValueDollarAppendedOrDashes(data?.payoutAmountRequested)}
                    icon={<EarningTickIcon />}
                    percentageValue={getValueOrDashes(data?.payoutAmountRequestedPercentageChange)}
                    up={data?.payoutAmountRequestedPercentageChange >= 0}
                    percentTextClassName="pl-12"
                    showFooter={!!!filterData?.StartDate}
                />
            </Col>
        </Row>
    );
}
