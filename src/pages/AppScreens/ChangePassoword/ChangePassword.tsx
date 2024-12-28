import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import { VALIDATE } from "@Constants/validationConstants";
import useChangePasswordContainer from "./ChangePasswordContainer";

const ChangePassword = () => {
    const { form, handleFinish, isChangingPassword } = useChangePasswordContainer();

    return (
        <RoundedContainer className="">
            <h1 className="font-[500] text-xxl border-bottom pb-4  ">Change Password</h1>
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={{ isRemember: false, email: null, password: null }}
                className="mt-4"
            >
                <Form.Item name="password" rules={VALIDATE.PASSWORD as never}>
                    <Input isPassword label="Old Password" placeholder="Enter old password" />
                </Form.Item>
                <Form.Item name="newPassword" rules={VALIDATE.PASSWORD_PATTERN as never}>
                    <Input isPassword label="New Password" placeholder="Enter new password" />
                </Form.Item>
                <Form.Item
                    name="confirmNewPassword"
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
                    <Flex justify="flex-end">
                        <CustomButton
                            title={"Update"}
                            className="text-base  w-auto px-12"
                            isLoading={isChangingPassword}
                        />
                    </Flex>
                </Form.Item>
            </Form>
        </RoundedContainer>
    );
};

export default ChangePassword;
