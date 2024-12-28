import { useQuery } from "@tanstack/react-query";
import { ProductApiServices } from "@Api/product-services";

export const productQueryKeys = {
    productListing: "product",
    productDetails: ["productDetails"],
    productCategoryListing: "productCategories",
    productParentCategory: ["productParentCategory"],
    productSubCategory: "productSubCategory"
};

export const useProduct = (queryParams: {
    userStoreId: number;
    page: number;
    search: string;
    startDate: Date | null;
    endDate: Date | null;
    subCategory: string | null;
    variation: string | null;
}) => {
    return useQuery(
        [productQueryKeys.productListing, queryParams],
        async () => {
            const { ok, response, data } = await ProductApiServices.viewProducts(queryParams);
            if (ok) {
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            }
            // enabled: false
        }
    );
};

export const useProductDetails = (id: number) => {
    return useQuery(
        [...productQueryKeys.productDetails, id],
        async () => {
            const { ok, response, data } = await ProductApiServices.productDetails(id);
            if (ok) {
                return data?.data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            }
        }
    );
};

export const useProductCategories = ({
    Keyword,
    OnlyParent,
    isLinear,
    isCategorySelected
}: {
    Keyword: string;
    OnlyParent: boolean;
    isLinear: boolean;
    isCategorySelected: boolean;
}) => {
    return useQuery(
        [productQueryKeys.productCategoryListing, { Keyword }, isCategorySelected],
        async () => {
            const { ok, response, data } = await ProductApiServices.productParentCategories({
                Keyword,
                OnlyParent,
                isLinear
            });
            if (ok) {
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            },
            enabled: !isCategorySelected
        }
    );
};

export const useProductParentCategories = (OnlyParent: boolean) => {
    return useQuery(
        productQueryKeys.productParentCategory,
        async () => {
            const { ok, response, data } =
                await ProductApiServices.productParentCategoriesAddProduct(OnlyParent);
            if (ok) {
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            }
        }
    );
};

export const useProductSubCategories = (queryParams: {
    parentId: number | string | null;
    isLinear: boolean;
    Keyword: string;
    isSubCategorySelected: boolean;
}) => {
    return useQuery(
        [productQueryKeys.productSubCategory, queryParams],
        async () => {
            const { ok, response, data } =
                await ProductApiServices.productSubCategories(queryParams);
            if (ok) {
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            },
            enabled: !!queryParams?.parentId && !queryParams?.isSubCategorySelected,
            staleTime: 0
        }
    );
};

export const useDeleteProduct = async (id: number) => {
    const response = await ProductApiServices.deleteProduct(id);
    return response;
};
