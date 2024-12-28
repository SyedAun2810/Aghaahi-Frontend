import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import useAuthStore from "@Store/authStore";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import {
    useProduct,
    useProductCategories,
    useProductSubCategories
} from "../Queries/ProductListQuery";
import {
    CATEGORIES,
    CATEGORY,
    SUB_CATEGORIES,
    SUB_CATEGORY
} from "../AddEditProduct/constants/PayloadDataFields";
import utilService from "@Utils/utils.service";

export type CategoryOptionType = { value: string; label: string; key: number };
export type OptionsFetchedTypes = {
    categories: CategoryOptionType[] | [];
    subCategories: CategoryOptionType[] | [];
};
export type OptionsInputSearchType = {
    category: string;
    subCategory: string;
};
export type FilterDataTypes = {
    page: number;
    search: string;
    endDate: Date | null;
    startDate: Date | null;
    variation: string | null;
};
const FILTER_DATA_INITIAL = {
    page: 1,
    search: "",
    endDate: null,
    startDate: null,
    variation: null
};
const SELECTED_OPTIONS_INITIAL = {
    category: undefined,
    subCategory: undefined
};
const AUTOCOMPLETE_INPUT_INITIAL = {
    category: "",
    subCategory: ""
};
const OPTIONS_FETCHED_INITIAL = {
    categories: [],
    subCategories: []
};
export const PAGE_KEY = "page";
export const SEARCH_KEY = "search";
export const END_DATE_KEY = "endDate";
export const VARIATION_KEY = "variation";
export const START_DATE_KEY = "startDate";

const OnlyParent = true;
let isCategorySelected = false;
let isSubCategorySelected = false;

export default function useProductListingContainer() {
    const modalRef: any = useRef();
    const navigate = useNavigate();
    const { userData } = useAuthStore();
    const isUspsConnected = utilService.checkStripeConnection(userData?.isUspsConnected);
    const userStoreId = userData?.store?.id;

    const [filterData, setFilterData] = useState<FilterDataTypes>(FILTER_DATA_INITIAL);
    const [selectedOption, setSelectedOption] = useState(SELECTED_OPTIONS_INITIAL);
    const [optionsInputSearch, setOptionsInputSearch] = useState<OptionsInputSearchType>(
        AUTOCOMPLETE_INPUT_INITIAL
    );
    const [selectedProductId, setSelectedProductId] = useState<number>(0);
    const [optionsFetched, setOptionsFetched] =
        useState<OptionsFetchedTypes>(OPTIONS_FETCHED_INITIAL);

    // query params for category options
    const categoryQueryParams = {
        isLinear: true,
        OnlyParent,
        Keyword: optionsInputSearch?.category,
        isCategorySelected
    };
    // query params for sub category options
    const subCategoryQueryParams = {
        isLinear: true,
        parentId: selectedOption?.category,
        Keyword: optionsInputSearch?.subCategory,
        isSubCategorySelected
    };

    // query params product listing
    const productListingQueryParams = {
        page: filterData?.page,
        search: filterData?.search,
        startDate: filterData?.startDate,
        endDate: filterData?.endDate,
        variation: filterData?.variation,
        userStoreId,
        subCategory: selectedOption?.subCategory
    };

    // product listing data fetch
    const {
        data: productListingData,
        isFetching: isFetchingListing,
        refetch: refetchProductData
    } = useProduct(productListingQueryParams);

    // product categories filter data fetch
    const { data: productCategoryListing, isFetching: productCategoryLoading } =
        useProductCategories(categoryQueryParams);

    // product sub categories filter data fetch
    const { data: productSubCategoryListing, isFetching: productSubCategoryLoading } =
        useProductSubCategories(subCategoryQueryParams);

    // product category options update
    useEffect(() => {
        if (productCategoryListing?.data && !productCategoryLoading) {
            const CategoryOptions = productCategoryListing.data.map((item: any) => ({
                key: item.id,
                label: item.name,
                value: item.name
            }));
            setOptionsFetched((prev) => ({ ...prev, [CATEGORIES]: CategoryOptions }));
        }
    }, [productCategoryLoading]);

    // product sub category options update
    useEffect(() => {
        if (productSubCategoryListing?.data && !productSubCategoryLoading) {
            const subCategoryOptions = productSubCategoryListing.data.map((item: any) => ({
                key: item.id,
                label: item.name,
                value: item.name
            }));
            setOptionsFetched((prev) => ({ ...prev, [SUB_CATEGORIES]: subCategoryOptions }));
        }
    }, [productSubCategoryLoading]);

    const deleteIconClickHandler = (id: number) => {
        setSelectedProductId(id);
        modalRef.current.openModal("testing");
    };

    const AddProductHandler = () => {
        navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_PRODUCT);
    };

    const updateFilterData = (
        fieldName: string,
        value: string | number | Date,
        pageNo?: number
    ) => {
        setFilterData((prev) => ({
            ...prev,
            [fieldName]: value,
            ...(pageNo && { [PAGE_KEY]: 1 })
        }));
    };

    // category select handler
    const updateCategory = (option: CategoryOptionType, fieldName: string) => {
        updateFilterData(PAGE_KEY, 1);
        fieldName === CATEGORY ? (isCategorySelected = true) : (isSubCategorySelected = true);
        setSelectedOption((prev) => ({ ...prev, [fieldName]: option?.key }));
        setOptionsInputSearch((prev) => ({ ...prev, [fieldName]: option?.value }));
    };

    // category search value update handler
    const updateCategorySearchUpdate = (value: string, fieldName: string) => {
        setOptionsInputSearch((prev) => ({
            ...prev,
            [fieldName]: value
        }));
        setOptionsInputSearch((prev) => ({ ...prev, [fieldName]: value }));
    };

    // category/subcategory clear input
    const handleOptionsClear = (fieldName: string) => {
        isSubCategorySelected = false;
        setOptionsInputSearch((prev) => ({
            ...prev,
            [SUB_CATEGORY]: "",
            ...(fieldName === CATEGORY && {
                [CATEGORY]: ""
            })
        }));
        setSelectedOption((prev) => ({
            ...prev,
            [CATEGORY]: undefined
        }));
        if (fieldName === CATEGORY) {
            isCategorySelected = false;
            setSelectedOption((prev) => ({
                ...prev,
                [SUB_CATEGORY]: undefined
            }));
            setOptionsFetched((prev) => ({ ...prev, [SUB_CATEGORIES]: [] }));
        }
    };

    // clearing filter data to initial value
    const clearFilterHandler = () => {
        setFilterData((prev) => ({
            ...prev,
            [PAGE_KEY]: 1,
            [END_DATE_KEY]: null,
            [VARIATION_KEY]: null,
            [START_DATE_KEY]: null
        }));
        setOptionsInputSearch((prev) => ({
            ...prev,
            [CATEGORY]: "",
            [SUB_CATEGORY]: ""
        }));
        setSelectedOption((prev) => ({
            ...prev,
            [CATEGORY]: undefined,
            [SUB_CATEGORY]: undefined
        }));
        setOptionsFetched((prev) => ({ ...prev, [SUB_CATEGORIES]: [] }));
    };

    // delete modal finish handler
    const onDeleteProductModalFinish = () => {
        if (productListingData?.data?.length === 1 && filterData?.page !== 1) {
            updateFilterData(PAGE_KEY, filterData?.page - 1);
        } else {
            refetchProductData();
        }
        modalRef.current?.closeModal();
    };

    return {
        modalRef,
        filterData,
        isUspsConnected,
        optionsFetched,
        updateCategory,
        AddProductHandler,
        updateFilterData,
        isFetchingListing,
        productListingData,
        clearFilterHandler,
        selectedProductId,
        optionsInputSearch,
        handleOptionsClear,
        deleteIconClickHandler,
        updateCategorySearchUpdate,
        onDeleteProductModalFinish
    };
}
