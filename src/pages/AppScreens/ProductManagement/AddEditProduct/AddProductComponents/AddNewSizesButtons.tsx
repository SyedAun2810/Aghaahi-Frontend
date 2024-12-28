import { Flex, Image } from "antd";

import { CustomButton } from "@Components/Button";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import AddImageIcon from "@Assets/icons/addImageIcon.png";
import { useParams } from "react-router-dom";

interface AddNewSizesButtonsType {
    isLoading: boolean;
    variations: any;
    isVariationChecked: boolean;
    addImageIconClickHandler: () => void;
}
export default function AddNewSizesButtons({
    isLoading,
    variations,
    isVariationChecked,
    addImageIconClickHandler
}: AddNewSizesButtonsType) {
    const { id } = useParams();
    return (
        <>
            <div className="mt-5">
                {isVariationChecked ? (
                    <RoundedContainer>
                        {variations.length < 5 ? (
                            <Flex
                                align="center"
                                gap={"middle"}
                                justify="space-between"
                                className="border-bottom pb-4"
                            >
                                <Flex align="center" gap={"middle"}>
                                    <p className="font-[400] text-sm text-dark-main">
                                        Product Size
                                    </p>
                                    <div className="mr-4  ">
                                        <Image
                                            preview={false}
                                            alt={"add icon"}
                                            src={AddImageIcon}
                                            className={
                                                !isLoading ? "cursor-pointer" : "cursor-not-allowed"
                                            }
                                            onClick={
                                                isLoading ? () => {} : addImageIconClickHandler
                                            }
                                        />
                                    </div>
                                </Flex>
                            </Flex>
                        ) : null}
                        <div className={variations.length < 5 ? "mt-5" : ""}>
                            <CustomButton
                                title={id ? "Update Product" : "Add Product"}
                                htmlType={"submit"}
                                className={`text-base w-[30%] mb-0 ${
                                    variations.length < 5 ? "" : "mt-0"
                                }`}
                                isLoading={isLoading}
                            />
                        </div>
                    </RoundedContainer>
                ) : null}
            </div>
        </>
    );
}
