import { Checkbox, Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import ColoredText from "@Components/ColorText/ColorText";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import useForgotPasswordContainer from "./ForgotPasswordContainer";

const ForgotPassword = () => {
    const { form, handleSubmit, handleLogin, isLoading } = useForgotPasswordContainer();

    return (
        <Flex vertical justify="center" className="px-20 h-screen">
            <AuthHeader
                headerTitle="Forgot Password"
                subTitle="Enter your registered email address to get the One Time Password (OTP)"
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ isRemember: false, email: null, password: null }}
            >
                <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                    <Input label="Email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item className="mt-8 text-center">
                    <CustomButton
                        title={"Verify & Send OTP"}
                        className="text-base w-[90%]"
                        isLoading={isLoading}
                    />
                </Form.Item>
            </Form>
            <ColoredText
                text={"Go back to login"}
                onClick={handleLogin}
                className="underline cursor-pointer"
            />
        </Flex>
    );
};
export default ForgotPassword;
