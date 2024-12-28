import { ColorPicker, ColorPickerProps, Flex, Form, GetProp } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import React, { useMemo, useState } from "react";
import DragImageUploader from "@Components/DragImageUploader/DragImageUploader";
import { imageValidations } from "@Services/fileUploadService";
import CustomErrorWrapper from "@Components/CustomErrorWrapper/CustomErrorWrapper";

const IMAGE_VALIDATION_ERROR = "Kindly upload image";
const COLOR_VALIDATION_ERROR = "Kindly select a different color";
type AddNewColorVariantType = {
    onFinish: (values: any) => void;
    existingColors: string[];
};
type Color = GetProp<ColorPickerProps, "value">;
type Format = GetProp<ColorPickerProps, "format">;
const AddNewColorVariantModal = ({ onFinish, existingColors }: AddNewColorVariantType) => {
    const [form] = Form.useForm();
    const [newColor, setNewColor] = useState<Color>("#FC9F14");
    const [imageFile, setImageFile] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [colorError, setColorError] = useState(false);

    const bgColor = useMemo<string>(
        () => (typeof newColor === "string" ? newColor : newColor.toHexString()),
        [newColor]
    );
    const btnStyle: React.CSSProperties = {
        backgroundColor: bgColor
    };
    const handleFinish = (values: any) => {
        const isSimilarColor = existingColors.includes(bgColor.toUpperCase());
        if (!imageFile || isSimilarColor) {
            isSimilarColor && setColorError(true);
            !imageFile && setImageError(true);
            return;
        }
        onFinish({ color: bgColor, image: imageFile });
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
        if (imageError) setImageError(false);
    };

    const handleColorChange = (color) => {
        setNewColor(color);
        if (colorError) setColorError(false);
    };

    return (
        <Form form={form} onFinish={handleFinish}>
            <div className="flex flex-col justify-center w-full">
                <div className="text-left mb-2 ">
                    <h1 className="font-[600] text-base text-dark-main text-left mb-2">
                        Kindly select the product color
                    </h1>
                    <CustomErrorWrapper hasError={colorError} error={COLOR_VALIDATION_ERROR}>
                        <ColorPicker value={newColor} onChange={handleColorChange}>
                            <div
                                className={`border w-[100px] h-[100px] cursor-pointer mx-auto block border-light-border border-solid`}
                                style={btnStyle}
                            ></div>
                        </ColorPicker>
                    </CustomErrorWrapper>
                    <p className="font-[600] text-base text-dark-main mb-2 mt-5 text-left">
                        Product Image
                    </p>
                    <CustomErrorWrapper hasError={imageError} error={IMAGE_VALIDATION_ERROR}>
                        <DragImageUploader
                            handleImageUpload={handleImageUpload}
                            imageFile={imageFile}
                            imageCaption={"Upload Image"}
                            isMulti
                            containerClasses=" w-[431px] h-[334px]"
                            imageHeight={334}
                            imageWidth={431}
                            maxImageUpload={4}
                        />
                    </CustomErrorWrapper>

                    <Flex justify="center" className="mt-8">
                        <CustomButton className="w-[90%]" title="Create" htmlType="submit" />
                    </Flex>
                </div>
            </div>
        </Form>
    );
};

export default AddNewColorVariantModal;
