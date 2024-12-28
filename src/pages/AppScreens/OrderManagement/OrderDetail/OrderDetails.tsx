import { Flex } from "antd";

import OrderDetailsBody from "@Components/OrderDetails/OrderDetailsBody";
import OrderDetailsHeader from "@Components/OrderDetails/OrderDetailsHeader";
import useOrderDetails from "./useOrderDetails";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";

const OrderDetails = () => {
    const { detailsData, isOrderDataLoading, onGenerateButtonClick } = useOrderDetails();

    if (isOrderDataLoading) {
        return <ProgressLoader />;
    }
    return (
        <Flex className="" vertical gap={"large"}>
            <OrderDetailsHeader
                customerName={detailsData?.shippingDetails?.name}
                contactNumber={detailsData?.shippingDetails?.phoneNumber}
                email={detailsData?.shippingDetails?.email}
                address={detailsData?.shippingDetails?.fullAddress}
                orderId={detailsData?.id}
                onGenerateButtonClick={onGenerateButtonClick}
            />

            <OrderDetailsBody
                orderItems={detailsData?.orderItems}
                totalBill={detailsData?.totalAmount}
            />
        </Flex>
    );
};

export default OrderDetails;
