import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@Constants/queryKeys";
import NotificationService from "@Services/NotificationService";
import { ProductApiServices } from "@Api/product-services";

const GENERAL_ERROR = "Something went wrong. Please try again later.";

export function useGetOrderDetails({ orderId }: { orderId: number }) {
    return useQuery([queryKeys.orderManagement.details, orderId], async () => {
        const { ok, response, data } = await ProductApiServices.getOrderDetails({
            orderId
        });
        if (ok) {
            return data;
        }
        NotificationService.error(response?.message || GENERAL_ERROR);
        throw new Error(GENERAL_ERROR);
    });
}
