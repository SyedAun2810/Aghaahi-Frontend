import { Checkbox, Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import ColoredText from "@Components/ColorText/ColorText";
import useResetPasswordContainer from "./ResetPasswordContainer";

const ResetPassword = () => {
    const { form, handleSubmit, handleLogin, isResettingPassword } = useResetPasswordContainer();

    return (
        <Flex vertical justify="center" className="px-20 h-screen">
            <AuthHeader
                headerTitle="Enter New Password"
                subTitle="Enter your new password, re-verify by clicking on the eye icon and hit Update"
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ isRemember: false, email: null, password: null }}
            >
                <Form.Item name="newPassword" rules={VALIDATE.PASSWORD_PATTERN as never}>
                    <Input isPassword label="New Password" placeholder="Enter new password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={VALIDATE.CONFIRM_PASSWORD as never}
                    dependencies={["newPassword"]}
                >
                    <Input
                        isPassword
                        label="Confirm Password"
                        placeholder="Enter confirm password"
                    />
                </Form.Item>
                <Form.Item className="text-center mt-8">
                    <CustomButton
                        title={"Update Password"}
                        className="text-base  w-[90%]"
                        isLoading={isResettingPassword}
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
export default ResetPassword;
