import { useQuery } from "@tanstack/react-query";
import { ProductApiServices } from "@Api/product-services";
import { queryKeys } from "@Constants/queryKeys";
import { DashboardApiService } from "@Api/dashboard-service";

export const useUspsCodeUpdate = ({
    onSuccess,
    payload
}: {
    onSuccess: () => void;
    payload: { code: string };
}) => {
    return useQuery(
        [queryKeys.payment.usps_connect],
        async () => {
            const { ok, response, data } = await DashboardApiService.updateUSPSCode(payload);
            if (ok) {
                onSuccess();
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            },
            enabled: !!payload?.code
        }
    );
};
