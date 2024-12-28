import { Flex } from "antd";

import AnalyticalBoxes from "./AnalyticalBoxes";
import AnalyticalBoxesFilter from "./AnalyticalBoxesFilter";
import { AnalyticalBoxesFilterDataTypes } from "../useDashboardContainer";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

export type OrderListingHeaderType = {
    analyticalData: any;
    clearFilterHandler: () => void;
    isAnalyticalDataLoading: boolean;
    filtersData: AnalyticalBoxesFilterDataTypes;
    addValues: ({ value, updatePageToDefault }: any) => void;
};

const DashboardHeader = ({
    addValues,
    filtersData,
    analyticalData,
    clearFilterHandler,
    isAnalyticalDataLoading
}: OrderListingHeaderType) => {
    return (
        <RoundedContainer>
            <Flex className="border-bottom pb-4" justify="space-between" align="center">
                <h1 className="font-[500] text-[24px]">Dashboard</h1>
                <AnalyticalBoxesFilter
                    addValues={addValues}
                    filtersData={filtersData}
                    clearFilterHandler={clearFilterHandler}
                />
            </Flex>
            <AnalyticalBoxes
                data={analyticalData}
                isLoading={isAnalyticalDataLoading}
                filterData={filtersData}
            />
        </RoundedContainer>
    );
};

export default DashboardHeader;
