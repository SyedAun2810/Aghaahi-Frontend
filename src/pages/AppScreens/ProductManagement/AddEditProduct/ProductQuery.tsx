import { useMutation, useQuery } from "@tanstack/react-query";
import NotificationService from "@Services/NotificationService";
import { ProductApiServices } from "@Api/product-services";
import { AddProductPayloadTypes } from "@Utils/types";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
type useProductType = {
    onSuccess: (data: any) => void;
    id?: string | undefined;
};

const successMessage = (isEdit: boolean) =>
    `Product has been ${isEdit ? "updated" : "created"} successfully.`;

export const useProduct = ({ onSuccess, id }: useProductType) => {
    return useMutation(
        ({
            payload,
            isEdit = false,
            productId
        }: {
            payload: any;
            isEdit: boolean | undefined;
            productId: string | number | undefined;
        }) =>
            isEdit
                ? ProductApiServices.editProduct({ productId, payload })
                : ProductApiServices.addProduct(payload),
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    NotificationService.success(successMessage(id));
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

export const useGetProduct = ({ onSuccess }: useProductType) => {
    return useMutation((id: number) => ProductApiServices.getProduct(id), {
        onSuccess: ({ ok, response, data }: loginTypes) => {
            if (ok) {
                // NotificationService.success(CREATE_PRODUCT_SUCCESS_MESSAGE);
                onSuccess(data?.data);
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
