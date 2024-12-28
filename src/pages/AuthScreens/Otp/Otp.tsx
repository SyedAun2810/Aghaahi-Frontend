import { Flex, Form } from "antd";

import useOtpContainer from "./OtpContainer";
import { CustomButton } from "@Components/Button";
import OTPInput from "@Components/OtpInput/OtpInput";
import OtpTimer from "@Components/OtpTimer/OtpTimer";
import AuthHeader from "@Components/AuthHeader/AuthHeader";

const Otp = () => {
    const {
        form,
        email,
        handleSubmit,
        otp,
        setOTP,
        fromScreen,
        validateOTP,
        isLoadingResetPassOtp,
        isVerifyingUser
    } = useOtpContainer();

    return (
        <Flex vertical justify="center" className="px-20 h-screen">
            <AuthHeader
                headerTitle="Verify OTP"
                subTitle="Enter the OTP below you have received on your email"
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ isRemember: false, email: null, password: null }}
            >
                <Form.Item
                    className="text-center"
                    name={"otp"}
                    rules={[{ validator: validateOTP }]}
                >
                    <OTPInput
                        length={4}
                        otp={otp}
                        setOTP={(otp) => {
                            setOTP(otp);
                            form.validateFields(["otp"]);
                        }}
                    />
                </Form.Item>
                <Form.Item className="text-center mt-8">
                    <CustomButton
                        title={"Verify OTP"}
                        className="text-base w-[90%]"
                        isLoading={isLoadingResetPassOtp || isVerifyingUser}
                    />
                </Form.Item>
            </Form>
            <OtpTimer email={email} fromScreen={fromScreen} />
        </Flex>
    );
};
export default Otp;
