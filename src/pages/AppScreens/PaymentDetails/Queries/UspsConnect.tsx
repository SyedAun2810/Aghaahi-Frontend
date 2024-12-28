import { useQuery } from "@tanstack/react-query";
import { ProductApiServices } from "@Api/product-services";
import { queryKeys } from "@Constants/queryKeys";

export const useUspsConnect = ({ onSuccess }) => {
    return useQuery(
        [queryKeys.payment.usps_connect],
        async () => {
            const { ok, response, data } = await ProductApiServices.getUspsConnectionUrl();
            if (ok) {
                onSuccess(data);
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            },
            enabled: false
        }
    );
};
