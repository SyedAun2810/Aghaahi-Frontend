import { PAGE_SIZE } from "@Constants/app";
import GridView from "@Components/GridView";
import useOrderListingContainer from "./useOrderListingContainer";
import OrderListingHeader from "../Components/OrderListingHeader";
import { renderOrderColumns } from "../Components/OrderManagementColumns";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { Flex } from "antd";
import { CustomButton } from "@Components/Button";

const OrderListing = () => {
    const {
        onSearch,
        addValues,
        handleView,
        filtersData,
        pageClickHandler,
        orderListingData,
        clearFilterHandler,
        isOrderListingLoading
    } = useOrderListingContainer();
    return (
        <RoundedContainer>
            <Flex className="border-bottom h-[56px] pb-4" justify="space-between" align="center">
                <h1 className="font-[500] text-xxl">Order Management</h1>
            </Flex>
            <OrderListingHeader
                onChangeSearch={onSearch}
                endDate={filtersData?.EndDate}
                updateValuesHandler={addValues}
                clearFilter={clearFilterHandler}
                startDate={filtersData?.StartDate}
                selectedStatus={filtersData?.Status}
            />
            <GridView
                showPagination
                columns={renderOrderColumns({ handleView })}
                pagination={{
                    total: orderListingData?.pagination?.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={orderListingData?.pagination?.totalCount}
                onPaginate={(page) => {
                    pageClickHandler(page);
                }}
                selectedPage={filtersData?.PageNumber}
                pageSize={PAGE_SIZE}
                isLoading={isOrderListingLoading}
                isFetching={isOrderListingLoading}
                data={orderListingData?.data || []}
            />
        </RoundedContainer>
    );
};

export default OrderListing;
