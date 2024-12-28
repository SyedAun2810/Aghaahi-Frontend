import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";

type AddProductCategoryType = {
    onFinish: (values: any) => void;
    sizeNumber: number;
};

const AddProductCategoryModal = ({ onFinish, sizeNumber }: AddProductCategoryType) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onFinish(values);
        form.resetFields();
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-16 ">
                <h1 className="font-[400] text-heading text-#202224 mb-2">Enter Product Size</h1>
                <p className="font-[400] text-large text-#202224">
                    Enter the size variation you want to create.
                    <br /> E.g.(Small, Medium, Large)
                </p>
            </div>
            <Form form={form} onFinish={handleFinish} initialValues={{ size: "" }}>
                <Form.Item name="size" rules={VALIDATE.Product.SIZE as never}>
                    <Input label={`Product Size ${sizeNumber + 1}`} placeholder="e.g. Medium" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="center" className="mt-8">
                        <CustomButton className="w-[90%]" title="Create" htmlType="submit" />
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProductCategoryModal;
