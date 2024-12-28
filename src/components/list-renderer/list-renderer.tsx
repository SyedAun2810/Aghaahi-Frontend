import { DataNotFound } from "@Components/DataNotFound";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import { ComponentType, Fragment, ReactNode } from "react";

export default function ListRenderer<dataType = unknown, WrapperComponentType = unknown>({
    data = [],
    isLoading,
    isFetching,
    LoadingComponent = <ProgressLoader />,
    NoDataComponent = <DataNotFound />,
    ItemWrapperComponent = Fragment,
    itemWrapperProps,
    renderItem
}: ListRenderer<dataType, WrapperComponentType>) {
    return isLoading ? (
        LoadingComponent
    ) : data?.length ? (
        <>
            {isFetching && LoadingComponent}
            <div
                style={{
                    overflow: "hidden auto",
                    borderRadius: "10px",
                    width: "100%",
                    position: "relative",
                    // bgcolor: "chat.contentBg",
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column-reverse"
                }}
                {...itemWrapperProps}
            >
                {data?.map(renderItem)}
            </div>
        </>
    ) : (
        NoDataComponent
    );
}

type ListRenderer<dataType, WrapperComponentProps> = {
    data: dataType[];
    isLoading?: boolean;
    LoadingComponent?: JSX.Element | null;
    renderItem: (item: dataType, index: number) => ReactNode;
    NoDataComponent?: JSX.Element | null;
    itemWrapperProps?: WrapperComponentProps;
    ItemWrapperComponent?: ComponentType<any> | typeof Fragment;
    isFetching?: boolean;
};
