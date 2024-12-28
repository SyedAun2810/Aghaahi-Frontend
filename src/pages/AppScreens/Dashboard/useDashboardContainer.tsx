import { Dayjs } from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";

import { queryKeys } from "@Constants/queryKeys";
import { DashboardApiService } from "@Api/dashboard-service";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useUspsCodeUpdate } from "./Queries/UspsCodeUpdate";
import { queryClient } from "@Api/Client";

export type AnalyticalBoxesFilterDataTypes = {
    EndDate: Dayjs | string | null;
    StartDate: Dayjs | string | null;
};

const FILTER_INITIAL_DATA = {
    EndDate: null,
    StartDate: null
};
const AUTHORIZATION_KEY = "authorization_code";
export default function useDashboardContainer() {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    // handling the date filter
    const { resetPayload, filtersData, addValues } = useTableRequestFilters(FILTER_INITIAL_DATA);

    // separating out the required param data from filter data
    const { PageNumber, PageSize, ...rest } = filtersData;

    // fetching the analytical data
    const { data: analyticalData, isFetching: isAnalyticalDataLoading } = useFetchingListingApi({
        queryParams: { ...rest },
        apiService: DashboardApiService.analyticalBoxes,
        queryKeyValue: queryKeys.dashboard.analyticalBoxes
    });

    // fetching the recent orders
    const { data: recentOrdersData, isFetching: isRecentOrdersDataLoading } = useFetchingListingApi(
        {
            queryParams: { ...rest },
            apiService: DashboardApiService.recentOrders,
            queryKeyValue: queryKeys.dashboard.recentOrders
        }
    );

    // fetching the recent payouts
    const { data: recentPayoutsData, isFetching: isRecentPayoutsDataLoading } =
        useFetchingListingApi({
            queryParams: { ...rest },
            apiService: DashboardApiService.recentPayouts,
            queryKeyValue: queryKeys.dashboard.recentPayouts
        });

    // clearing the date filter values
    const clearFilterHandler = () => {
        resetPayload();
    };

    const handleView = (orderId: number | string) => {
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}/${orderId}`);
    };

    // usps success
    const onUspsCodeUpdateSuccess = () => {
        queryClient.invalidateQueries(["USER_DETAIL"]);
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD}`);
    };

    // handling for usps generated code in url query params
    const { data, refetch: refetchUSPS } = useUspsCodeUpdate({
        onSuccess: onUspsCodeUpdateSuccess,
        payload: { code: searchParams.get(AUTHORIZATION_KEY) }
    });

    return {
        addValues,
        handleView,
        filtersData,
        recentOrdersData,
        recentPayoutsData,
        clearFilterHandler,
        isAnalyticalDataLoading,
        isRecentOrdersDataLoading,
        isRecentPayoutsDataLoading,
        analyticalData: analyticalData?.data || {}
    };
}
