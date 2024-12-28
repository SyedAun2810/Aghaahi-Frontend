import { Flex, Form } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import useRequestPayoutContainer from "./useRequestPayoutContainer";

const RequestPayout = ({
    onFinish,
    availableAmount
}: {
    onFinish: (values: any) => void;
    availableAmount: number;
}) => {
    const { form, handleFinish, isRequestingPayout } = useRequestPayoutContainer(
        onFinish,
        availableAmount
    );
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-16 ">
                <h1 className="font-[400] text-heading text-#202224 mb-2">Request Payout</h1>
                <p className="font-[400] text-large text-#202224">
                    Available Amount: ${availableAmount}
                </p>
            </div>
            <Form form={form} onFinish={handleFinish} initialValues={{ payoutAmount: null }}>
                <Form.Item
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Payout Amount is required"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value && value < 1) {
                                    return Promise.reject(`Payout amount can't be less than 1.`);
                                } else {
                                    return Promise.resolve();
                                }
                            }
                        })
                    ]}
                >
                    <Input label="Payout Amount" placeholder="$00.00" type={"number"} />
                </Form.Item>
                <Form.Item>
                    <Flex justify="center" className="mt-8">
                        <CustomButton
                            className="w-[90%]"
                            title="Send Request"
                            htmlType="submit"
                            disabled={form.getFieldValue("amount") < availableAmount}
                            isLoading={isRequestingPayout}
                        />
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RequestPayout;
