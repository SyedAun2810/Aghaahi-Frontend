import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@Constants/queryKeys";
import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";

export function useGetRequestDetails({ requestId }: { requestId: number }) {
    return useQuery(
        [queryKeys.bannerManagement.details, requestId],
        async () => {
            const { ok, response, data } = await ProductApiServices.getRequestDetails(requestId);
            if (ok) {
                return data;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw data?.data?.metadata?.message;
        },
        {
            onError: (err) => {
                throw err;
            }
        }
    );
}
