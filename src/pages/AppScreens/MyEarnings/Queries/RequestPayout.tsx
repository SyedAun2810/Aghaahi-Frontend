import { useMutation } from "@tanstack/react-query";

import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
interface RequestPayoutTypes {
    payload: { amount: number };
}
export const useRequestPayout = ({ onSuccess }: { onSuccess: () => void }) => {
    return useMutation(
        ({ payload }: RequestPayoutTypes) => ProductApiServices.requestPayout(payload),
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    onSuccess();
                    return;
                }
                NotificationService.error(data?.data?.metadata?.message);
                throw response.message;
            },
            onError: (err: any) => {
                throw err;
            }
        }
    );
};
