import AuthHeader from "@Components/AuthHeader/AuthHeader";
import { CustomButton } from "@Components/Button";
import ColoredText from "@Components/ColorText/ColorText";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import Input from "@Components/TextInput/TextInput";
import { API_CONFIG_URLS } from "@Constants/config";
import { VALIDATE } from "@Constants/validationConstants";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import ApiService from "@Services/ApiService";
import NotificationService from "@Services/NotificationService";
import useAuthStore from "@Store/authStore";
import { useMutation } from "@tanstack/react-query";
import utilService from "@Utils/utils.service";
import { Flex, Form } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DATABASE_TYPE_OPTIONS = [
    { label: "Postgres", value: "postgres" },
    { label: "MySQL", value: "mysql" },
];

const RegisterDatabase = () => {
    const [form] = Form.useForm();
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUserAuthentication,
        accessToken,
        role,
        isOwner,
        userData,
        company, } = useAuthStore();

    const location = useLocation();
    const { companyId } = location.state || {};
    



    const verifyConnection = useVerifyConnection(() => {
        setIsVerified(true);
        setLoading(false);
    });

    const addDbConnection = useAddDbConnection(() => {
        setLoading(false);
        form.resetFields();
        setIsVerified(false);
        const payload = {
            token: accessToken,
            role: role,
            isOwner: isOwner,
            employee: userData,
            company: company,
            isAuth: true
        }
        setUserAuthentication(payload);
        navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT);
    });

    const handleSubmit = (values: any) => {
        setLoading(true);
        values.port = Number(values.port);
        const payload = { ...values, company_id : userData?.company?.id };

        console.log("payload", payload);

        if (!isVerified) {
            // Verify connection
            verifyConnection.mutate(payload);
        } else {
            // Add database connection
            addDbConnection.mutate(payload);
        }
    };

    return (
        <Flex vertical justify="center" className="px-20 py-12 h-full">
            <AuthHeader
                headerTitle="Register Database"
                subTitle="Enter your database details to continue"
            />
            <Form
                form={form}
                // initialValues={defaultValues}
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
                        title={isVerified ? "Add Database" : "Verify"}
                        className="text-base w-[90%]"
                        isLoading={loading}
                    />
                </Form.Item>
            </Form>
            <p className="text-center text-#202224 text-large font-[500]">
                Already registered?&nbsp;
                <ColoredText
                    text="Login"
                    onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.LOGIN)}
                    className="underline cursor-pointer"
                />
            </p>
        </Flex>
    );
};

export default RegisterDatabase;

export const useVerifyConnection = (onSuccess: (data?: any) => void) => {
    return useMutation((payload: any) => verifyDbConnection(payload), {
        onSuccess: ({ ok, response, data }: any, payload: any) => {
            if (ok) {
                console.log("Verify Data ",)
                NotificationService.success("Connection verified successfully.");
                onSuccess(payload);
                return data;
            }
            console.log("error", response);
            NotificationService.error(response?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};

async function verifyDbConnection(payload: any) {
    const response = await ApiService.post(API_CONFIG_URLS.DatabaseValidator.VERIFY, payload);
    return response;
}

export const useAddDbConnection = (onSuccess: (data?: any) => void) => {
    return useMutation((payload: any) => addDbConnection(payload), {
        onSuccess: ({ ok, response, data }: any, payload: any) => {
            if (ok) {
                NotificationService.success("Your database has successfully configured.");
                onSuccess(data);
                return data;
            }
            console.log("error", response);
            NotificationService.error(response?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};

async function addDbConnection(payload: any) {
    const response = await ApiService.post(API_CONFIG_URLS.DatabaseValidator.SCHEMA, payload);
    return response;
}