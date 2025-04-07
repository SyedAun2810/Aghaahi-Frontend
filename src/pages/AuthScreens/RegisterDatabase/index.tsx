import { AuthApiService } from "@Api/auth-service";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import { CustomButton } from "@Components/Button";
import ColoredText from "@Components/ColorText/ColorText";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import NotificationService from "@Services/NotificationService";
import { useMutation } from "@tanstack/react-query";
import utilService from "@Utils/utils.service";
import { Flex, Form } from "antd";

const DATABASE_TYPE_OPTIONS = [
    { label: "Postgres", value: "postgres" },
    { label: "MySQL", value: "mysql" },
];

const RegisterDatabase = () => {
    const [form] = Form.useForm();

      const { mutate: validateDatabase, isLoading: isValidating } = useValidateDatabase();
    const handleSubmit = async (values: any) => {
        validateDatabase(values)
    };

    const handleBackToLogin = () => {
        // Navigate back to the login screen
        console.log("Navigate to login screen");
    };

    return (
        <Flex vertical justify="center" className="px-20 py-12 h-full">
            <AuthHeader
                headerTitle="Register Database"
                subTitle="Enter your database details to continue"
            />
            <Form
                form={form}
                onKeyDown={(e) => utilService.preventFormSubmitOnSelectingAddress(e)}
                onFinish={handleSubmit}
                scrollToFirstError
            >
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: "Please select a database type" }]}
                >
                    <CustomSelectInput
                        label="Database Type"
                        placeholder="Select database type"
                        options={DATABASE_TYPE_OPTIONS}
                    />
                </Form.Item>

                <Form.Item
                    name="host"
                    rules={VALIDATE.STORE_NAME as never}
                >
                    <Input label="Host" placeholder="Enter database host" />
                </Form.Item>

                <Form.Item
                    name="port"
                    rules={[{ required: true, message: "Please enter the port number" }]}
                >
                    <Input label="Port" placeholder="Enter port number" />
                </Form.Item>

                <Form.Item
                    name="user"
                    rules={VALIDATE.STORE_NAME as never}
                >
                    <Input label="User" placeholder="Enter database user" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter the password" }]}
                >
                    <Input isPassword label="Password" placeholder="Enter database password" />
                </Form.Item>

                <Form.Item
                    name="database"
                    rules={VALIDATE.STORE_NAME as never}
                >
                    <Input label="Database Name" placeholder="Enter database name" />
                </Form.Item>

                <Form.Item className="mt-8 text-center">
                    <CustomButton
                        title="Register Database"
                        className="text-base w-[90%]"
                        isLoading={isValidating}
                    />
                </Form.Item>
            </Form>
            <p className="text-center text-#202224 text-large font-[500]">
                Already registered?&nbsp;
                <ColoredText
                    text="Login"
                    onClick={handleBackToLogin}
                    className="underline cursor-pointer"
                />
            </p>
        </Flex>
    );
};

export default RegisterDatabase;


const useValidateDatabase = () => {
    return useMutation((payload: any) => AuthApiService.valdiateDatabase(payload), {
        onSuccess: ({ ok, response, data }: any, payload: any) => {
            if (ok) {
                return data;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};
