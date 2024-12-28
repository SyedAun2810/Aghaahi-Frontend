import { Form, Image } from "antd";

import Input from "@Components/TextInput/TextInput";
import { calculateBoxLength, validationsForNumbers } from "../../utils";
import { BoxesDataTypes } from "../../ProductTypes";
import { VALIDATE } from "@Constants/validationConstants";

import AddImageIcon from "@Assets/icons/addImageIcon.png";

export default function BoxSizesAndWight({
    boxes = [],
    selectedSize,
    addBoxClickHandler,
    removeBoxHandler,
    hasSizeVariation
}: {
    selectedSize?: string;
    boxes: BoxesDataTypes;
    hasSizeVariation?: boolean;
    addBoxClickHandler: () => void;
    removeBoxHandler: (idx: number) => void;
}) {
    return (
        <>
            <p className="font-[400] text-sm text-dark-main mt-3">Box Sizes</p>
            {boxes?.map((el, index) =>
                el !== null ? (
                    <div
                        className="grid gap-x-0 sm:gap-x-4   grid-cols-1  sm:grid-cols-2 lg:grid-cols-5  my-4"
                        key={index}
                    >
                        <div>
                            <Form.Item
                                name={
                                    selectedSize
                                        ? `length-${selectedSize}-${index}`
                                        : `length-${index}`
                                }
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
                                    // disabled={isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name={
                                    selectedSize
                                        ? `width-${selectedSize}-${index}`
                                        : `width-${index}`
                                }
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
                                    // disabled={isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name={
                                    selectedSize
                                        ? `height-${selectedSize}-${index}`
                                        : `height-${index}`
                                }
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
                                    // disabled={isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name={
                                    selectedSize
                                        ? `quantity-${selectedSize}-${index}`
                                        : `quantity-${index}`
                                }
                                rules={[
                                    ...VALIDATE.Product.QUANTITY,
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            return validationsForNumbers(value, 999, 0, "Quantity");
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    label="Quantity"
                                    type={"number"}
                                    placeholder="---"
                                    // disabled={isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div className="h-[55.5px] flex items-center">
                            <p
                                onClick={() => removeBoxHandler(index)}
                                className=" cursor-pointer underline"
                            >
                                Remove
                            </p>
                        </div>
                    </div>
                ) : null
            )}
            {calculateBoxLength(boxes) <= 2 ? (
                <div className="mr-4  my-3">
                    <Image
                        preview={false}
                        alt={"add icon"}
                        src={AddImageIcon}
                        className={"cursor-pointer"}
                        onClick={!hasSizeVariation ? addBoxClickHandler : () => {}}
                    />
                </div>
            ) : null}
        </>
    );
}
