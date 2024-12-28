import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "@Components/Button";
import { Flex } from "antd";

const USPS_WARNING = "Kindly connect to the USPS account first.";
export default function ProductListingHeader({
    AddProductHandler,
    isUspsConnected
}: {
    AddProductHandler: () => void;
    isUspsConnected: boolean;
}) {
    return (
        <Flex
            className={`border-bottom h-[h-[${isUspsConnected ? "56" : "66"}px] pb-4`}
            justify="space-between"
            align="center"
        >
            <div>
                <h1 className="font-[500] text-xxl">Product Management</h1>
                {!isUspsConnected && (
                    <p className="text-[red] font-[500] mt-2">
                        <ExclamationCircleOutlined className="mr-1" />
                        {USPS_WARNING}
                    </p>
                )}
            </div>

            <div className="text-right ">
                <CustomButton
                    title="Add Product"
                    className="w-[150px] text-sm mb-0"
                    textClassName=" font-[500]"
                    onClick={AddProductHandler}
                    disabled={!isUspsConnected}
                />
            </div>
        </Flex>
    );
}
