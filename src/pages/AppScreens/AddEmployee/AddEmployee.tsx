import Logo from "@Assets/images/logo.png";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import { CustomButton } from "@Components/Button";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import Input from "@Components/TextInput/TextInput";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { VALIDATE } from "@Constants/validationConstants";
import ApiService from "@Services/ApiService";
import NotificationService from "@Services/NotificationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox, Col, Flex, Form, Row } from "antd";
import styles from "./AddEmployee.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const GENDER_OPTIONS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" }
];

const AddEmployee = () => {
    const [form] = Form.useForm();
    const { id } = useParams(); // Get employee ID from URL for update mode
    const isUpdateMode = !!id;
     const navigate = useNavigate();

    const { data: roles } = useEmployeeRoles();
    const { data: employeeDetails, isLoading: isEmployeeLoading } = useEmployeeDetail(id ? parseInt(id) : null);

    const { mutate: submitMutate, isLoading: isSubmitting, isSuccess } = useMutation(
        isUpdateMode ? updateEmployee : registerEmployee
    );

    if(isSuccess)
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_DETAIL}/${id}`);

    // Set form values when in update mode and data is loaded
    React.useEffect(() => {
        if (isUpdateMode && employeeDetails) {
            const data = employeeDetails?.data;
            form.setFieldsValue({
                name: data?.name,
                email: data?.email,
                country_code: data?.country_code,
                phone_number: data?.phone_number,
                role_id: data?.role?.id, // Using ID instead of name for the form
                salary: data?.salary,
                gender: data?.gender,
                status: data?.status
            });
        }
    }, [isUpdateMode, employeeDetails, form]);

    const handleSubmit = (values: any) => {
        values.salary = Number(values.salary);
        if (isUpdateMode) {
            values.id = id; // Add ID to payload for update
        }
        submitMutate(values);
    };

    const roleOptions = roles?.data?.map((role: any) => ({
        label: role.name,
        value: role.id
    })) || [];

    return (
        <Wrapper>
            <Flex vertical justify="center" className="px-20 py-12 h-full">
                <AuthHeader
                    headerTitle={isUpdateMode ? "Update Employee" : "Add Employee"}
                    subTitle={
                        isUpdateMode 
                            ? "Update the details of the employee" 
                            : "Fill in the details to add a new employee"
                    }
                />
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    scrollToFirstError
                    initialValues={{
                        country_code: "+1",
                        gender: "female",
                        status: true
                    }}
                >
                    <Form.Item name="name" rules={VALIDATE.SELLER_NAME as never}>
                        <Input
                            label="Name"
                            placeholder="Enter full name"
                        />
                    </Form.Item>

                    <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                        <Input
                            label="Email"
                            placeholder="Enter email address"
                            disabled={isUpdateMode} // Email typically shouldn't be changed after creation
                        />
                    </Form.Item>

                    <Form.Item name="country_code">
                        <Input
                            label="Country Code"
                            placeholder="Enter country code"
                        />
                    </Form.Item>

                    <Form.Item name="phone_number" rules={VALIDATE.PHONE as never}>
                        <Input
                            label="Phone Number"
                            placeholder="Enter phone number"
                        />
                    </Form.Item>

                    <Form.Item name="role_id" rules={VALIDATE.ROLE as never}>
                        <CustomSelectInput
                            label="Role"
                            placeholder="Select role"
                            options={roleOptions}
                        />
                    </Form.Item>

                    <Form.Item name="salary" rules={VALIDATE.SALARY as never}>
                        <Input
                            label="Salary"
                            placeholder="Enter salary"
                            type="number"
                        />
                    </Form.Item>

                    {!isUpdateMode && (
                        <Form.Item name="password" rules={VALIDATE.PASSWORD_PATTERN as never}>
                            <Input
                                isPassword
                                label="Password"
                                placeholder="Enter password"
                            />
                        </Form.Item>
                    )}

                    <Form.Item name="gender" rules={VALIDATE.GENDER as never}>
                        <CustomSelectInput
                            label="Gender"
                            placeholder="Select gender"
                            options={GENDER_OPTIONS}
                        />
                    </Form.Item>

                    <Form.Item name="status" valuePropName="checked">
                        <Checkbox>Employee Status Active?</Checkbox>
                    </Form.Item>

                    <Form.Item className="mt-8 text-center">
                        <CustomButton
                            title={isUpdateMode ? "Update Employee" : "Add Employee"}
                            className="text-base w-[90%]"
                            isLoading={isSubmitting || isEmployeeLoading}
                        />
                    </Form.Item>
                </Form>
            </Flex>
        </Wrapper>
    );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${styles["wrapper-container"]} `}>
            <Row>
                <Col
                    xs={0}
                    sm={0}
                    md={12}
                    lg={14}
                    xl={14}
                    xxl={15}
                    className={`${styles["left-container"]}`}
                >
                    <div className="mt-8 ml-20 flex flex-col pb-16 h-full">
                        <img src={Logo} width={150} height={150} className="" />
                        <div className="text-white mt-auto">
                            <h1 className="2xl:text-[32px] xl:text-[30px] lg:text-[32px] mt-4 max-w-xl font-[700]">
                                Aghaahi Get your Insights by Prompts
                            </h1>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={9} className="bg-white">
                    {children}
                </Col>
            </Row>
        </div>
    );
};

const useEmployeeRoles = () => {
    return useQuery([queryKeys.employee.roles], async () => {
        const { ok, data } = await GetEmployeeRoles();
        if (ok) {
            return data;
        }
        throw new Error("Failed to fetch employee roles");
    });
};

const useEmployeeDetail = (id: number | null) => {
    return useQuery(
        [queryKeys.employee.getEmployeeDetail, id],
        async () => {
            if (!id) return null;
            const { ok, data } = await GetEmployeeDetail(id);
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch employee details");
        },
        {
            enabled: !!id
        }
    );
};

async function GetEmployeeRoles() {
    const response = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.ROLES}`);
    return response;
}

async function GetEmployeeDetail(id: number) {
    const response = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.DETAIL}/${id}`);
    return response;
}

const registerEmployee = (payload: any) => {
    return ApiService.post(API_CONFIG_URLS.EMPLOYEE.ADD, payload);
};

const updateEmployee = (payload: any) => {
    let response  = ApiService.put(`${API_CONFIG_URLS.EMPLOYEE.UPDATE}/${payload.id}`, payload);
    return response;
};

export default AddEmployee;