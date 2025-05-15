import { Modal, Table, message } from "antd";
import React, { useState } from "react";
import { useEmployeeListing } from "@Pages/AppScreens/EmployeeListing";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthLayoutContainer } from "@Layout/AuthLayout/useAuthLayoutContainer";
import useAuthStore from "@Store/authStore";
import NotificationService from "@Services/NotificationService";

interface ShareDashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShare: (selectedUserIds: number[]) => void;
}

const ShareDashboardModal: React.FC<ShareDashboardModalProps> = ({
    isOpen,
    onClose,
    onShare
}) => {
    const { data: employeeResponse, isFetching: isFetchingEmployees } = useCustomEmployeeListing();
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const { userData } = useAuthStore();
    console.log("userData", userData?.role?.id);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (data: any) => (
                <p>{data?.name || '--'}</p>
            )
        },
    ];

    const shareDashboardMutation = useMutation({
        mutationFn: async (userId: number) => {
            const response = await ApiService.post(API_CONFIG_URLS.DASHBOARD.DASHBOARD_SHARE, {
                shared_with: userId
            });
            return response;
        },
        onSuccess: () => {
            NotificationService.success('Dashboard shared successfully');
            onClose();
            setSelectedUsers([]);
        },
        onError: (error) => {
            message.error('Failed to share dashboard');
            console.error('Share dashboard error:', error);
        }
    });

    const handleShare = () => {
        if (selectedUsers.length === 0) {
            message.warning('Please select at least one user to share with');
            return;
        }
        shareDashboardMutation.mutate(selectedUsers[0]);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedUsers(selectedRows.map(row => row.id));
        },
    };

    // Ensure we have an array of data for the table
    const tableData = React.useMemo(() => {
        if (!employeeResponse?.data) return [];
        return employeeResponse?.data ? employeeResponse.data?.employees.filter((item: any) => item.id !== userData?.id) : [];
    }, [employeeResponse?.data]);

    return (
        <Modal
            title={<span className="text-2xl font-semibold">Share Dashboard</span>}
            open={isOpen}
            onCancel={() => {
                onClose();
                setSelectedUsers([]);
            }}
            footer={[
                <div className="mt-8 flex justify-center">
                    <button
                        key="cancel"
                        onClick={() => {
                            onClose();
                            setSelectedUsers([]);
                        }}
                        className="px-4 py-4 text-gray-600 hover:text-gray-800 w-[50%] rounded-lg mx-2 "
                    >
                        Cancel
                    </button>,
                    <button
                        key="share"
                        onClick={handleShare}
                        disabled={selectedUsers.length === 0}
                        className="px-4 w-[50%] rounded-lg mx-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Share
                    </button>
                </div>
            ]}
        >
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={tableData}
                loading={isFetchingEmployees}
                pagination={false}
                rowKey="id"
            />
        </Modal>
    );
};


const useCustomEmployeeListing = () => {
    const { userData } = useAuthStore();
    return useQuery([queryKeys.employee.getEmployee, userData?.role?.id], async () => {
        const { ok, data } = await GetEmployeeRoles(userData?.role?.id);
        if (ok) {
            return data;
        }
        throw new Error("Failed to fetch employee roles");
    });
};

async function GetEmployeeRoles(roleId: number) {
    const response = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.LISTING}?page=1&limit=10&role_id=${roleId}&status=true`);
    return response;
}

export default ShareDashboardModal; 