import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TableLayout } from "rc-table/lib/interface";

import "./index.scss";
import { PAGE_SIZE } from "@Constants/app";
import utilService from "@Utils/utils.service";

interface propParams {
    tabKey?: string;
    pageSize?: number;
    totalCount: number;
    isLoading?: boolean;
    // data: Array<Object>; // *FIX THIS
    data: any;
    columns: Array<Object>;
    reactFiltersRender?: any;
    rowKey?: string | undefined;
    isFetching?: boolean | undefined;
    pageOffset?: number;
    tableLayout?: TableLayout | undefined;
    onPaginate?: (a: number) => void;
    currentPage?: number;
    [key: string]: any;
    showPagination: boolean;
}

const GridView: React.FC<propParams> = (props) => {
    const { rowKey = "id", tableLayout = "auto", rowSelection, totalCount, selectedPage } = props;
    const pageRecordFromCount = PAGE_SIZE * (selectedPage - 1) + 1;
    const pageRecordEndCount =
        PAGE_SIZE * (selectedPage - 1) + PAGE_SIZE > totalCount
            ? totalCount
            : PAGE_SIZE * (selectedPage - 1) + PAGE_SIZE;
    const showPageSizeChanger = totalCount > PAGE_SIZE;

    return (
        <div className="my-table">
            {props.reactFiltersRender && props.reactFiltersRender()}
            <Table
                className="customized-ant-table"
                tableLayout={tableLayout ?? "fixed"}
                scroll={{ x: "auto" }}
                rowKey={(record, index) => {
                    if (!record?.hasOwnProperty(rowKey)) {
                        return String(index);
                    }
                    return String(record[rowKey]);
                }}
                columns={props.columns}
                dataSource={props?.data}
                loading={props?.isFetching}
                bordered={false}
                pagination={false}
                {...(utilService.isEmpty(rowSelection) ? { rowSelection } : {})}
            />
            {props.showPagination && props?.totalCount > PAGE_SIZE && (
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
                        disabled={props?.isFetching || props?.isLoading}
                        total={totalCount}
                        pageSize={props?.pageSize}
                        // showSizeChanger={true}
                        // hideOnSinglePage={false}
                        // itemRender={itemRender}
                        onChange={props?.onPaginate}
                        current={selectedPage as number}
                    />
                </div>
            )}
        </div>
    );
};
export default GridView;
