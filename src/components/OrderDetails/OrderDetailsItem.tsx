import { Col, Row } from "antd";

import ColorBox from "@Components/ColorBox/ColorBox";

import DummyImage from "@Assets/images/avatar-placeholder.png";
import { ORDER_STATUS } from "@Constants/app";

export type OrderDetailsItemType = {
    orderImage: string;
    orderId: string;
    productName: string;
    productCategories: string[];
    productColor: string;
    size: string;
    price: string;
    quantity: string;
    total: string;
    status: number;
    id: number;
    shippingFee: number;
};

const OrderDetailsItem = ({
    orderImage,
    orderId,
    productName,
    productCategories,
    productColor,
    size,
    price,
    quantity,
    total,
    status,
    id,
    shippingFee
}: OrderDetailsItemType) => {
    return (
        <Row className="flex items-center h-[150px] border-bottom">
            <Col span={8}>
                <div className="flex items-center">
                    <img
                        src={orderImage || DummyImage}
                        alt="order image"
                        className="w-[100px] h-[100px]"
                    />
                    <div className="ml-2">
                        <p className="text-light-text text-xs mb-1">{orderId}</p>
                        <p className="text-dark-main font-[500] text-base mb-1">
                            {productName || "-"}
                        </p>
                        <p className="text-dark-main text-sm ">
                            <span className="text-light-text text-sm mr-1">Category:</span>
                            {productCategories?.join(", ") || "-"}
                        </p>
                    </div>
                </div>
            </Col>
            <Col span={2}>
                <Value title={id || "-"} />
            </Col>
            <Col span={3}>
                <div
                    className={`px-[12px] py-[4px] rounded-[4px] `}
                    style={{
                        color: ORDER_STATUS[status]?.color,
                        backgroundColor: ORDER_STATUS[status]?.bgColor,
                        width: "fit-content"
                    }}
                >
                    {ORDER_STATUS[status]?.name || "--"}
                </div>
            </Col>
            <Col span={1}>
                {productColor ? (
                    <ColorBox
                        className={`w-[16px] h-[16px]`}
                        bgColor={productColor?.toLowerCase()}
                    />
                ) : (
                    "-"
                )}
            </Col>
            <Col span={2}>
                <Value title={size || "-"} />
            </Col>
            <Col span={2} className="flex items-start">
                <div className="text-center">
                    <Value title={`$${price}`} />
                </div>
            </Col>
            <Col span={2}>
                <Value title={quantity} />
            </Col>
            <Col span={2} className="flex items-start">
                <div className="text-center">
                    <Value title={`$${shippingFee}`} />
                </div>
            </Col>
            <Col span={2}>
                <Value title={`$${total}`} className="text-[16px] font-[500]" />
            </Col>
        </Row>
    );
};

const Value = ({ title, className }: { title: string | number; className?: string }) => {
    return <p className={`text-dark-main text-sm font-[400] ${className}`}>{title}</p>;
};

export default OrderDetailsItem;
