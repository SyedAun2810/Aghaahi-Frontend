import { useMutation } from "@tanstack/react-query";

import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";

export const useGenerateLabel = () => {
    return useMutation(
        (packageData: { OrderId?: number; packageId?: number }) =>
            ProductApiServices.generateLabelAction(packageData),
        {
            onSuccess: ({ ok, response, data }: any) => {
                if (ok) {
                    return;
                }
                NotificationService.error(data?.data?.metadata?.message);
                throw data?.data?.metadata;
            },
            onError: (err: any) => {
                throw err;
            }
        }
    );
};
