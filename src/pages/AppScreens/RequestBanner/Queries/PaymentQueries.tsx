import { useMutation } from "@tanstack/react-query";
import NotificationService from "@Services/NotificationService";
import { ProductApiServices } from "@Api/product-services";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}

export const useGetClientSecretQuery = ({
    onSuccess
}: {
    onSuccess: (data: any) => void;
    queryKeyValue: string;
}) => {
    return useMutation(
        () => {
            return ProductApiServices.getClientSecret();
        },
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    onSuccess(data);
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
