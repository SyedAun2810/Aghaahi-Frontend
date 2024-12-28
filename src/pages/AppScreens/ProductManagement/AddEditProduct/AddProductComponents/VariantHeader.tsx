import { Flex } from "antd";

import DeleteIcon from "@Assets/icons/deleteIcon.svg";

interface VariantHeaderTypes {
    isLoading: boolean;
    selectedSize: string;
    handleVariantRemove: (selectedSize: string) => void;
}

export default function VariantHeader({
    isLoading,
    selectedSize,
    handleVariantRemove
}: VariantHeaderTypes) {
    return (
        <>
            <Flex
                align="center"
                gap={"middle"}
                justify="space-between"
                className="border-bottom pb-4"
            >
                <Flex align="center" gap={"middle"}>
                    <p className="font-[500] text-sm text-dark-main">{selectedSize}</p>
                </Flex>
                <DeleteIcon
                    className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
                    onClick={isLoading ? () => {} : () => handleVariantRemove(selectedSize)}
                />
            </Flex>
        </>
    );
}
