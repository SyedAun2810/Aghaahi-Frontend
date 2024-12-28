import { Pagination } from "antd";
import { PAGE_SIZE } from "@Constants/app";

interface propParams {
    totalCount: number;
    selectedPage: number;
    isLoading?: boolean;
    onPaginate?: (a: number) => void;
}

export default function PaginationWithDescription(props: propParams) {
    const { totalCount, selectedPage, onPaginate } = props;
    const pageRecordFromCount = PAGE_SIZE * (selectedPage - 1) + 1;
    const pageRecordEndCount =
        PAGE_SIZE * (selectedPage - 1) + PAGE_SIZE > totalCount
            ? totalCount
            : PAGE_SIZE * (selectedPage - 1) + PAGE_SIZE;
    return (
        <>
            {props?.totalCount > PAGE_SIZE && (
                <div className="flex justify-between items-center">
                    {totalCount && totalCount > PAGE_SIZE && (
                        <p className="text-sm text-light-text">
                            Showing{" "}
                            {`${pageRecordFromCount} - 
                ${pageRecordEndCount}`}{" "}
                            of {totalCount}
                        </p>
                    )}
                    <Pagination
                        className="customized-ant-pagination"
                        defaultCurrent={1}
                        disabled={props?.isLoading}
                        total={totalCount}
                        pageSize={PAGE_SIZE}
                        // showSizeChanger={true}
                        hideOnSinglePage={false}
                        // itemRender={itemRender}
                        onChange={onPaginate}
                        current={selectedPage as number}
                    />
                </div>
            )}
        </>
    );
}
