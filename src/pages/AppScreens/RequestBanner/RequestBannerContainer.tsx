import { useEffect, useRef, useState } from "react";

import ApiClientProvider, { queryClient } from "@Api/Client";
import utilService from "@Utils/utils.service";
import { queryKeys } from "@Constants/queryKeys";
import { ModalMethodsTypes } from "@Utils/types";
import { ProductApiServices } from "@Api/product-services";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import { usePurchasePlanQuery } from "./Queries/PurchasePlanQuery";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";
import { useGetClientSecretQuery } from "./Queries/PaymentQueries";
import { DATA_KEY, META_DATA_KEY, PAGE_SIZE } from "@Constants/app";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

export type PlanTypeTypes = {
    createdOn: string;
    currency: string;
    gatewayType: number;
    id: number;
    name: string;
    period: number;
    price: number;
    status: boolean;
    type: number;
};

type PurchasePlanDataTypes = {
    image: any;
    product: null;
    imageId: number | null;
    paymentId: string | null;
    clientSecret: string;
    productId: number | null;
};

type PayloadTypes = {
    planId: number | undefined;
    paymentMethodId: string;
    imageId: number | undefined;
    productId?: number | null;
};

const PURCHASE_PLAN_INITIAL_VALUES = {
    paymentId: null,
    image: null,
    product: null,
    imageId: null,
    clientSecret: "",
    productId: null
};

const IMAGE_ID_KEY = "imageId";
const PAYMENT_ID_KEY = "paymentId";
const CLIENT_SECRET_KEY = "clientSecret";

const useRequestBannerContainer = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [planData, setPlanData] = useState<{ data: any; metadata: any }>({
        data: [],
        metadata: {}
    });
    const [modalProps, setModalProps] = useState<PlanTypeTypes>();
    const [purchasePlanData, setPurchasePlanData] = useState<PurchasePlanDataTypes>({
        ...PURCHASE_PLAN_INITIAL_VALUES
    });
    // states for modals
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // client api success handling
    const onGetClientSuccess = (data: any) => {
        setPurchasePlanData((prev) => ({ ...prev, [CLIENT_SECRET_KEY]: data?.data }));
        setIsPaymentModalOpen(true);
    };

    // get plans api
    const { data: planListingData, isFetching: isPlanListingLoading } = useFetchingListingApi({
        queryParams: { PageNumber: page, PageSize: PAGE_SIZE },
        apiService: ProductApiServices.planListing,
        queryKeyValue: queryKeys.plan.listing
    });

    // mutations for purchase product
    const { mutateAsync: makeRequestMutate, isLoading: isMakingRequest } = usePurchasePlanQuery();
    const { mutateAsync: uploadDocument, isLoading: isUploadingDocument } = useUploadDocuments();

    const isPurchasing = isMakingRequest || isUploadingDocument;
    // get client_secret key
    const { mutateAsync: getClientSecret, isLoading: gettingClientSecret } =
        useGetClientSecretQuery({
            onSuccess: onGetClientSuccess,
            queryKeyValue: queryKeys.payment.client_secret
        });

    // update plans
    useEffect(() => {
        if (
            planListingData?.data &&
            !isPlanListingLoading &&
            !(planData?.data?.length > PAGE_SIZE * (page - 1))
        ) {
            setPlanData((prev) => ({
                ...prev,
                [DATA_KEY]: [...prev?.data, ...planListingData?.data],
                [META_DATA_KEY]: { ...planListingData?.pagination }
            }));
        }
    }, [isPlanListingLoading]);

    const handleAdvertisementModal = (data: PlanTypeTypes) => {
        setModalProps(data);
        setIsProductModalOpen(true);
        setIsProductModalOpen(true);
    };

    const openPaymentCloseProductModalHandling = () => {
        setIsPaymentModalOpen(false);
        setIsProductModalOpen(true);
    };

    const closeBothModals = () => {
        setIsProductModalOpen(false);
        setIsPaymentModalOpen(false);
    };

    const onFinish = async (values: any) => {
        setPurchasePlanData((prev) => ({ ...prev, ...values }));
        await getClientSecret();
    };

    // on payment done through stripe
    const onPaymentSuccess = async (paymentId: string) => {
        setPurchasePlanData((prev) => ({
            ...prev,
            [PAYMENT_ID_KEY]: paymentId
        }));
        openPaymentCloseProductModalHandling();
        await submitRequestData(paymentId);
    };

    // sending request data to server
    const submitRequestData = async (paymentId: string) => {
        let imageId: number | undefined;
        // uploading image
        if (!purchasePlanData?.imageId) {
            let res = await utilService.uploadImageHandling(
                purchasePlanData?.image,
                uploadDocument
            );
            imageId = res;
            if (res) {
                setPurchasePlanData((prev) => ({ ...prev, [IMAGE_ID_KEY]: res }));
            }
        }
        // creating payload
        let payload = {} as PayloadTypes;
        payload.planId = modalProps?.id;
        payload.paymentMethodId = purchasePlanData?.paymentId || paymentId;
        payload.imageId = purchasePlanData?.imageId || imageId;
        if (purchasePlanData?.productId) {
            payload.productId = purchasePlanData?.productId;
        }
        await makeRequestMutate(payload);
        closeBothModals();
        queryClient.invalidateQueries({
            queryKey: [queryKeys.bannerManagement.listing]
        });
        navigate(NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT);
    };

    return {
        page,
        setPage,
        planData,
        onFinish,
        modalProps,
        isPurchasing,
        purchasePlanData,
        onPaymentSuccess,
        isPaymentModalOpen,
        isProductModalOpen,
        isPlanListingLoading,
        setIsPaymentModalOpen,
        setIsProductModalOpen,
        handleAdvertisementModal
    };
};

export default useRequestBannerContainer;
