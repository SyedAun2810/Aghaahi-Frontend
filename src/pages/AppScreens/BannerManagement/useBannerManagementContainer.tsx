import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { ModalMethodsTypes } from "@Utils/types";
import { queryKeys } from "@Constants/queryKeys";
import { BANNER_STATUS_VALUES } from "@Constants/app";
import { useToggleStatus } from "./Queries/ToggleStatus";
import { ProductApiServices } from "@Api/product-services";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import { useReorderRequest } from "./Queries/ReorderRequest";
import { useGetClientSecretQuery } from "../RequestBanner/Queries/PaymentQueries";

let selectedRequestId: number = -1;
const useBannerManagementContainer = () => {
    const navigate = useNavigate();
    const { userData } = useAuthStore();
    const userStoreId = userData?.store?.id;

    const paymentModalRef = useRef<ModalMethodsTypes | null>(null);
    paymentModalRef?.current?.canNotCloseModal();
    const [clientSecret, setClientSecret] = useState("");

    // toggle status success handler
    const onToggleStatusSuccess = async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.bannerManagement.listing] });
    };

    // getting client secret success handler
    const onGetClientSuccess = (data: any) => {
        setClientSecret(data?.data);
        paymentModalRef?.current?.openModal();
    };

    // getting filter values using hook
    const { addValues, filtersData, pageClickHandler, resetPayload } = useTableRequestFilters({
        isHidden: undefined,
        Keyword: null,
        Type: undefined,
        EndDate: null,
        StartDate: null
    });

    // fetching banner listing data
    const { data: bannerListingData, isFetching: isBannerListingLoading } = useFetchingListingApi({
        queryParams: {
            ...filtersData,
            StoreIds: userStoreId,
            isHidden: BANNER_STATUS_VALUES[filtersData?.isHidden]
        },
        apiService: ProductApiServices.bannerListing,
        queryKeyValue: queryKeys.bannerManagement.listing
    });

    // get client_secret key
    const { mutateAsync: getClientSecret, isLoading: gettingClientSecret } =
        useGetClientSecretQuery({
            onSuccess: onGetClientSuccess,
            queryKeyValue: queryKeys.payment.client_secret
        });

    // toggle status handling
    const {
        mutateAsync: mutateToggleStatus,
        isLoading: isToggleStatusLoading,
        isError: toggleStatusError
    } = useToggleStatus({ onSuccess: onToggleStatusSuccess });

    const bannerRequestHandler = () => {
        navigate(NavigationRoutes.DASHBOARD_ROUTES.REQUEST_BANNER);
    };

    const clearFilterHandler = () => {
        resetPayload();
    };

    const onStatusUpdateClick = async (id: number) => {
        await mutateToggleStatus(id);
    };

    // reorder handling
    const {
        mutateAsync: mutateReorderRequest,
        isLoading: isReorderRequestLoading,
        isError: reorderRequestError
    } = useReorderRequest({ onSuccess: onToggleStatusSuccess });

    // reorder click handler
    const handleReOrder = async (id: number) => {
        selectedRequestId = id;
        await getClientSecret();
        // await mutateReorderRequest(id);
    };

    // payment success handling
    const onPaymentSuccess = async (paymentMethodId: number) => {
        paymentModalRef?.current?.closeModal();
        await mutateReorderRequest({ id: selectedRequestId, payload: { paymentMethodId } });
    };

    return {
        addValues,
        filtersData,
        clientSecret,
        handleReOrder,
        paymentModalRef,
        pageClickHandler,
        onPaymentSuccess,
        bannerListingData,
        clearFilterHandler,
        onStatusUpdateClick,
        bannerRequestHandler,
        isBannerListingLoading
    };
};

export default useBannerManagementContainer;
