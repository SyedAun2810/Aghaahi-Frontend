import { Form } from "antd";

import { queryClient } from "@Api/Client";
import { queryKeys } from "@Constants/queryKeys";
import { useRequestPayout } from "../Queries/RequestPayout";
import NotificationService from "@Services/NotificationService";

const SUCCESS_MSG = "Request has been made successfully.";
const AMOUNT_VALIDATION_MSG = "Requested amount must be less than available amount.";
export default function useRequestPayoutContainer(
    onFinish: (values: any) => void,
    availableAmount: number
) {
    const [form] = Form.useForm();

    const onPayoutRequestSuccess = () => {
        NotificationService.success(SUCCESS_MSG);
        queryClient.invalidateQueries({ queryKey: [queryKeys.myEarningManagement.payoutListing] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.myEarningManagement.listing] });
        onFinish();
        form.resetFields();
    };
    const { mutateAsync: payoutRequestMutate, isLoading: isRequestingPayout } = useRequestPayout({
        onSuccess: onPayoutRequestSuccess
    });

    const handleFinish = (values: any) => {
        if (values?.amount > Number(availableAmount)) {
            NotificationService.error(AMOUNT_VALIDATION_MSG);
            return;
        }
        payoutRequestMutate({ payload: values });
    };
    return {
        form,
        handleFinish,
        isRequestingPayout
    };
}
