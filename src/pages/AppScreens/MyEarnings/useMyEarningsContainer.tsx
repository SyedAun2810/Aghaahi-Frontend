import { Dayjs } from "dayjs";
import { useRef } from "react";

import { queryKeys } from "@Constants/queryKeys";
import { ProductApiServices } from "@Api/product-services";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { PAGE_SIZE } from "@Constants/app";
import utilService from "@Utils/utils.service";
import useAuthStore from "@Store/authStore";

export type MyEarningFilterDataTypes = {
    SearchBy: string;
    PageSize: number;
    PageNumber: number;
    EndDate: Dayjs | string | null;
    StartDate: Dayjs | string | null;
};
export default function useMyEarningsContainer() {
    const requestPayoutModalRef = useRef();
    const { userData } = useAuthStore();
    const isStripeConnected = utilService.checkStripeConnection(
        userData?.gatewayConnectAccountStatus
    );
    const { onSearch, resetPayload, filtersData, pageClickHandler, addValues } =
        useTableRequestFilters({
            PageNumber: 1,
            EndDate: null,
            SearchBy: "",
            StartDate: null,
            PageSize: PAGE_SIZE
        });

    const { data: myPayoutsListingData, isFetching: isMyPayoutsListingLoading } =
        useFetchingListingApi({
            queryParams: { ...filtersData },
            apiService: ProductApiServices.myPayoutsListing,
            queryKeyValue: queryKeys.myEarningManagement.payoutListing
        });

    const { SearchBy, PageNumber, PageSize, ...rest } = filtersData;

    const { data: analyticalDataListingData, isFetching: isAnalyticalDataListingLoading } =
        useFetchingListingApi({
            queryParams: { ...rest },
            apiService: ProductApiServices.myEarningListing,
            queryKeyValue: queryKeys.myEarningManagement.listing
        });

    const clearFilterHandler = () => {
        resetPayload();
    };

    return {
        onSearch,
        addValues,
        filtersData,
        isStripeConnected,
        pageClickHandler,
        clearFilterHandler,
        myPayoutsListingData,
        requestPayoutModalRef,
        isMyPayoutsListingLoading,
        analyticalDataListingData,
        isAnalyticalDataListingLoading
    };
}
