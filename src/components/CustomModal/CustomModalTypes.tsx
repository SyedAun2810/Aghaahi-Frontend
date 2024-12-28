export type ModalMethods = {
    openModal: () => void;
    closeModal: () => void;
    canCloseModal: () => void;
    canNotCloseModal: () => void;
    afterCloseHandler?: () => void;
    bodyClass?: string;
};
