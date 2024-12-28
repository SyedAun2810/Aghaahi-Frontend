import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import { customizePlanData } from "../RequestBanner";
import { PlanTypeTypes } from "../RequestBannerContainer";
import usePurchasePlanContainer from "./usePurchasePlanContainer";
import AutoCompleteCustom from "@Components/AutoComplete/AutoCompleteCustom";
import DragImageUploader from "@Components/DragImageUploader/DragImageUploader";

type PurchasePlanModalType = {
    data: PlanTypeTypes;
    isPurchasing: boolean;
    onFinish: (values: any) => void;
};

const PurchasePlanModal = ({ onFinish, data, isPurchasing }: PurchasePlanModalType) => {
    const isProductAdvertisement = data?.type === 0;
    const {
        form,
        imageFile,
        handleFinish,
        updateProduct,
        productOptions,
        handleImageUpload,
        productDropDownData
    } = usePurchasePlanContainer(onFinish, isProductAdvertisement);
    return (
        <>
            <div className="flex flex-col justify-center w-full ">
                <div className="text-center mb-4 ">
                    <h1 className="font-[400] text-heading text-#202224 mb-2">
                        {customizePlanData(data)?.title}
                    </h1>
                    <p className="font-[400] text-large text-#202224">
                        {customizePlanData(data)?.subTitle}
                    </p>
                    <p className="text-xs font-[600] text-dark-main mt-4">
                        Duration:{" "}
                        <span className="text-xs text-light-text">
                            {customizePlanData(data)?.duration}
                        </span>
                    </p>
                    <p className="text-heading text-dark-main font-[600]">
                        {customizePlanData(data)?.amount}
                    </p>
                </div>
                <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                    <Form.Item
                        name="image"
                        rules={[
                            {
                                required: !imageFile,
                                message: "Image is required"
                            }
                        ]}
                    >
                        <DragImageUploader
                            handleImageUpload={handleImageUpload}
                            imageFile={imageFile}
                            imageCaption={"Upload Banner"}
                            imageInfoMsg={"Banner image should be 320px by 250px"}
                            imageHeight={334}
                            imageWidth={431}
                            maxImageUpload={4}
                        />
                    </Form.Item>
                    {isProductAdvertisement && (
                        <Form.Item
                            name="product"
                            rules={[
                                {
                                    required: isProductAdvertisement,
                                    message: "Please select a product"
                                }
                            ]}
                        >
                            <AutoCompleteCustom
                                showSearch
                                allowClear
                                placeholder="Product"
                                onSelect={(value, option) => updateProduct(option, false)}
                                options={productOptions}
                                className="ml-0 w-full 2xl:w-full "
                                onSearch={(value: string) => updateProduct(value, true)}
                                value={productDropDownData?.inputField}
                            />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Flex justify="center" className="">
                            <CustomButton
                                className="w-[90%] mb-0"
                                title="Request"
                                isLoading={isPurchasing}
                            />
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default PurchasePlanModal;
