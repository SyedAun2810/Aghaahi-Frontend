import { useNavigate } from "react-router-dom";

import { queryKeys } from "@Constants/queryKeys";
import { ProductApiServices } from "@Api/product-services";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import useAuthStore from "@Store/authStore";

const useOrderListingContainer = () => {
    const navigate = useNavigate();
    const { userData } = useAuthStore();
    const userStoreId = userData?.store?.id;
    const { onSearch, resetPayload, filtersData, pageClickHandler, addValues } =
        useTableRequestFilters({
            Status: undefined,
            SearchBy: null,
            EndDate: null,
            StartDate: null,
            StoreId: userStoreId
        });

    const { data: orderListingData, isFetching: isOrderListingLoading } = useFetchingListingApi({
        queryParams: { ...filtersData },
        apiService: ProductApiServices.orderListing,
        queryKeyValue: queryKeys.orderManagement.listing
    });

    const clearFilterHandler = () => {
        resetPayload();
    };

    const handleView = (orderId: number | string) => {
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}/${orderId}`);
    };

    return {
        onSearch,
        addValues,
        handleView,
        filtersData,
        pageClickHandler,
        orderListingData,
        clearFilterHandler,
        isOrderListingLoading
    };
};

export default useOrderListingContainer;
