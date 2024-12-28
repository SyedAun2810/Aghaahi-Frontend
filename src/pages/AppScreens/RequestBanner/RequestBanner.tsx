import { Col, Row } from "antd";

import CustomModal from "@Components/CustomModal/CustomModal";
import useRequestBannerContainer, { PlanTypeTypes } from "./RequestBannerContainer";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import SubscriptionCard from "@Components/SubscriptionCard/SubscriptionCard";
import RequestBannerHeader from "@Components/RequestBanner/RequestBannerHeader";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import { durationType, PlanType } from "@Constants/app";
import LoadMoreButton from "@Components/LoadMoreButton/LoadMoreButton";
import PurchasePlanModal from "./PurchasePlan/PurchasePlan";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { useEffect } from "react";
import CustomModalUsingState from "@Components/CustomModal/CustomModalUsingState";

export const customizePlanData = (plan: PlanTypeTypes) => {
    const planType = PlanType[plan?.type]?.name || "";
    const modifiedDuration = durationType[plan?.period]?.name || "";
    const title = `${modifiedDuration} ${planType}  Advertisement`;
    const subTitle = `Advertise your ${planType} at Marketplace`;
    const duration = durationType[plan?.period]?.days;
    const amount = `$${plan?.price}`;
    return {
        title,
        subTitle,
        duration,
        amount
    };
};

const RequestBanner = () => {
    const {
        page,
        setPage,
        planData,
        onFinish,
        modalProps,
        isPurchasing,
        purchasePlanData,
        onPaymentSuccess,
        isPaymentModalOpen,
        isProductModalOpen,
        isPlanListingLoading,
        setIsPaymentModalOpen,
        setIsProductModalOpen,
        handleAdvertisementModal
    } = useRequestBannerContainer();
    const dataLength = planData?.data?.length;
    const totalCount = planData?.metadata?.totalCount;

    return (
        <>
            {isPlanListingLoading && page == 1 ? (
                <ProgressLoader />
            ) : (
                <RoundedContainer>
                    <RequestBannerHeader />
                    <Row gutter={[14, 0]} className="mt-6 pb-8 ">
                        {planData &&
                            planData?.data?.map((plan: PlanTypeTypes, idx: number) => (
                                <Col span={6} key={idx} className="mb-12 ">
                                    <SubscriptionCard
                                        title={customizePlanData(plan)?.title}
                                        subTitle={customizePlanData(plan)?.subTitle}
                                        duration={customizePlanData(plan)?.duration}
                                        amount={customizePlanData(plan)?.amount}
                                        onBtnClick={() => handleAdvertisementModal(plan)}
                                        disable={plan?.status}
                                    />
                                </Col>
                            ))}
                    </Row>
                    {!isPlanListingLoading && dataLength < totalCount ? (
                        <LoadMoreButton loadMoreClickHandler={() => setPage(page + 1)} />
                    ) : null}
                    {isPlanListingLoading && page > 1 && <ProgressLoader />}
                </RoundedContainer>
            )}
            <CustomModalUsingState
                isOpen={isProductModalOpen}
                modalCloseHandler={() => setIsProductModalOpen(false)}
                destroyOnClose
            >
                <PurchasePlanModal
                    onFinish={onFinish}
                    data={modalProps}
                    isPurchasing={isPurchasing}
                />
            </CustomModalUsingState>
            <CustomModalUsingState
                isOpen={isPaymentModalOpen}
                modalCloseHandler={() => setIsPaymentModalOpen(false)}
                destroyOnClose
            >
                <CheckoutForm
                    onFinish={onPaymentSuccess}
                    clientSecret={purchasePlanData?.clientSecret}
                />
            </CustomModalUsingState>
        </>
    );
};

export default RequestBanner;
