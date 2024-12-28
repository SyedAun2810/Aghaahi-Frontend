import { Form } from "antd";

import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import { validationsForNumbers } from "../../utils";
import { SelectInput } from "@Components/SelectInput";
import { PROCESSING_CATEGORY_STATUS_OPTIONS } from "@Constants/app";

interface VariantFormFieldsTypes {
    selectedSize: string;
    isLoading: boolean;
}
export default function VariantFormFields({ selectedSize, isLoading }: VariantFormFieldsTypes) {
    return (
        <>
            <p className="font-[400] text-sm text-dark-main mt-3">Product Information</p>

            <div className="grid gap-x-0 sm:gap-x-4   grid-cols-1  sm:grid-cols-2 lg:grid-cols-6  mt-4">
                <div>
                    <Form.Item
                        name={`processingCategory-${selectedSize}`}
                        rules={[...VALIDATE.Product.PROCESSING_CATEGORY]}
                    >
                        <SelectInput
                            options={PROCESSING_CATEGORY_STATUS_OPTIONS}
                            placeholder="Processing Category"
                            className="h-[55.5px] w-full 2xl:w-full select-input-con-theme"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name={`weight-${selectedSize}`}
                        rules={[
                            ...VALIDATE.Product.WEIGHT,
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    return validationsForNumbers(value, 70, 0, "Weight");
                                }
                            })
                        ]}
                    >
                        <Input label="Weight (lb)" placeholder="00lb" disabled={isLoading} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name={`price-${selectedSize}`}
                        rules={[
                            ...VALIDATE.Product.PRICE,
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
                        <Input label="Price" placeholder="$00.00" disabled={isLoading} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name={`length-${selectedSize}`}
                        rules={[
                            ...VALIDATE.Product.LENGTH,
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
                            disabled={isLoading}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name={`width-${selectedSize}`}
                        rules={[
                            ...VALIDATE.Product.WIDTH,
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
                            disabled={isLoading}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name={`height-${selectedSize}`}
                        rules={[
                            ...VALIDATE.Product.HEIGHT,
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
                            disabled={isLoading}
                        />
                    </Form.Item>
                </div>
            </div>
        </>
    );
}
