import { queryKeys } from "@Constants/queryKeys";
import { useNavigate, useParams } from "react-router-dom";
import { ProductApiServices } from "@Api/product-services";
import { useGenerateLabel } from "../Queries/GenerateLabel";
import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { useFetchingListingApi } from "@Hooks/useFetchListingApi";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import NotificationService from "@Services/NotificationService";
import { queryClient } from "@Api/Client";
import { UspsResponseType } from "@Pages/AppScreens/PaymentDetails/PaymentDetailsPage/usePaymentDetails";
import { useUspsConnect } from "@Pages/AppScreens/PaymentDetails/Queries/UspsConnect";
import { useState } from "react";

export type ButtonLoaderDataType = {
    isGenerateAllSelected: boolean;
    selectedPackageId: number;
};

const LABEL_GENERATE_MSG = "Label has been generated successfully.";
export default function useGenerateLabelsContainer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [buttonLoaderData, setButtonLoaderData] = useState<ButtonLoaderDataType>({
        isGenerateAllSelected: false,
        selectedPackageId: -1
    });
    const { filtersData, pageClickHandler } = useTableRequestFilters();

    const { data: generateLabelsListingData, isFetching: isGenerateLabelsLoading } =
        useFetchingListingApi({
            queryParams: { ...filtersData, OrderId: Number(id) },
            apiService: ProductApiServices.generateLabelsListing,
            queryKeyValue: queryKeys.orderManagement.generateLabels
        });

    const { mutateAsync: generateLabelMutation, isLoading: isLabelGenerating } = useGenerateLabel();

    // on usps connection success
    const onUspsSuccess = (data: UspsResponseType) => {
        window.open(data?.data, "_blank");
    };

    // getting usps url query
    const {
        data,
        isFetching: isUspsConnecting,
        refetch: ConnectUspsHandler
    } = useUspsConnect({
        onSuccess: onUspsSuccess
    });

    const handlingGenerateLabelFlow = async (data: { OrderId?: number; packageId?: number }) => {
        try {
            await generateLabelMutation(data);
            NotificationService.success(LABEL_GENERATE_MSG);
            queryClient.invalidateQueries({ queryKey: [queryKeys.orderManagement.generateLabels] });
        } catch (err) {
            // handling error for usps login
            if (err && err?.errorCode === 1001) {
                await ConnectUspsHandler();
            }
        }
    };

    const onGenerateLabelClick = async (packageId: number) => {
        setButtonLoaderData((prev) => ({
            ...prev,
            ["isGenerateAllSelected"]: false,
            ["selectedPackageId"]: packageId
        }));
        await handlingGenerateLabelFlow({ packageId });
    };

    const generateAllLabelsHandler = async () => {
        setButtonLoaderData((prev) => ({
            ...prev,
            ["isGenerateAllSelected"]: true
        }));
        await handlingGenerateLabelFlow({ OrderId: Number(id) });
    };
    const onBackButtonClick = () =>
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}/${Number(id)}`);

    return {
        filtersData,
        buttonLoaderData,
        isLabelGenerating,
        pageClickHandler,
        onBackButtonClick,
        onGenerateLabelClick,
        isGenerateLabelsLoading,
        generateAllLabelsHandler,
        generateLabelsListingData
    };
}
