import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "@Store/authStore";
import { useUspsConnect } from "../Queries/UspsConnect";
import { useStripeConnect } from "../Queries/StripeConnect";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import utilService from "@Utils/utils.service";

export type ConnectStripeResponseType = {
    created: string;
    expiresAt: string;
    url: string;
};
export type UspsResponseType = {
    data: string;
};

export default function usePaymentDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useAuthStore();
    const isStripeConnected = utilService.checkStripeConnection(
        userData?.gatewayConnectAccountStatus
    );
    const isUspsConnected = utilService.checkStripeConnection(userData?.isUspsConnected);
    const isAuthenticated = location?.state?.isAuthenticated;

    // on stripe connection success
    const onConnectStripeSuccess = (data: ConnectStripeResponseType) => {
        window.open(data?.url, "_blank");
    };

    // getting connection mutation
    const { mutateAsync: ConnectStripeMutate, isLoading: isStripeConnecting } = useStripeConnect({
        onSuccess: onConnectStripeSuccess
    });

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

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD);
        }
    });

    // stripe connect handler
    const handleStripeConnect = async () => {
        await ConnectStripeMutate();
    };

    // usps connect handler
    const handleUspsConnect = () => {
        ConnectUspsHandler();
    };
    return {
        isUspsConnected,
        isUspsConnecting,
        isStripeConnected,
        handleUspsConnect,
        isStripeConnecting,
        handleStripeConnect
    };
}
