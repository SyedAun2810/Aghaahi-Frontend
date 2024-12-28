import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";
import { useMutation } from "@tanstack/react-query";

const STATUS_UPDATE_SUCCESS_MESSAGE = "Request has been made successfully.";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
interface ReorderRequestTypes {
    id: number;
    payload: { paymentMethodId: number };
}
export const useReorderRequest = ({ onSuccess }: { onSuccess: () => void }) => {
    return useMutation(
        ({ id, payload }: ReorderRequestTypes) =>
            ProductApiServices.reorderRequest({ id, payload }),
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    NotificationService.success(STATUS_UPDATE_SUCCESS_MESSAGE);
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
