import { PAGE_SIZE } from "@Constants/app";
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";

export default function useTableRequestFilters<payload = any>(props?: payload) {
    const [params, setParams] = useSearchParams({});

    const entries = Object.fromEntries(params.entries());

    const INITIAL_VALUES = {
        PageNumber: Number(entries?.page) || 1,
        PageSize: PAGE_SIZE,
        ...props
    };

    useEffect(() => {
        setGridRequest((prev) => ({
            ...prev,
            PageNumber: Number(entries.page) || 1
        }));
    }, [params]);

    const loadingItemsRef = useRef<{ [key: string]: boolean }>({});

    const [gridRequest, setGridRequest] = useState<payload>(INITIAL_VALUES as payload);

    const addLoadingItem = (id: string | number) => {
        loadingItemsRef.current[id] = true;
    };
    const removeLoadingItem = (id: string | number) => {
        delete loadingItemsRef.current[id];
    };
    const hasLoadingItem = (id: string | number) => {
        return Boolean(loadingItemsRef.current?.[id]);
    };

    const onSearch = ({
        searchValue,
        fieldName = "keyword",
        valuePropName,
        searchObject
    }: SearchPayload) => {
        setGridRequest((prev) => ({
            ...prev,
            PageNumber: 1,
            [fieldName]: searchObject?.[valuePropName as string] ?? searchValue
        }));
    };

    const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch({
            searchValue: e.target.value as string,
            fieldName: e.target.name || "keyword"
        });
    };

    const onPagination = (page: number) => {
        // setParams({ page: page.toString() });
        setGridRequest({ ...gridRequest, PageNumber: page });
    };

    const onClear = (name?: string) => {
        if (!name) return;
        setGridRequest((prev) => {
            const temp = { ...prev };
            delete temp[name as keyof payload];
            return temp;
        });
    };

    const onSort = ([sortConfig]: [{ field: string; sort: "asc" | "desc" } | undefined]) => {};

    const resetPayload = (value?: payload) => {
        setGridRequest(value ?? (INITIAL_VALUES as payload));
    };

    const addValues = ({
        value,
        updatePageToDefault = false
    }: {
        value: Partial<payload>;
        updatePageToDefault: boolean;
    }) => {
        setGridRequest((prev) => ({
            ...prev,
            ...value,
            ...(updatePageToDefault && { PageNumber: 1 })
        }));
    };

    return {
        filtersData: gridRequest,
        onSearch,
        pageClickHandler: onPagination,
        resetPayload,
        onSort,
        handleFilters,
        addLoadingItem,
        removeLoadingItem,
        hasLoadingItem,
        addValues,
        onClear
    };
}

export type SearchPayload = {
    searchValue: any;
    fieldName?: string;
    valuePropName?: string;
    searchObject?: any;
};
