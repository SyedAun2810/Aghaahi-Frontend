import { Form } from "antd";
import { RequestModalType } from "./PaymentDetailsAccess";
import { usePasswordVerification } from "../Queries/PasswordVerification";

export default function usePaymentDetailsAccess({ onFinish }: RequestModalType) {
    const [form] = Form.useForm();

    const onPasswordVerificationSuccess = () => {
        onFinish();
    };
    const { mutateAsync: PasswordVerificationMutate, isLoading: isPasswordVerifying } =
        usePasswordVerification({ onSuccess: onPasswordVerificationSuccess });

    const handleFinish = (values: any) => {
        PasswordVerificationMutate({ payload: values });
        form.resetFields();
    };

    return {
        form,
        handleFinish,
        isPasswordVerifying
    };
}
