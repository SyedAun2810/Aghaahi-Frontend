import { CustomButton } from "@Components/Button";
import { SelectInput } from "@Components/SelectInput";
import { BANNER_STATUS_OPTIONS } from "@Constants/app";
import { Flex } from "antd";

export default function ListingHeader({
    bannerRequestHandler,
    selectedStatus,
}: {
    bannerRequestHandler: () => void;
    selectedStatus: string;
}) {
    return (
        <Flex align="center" justify="space-between" className="border-bottom h-[56px] pb-4">
            <h1 className="font-[500] text-xxl text-dark-main ">Request Management</h1>
        </Flex>
    );
}
