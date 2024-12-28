import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";

type RequestModalType = {
    onFinish: (values: any) => void;
};

const ChangeAccountDetails = ({ onFinish }: RequestModalType) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onFinish(values);
        form.resetFields();
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-8 ">
                <h1 className="font-[400] text-heading text-#202224 ">Account</h1>
            </div>
            <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                <Form.Item name="accountTitle" rules={VALIDATE.ACCOUNT_TITLE as never}>
                    <Input label="Account Title" placeholder="Enter account title" />
                </Form.Item>
                <Form.Item name="bankName" rules={VALIDATE.BANK_NAME as never}>
                    <Input label="Bank Name" placeholder="Enter bank name" />
                </Form.Item>
                <Form.Item name="accountNumber" rules={VALIDATE.ACCOUNT_NUMBER as never}>
                    <Input label="Account Number" placeholder="Enter account number" />
                </Form.Item>
                <Form.Item name="iban" rules={VALIDATE.IBAN as never}>
                    <Input label="IBAN" placeholder="Enter iban number" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="center" className="mt-4">
                        <CustomButton className="w-[90%]" title="Update" htmlType="submit" />
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangeAccountDetails;
