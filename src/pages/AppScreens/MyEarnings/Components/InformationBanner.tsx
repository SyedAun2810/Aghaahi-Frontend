import { Col, Flex, Form, Row } from "antd";

import AnalyticsCard from "@Components/AnalyticsCard/AnalyticsCard";
import CompleteOrderIcon from "@Assets/icons/completedOrdersIcon.svg";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import { CustomButton } from "@Components/Button";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import FilterButton from "@Components/FilterButton/FilterButton";
import { useRef } from "react";
import CustomModal from "@Components/CustomModal/CustomModal";
import RequestBannerModal from "@Pages/AppScreens/MyEarnings/RequestPayout/RequestBannerModal";
import EarningTickIcon from "@Assets/icons/earningTickIcon.svg";
const InformationBanner = () => {
    const [form] = Form.useForm();
    const modalRef = useRef();

    return (
        <RoundedContainer>
            <Flex className="border-bottom" justify="space-between" align="center">
                <h1 className="font-[500] text-xxl">My Earnings</h1>
                <CustomButton
                    title="Request Payout"
                    className="w-[150px] text-sm "
                    textClassName=" font-[500]"
                    onClick={() => {
                        modalRef.current.openModal();
                    }}
                />
            </Flex>
            <Row className="border-bottom py-4" justify="space-between" gutter={[0, 10]}>
                <Col xxl={8} xl={8} lg={24}>
                    <CustomSearch debounceSearch={() => {}} />
                </Col>
                <Col xxl={16} xl={16} lg={24} className="flex justify-end">
                    <Form form={form} onFinish={(values) => {}} className="flex">
                        <CustomDatePicker
                            form={form}
                            inputCustomClass={"w-full md:w-[130px] 2xl:w-[140px] "}
                        />
                        <FilterButton className={"ml-2 cursor-pointer"} htmlType="submit" />
                    </Form>
                </Col>
            </Row>
            <Row gutter={[20, 0]} className="pt-4">
                <Col span={8}>
                    <AnalyticsCard
                        title="Available Amount"
                        count={"$ 215"}
                        icon={<EarningTickIcon />}
                        percentageValue={8.5}
                        up
                        percentTextClassName="pl-12"
                    />
                </Col>
                <Col span={8}>
                    <AnalyticsCard
                        title="Total Earnings"
                        count={"$ 15.2k"}
                        icon={<EarningTickIcon />}
                        percentageValue={8.5}
                        up
                        percentTextClassName="pl-12"
                    />
                </Col>
                <Col span={8}>
                    <AnalyticsCard
                        title="Payout Requested"
                        count={"$ 250"}
                        icon={<EarningTickIcon />}
                        percentageValue={8.5}
                        up={false}
                        percentTextClassName="pl-12"
                    />
                </Col>
            </Row>
            <CustomModal ref={modalRef}>
                <RequestBannerModal
                    onFinish={(values: any) => {
                        modalRef.current?.closeModal();
                    }}
                />
            </CustomModal>
        </RoundedContainer>
    );
};

export default InformationBanner;
