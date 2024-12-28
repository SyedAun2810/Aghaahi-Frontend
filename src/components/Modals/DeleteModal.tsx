import { Flex } from "antd";

import { CustomButton } from "@Components/Button";

import DeleteModalIcon from "@Assets/icons/deleteModalIcon.svg";

type DeleteModalType = {
    heading: string;
    mainContent: string;
    selectedSize?: string;
    confirmationSuccessHandler: (size: string | undefined) => void;
    confirmationFailureHandler: () => void;
};

const DeleteModal = ({
    heading,
    mainContent,
    selectedSize,
    confirmationFailureHandler,
    confirmationSuccessHandler
}: DeleteModalType) => {
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-3 ">
                <DeleteModalIcon />
                <h1 className="font-[400] text-heading text-#202224 mb-2 mt-5">{heading}</h1>
                <p className="font-[400] text-large text-#202224">{mainContent}</p>
            </div>
            <Flex justify="center" className="mt-8" vertical>
                <CustomButton
                    className="w-full"
                    title="Yes"
                    btnColor={"outlined"}
                    onClick={() => confirmationSuccessHandler(selectedSize)}
                />
                <CustomButton
                    className="w-full"
                    title="Cancel"
                    htmlType="button"
                    onClick={confirmationFailureHandler}
                />
            </Flex>
        </div>
    );
};

export default DeleteModal;
