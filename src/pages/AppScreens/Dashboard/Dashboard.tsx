import { Flex } from "antd";
import { Link } from "react-router-dom";

import GridView from "@Components/GridView";
import { DASHBOARD_PAGE_SIZE } from "@Constants/app";
import useDashboardContainer from "./useDashboardContainer";
import renderRecentEarnings from "./Columns/renderRecentEarnings";
import { renderOrderColumns } from "./Columns/OrderManagementColumns";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import DashboardHeader from "@Pages/AppScreens/Dashboard/Components/DashboardHeader";

const Dashboard = () => {
    const {
        addValues,
        handleView,
        filtersData,
        analyticalData,
        recentOrdersData,
        recentPayoutsData,
        clearFilterHandler,
        isAnalyticalDataLoading,
        isRecentOrdersDataLoading,
        isRecentPayoutsDataLoading
    } = useDashboardContainer();
    return (
        <>
            <DashboardHeader
                addValues={addValues}
                filtersData={filtersData}
                analyticalData={analyticalData}
                clearFilterHandler={clearFilterHandler}
                isAnalyticalDataLoading={isAnalyticalDataLoading}
            />
            <Flex vertical gap={20} className="mt-5">
                <RoundedContainer>
                    <GridView
                        showPagination={false}
                        totalCount={20}
                        onPaginate={() => {}}
                        pageSize={DASHBOARD_PAGE_SIZE}
                        isLoading={isRecentOrdersDataLoading}
                        isFetching={isRecentOrdersDataLoading}
                        data={recentOrdersData?.data || []}
                        columns={renderOrderColumns({ handleView })}
                        reactFiltersRender={() => (
                            <Flex
                                align="center"
                                justify="space-between"
                                className="border-bottom h-[56px]"
                            >
                                <h1 className="font-[500] text-xxl text-dark-main">New Orders</h1>
                                <Link
                                    to="/order-management"
                                    className="text-large text-main-orange font-[500] cursor-pointer mr-4"
                                >
                                    View All
                                </Link>
                            </Flex>
                        )}
                    />
                </RoundedContainer>
                <RoundedContainer>
                    <GridView
                        showPagination={false}
                        totalCount={20}
                        onPaginate={() => {}}
                        pageSize={DASHBOARD_PAGE_SIZE}
                        isLoading={isRecentPayoutsDataLoading}
                        isFetching={isRecentPayoutsDataLoading}
                        data={recentPayoutsData?.data || []}
                        columns={renderRecentEarnings()}
                        show
                        reactFiltersRender={() => (
                            <Flex
                                align="center"
                                justify="space-between"
                                className="border-bottom h-[56px]"
                            >
                                <h1 className="font-[500] text-xxl text-dark-main ">
                                    Recent Earnings
                                </h1>
                                <Link
                                    className="text-large text-main-orange font-[500] cursor-pointer mr-4"
                                    to="/my-earnings"
                                >
                                    View All
                                </Link>
                            </Flex>
                        )}
                    />
                </RoundedContainer>
            </Flex>
        </>
    );
};
export default Dashboard;
