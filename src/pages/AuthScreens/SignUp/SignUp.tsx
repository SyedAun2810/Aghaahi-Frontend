import { Flex, Form } from "antd";
import utilService from "@Utils/utils.service";
import { CustomButton } from "@Components/Button";
import useSignUpContainer from "./SignUpContainer";
import Input from "@Components/TextInput/TextInput";
import ColoredText from "@Components/ColorText/ColorText";
import { VALIDATE } from "@Constants/validationConstants";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";

export const MAP_OPTIONS = {
    types: ["address"],
    componentRestrictions: { country: "US" }
};

const GENDER_OPTIONS = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    },
    {
        label: "Other",
        value: "other",
    },
];

const LANGUAGE_OPTIONS = [
    {
        label: "English",
        value: "en",
    },
    {
        label: "Spanish",
        value: "es",
    },
    // Add more languages as needed
];

const SignUp = () => {
    const {
        form,
        handleSubmit,
        handleLoginClick,
        isSigningUp
    } = useSignUpContainer();

    return (
        <Flex vertical justify="center" className="px-20 py-12 h-full">
            <AuthHeader
                headerTitle="Register Business"
                subTitle="Create your account to continue"
            />
            <Form
                form={form}
                onKeyDown={(e) => utilService.preventFormSubmitOnSelectingAddress(e)}
                onFinish={handleSubmit}
                scrollToFirstError
                initialValues={{
                    isRemember: false,
                }}
            >
                <Form.Item name="first_name" rules={VALIDATE.SELLER_NAME as never}>
                    <Input label="First Name" placeholder="Enter First Name" />
                </Form.Item>

                <Form.Item name="last_name" rules={VALIDATE.SELLER_NAME as never}>
                    <Input label="Last Name" placeholder="Enter Last Name" />
                </Form.Item>

                <Form.Item name="business_name" rules={VALIDATE.STORE_NAME as never}>
                    <Input label="Business Name" placeholder="Enter business name" />
                </Form.Item>

                <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                    <Input label="Email" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item name="country_code" >
                    <Input label="Country Code" placeholder="Enter country code" />
                </Form.Item>

                <Form.Item name="phone_number" rules={VALIDATE.PHONE as never}>
                    <Input label="Phone Number" placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item name="password" rules={VALIDATE.PASSWORD_PATTERN as never}>
                    <Input isPassword label="Password" placeholder="Enter your password" />
                </Form.Item>

                <Form.Item className="mt-8 text-center">
                    <CustomButton
                        title={"Sign Up"}
                        className="text-base w-[90%]"
                        isLoading={isSigningUp}
                    />
                </Form.Item>
            </Form>
            <p className="text-center text-#202224 text-large font-[500]">
                Already have an account?&nbsp;
                <ColoredText
                    text={"Login"}
                    onClick={handleLoginClick}
                    className="underline cursor-pointer"
                />
            </p>
        </Flex>
    );
};
export default SignUp;