import { Checkbox, Flex, Form } from "antd";

import useLoginContainer from "./LoginContainer";
import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import ColoredText from "@Components/ColorText/ColorText";
import AuthHeader from "@Components/AuthHeader/AuthHeader";

const Login = () => {
    const { form, handleSubmit, handleSignUp, handleForgotPassword, isLoggingIn } =
        useLoginContainer();

    return (
        <Flex vertical justify="center" className="px-20 h-screen">
            <AuthHeader
                headerTitle="Login to Aghaahi Account"
                subTitle="Please enter your email and password to continue"
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ isRemember: false, email: null, password: null }}
            >
                <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                    <Input label="Email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="password" rules={VALIDATE.PASSWORD as never}>
                    <Input isPassword label="Password" placeholder="Enter your password" />
                </Form.Item>
                <Flex align="center" justify="space-between" className="mt-4 mb-6">
                    <Flex align="center">
                        <Checkbox className="mx-2" />
                        <p>Remember Password</p>
                    </Flex>
                    <p
                        className={`text-[#1E1E1E] underline cursor-pointer ${
                            isLoggingIn && "pointer-events-none"
                        }`}
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </p>
                </Flex>
                <Form.Item className="text-center ">
                    <CustomButton
                        title={"Login"}
                        className="text-base w-[90%]"
                        disabled={isLoggingIn}
                        isLoading={isLoggingIn}
                    />
                </Form.Item>
            </Form>

            <Flex justify="center" align="center">
                <p className=" font-[400] text-large mr-1">Don't have a account?</p>
                <ColoredText
                    text={"Create Account"}
                    onClick={handleSignUp}
                    className="underline cursor-pointer"
                />
            </Flex>
        </Flex>
    );
};
export default Login;
