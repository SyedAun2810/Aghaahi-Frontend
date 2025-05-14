import React, { useState, useEffect } from 'react';
import { Tag, Collapse } from 'antd';

interface CustomSidebarProps {
    collapsed: boolean;
    selectedTable: string;
    tableDefinitions: any;
    onTableSelect: (key: string) => void;
    databaseName: string;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({
    collapsed,
    selectedTable,
    tableDefinitions,
    onTableSelect,
    databaseName,
}) => {
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
    const [dbName, setDbName] = useState<string>(databaseName);
    const [filteredTableDefinitions, setFilteredTableDefinitions] = useState<any>({});

    useEffect(() => {
        if (tableDefinitions && tableDefinitions.db_name) {
            setDbName(tableDefinitions.db_name);
            const { db_name, ...tables } = tableDefinitions;
            setFilteredTableDefinitions(tables);
        } else {
            setFilteredTableDefinitions(tableDefinitions);
        }
    }, [tableDefinitions]);

    const handleCollapseChange = (key: string | string[]) => {
        setActiveKey(Array.isArray(key) ? key[0] : key);
    };

    console.log({ tableDefinitions })

    return (
        <div
            className={`h-screen bg-white dark:bg-[#181818] transition-all duration-300 ${collapsed ? 'w-0' : 'w-[15%]'
                } overflow-hidden`}
        >
            <div className="p-4">
                <h1 className="text-xl font-medium text-center text-dark-main dark:text-white my-4">
                    Shopverse
                </h1>
                <h2 className="text-lg font-medium text-center text-gray-600 dark:text-gray-400 mb-4">
                    Tables
                </h2>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-120px)] dark:bg-[#181818]">
                <Collapse
                    activeKey={activeKey}
                    onChange={handleCollapseChange}
                    className="bg-transparent border-none [&_.ant-collapse-expand-icon]:dark:text-white dark:bg-[#181818] [&_.ant-collapse-item]:dark:bg-[#181818] [&_.ant-collapse-content]:dark:bg-[#181818]"
                    items={Object.entries(filteredTableDefinitions).map(([key, table]: [string, any]) => ({
                        key,
                        label: (
                            <div
                                className={`cursor-pointer ${selectedTable === key ? 'text-[#5950CB] dark:text-purple-400' : ''
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTableSelect(key);
                                    setActiveKey(key);
                                }}
                            >
                                <div className="font-medium dark:text-white">
                                    {key}
                                </div>
                            </div>
                        ),
                        children: (
                            <div className="mt-2 dark:bg-[#181818]">
                                <div className="text-sm font-medium text-gray-600 dark:text-white mb-2">
                                    Columns
                                </div>
                                {table?.map((column: any, index: number) => (
                                    <div
                                        key={`${key}-column-${index}`}
                                        className="flex items-center justify-between p-2 mb-1 bg-gray-50 dark:bg-gray-800 rounded-md"
                                    >
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-white">
                                                {column.COLUMN_NAME}
                                            </span>
                                            {column.required && (
                                                <Tag color="red" className="ml-2">Required</Tag>
                                            )}
                                        </div>
                                        <Tag color="blue">{column.DATA_TYPE
                                        }</Tag>
                                    </div>
                                ))}
                            </div>
                        ),
                    }))}
                />
            </div>
        </div>
    );
};

export default CustomSidebar; 