import { useMutation, useQuery } from "@tanstack/react-query";
import NotificationService from "@Services/NotificationService";
import { ProductApiServices } from "@Api/product-services";
import { queryKeys } from "@Constants/queryKeys";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
interface QueryParamsType {
    Keyword: string;
    StoreIds: number;
}
interface ProductsParamsTypes {
    queryParams: QueryParamsType;
    isProduct: boolean;
}

type PayloadTypes = {
    planId: number | undefined;
    paymentMethodId: string;
    imageId: number | undefined;
    productId?: number | null;
};

const successMessage = `Request has been sent successful.`;

export const usePurchasePlanQuery = () => {
    return useMutation(
        (payload: PayloadTypes) => {
            return ProductApiServices.makeBannerRequest(payload);
        },
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    NotificationService.success(successMessage);
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

export const useGetProducts = ({ queryParams, isProduct }: ProductsParamsTypes) => {
    return useQuery(
        [queryKeys.lookups.listing, queryParams],
        async () => {
            const { ok, response, data } = await ProductApiServices.getLookupProducts(queryParams);
            if (ok) {
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            },
            enabled: isProduct,
            staleTime: 0
        }
    );
};
