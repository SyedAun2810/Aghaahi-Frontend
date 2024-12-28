import { ReactNode, forwardRef } from "react";

import useAddSizesContainer from "./AddSizesContainer";
import { colorVariantTypes } from "../../ProductTypes";
import CustomModal from "@Components/CustomModal/CustomModal";
import VariantHeader from "../AddProductComponents/VariantHeader";
import ColorPickerModal from "@Components/Modals/ColorPickerModal";
import VariantColorBox from "../AddProductComponents/VariantColorBox";
import VariantFormFields from "../AddProductComponents/VariantFormFields";
import AddNewColorButton from "../AddProductComponents/AddNewColorButton";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import UploadProductImageModal from "@Components/Modals/UploadProductImageModal";
import AddNewColorVariantModal from "@Components/Modals/AddNewColorVariantModal";
import CustomErrorWrapper from "@Components/CustomErrorWrapper/CustomErrorWrapper";
import UploadedImagesWithDeleteIcon from "../AddProductComponents/UploadedImagesWithDeleteIcon";
import DeleteModal from "@Components/Modals/DeleteModal";
import BoxSizesAndWight from "../BoxSizesAndWeight/BoxSizesAndWight";

const IMAGE_VALIDATION_ERROR = "Please upload at least one product image";
interface AddSizesTypes {
    form: any;
    size: string;
    ref: ReactNode;
    isLoading: boolean;
    productSizes: any;
    productData: any;
    isMultipleSizesSelected: boolean;
    removeSizeVariantHandler: (size: string | undefined) => void;
}

export default forwardRef(function AddSizes(
    { form, size, removeSizeVariantHandler, isLoading, productData }: AddSizesTypes,
    ref
) {
    const {
        variation,
        selectedSize,
        removeBoxHandler,
        addBoxClickHandler,
        clickImageHandler,
        removeImageHandler,
        AddNewColorHandler,
        modalRefDeleteSize,
        colorChangeHandler,
        modalRefColorPicker,
        modalRefAddNewVariant,
        deleteModalOpenHandler,
        selectedColorAndQuantity,
        updateSizesColorsHandler,
        uploadProductImageHandler,
        modalRefProductImageUpload,
        addColorVariantModalFinishHandler
    } = useAddSizesContainer({ form, ref, productData });

    return (
        <>
            <div>
                <RoundedContainer className="mt-5">
                    <VariantHeader
                        selectedSize={size}
                        handleVariantRemove={deleteModalOpenHandler}
                        isLoading={isLoading}
                    />
                    <VariantFormFields selectedSize={size} isLoading={isLoading} />
                    <BoxSizesAndWight
                        selectedSize={size}
                        boxes={variation?.boxes}
                        removeBoxHandler={removeBoxHandler}
                        addBoxClickHandler={addBoxClickHandler}
                    />
                    <div>
                        <p className="font-[400] text-sm text-dark-main mt-5">Colors</p>
                        {variation?.colorVariants.map((colorVariant: colorVariantTypes) => (
                            <div key={colorVariant?.id}>
                                <CustomErrorWrapper
                                    hasError={!colorVariant?.imageIdsData?.length}
                                    error={IMAGE_VALIDATION_ERROR}
                                >
                                    <div className="flex ">
                                        <VariantColorBox
                                            isLoading={isLoading}
                                            variantId={variation?.id}
                                            quantity={colorVariant.quantity}
                                            variantColorId={colorVariant?.id}
                                            colorChangeHandler={colorChangeHandler}
                                            variantBackgroundColor={colorVariant.color}
                                            imagesLength={variation?.imageIdsData?.length}
                                        />
                                        <UploadedImagesWithDeleteIcon
                                            isLoading={isLoading}
                                            colorVariant={colorVariant}
                                            clickImageHandler={clickImageHandler}
                                            removeImageHandler={removeImageHandler}
                                        />
                                    </div>
                                </CustomErrorWrapper>
                            </div>
                        ))}
                        {variation?.colorVariants.length < 5 ? (
                            <AddNewColorButton
                                isLoading={isLoading}
                                variantId={variation?.id}
                                AddNewColorHandler={AddNewColorHandler}
                            />
                        ) : null}
                    </div>
                </RoundedContainer>
            </div>

            <CustomModal destroyOnClose ref={modalRefColorPicker}>
                <ColorPickerModal
                    selectedColorAndQuantity={selectedColorAndQuantity}
                    onFinish={(values: any) => updateSizesColorsHandler(values)}
                />
            </CustomModal>
            <CustomModal
                destroyOnClose
                ref={modalRefAddNewVariant}
                bodyClass="py-0 px-2"
                width={500}
            >
                <AddNewColorVariantModal
                    onFinish={(values: any) => addColorVariantModalFinishHandler(values)}
                    existingColors={variation?.colorVariants?.map(
                        (variant: colorVariantTypes) => variant.color
                    )}
                />
            </CustomModal>
            <CustomModal
                destroyOnClose
                ref={modalRefProductImageUpload}
                bodyClass="py-0 px-2"
                width={500}
            >
                <UploadProductImageModal
                    onFinish={(values: any) => {
                        uploadProductImageHandler(values);
                    }}
                />
            </CustomModal>
            <CustomModal ref={modalRefDeleteSize}>
                <DeleteModal
                    selectedSize={selectedSize}
                    heading={"Delete Size Variation"}
                    confirmationSuccessHandler={removeSizeVariantHandler}
                    mainContent={"Are you sure you want to delete this size variation?"}
                    confirmationFailureHandler={() => modalRefDeleteSize.current?.closeModal()}
                />
            </CustomModal>
        </>
    );
});
