import { Col, Flex, Form, Row } from "antd";
import { useNavigate } from "react-router-dom";

import BackIcon from "@Assets/icons/backIcon.svg";
import Select from "@Components/CustomSelect/CustomSelect";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { CustomButton } from "@Components/Button";

const items = [
    { value: "1", label: "Paid" },
    { value: "2", label: "In Process" },
    { value: "3", label: "Dispatched" }
];

interface OrderDetailsType {
    customerName: string;
    contactNumber: string;
    email: string;
    address: string;
    orderId: string;
    onGenerateButtonClick: () => void;
}
const GENERATE_LABEL_KEY = "Generate Labels";
const OrderDetailsHeader = (data: OrderDetailsType) => {
    const { orderId, customerName, contactNumber, email, address, onGenerateButtonClick } = data;
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSelectChange = (value: string) => {
        console.log("Selected Value:", value);
    };

    return (
        <RoundedContainer>
            <Flex
                align="center"
                gap={"middle"}
                justify="space-between"
                className="border-bottom pb-4"
            >
                <Flex align="center" gap={"middle"}>
                    <BackIcon
                        className="cursor-pointer mt-[3px]"
                        onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT)}
                    />
                    <h1 className="font-[500] text-xxl text-dark-main">Order #{orderId}</h1>
                </Flex>
                <Flex align="center" gap={"middle"}>
                    <Form
                        form={form}
                        initialValues={{ status: "Paid" }}
                        onFinish={handleSelectChange}
                    >
                        <Form.Item name="status">
                            <Select
                                options={items}
                                className="w-[115px]"
                                value={"In Process"}
                                disabled
                            />
                        </Form.Item>
                    </Form>
                    <CustomButton
                        title={GENERATE_LABEL_KEY}
                        className="w-[160px] text-sm mt-0 mb-[1.5em]"
                        textClassName=" font-[500]"
                        onClick={onGenerateButtonClick}
                    />
                </Flex>
            </Flex>
            <div>
                <p className="text-[14px] font-[400] text-dark-main my-4 ">Delivery Details</p>
                <Row className="px-4  border-bottom pb-4 pt-2" gutter={[10, 20]}>
                    <Col xxl={5} xl={5} lg={12} md={12} xs={24}>
                        <Label title="Customer Name" />
                        <Value value={customerName} />
                    </Col>
                    <Col xxl={5} xl={5} lg={12} md={12} xs={24}>
                        <Label title="Contact #" />
                        <Value value={contactNumber} />
                    </Col>
                    <Col xxl={6} xl={6} lg={12} md={12} xs={24}>
                        <Label title="Email" />
                        <Value value={email} />
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} xs={24}>
                        <Label title="Address" />
                        <Value value={address} />
                    </Col>
                </Row>
            </div>
        </RoundedContainer>
    );
};

export default OrderDetailsHeader;

const Label = ({ title }: { title: string }) => {
    return <p className="text-#717171 text-xs font-[400] mb-1">{title}</p>;
};

const Value = ({ value }: { value: string }) => {
    return <p className="text-dark-main text-[14px] font-[400] break-words">{value}</p>;
};
