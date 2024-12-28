import React, { useMemo, useState } from "react";
import { ColorPicker, ColorPickerProps, Flex, Form, GetProp } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { UpdateColorVariationType } from "@Pages/AppScreens/ProductManagement/ProductTypes";

type AddProductCategoryType = {
    onFinish: (values: any) => void;
    selectedColorAndQuantity: UpdateColorVariationType;
};

type Color = GetProp<ColorPickerProps, "value">;

const ColorPickerModal = ({ onFinish, selectedColorAndQuantity }: AddProductCategoryType) => {
    const [form] = Form.useForm();
    const [newColor, setNewColor] = useState<Color>(selectedColorAndQuantity?.color);

    const bgColor = useMemo<string>(
        () => (typeof newColor === "string" ? newColor : newColor.toHexString()),
        [newColor]
    );

    const btnStyle: React.CSSProperties = {
        backgroundColor: bgColor
    };

    const handleFinish = (values: any) => {
        onFinish({ color: bgColor, quantity: values.quantity });
        setTimeout(() => {
            setNewColor(bgColor || "#FC9F14");
        }, 500);
    };

    const initialValues = {
        quantity: selectedColorAndQuantity?.quantity
    };

    return (
        <Form form={form} initialValues={initialValues} onFinish={handleFinish}>
            <div className="flex flex-col justify-center w-full">
                <div className=" mb-2 ">
                    <h1 className="text-center font-[400] text-heading text-#202224 mb-2">
                        Kindly select the color
                    </h1>

                    <ColorPicker value={newColor} onChange={setNewColor}>
                        <div
                            className={`border w-[100px] h-[100px] cursor-pointer mx-auto block border-light-border border-solid`}
                            style={btnStyle}
                        ></div>
                    </ColorPicker>
                    <Form.Item
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: "Stock Quantity is required"
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
                        className="mt-8 w-[90%] mx-auto"
                    >
                        <Input label="Stock Quantity" placeholder="Enter available quantity" />
                    </Form.Item>
                    <Flex justify="center" className="mt-5">
                        <CustomButton className="w-[90%]" title="Update" htmlType="submit" />
                    </Flex>
                </div>
            </div>
        </Form>
    );
};

export default ColorPickerModal;
