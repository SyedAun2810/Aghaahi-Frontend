import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, Card } from "antd";

const { Title } = Typography;
const { Option } = Select;

const ConnectionString = () => {
    const [form] = Form.useForm();
    const [submittedData, setSubmittedData] = useState<any>(null);

    const handleSubmit = (values: any) => {
        setSubmittedData(values); // Save submitted values to state
        console.log("Submitted Data:", values);
    };

    return (
        <div className="h-[100vh] flex justify-center items-center bg-gray-100">
            <Card className="w-[400px] shadow-lg">
                <Title level={3} className="text-center mb-4">
                    Enter Database Credentials
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Host Name"
                        name="hostName"
                        rules={[{ required: true, message: "Please enter the host name!" }]}
                    >
                        <Input placeholder="Enter host name" />
                    </Form.Item>

                    <Form.Item
                        label="Database Name"
                        name="dbName"
                        rules={[{ required: true, message: "Please enter the database name!" }]}
                    >
                        <Input placeholder="Enter database name" />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="Database Type"
                        name="dbType"
                        rules={[{ required: true, message: "Please select the database type!" }]}
                    >
                        <Select placeholder="Select database type">
                            <Option value="mysql">MySQL</Option>
                            <Option value="postgresql">PostgreSQL</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                {submittedData && (
                    <div className="mt-4">
                        <Title level={4}>Submitted Data:</Title>
                        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(submittedData, null, 2)}</pre>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ConnectionString;
