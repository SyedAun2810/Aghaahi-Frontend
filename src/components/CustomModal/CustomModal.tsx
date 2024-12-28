import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState, ReactNode, Ref } from "react";
import ModalCloseIcon from "@Assets/icons/modalCloseIcon.svg";
import { CustomModalProps, ModalMethods } from "@Utils/types";

const CustomModal = forwardRef<ModalMethods, CustomModalProps>((props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [canCloseModal, setCanCloseModal] = useState(true);

    useImperativeHandle(ref, () => ({
        openModal: () => {
            setModalOpen(true);
        },
        closeModal: () => {
            setModalOpen(false);
        },
        canCloseModal: () => {
            setCanCloseModal(true);
        },
        canNotCloseModal: () => {
            setCanCloseModal(false);
        }
    }));

    return (
        <Modal
            maskClosable={canCloseModal}
            {...props}
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            centered
            footer={null}
            closable={true}
            closeIcon={<ModalCloseIcon />}
        >
            <div className={`px-2 py-4 ${props.bodyClass}`}>{props.children}</div>
        </Modal>
    );
});

export default CustomModal;
