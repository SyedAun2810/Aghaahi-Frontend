import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";
import { useMutation } from "@tanstack/react-query";

const STATUS_UPDATE_SUCCESS_MESSAGE = "Status has been updated successfully.";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}

export const useToggleStatus = ({ onSuccess }: { onSuccess: () => void }) => {
    return useMutation((id: number) => ProductApiServices.bannerStatusUpdate(id), {
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
    });
};
