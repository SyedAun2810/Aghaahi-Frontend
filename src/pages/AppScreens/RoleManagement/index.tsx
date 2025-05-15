import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Select, Button, Form } from 'antd';
import ApiService from '@Services/ApiService';
import { API_CONFIG_URLS } from '@Constants/config';
import { CustomButton } from '@Components/Button';
import logo from '@Assets/images/logo.png'; // Import the logo
import FullPageLoader from '@Components/FullPageLoader/FullPageLoader';
import NotificationService from "@Services/NotificationService";
import AuthHeader from '@Components/AuthHeader/AuthHeader';

interface RolePayload {
    role_id: number;
    table_permission: string[];
}

interface Role {
    id: number;
    name: string;
    company_role: Array<{
        table_permission: string[];
    }>;
}

const RoleManagement = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTables, setSelectedTables] = useState([]);

    // Fetch roles
    const { data: roles, isLoading: rolesLoading } = useQuery(['roles'], async () => {
        const { ok, data } = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.ROLES}`);
        if (ok) return data;
        throw new Error('Failed to fetch roles');
    });

    let permissionsAssigned = roles?.data[0]?.company_role[0]?.table_permission;

    console.log('roles', roles);

    // Fetch tables
    const { data: tables, isLoading: tablesLoading } = useQuery(['tables'], async () => {
        const { ok, data } = await ApiService.get(`${API_CONFIG_URLS.DatabaseValidator.TABLES}`);
        if (ok) return data;
        throw new Error('Failed to fetch tables');
    });

    console.log('tables', tables);
    const { mutate: updateRole, isLoading } = useUpdateEmployeeRole();

    const handleRoleChange = (value) => {
        setSelectedUser(value);
        const selectedRole = roles?.data.find((role: Role) => role.id === value);
        const permissions = selectedRole?.company_role[0]?.table_permission || [];
        setSelectedTables(permissions);
    };

    const handleSubmit = () => {
        console.log('Selected Role:', selectedUser);
        console.log('Selected Tables:', selectedTables);
        const payload = { role_id: selectedUser, table_permission: selectedTables }
        updateRole(payload);
    };

    if (rolesLoading || tablesLoading) return <FullPageLoader />;

    return (
        <div className='relative m-4 p-6 px-10 bg-white dark:bg-[#212121] shadow-md dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] rounded-lg h-[96%] flex flex-col items-center pt-12 transition-colors duration-200'>
            <img
                src={logo}
                alt="Watermark Logo"
                className='absolute opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 dark:invert'
            />
            <AuthHeader
                headerTitle={"Role Management"}
                subTitle={"Assign data access permissions to employees"}
            />
            <Form onFinish={handleSubmit} className='w-[70%] max-w-[800px]'>
                <Form.Item>
                    <h2 className="text-[#202224] dark:text-white">Role</h2>
                    <Select
                        options={roles?.data
                            .filter((role: Role) => role.name.toLowerCase() !== 'owner')
                            .map((role: Role) => ({ value: role.id, label: role.name }))}
                        onChange={handleRoleChange}
                        placeholder="Select a role"
                        className='h-14 dark:bg-[#2D2D2D] dark:text-white'
                        dropdownMatchSelectWidth={true}
                        listHeight={256}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item>
                    <h2 className="text-[#202224] dark:text-white">Permissions</h2>
                    <Select
                        mode="multiple"
                        options={tables?.data.map((table: string) => ({ value: table, label: table }))}
                        value={selectedTables}
                        onChange={(values) => setSelectedTables(values)}
                        placeholder="Select tables"
                        className='h-14 dark:bg-[#2D2D2D] dark:text-white'
                        maxTagCount={5}
                        style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}
                        dropdownStyle={{ minWidth: '300px' }}
                        tagRender={(props) => (
                            <span
                                className="bg-[#2D2D2D] text-white border border-[#4D4D4D] px-2 py-1 rounded-md m-1 flex items-center"
                            >
                                {props.label}
                                <span 
                                    className="ml-2 cursor-pointer hover:text-red-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.onClose();
                                    }}
                                >
                                    ×
                                </span>
                            </span>
                        )}
                        popupClassName="dark:bg-[#2D2D2D] [&_.ant-select-item-option-selected]:!bg-[#2D2D2D] [&_.ant-select-item-option-selected]:!text-white [&_.ant-select-item-option-active]:!bg-[#3D3D3D]"
                        dropdownRender={(menu) => (
                            <div className="dark:bg-[#2D2D2D] dark:text-white">
                                {menu}
                            </div>
                        )}
                    />
                </Form.Item>
                <Form.Item className="flex justify-center mt-8">
                    <CustomButton 
                        className='w-[600px]' 
                        type="primary" 
                        title={"Update"} 
                        htmlType="submit"
                        isLoading={isLoading}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default RoleManagement;

const updateEmployeeRole = (payload: RolePayload) => {
    return ApiService.post(API_CONFIG_URLS.EMPLOYEE.ROLES, payload);
};

const useUpdateEmployeeRole = () => {
    return useMutation(updateEmployeeRole, {
        onSuccess: ({ ok, response, data }) => {
            if (ok) {
                NotificationService.success("Role updated successfully");
                return;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw response.message;
        },
        onError: (err) => {
            throw err;
        }
    });
};
