import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, Card } from "antd";
import { useLocation } from "react-router-dom";
import useAuthStore from "@Store/authStore";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import NotificationService from "@Services/NotificationService";
import { useMutation } from "@tanstack/react-query";
import TypedInputNumber from "antd/es/input-number";


const { Title } = Typography;
const { Option } = Select;

const ConnectionString = () => {
    const [form] = Form.useForm();
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { companyId } = location.state || {};

    //console.log("companyId", companyId);
    //console.log("companyId", companyId);
    //console.log("companyId", companyId);
    //console.log("companyId", companyId);
    //console.log("companyId", companyId);
    //console.log("companyId", companyId);
    
    const verifyConnection = useVerifyConnection(() => {
        //console.log("companyId", companyId);
        setIsVerified(true);
        setLoading(false);
    });

    const addDbConnection = useAddDbConnection(() => {
        setLoading(false);
        form.resetFields();
        setIsVerified(false);
    });

    const handleSubmit = (values: any) => {
        setLoading(true);
        const payload = { ...values, companyId };

        if (!isVerified) {
            // Verify connection
            verifyConnection.mutate(payload);
        } else {
            // Add database connection
            addDbConnection.mutate(payload);
        }
    };

    return (
        <div className="h-[100vh] flex justify-center items-center bg-gray-100">
            <Card className="w-[400px] shadow-lg">
                <Title level={3} className="text-center mb-4">
                    Enter Database 
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Host Name"
                        name="host"
                        rules={[{ required: true, message: "Please enter the host name!" }]}
                    >
                        <Input placeholder="Enter host name" />
                    </Form.Item>

                    <Form.Item
                        label="Database Name"
                        name="defaultdb"
                        rules={[{ required: true, message: "Please enter the database name!" }]}
                    >
                        <Input placeholder="Enter database name" />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="user"
                        rules={[{ required: true, message: "Please enter the username!" }]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter the password!" }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item
                        label="Port"
                        name="port"
                        rules={[{ required: true, message: "Please enter the port!" }]}
                    >
                        <TypedInputNumber placeholder="Enter port" />
                    </Form.Item>

                    <Form.Item
                        label="Database Type"
                        name="type"
                        rules={[{ required: true, message: "Please select the database type!" }]}
                    >
                        <Select placeholder="Select database type">
                            <Option value="mysql">MySQL</Option>
                            <Option value="postgresql">PostgreSQL</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            {isVerified ? "Add Database" : "Verify"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};


export default ConnectionString;
