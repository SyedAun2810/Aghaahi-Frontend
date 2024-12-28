import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Flex, Form } from "antd";

import useAddProductFormContainer from "./AddProductFormContainer";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import TextAreaInput from "@Components/TextAreaInput/TextInputArea";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import DragImageUploader from "@Components/DragImageUploader/DragImageUploader";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import TextInputWithCheckBoxes from "@Components/TextInput/TextInputWithCheckBoxes";

import { VALIDATE } from "@Constants/validationConstants";

import BackIcon from "@Assets/icons/backIcon.svg";
import { CategoryAndSubCategoryType } from "../../ProductTypes";
import CustomErrorWrapper from "@Components/CustomErrorWrapper/CustomErrorWrapper";
import { validationsForNumbers } from "../../utils";
import { SelectInput } from "@Components/SelectInput";
import { PROCESSING_CATEGORY_STATUS_OPTIONS } from "@Constants/app";
import BoxSizesAndWight from "../BoxSizesAndWeight/BoxSizesAndWight";

const PRODUCT_IMAGE_VALIDATION = "Product image is required";

interface AppProductFormTypes {
    form: any;
    productBoxes: any;
    images: any;
    isLoading: boolean;
    isMultipleSizesSelected: boolean;
    singleProductImageError: boolean;
    multipleSizesToggler: () => void;
    productCategories: CategoryAndSubCategoryType | null;
}

export default forwardRef(function AddProductForm(
    {
        form,
        productBoxes,
        images,
        isLoading,
        productCategories,
        multipleSizesToggler,
        singleProductImageError,
        isMultipleSizesSelected
    }: AppProductFormTypes,
    ref
) {
    const { id } = useParams();
    const {
        imageFile,
        handleImageUpload,
        goBackClickHandler,
        parentCategories,
        subCategories,
        handleCategoryChange,
        boxes,
        addBoxClickHandler,
        removeBoxHandler
    } = useAddProductFormContainer({
        ref,
        form,
        images,
        productBoxes,
        productCategories
    });
    return (
        <>
            <RoundedContainer>
                <Flex
                    align="center"
                    gap={"middle"}
                    justify="space-between"
                    className="border-bottom pb-6"
                >
                    <Flex align="center" gap={"middle"}>
                        <BackIcon
                            className={`
                                ${
                                    !isLoading ? "cursor-pointer" : "cursor-not-allowed"
                                } cursor-pointer mt-[3px]`}
                            onClick={isLoading ? () => {} : goBackClickHandler}
                        />
                        <h1 className="font-[500] text-xxl text-dark-main">
                            {id ? "Edit Product" : "Add Product"}{" "}
                        </h1>
                    </Flex>
                </Flex>

                <div className="grid gap-x-0 sm:gap-x-4   grid-cols-1 sm:grid-cols-2  pt-4">
                    <div>
                        <Form.Item
                            name="sku"
                            rules={[
                                ...VALIDATE.Product.SKU,
                                { max: 50, message: "SKU must be up to 50 characters." }
                            ]}
                        >
                            <Input
                                label="SKU #"
                                disabled={isLoading}
                                placeholder="Enter SKU Number"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="name"
                            rules={[
                                ...VALIDATE.Product.PRODUCT_TITLE,
                                { max: 50, message: "Title must be up to 50 characters." }
                            ]}
                        >
                            <Input
                                disabled={isLoading}
                                label="Product Title"
                                placeholder="Enter Product Title"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="parentCategoryIds"
                            rules={VALIDATE.Product.CATEGORY as never}
                        >
                            <CustomSelectInput
                                label="Category"
                                disabled={isLoading}
                                placeholder="Select Category"
                                options={parentCategories}
                                // mode="multiple"
                                allowClear
                                onChange={handleCategoryChange}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="categoryIds"
                            rules={VALIDATE.Product.SUB_CATEGORY as never}
                        >
                            <CustomSelectInput
                                label="Sub Category"
                                disabled={isLoading}
                                placeholder="Select Category"
                                options={subCategories}
                                // mode="multiple"
                                allowClear
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="quantity"
                            rules={[
                                {
                                    required: !isMultipleSizesSelected,
                                    message: "Quantity is required"
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (value < 0) {
                                            return Promise.reject("Quantity can't be less than 0."); // The validator should always return a promise on both success and error
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                })
                            ]}
                        >
                            <Input
                                type={"number"}
                                disabled={isMultipleSizesSelected || isLoading}
                                label="Available Stock"
                                placeholder="Enter stock quantity"
                                // min={0}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="tags"
                            rules={[
                                ...VALIDATE.Product.TAGS,
                                { max: 100, message: "Tags must be up to 100 characters." }
                            ]}
                        >
                            <Input
                                disabled={isLoading}
                                label="Tags (enter comma separated values)"
                                placeholder="Add Tags"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div>
                    <Form.Item
                        name="about"
                        rules={[
                            ...VALIDATE.Product.DESCRIPTION,
                            { max: 1000, message: "Description must be up to 1000 characters." }
                        ]}
                    >
                        <TextAreaInput
                            disabled={isLoading}
                            label="Description"
                            placeholder="Enter Description"
                            rows={6}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="processingCategory"
                        rules={[
                            {
                                required: !isMultipleSizesSelected,
                                message: "Processing Category is required"
                            }
                        ]}
                    >
                        <SelectInput
                            options={PROCESSING_CATEGORY_STATUS_OPTIONS}
                            placeholder="Processing Category"
                            className="h-[55.5px] w-full 2xl:w-full select-input-con-theme"
                        />
                    </Form.Item>
                </div>
                <div className="grid gap-x-0 sm:gap-x-4   grid-cols-1 sm:grid-cols-2  ">
                    <div>
                        <Form.Item
                            name="weight"
                            rules={[
                                {
                                    required: !isMultipleSizesSelected,
                                    message: "Weight is required"
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        return validationsForNumbers(value, 70, 0, "Weight");
                                    }
                                })
                            ]}
                        >
                            <Input
                                label="Weight (lb)"
                                type={"number"}
                                placeholder="00lb"
                                disabled={isMultipleSizesSelected || isLoading}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex  justify-between">
                        <div className="w-[32%]">
                            <Form.Item
                                name="length"
                                rules={[
                                    {
                                        required: !isMultipleSizesSelected,
                                        message: "Length is required"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            return validationsForNumbers(value, 999, 0, "Length");
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    label="Length (Inches)"
                                    type={"number"}
                                    placeholder="---"
                                    disabled={isMultipleSizesSelected || isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div className="w-[32%]">
                            <Form.Item
                                name="width"
                                rules={[
                                    {
                                        required: !isMultipleSizesSelected,
                                        message: "Width is required"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            return validationsForNumbers(value, 999, 0, "Width");
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    label="Width (Inches)"
                                    type={"number"}
                                    placeholder="---"
                                    disabled={isMultipleSizesSelected || isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div className="w-[32%]">
                            <Form.Item
                                name="height"
                                rules={[
                                    {
                                        required: !isMultipleSizesSelected,
                                        message: "Height is required"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            return validationsForNumbers(value, 999, 0, "Height");
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    label="Height (Inches)"
                                    type={"number"}
                                    placeholder="---"
                                    disabled={isMultipleSizesSelected || isLoading}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: !isMultipleSizesSelected,
                                    message: "Price is required"
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (value && value < 1) {
                                            return Promise.reject(`Price can't be less than 1.`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                })
                            ]}
                        >
                            <Input
                                label="Price"
                                type={"number"}
                                placeholder="$00.00"
                                disabled={isMultipleSizesSelected || isLoading}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="variations">
                            <TextInputWithCheckBoxes
                                disabled
                                label="Variations"
                                placeholder="Do you want to include sizes/variations?"
                                isYesChecked={isMultipleSizesSelected}
                                handleVariationClick={isLoading ? () => {} : multipleSizesToggler}
                                areCheckBoxDisabled={isLoading}
                            />
                        </Form.Item>
                    </div>
                </div>
                {!isMultipleSizesSelected ? (
                    <BoxSizesAndWight
                        boxes={boxes}
                        hasSizeVariation={isMultipleSizesSelected}
                        addBoxClickHandler={addBoxClickHandler}
                        removeBoxHandler={removeBoxHandler}
                    />
                ) : null}
                <div>
                    {!isMultipleSizesSelected ? (
                        <>
                            <CustomErrorWrapper
                                error={PRODUCT_IMAGE_VALIDATION}
                                hasError={
                                    singleProductImageError
                                        ? !(imageFile && Object.keys(imageFile)?.length)
                                        : singleProductImageError
                                }
                            >
                                <DragImageUploader
                                    isMulti
                                    imageWidth={431}
                                    imageHeight={334}
                                    maxImageUpload={4}
                                    disabled={isLoading}
                                    imageFile={imageFile}
                                    imageCaption={"Upload Banner"}
                                    handleImageUpload={handleImageUpload}
                                    imageInfoMsg={"Product image should be 320px by 250px"}
                                />
                            </CustomErrorWrapper>
                            <div className="mt-2    ">
                                <CustomButton
                                    htmlType={"submit"}
                                    title={id ? "Update Product" : "Add Product"}
                                    className="text-base w-[30%] mb-0 "
                                    isLoading={isLoading}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
            </RoundedContainer>
        </>
    );
});
