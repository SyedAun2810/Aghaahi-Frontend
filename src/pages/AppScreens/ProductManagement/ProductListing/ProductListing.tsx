import dayjs from "dayjs";
import { Flex } from "antd";
import utc from "dayjs/plugin/utc";

import GridView from "@Components/GridView";
import tableColumns from "../Components/tableColumns";
import DeleteProduct from "@Components/Modals/DeleteProduct";
import CustomModal from "@Components/CustomModal/CustomModal";
import useProductListingContainer, { PAGE_KEY } from "./ProductListingContainer";
import ProductListingFilters from "../Components/ProductListingFilters";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import ProductListingHeader from "../Components/ProductListingHeader";

dayjs.extend(utc);

const ProductManagement = () => {
    const {
        modalRef,
        filterData,
        optionsFetched,
        isUspsConnected,
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
    } = useProductListingContainer();

    return (
        <>
            <Flex className="" vertical gap={"large"}>
                <RoundedContainer>
                    <ProductListingHeader
                        AddProductHandler={AddProductHandler}
                        isUspsConnected={isUspsConnected}
                    />
                    <ProductListingFilters
                        filterData={filterData}
                        options={optionsFetched}
                        updateCategory={updateCategory}
                        updateDataHandler={updateFilterData}
                        clearFilterHandler={clearFilterHandler}
                        handleOptionsClear={handleOptionsClear}
                        optionsInputSearch={optionsInputSearch}
                        updateCategorySearchUpdate={updateCategorySearchUpdate}
                    />
                    <GridView
                        showPagination
                        pagination={{
                            total: productListingData?.pagination?.totalCount
                        }}
                        onChange={() => console.log("OnChange")}
                        totalCount={productListingData?.pagination?.totalCount}
                        onPaginate={(page) => {
                            updateFilterData(PAGE_KEY, page);
                        }}
                        selectedPage={filterData?.page}
                        pageSize={productListingData?.pagination?.pageSize}
                        isLoading={isFetchingListing}
                        isFetching={isFetchingListing}
                        data={productListingData?.data || []}
                        columns={tableColumns({ deleteIconClickHandler })}
                    />
                </RoundedContainer>
            </Flex>
            <CustomModal ref={modalRef}>
                <DeleteProduct
                    onFinish={onDeleteProductModalFinish}
                    productId={selectedProductId}
                />
            </CustomModal>
        </>
    );
};

export default ProductManagement;
