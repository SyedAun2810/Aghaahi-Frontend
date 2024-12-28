import { Col, Row } from "antd";

import OrderDetailsItem, { OrderDetailsItemType } from "./OrderDetailsItem";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

type OrderDetailsBodyType = {
    orderItems?: OrderDetailsItemType[];
    totalBill: number | string;
};

const OrderDetailsBody = (props: OrderDetailsBodyType) => {
    const { orderItems = [], totalBill } = props;
    return (
        <RoundedContainer>
            <Row className="border-bottom pb-6">
                <Col span={8}>
                    <h1 className="font-[500] text-xxl text-dark-main">Order Details</h1>
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Item #"} />
                </Col>
                <Col span={3} className="my-auto">
                    <Label title={"Status"} />
                </Col>
                <Col span={1} className="my-auto">
                    <Label title={"Color"} />
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Size"} />
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Price"} />
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Quantity"} />
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Shipping Fee"} />
                </Col>
                <Col span={2} className="my-auto">
                    <Label title={"Total Price"} />
                </Col>
            </Row>
            {orderItems?.map((order) => {
                return (
                    <OrderDetailsItem
                        key={order?.id}
                        orderImage={
                            order?.productDetails?.imageUrls?.length &&
                            order?.productDetails?.imageUrls[0]
                        }
                        orderId={order?.productDetails?.sku}
                        productName={order?.productDetails?.productName}
                        productCategories={order?.productDetails?.categories}
                        productColor={order?.productDetails?.color}
                        size={order?.productDetails?.size}
                        price={order?.productDetails?.price}
                        quantity={order?.quantity}
                        status={order?.status}
                        total={order?.totalAmount}
                        id={order?.id}
                        shippingFee={order?.shippingFee}
                    />
                );
            })}
            <Row className="mt-4">
                <Col span={21}>
                    <p className="font-[600] text-dark-main text-[16px]">Total Amount</p>
                </Col>
                <Col span={3}>
                    <p className="text-base font-[500] text-dark-main">${totalBill || "00.00"}</p>
                </Col>
            </Row>
        </RoundedContainer>
    );
};

export default OrderDetailsBody;

const Label = ({ title }: { title: string }) => {
    return <p className="text-dark-main font-[600] text-sm">{title}</p>;
};
