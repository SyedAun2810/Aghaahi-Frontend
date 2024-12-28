import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import usePaymentDetailsAccess from "./usePaymentDetailsAccess";

export type RequestModalType = {
    onFinish: () => void;
};

const PaymentDetailsAccess = ({ onFinish }: RequestModalType) => {
    const { form, handleFinish, isPasswordVerifying } = usePaymentDetailsAccess({ onFinish });
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-16 ">
                <h1 className="font-[400] text-heading text-#202224 mb-2">Password Protected</h1>
                <p className="font-[400] text-large text-#202224">
                    Enter your password to access the bank details
                </p>
            </div>
            <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                <Form.Item name="password" rules={VALIDATE.PASSWORD as never}>
                    <Input label="Password" isPassword placeholder="Enter your password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="center" className="mt-8">
                        <CustomButton
                            className="w-[90%]"
                            title="Send Request"
                            htmlType="submit"
                            isLoading={isPasswordVerifying}
                        />
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PaymentDetailsAccess;
