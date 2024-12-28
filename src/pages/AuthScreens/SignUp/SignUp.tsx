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


export const ROLEOPTIONS = [
    {
      label: "Employee",
      value: "Employee",
    },
    {
      label: "Super-Visor",
      value: "Super-Visor",
    },
    {
        label: "Manager",
        value: "Manager",
      },
  ];
  
const SignUp = () => {
    const {
        form,
        handleSubmit,
        handleLoginClick,
        handlePlaceSelect,
        validateIsAgree,
        isSigningUp
    } = useSignUpContainer();

    return (
        <Flex vertical justify="center" className="px-20 py-12 h-full">
            <AuthHeader
                headerTitle="Create an Account"
                subTitle="Create a your account to continue"
            />
            <Form
                form={form}
                onKeyDown={(e) => utilService.preventFormSubmitOnSelectingAddress(e)}
                onFinish={handleSubmit}
                scrollToFirstError
                initialValues={{
                    isRemember: false,
                    store: {
                        name: "",
                        address: {
                            city: "",
                            fullAddress: "",
                            country: "",
                            state: "",
                            zipCode: ""
                        }
                    }
                }}
            >
                <Form.Item name="firstName" rules={VALIDATE.SELLER_NAME as never}>
                    <Input label="Name" placeholder="Enter name" />
                </Form.Item>

                <Form.Item name={"storeName"} rules={VALIDATE.STORE_NAME as never}>
                    <Input label="Store Name" placeholder="Enter store name" />
                </Form.Item>

                <Form.Item name={"role"} rules={VALIDATE.STORE_NAME as never}>
                    <CustomSelectInput label="Role" placeholder="Role" options={ROLEOPTIONS}/>
                </Form.Item>
             
             
                <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                    <Input label="Email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="phoneNumber" rules={VALIDATE.PHONE as never}>
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