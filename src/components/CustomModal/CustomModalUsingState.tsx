import { Modal } from "antd";
import ModalCloseIcon from "@Assets/icons/modalCloseIcon.svg";

export default function CustomModalUsingState({
    isOpen,
    modalCloseHandler,
    bodyClass,
    children,
    ...rest
}: any) {
    return (
        <Modal
            maskClosable={false}
            open={isOpen}
            onCancel={modalCloseHandler}
            centered
            footer={null}
            closable={true}
            closeIcon={<ModalCloseIcon />}
            {...rest}
        >
            <div className={`px-2 py-4 ${bodyClass}`}>{children}</div>
        </Modal>
    );
}
