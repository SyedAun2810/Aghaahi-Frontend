import { useState } from "react";
import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import DragImageUploader from "@Components/DragImageUploader/DragImageUploader";
import { SubscriptionCardProps } from "@Components/SubscriptionCard/SubscriptionCard";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import { imageValidations } from "@Services/fileUploadService";

type RequestModalType = {
    onFinish: (values: any) => void;
    data: SubscriptionCardProps;
};

const ProductAdvertisementModal = ({ onFinish, data }: RequestModalType) => {
    const [form] = Form.useForm();
    const { title, subTitle, duration, amount, isProductAdvertisement = false } = data;
    const [imageFile, setImageFile] = useState(null);

    const handleFinish = (values: any) => {
        onFinish({ ...values, image: imageFile });
        form.resetFields();
        setImageFile(null);
    };

    const handleImageUpload = (file: any) => {
        if (imageValidations(file)) setImageFile(file);
    };
    return (
        <div className="flex flex-col justify-center w-full ">
            <div className="text-center mb-4 ">
                <h1 className="font-[400] text-heading text-#202224 mb-2">{title}</h1>
                <p className="font-[400] text-large text-#202224">{subTitle}</p>
                <p className="text-xs font-[600] text-dark-main mt-4">
                    Duration: <span className="text-xs text-light-text">{duration}</span>
                </p>
                <p className="text-heading text-dark-main font-[600]">{amount}</p>
            </div>
            <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                <Form.Item name="image">
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
                    <Form.Item name="product">
                        <CustomSelectInput label="Product Name" placeholder="Select product" />
                    </Form.Item>
                )}
                <Form.Item>
                    <Flex justify="center" className="">
                        <CustomButton className="w-[90%] mb-0" title="Request" htmlType="submit" />
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAdvertisementModal;
