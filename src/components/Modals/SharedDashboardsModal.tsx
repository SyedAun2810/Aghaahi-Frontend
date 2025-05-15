import React from 'react';
import { Modal, Table, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import ApiService from '@Services/ApiService';
import { API_CONFIG_URLS } from '@Constants/config';

interface SharedDashboard {
    id: number;
    user_id: number;
    user_name: string;
    shared_by: string;
    shared_at: string;
}

interface SharedDashboardsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewDashboard?: (userId: number) => void;
}

const SharedDashboardsModal: React.FC<SharedDashboardsModalProps> = ({ isOpen, onClose, onViewDashboard }) => {

    const { data: sharedDashboards, isLoading } = useQuery({
        queryKey: ['sharedDashboards'],
        queryFn: async () => {
            const response = await ApiService.get(API_CONFIG_URLS.DASHBOARD.EMPLOYEES_SHARED_WITH_ME);
            // Ensure we return an array, even if empty
            return response ? response : [];
        },
        enabled: isOpen
    });
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: number) => (
                <p className='darK:text-white'>{id}</p>
            ),
        },
        {
            title: 'Shared By',
            // dataIndex: 'shared_by',
            key: 'shared_by',
            render: (data:any) => {
        
                return (
                    <p className='darK:text-white'>
                        {data?.employee?.name || data?.name || 'N/A'}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: SharedDashboard) => (
                <button
                    onClick={() => {
                        if (onViewDashboard) {
                            onViewDashboard(record?.employee?.id);
                        }
                        onClose();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    View Dashboard
                </button>
            ),
        },
    ];

    return (
        <Modal
            title="Dashboards Shared With Me"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={sharedDashboards?.data?.data || []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                
            />
        </Modal>
    );
};

export default SharedDashboardsModal; 