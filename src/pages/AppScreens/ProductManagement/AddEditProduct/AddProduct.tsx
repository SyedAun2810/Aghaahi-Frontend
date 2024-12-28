import { Flex, Form } from "antd";

import AddSizes from "./AddSizes/AddSizes";
import useAddProductContainer from "./AddProductContainer";
import AddProductForm from "./AddProductForm/AddProductForm";

import CustomModal from "@Components/CustomModal/CustomModal";
import AddNewSizesButtons from "./AddProductComponents/AddNewSizesButtons";
import { DATA_LOADING_INFORMATION } from "./constants/ErrorAndSuccessMessages";
import AddProductCategoryModal from "@Components/Modals/AddProductCategoryModal";
import UploadProductImageModal from "@Components/Modals/UploadProductImageModal";
import SpinnerWithOverlay from "@Components/SpinnerWithOverlay/SpinnerWithOverlay";

export default function AddProduct() {
    const {
        form,
        boxes,
        imageFile,
        isLoading,
        productSizes,
        variantsRefs,
        formDataRefs,
        handleSubmit,
        isProductAdding,
        mainContainerRef,
        handleSubmitFailed,
        modalRefImageUpload,
        multipleSizesToggler,
        singleProductImageError,
        isMultipleSizesSelected,
        removeSizeVariantHandler,
        addNewSizeVariantHandler,
        uploadSingleProductHandler,
        modalRefAddProductCategory,
        productParentAndSubCategory,
        openAddProductCategoryModalHandler
    } = useAddProductContainer();

    const initialValues = {
        categoryIds: [],
        tags: "",
        sku: "",
        name: "",
        about: "",
        weight: "",
        height: "",
        length: "",
        width: "",
        stock: "",
        price: "",
        quantity: "",
        imageIdsData: [],
        isVariant: true,
        singleProductImage: ""
    };

    return (
        <>
            <Flex
                className={isLoading ? "relative" : ""}
                vertical
                gap={"large"}
                style={{ position: "relative" }}
                ref={mainContainerRef}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    disabled={isProductAdding}
                    initialValues={initialValues}
                    onFinishFailed={handleSubmitFailed}
                >
                    <AddProductForm
                        form={form}
                        productBoxes={boxes}
                        ref={formDataRefs}
                        images={imageFile}
                        isLoading={isProductAdding}
                        multipleSizesToggler={multipleSizesToggler}
                        isMultipleSizesSelected={isMultipleSizesSelected}
                        singleProductImageError={singleProductImageError}
                        productCategories={productParentAndSubCategory}
                    />
                    {productSizes.map(
                        (size: any, idx: number) =>
                            isMultipleSizesSelected && (
                                <AddSizes
                                    key={idx}
                                    form={form}
                                    size={size.size}
                                    isLoading={isProductAdding}
                                    productSizes={productSizes}
                                    productData={size}
                                    isMultipleSizesSelected={isMultipleSizesSelected}
                                    removeSizeVariantHandler={removeSizeVariantHandler}
                                    ref={(element) => (variantsRefs.current[size.size] = element)}
                                />
                            )
                    )}
                    <AddNewSizesButtons
                        variations={productSizes}
                        isLoading={isProductAdding}
                        isVariationChecked={isMultipleSizesSelected}
                        addImageIconClickHandler={openAddProductCategoryModalHandler}
                    />
                </Form>

                {isLoading ? (
                    <SpinnerWithOverlay
                        showInformationText={isProductAdding}
                        informationText={DATA_LOADING_INFORMATION}
                    />
                ) : null}
            </Flex>
            <CustomModal ref={modalRefAddProductCategory}>
                <AddProductCategoryModal
                    sizeNumber={productSizes.length}
                    onFinish={(values: any) => addNewSizeVariantHandler(values)}
                />
            </CustomModal>

            <CustomModal destroyOnClose ref={modalRefImageUpload} bodyClass="py-0 px-2" width={500}>
                <UploadProductImageModal
                    onFinish={(values: any) => {
                        uploadSingleProductHandler(values);
                    }}
                />
            </CustomModal>
        </>
    );
}
