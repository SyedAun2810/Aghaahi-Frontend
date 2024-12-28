import { useState } from "react";
import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import { imageValidations } from "@Services/fileUploadService";
import DragImageUploader from "@Components/DragImageUploader/DragImageUploader";
import Input from "@Components/TextInput/TextInput";

type UploadProductImageType = {
    onFinish: (values: any) => void;
};

const UploadProductImageModal = ({ onFinish }: UploadProductImageType) => {
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);

    const handleFinish = (values: any) => {
        onFinish({ ...values, image: imageFile });
    };
    const handleImageUpload = (file: any) => {
        let tempImageFile = {};
        let isValid = true;
        Object.keys(file).every((singleFile) => {
            if (!imageValidations(file[singleFile])) {
                isValid = false;
                return false;
            }
        });

        if (isValid) {
            Object.keys(file).forEach((singleFile) => {
                tempImageFile[singleFile] = file[singleFile];
            });
            setImageFile(tempImageFile);
        }
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center  ">
                <h1 className="font-[600] text-base text-#202224 mb-2">Product Image</h1>

                <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                    <Form.Item name="image">
                        <DragImageUploader
                            handleImageUpload={handleImageUpload}
                            imageFile={imageFile}
                            isMulti={true}
                            imageCaption={"Upload Image"}
                            containerClasses=" w-[431px] h-[334px]"
                            imageHeight={334}
                            imageWidth={431}
                            maxImageUpload={4}
                        />
                    </Form.Item>
                    {/* {selectedColorImagesSize === 0 ? (
                        <Form.Item
                            name="quantity"
                            rules={[
                                {
                                    required: selectedColorImagesSize === 0,
                                    message: "Stock Quantity is required"
                                }
                            ]}
                            className="mt-5 text-left"
                        >
                            <Input label="Stock Quantity" placeholder="Enter available quantity" />
                        </Form.Item>
                    ) : null} */}

                    <Form.Item noStyle>
                        <Flex justify="center" className="">
                            <CustomButton
                                className="w-full mb-0 mt-0"
                                title="Add"
                                htmlType="submit"
                            />
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UploadProductImageModal;
