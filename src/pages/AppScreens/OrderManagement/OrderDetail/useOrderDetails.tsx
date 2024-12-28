import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetails } from "../Queries/OrderDetailsQuery";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const useOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: orderDetailsData, isFetching: isOrderDataLoading } = useGetOrderDetails({
        orderId: Number(id)
    });

    // redirecting to generate labels page
    const onGenerateButtonClick = () => {
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.GENERATE_LABELS_MAIN}/${Number(id)}`);
    };

    return { detailsData: orderDetailsData?.data, isOrderDataLoading, onGenerateButtonClick };
};

export default useOrderDetails;
