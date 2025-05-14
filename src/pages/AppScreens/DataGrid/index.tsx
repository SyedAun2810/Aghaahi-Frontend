import { useState, useEffect } from "react";
import { Layout, Menu, Input, Button, message, Tag, Row, Col, Spin, Flex, Drawer, Select } from "antd";
import GridView from "@Components/GridView";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { DownloadOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ArrowLeftOutlined, HistoryOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import VoiceICon from "@Assets/images/mic.png";
import SendIcon from "@Assets/images/send.png";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import CustomSidebar from "@Components/CustomSidebar";
import Logo from "@Assets/images/logo.png";
import { useTypingEffect } from "../PromptChat/Components/ChatFooter";
import useAuthStore from "@Store/authStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DatabaseValidatorService } from "../../../apiService/database-validator-service";
import { useGetDatabaseHistory } from "../../../layout/AuthLayout/Queries/useGetDatabaseHistory";
import { API_CONFIG_URLS } from "@Constants/config";
import axios from "axios";
import { apiService } from "@Services/ApiService";
import { useDatabaseValidator } from "@Hooks/useDatabaseValidator";


const { Sider, Content } = Layout;
const { TextArea } = Input;


const DatabaseName = "Khaadi Store"

const DataGridView = () => {
    const [selectedTable, setSelectedTable] = useState("table1");
    const [notes, setNotes] = useState("");
    const [collapsed, setCollapsed] = useState(true);
    const [localMessage, setLocalMessage] = useState("");
    const [listening, setListening] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
    const [queryType, setQueryType] = useState("smart");
    const [queryBuilderValue, setQueryBuilderValue] = useState("");
    const [showQueryBuilder, setShowQueryBuilder] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 15;
    const introText = "Hi, I'm Agaahi! I specialize in helping you query data in natural language and visualize it in structured tables—making data insights effortless and accessible.";
    const { userData } = useAuthStore();
    const navigate = useNavigate();

    const { data: tablesData, isLoading: isTablesLoading } = useQuery({
        queryKey: ['tablesWithColumns'],
        queryFn: async () => {
            const response = await DatabaseValidatorService.getTablesWithColumns();
            return response.data;
        }
    });

    const { data: historyData, isLoading: isHistoryLoading } = useGetDatabaseHistory(1, 10);

    const { executeQuery, isLoading: isSmartQueryLoading, data: smartQueryData } = useDatabaseValidator();

    const startListening = () => {
        setListening(true);
        // Add your voice recognition logic here
    };

    const stopListening = () => {
        setListening(false);
        // Add your voice recognition stop logic here
    };

    const handleExport = () => {
        try {
            if (!tableData || tableData.length === 0) {
                message.warning('No data available to export');
                return;
            }

            // Create a worksheet from the actual table data
            const worksheet = XLSX.utils.json_to_sheet(tableData);

            // Create a workbook and add the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data Grid");

            // Generate Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create download link and trigger download
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `data-grid-${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            message.success('Data exported successfully!');
        } catch (error) {
            console.error('Export error:', error);
            message.error('Failed to export data. Please try again.');
        }
    };

    const getMenuItems = () => {
        if (!tablesData) return [];

        return Object.entries(tablesData).map(([tableName, columns]: [string, any]) => ({
            key: tableName,
            label: tableName.replace(/_/g, ' ').toUpperCase(),
            children: [
                {
                    key: `${tableName}-columns`,
                    label: "Columns",
                    children: columns.map((column: any) => ({
                        key: `${tableName}-column-${column.COLUMN_NAME}`,
                        label: (
                            <div className="flex items-center justify-between p-2 w-full overflow-x-auto">
                                <div>
                                    <span className="font-medium">{column.COLUMN_NAME}</span>
                                </div>
                                <Tag color="blue">{column.DATA_TYPE}</Tag>
                            </div>
                        ),
                    })),
                },
            ],
        }));
    };

    // Reset query builder when query type changes
    useEffect(() => {
        if (queryType !== "builder") {
            setShowQueryBuilder(false);
            setQueryBuilderValue("");
        }
    }, [queryType]);

    const sqlQueryMutation = useMutation({
        mutationFn: async (question: string) => {
            const response = await apiService.post(API_CONFIG_URLS.DatabaseValidator.SQL_QUERY, {
                question
            });
            return response.data;
        },
        onSuccess: (data) => {
            setQueryBuilderValue(data?.data || '');
            setShowQueryBuilder(true);
            setShowWelcomeScreen(false);
            setIsLoading(false);
        },
        onError: (error) => {
            console.error('SQL Query Error:', error);
            message.error('Failed to generate SQL query. Please try again.');
            setIsLoading(false);
        }
    });

    const dataMutation = useMutation({
        mutationFn: async (query: string) => {
            const response = await apiService.post(API_CONFIG_URLS.DatabaseValidator.DATA, {
                query
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Raw API Response:', data);
            if (data?.data) {
                // Transform the data into the correct format
                const transformedData = data.data.map((item: any, index: number) => ({
                    id: index + 1, // Add a unique id for each row
                    ...item
                }));
                console.log('Transformed Data:', transformedData);
                setTableData(transformedData);
                
                // Generate columns from the first row of data
                if (data.data.length > 0) {
                    const columns = Object.keys(data.data[0]).map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                        dataIndex: key,
                        key: key,
                        width: 150,
                        ellipsis: true,
                        render: (text: any) => {
                            if (text === null || text === undefined) return '-';
                            if (typeof text === 'object') return JSON.stringify(text);
                            return String(text);
                        }
                    }));
                    console.log('Generated Columns:', columns);
                    setTableColumns(columns);
                }
            }
            setShowTable(true);
            setShowWelcomeScreen(false);
            setIsLoading(false);
            setCurrentPage(1); // Reset to first page when new data is loaded
        },
        onError: (error) => {
            console.error('Data Error:', error);
            message.error('Failed to fetch data. Please try again.');
            setIsLoading(false);
        }
    });

    const handleSubmit = () => {
        if (localMessage.trim().length > 0) {
            setIsLoading(true);
            if (queryType === "builder") {
                sqlQueryMutation.mutate(localMessage);
                return;
            }
            // For smart query, use the new endpoint
            executeQuery(localMessage);
        }
    };

    const handleQueryBuilderSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setIsLoading(true);
            dataMutation.mutate(queryBuilderValue);
        }
    };

    const handleTextAreaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const { displayText, isTypingComplete } = useTypingEffect(introText, 50);

    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        const userName = userData?.name || '';
        if (hour >= 5 && hour < 12) {
            return `Good Morning${userName ? ', ' + userName : ''} ☀️`;
        } else if (hour >= 12 && hour < 17) {
            return `Good Afternoon${userName ? ', ' + userName : ''} 😎`;
        } else {
            return `Good Evening${userName ? ', ' + userName : ''} 👋`;
        }
    };

    const handlePromptSelect = (prompt: string) => {
        setLocalMessage(prompt);
        setIsHistoryDrawerOpen(false);
    };

    const resetStates = () => {
        setSelectedTable("table1");
        setNotes("");
        setLocalMessage("");
        setListening(false);
        setShowTable(false);
        setShowWelcomeScreen(true);
        setIsLoading(false);
        setIsHistoryDrawerOpen(false);
        setQueryType("smart");
        setQueryBuilderValue("");
        setShowQueryBuilder(false);
        setTableData([]);
        setTableColumns([]);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Add effect to handle smart query response
    useEffect(() => {
        if (smartQueryData) {
            if (smartQueryData?.data) {
                // Transform the data into the correct format
                const transformedData = smartQueryData.data.map((item: any, index: number) => ({
                    id: index + 1, // Add a unique id for each row
                    ...item
                }));
                setTableData(transformedData);
                
                // Generate columns from the first row of data
                if (smartQueryData.data.length > 0) {
                    const columns = Object.keys(smartQueryData.data[0]).map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                        dataIndex: key,
                        key: key,
                        width: 150,
                        ellipsis: true,
                        render: (text: any) => {
                            if (text === null || text === undefined) return '-';
                            if (typeof text === 'object') return JSON.stringify(text);
                            return String(text);
                        }
                    }));
                    setTableColumns(columns);
                }
            }
            setShowTable(true);
            setShowWelcomeScreen(false);
            setIsLoading(false);
            setCurrentPage(1); // Reset to first page when new data is loaded
        }
    }, [smartQueryData]);

    // Update loading state based on smart query
    useEffect(() => {
        setIsLoading(isSmartQueryLoading);
    }, [isSmartQueryLoading]);

    console.log({ tableData })
    return (
        <Layout className="h-screen flex flex-row">
            <CustomSidebar
                collapsed={collapsed}
                selectedTable={selectedTable}
                tableDefinitions={tablesData?.data || {}}
                onTableSelect={(key) => {
                    if (tablesData && Object.keys(tablesData).includes(key)) {
                        setSelectedTable(key);
                    }
                }}
                databaseName={DatabaseName}
            />
            <Layout className={`${collapsed ? "w-[100%]" : "w-[85%]"} h-screen flex flex-col`}>
                <div className="bg-white dark:bg-[#181818] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-lg dark:text-gray-200 hover:dark:text-white"
                        />
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(-1)}
                            className="text-lg dark:text-gray-200 hover:dark:text-white"
                        >
                            Back To Home
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            type="primary"
                            icon={<HistoryOutlined />}
                            onClick={() => setIsHistoryDrawerOpen(true)}
                            className="dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            View Prompt History
                        </Button>
                        {!showWelcomeScreen && (
                            <Button
                                type="primary"
                                onClick={resetStates}
                                className="dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Refresh
                            </Button>
                        )}
                        {showTable && (
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={handleExport}
                                className="dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Export to Excel
                            </Button>
                        )}
                    </div>
                </div>
                <Content className="p-6 overflow-y-auto flex-1">
                    <div className={`${showWelcomeScreen ? "mt-[10%]" : ""}`}>
                        {
                            showWelcomeScreen && (
                                <div>
                                    <h1 className="text-center my-2 text-4xl animate-fade-in-down dark:text-white">{getTimeBasedGreeting()}</h1>
                                    <Flex className="cursor-pointer mt-4 animate-fade-in-up" justify="center" gap={16}>
                                        <img src={Logo} className="text-main-orange h-16 w-16" />
                                        <h2 className="text-center my-4 dark:text-white whitespace-pre-wrap text-wrap max-w-4xl">{displayText}{!isTypingComplete && <span className="animate-blink">|</span>}</h2>
                                    </Flex>
                                </div>
                            )
                        }
                        <Row className={`${showWelcomeScreen ? "mx-60 mt-8" : ""} flex items-center dark:bg-[#303030] bg-white rounded-full h-20 pl-4 mb-4`}>
                            <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
                                <div className="flex items-center w-full">
                                    <div className="w-full pr-4">
                                        <Input.TextArea
                                            placeholder="Enter your query here..."
                                            maxLength={10000}
                                            className="border-none shadow-none scroll-primary bg-transparent dark:bg-[#303030] text-lg ml-2 mb-[2px] dark:text-white dark:placeholder-gray-400"
                                            name="message"
                                            autoSize={{ minRows: 0, maxRows: 2 }}
                                            value={localMessage}
                                            onChange={(e) => setLocalMessage(e.target.value)}
                                            onKeyDown={handleTextAreaKeyPress}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4} >
                                <div className="flex items-center justify-end pr-6 gap-4 relative z-10">
                                    <Select
                                        defaultValue="smart"
                                        value={queryType}
                                        onChange={setQueryType}
                                        className="w-32"
                                        options={[
                                            { value: 'smart', label: 'Smart Query' },
                                            { value: 'builder', label: 'Query Builder' },
                                        ]}
                                    />
                                    <button
                                        type="button"
                                        onClick={listening ? stopListening : startListening}
                                        className={`border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 hover:bg-gray-100 dark:bg-[#303030] bg-white transition-colors duration-200`}
                                    >
                                        <img src={VoiceICon} height={30} width={25} className={listening ? "animate-pulse" : ""} />
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 pr-2 cursor-pointer dark:bg-[#303030] bg-white transition-colors duration-200"
                                    >
                                        <img src={SendIcon} height={30} width={25} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {isLoading && (
                        <div className="flex justify-center items-center h-32">
                            <Spin size="default" tip="Loading data..." />
                        </div>
                    )}
                    {queryType === "builder" && showQueryBuilder && (
                        <div className="w-full bg-transparent dark:bg-[#303030] rounded-lg shadow-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2 dark:text-white">Generated Query</h3>
                            <TextArea
                                value={queryBuilderValue}
                                onChange={(e) => setQueryBuilderValue(e.target.value)}
                                onKeyDown={handleQueryBuilderSubmit}
                                placeholder="Enter your SQL query here..."
                                autoSize={{ minRows: 3, maxRows: 6 }}
                                className="w-full bg-transparent dark:bg-[#303030] dark:text-white"
                            />
                        </div>
                    )}
                    {showTable && !isLoading  && (
                        <RoundedContainer>
                            <div className="overflow-x-auto">
                                {tableData.length > 0 ? (
                                    <GridView
                                        data={tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                                        columns={tableColumns}
                                        showPagination
                                        pageSize={pageSize}
                                        isLoading={isLoading}
                                        isFetching={isLoading}
                                        totalCount={tableData.length}
                                        selectedPage={currentPage}
                                        onPaginate={handlePageChange}
                                        scroll={{ x: 'max-content' }}
                                        size="middle"
                                        bordered
                                        rowKey="id"
                                    />
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No data available
                                    </div>
                                )}
                            </div>
                        </RoundedContainer>
                    )}
                </Content>
                <Drawer
                    title={<span className="dark:text-white">Prompt History</span>}
                    placement="right"
                    onClose={() => setIsHistoryDrawerOpen(false)}
                    open={isHistoryDrawerOpen}
                    width={400}
                    className="dark:bg-[#181818] [&_.ant-drawer-close]:dark:text-white"
                    styles={{
                        body: {
                            background: 'var(--ant-bg-color)',
                        },
                        header: {
                            background: 'var(--ant-bg-color)',
                            borderBottom: '1px solid var(--ant-border-color)',
                        }
                    }}
                >
                    {false ? (
                        <></>
                        // <div className="flex justify-center items-center h-full">
                        //     <Spin size="large" />
                        // </div>
                    ) : (
                        <div className="space-y-4">
                            {historyData?.data[0].map((prompt: any, index: any) => (
                                <div
                                    key={index}
                                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => handlePromptSelect(prompt?.user_prompt)}
                                >
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{prompt?.user_prompt}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Drawer>
            </Layout>
        </Layout>
    );
};

export default DataGridView; 