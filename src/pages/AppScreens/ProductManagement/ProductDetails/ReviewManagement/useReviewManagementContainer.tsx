import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import { ProductApiServices } from "@Api/product-services";
import { queryKeys } from "@Constants/queryKeys";
import { REVIEWS_STARS_KEYS } from "@Constants/app";
import { useParams } from "react-router-dom";

export default function useReviewManagementContainer() {
    const { id } = useParams();
    const { filtersData, pageClickHandler, addValues } = useTableRequestFilters({
        Stars: undefined,
        ProductId: id
    });

    const {
        isError,
        data: reviewListingData,
        isFetching: isReviewListingLoading
    } = useFetchingListingApi({
        queryParams: {
            ...filtersData,
            Stars: REVIEWS_STARS_KEYS[filtersData?.Stars as keyof typeof REVIEWS_STARS_KEYS]
        },
        apiService: ProductApiServices.reviewListing,
        queryKeyValue: queryKeys.reviewManagement.listing
    });

    return {
        isError,
        addValues,
        filtersData,
        pageClickHandler,
        reviewListingData,
        isReviewListingLoading
    };
}
