import { Flex } from "antd";

import { PAGE_SIZE } from "@Constants/app";
import GridView from "@Components/GridView";
import useMyEarningsContainer from "./useMyEarningsContainer";
import { renderEarningColumns } from "./Columns/MyEarningsColumns";

import { CustomButton } from "@Components/Button";
import ListingHeader from "./Components/ListingHeader";
import RequestPayout from "./RequestPayout/RequestPayout";
import AnalyticalBoxes from "./Components/AnalyticalBoxes";
import CustomModal from "@Components/CustomModal/CustomModal";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const STRIPE_WARNING = "Kindly connect to the Stripe account first.";
const MyEarnings = () => {
    const {
        onSearch,
        addValues,
        filtersData,
        pageClickHandler,
        isStripeConnected,
        clearFilterHandler,
        myPayoutsListingData,
        requestPayoutModalRef,
        isMyPayoutsListingLoading,
        analyticalDataListingData,
        isAnalyticalDataListingLoading
    } = useMyEarningsContainer();
    return (
        <>
            <Flex className="" vertical gap={"large"}>
                <RoundedContainer>
                    <Flex
                        className={`border-bottom h-[${isStripeConnected ? "56" : "66"}px] pb-4`}
                        justify="space-between"
                        align="center"
                    >
                        <div>
                            <h1 className="font-[500] text-xxl">My Earnings</h1>
                            {!isStripeConnected && (
                                <p className="text-[red] font-[500] mt-2">
                                    <ExclamationCircleOutlined className="mr-1" />
                                    {STRIPE_WARNING}
                                </p>
                            )}
                        </div>
                        <div className="text-right ">
                            <CustomButton
                                title="Request Payout"
                                className="w-[150px] text-sm mb-0 "
                                textClassName=" font-[500]"
                                disabled={!isStripeConnected}
                                onClick={() => {
                                    requestPayoutModalRef?.current?.openModal();
                                }}
                            />
                        </div>
                    </Flex>
                    <ListingHeader
                        onChangeSearch={onSearch}
                        filterData={filtersData}
                        clearFilter={clearFilterHandler}
                        updateValuesHandler={addValues}
                    />
                    <AnalyticalBoxes
                        filterData={filtersData}
                        data={analyticalDataListingData?.data}
                        isLoading={isAnalyticalDataListingLoading}
                    />
                </RoundedContainer>
                <RoundedContainer>
                    <GridView
                        showPagination
                        totalCount={myPayoutsListingData?.pagination?.totalCount}
                        onPaginate={(page) => {
                            pageClickHandler(page);
                        }}
                        pageSize={PAGE_SIZE}
                        isLoading={isMyPayoutsListingLoading}
                        isFetching={isMyPayoutsListingLoading}
                        data={myPayoutsListingData?.data || []}
                        columns={renderEarningColumns()}
                        pagination={{
                            total: myPayoutsListingData?.pagination?.totalCount
                        }}
                        selectedPage={filtersData?.PageNumber}
                        reactFiltersRender={() => (
                            <div>
                                <h1 className="font-[500] text-xxl text-dark-main border-bottom h-[56px]">
                                    My Payouts
                                </h1>
                            </div>
                        )}
                    />
                </RoundedContainer>
            </Flex>
            <CustomModal ref={requestPayoutModalRef} destroyOnClose>
                <RequestPayout
                    onFinish={(values: any) => {
                        requestPayoutModalRef?.current?.closeModal();
                    }}
                    availableAmount={analyticalDataListingData?.data?.payoutAmountAvailable || 0}
                />
            </CustomModal>
        </>
    );
};

export default MyEarnings;
