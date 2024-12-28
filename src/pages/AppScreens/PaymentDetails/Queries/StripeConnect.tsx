import { useMutation } from "@tanstack/react-query";

import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";
import { ConnectStripeResponseType } from "../PaymentDetailsPage/usePaymentDetails";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}

export const useStripeConnect = ({
    onSuccess
}: {
    onSuccess: (data: ConnectStripeResponseType) => void;
}) => {
    return useMutation(() => ProductApiServices.StripeConnect(), {
        onSuccess: ({ ok, response, data }: loginTypes) => {
            if (ok) {
                onSuccess(data?.data);
                return;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};
