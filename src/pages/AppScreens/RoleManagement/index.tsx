import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Select, Button, Form } from 'antd';
import ApiService from '@Services/ApiService';
import { API_CONFIG_URLS } from '@Constants/config';
import { CustomButton } from '@Components/Button';
import logo from '@Assets/images/logo.png'; // Import the logo
import FullPageLoader from '@Components/FullPageLoader/FullPageLoader';
import NotificationService from "@Services/NotificationService";

interface RolePayload {
    role_id: number;
    table_permission: string[];
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

    console.log('roles', permissionsAssigned);

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
        const selectedRole = roles?.data.find((role) => role.id === value);
        const permissions = selectedRole?.company_role[0]?.table_permission || [];
        setSelectedTables(permissions);
    };

    const handleSubmit = () => {
        console.log('Selected Role:', selectedUser);
        console.log('Selected Tables:', selectedTables);
        const payload = {role_id: selectedUser,table_permission : selectedTables }
        updateRole(payload);
    };
    
    if (rolesLoading || tablesLoading) return <FullPageLoader />;

    return (
        <div className='relative m-4 p-6 px-10 bg-white shadow-md rounded-lg h-[96%]'>
            <img
                src={logo}
                alt="Watermark Logo"
                className='absolute opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2'
            />
            <h1 className='text-3xl'>Role Management</h1>
            <Form onFinish={handleSubmit} className='mt-8 px-12 w-[70%]'>
                <Form.Item>
                    <h2>Role</h2>
                    <Select
                        options={roles?.data.map((role) => ({ value: role.id, label: role.name }))}
                        onChange={handleRoleChange}
                        placeholder="Select a role"
                        className='h-14'
                    />
                </Form.Item>
                <Form.Item>
                    <h2>Permissions</h2>
                    <Select
                        mode="multiple"
                        options={tables?.data.map((table) => ({ value: table, label: table }))}
                        value={selectedTables}
                        onChange={(values) => setSelectedTables(values)}
                        placeholder="Select tables"
                        className='h-14'
                    />
                </Form.Item>
                <Form.Item>
                    <CustomButton className='w-[30%]' type="primary" title={"Update"} htmlType="submit" />
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
