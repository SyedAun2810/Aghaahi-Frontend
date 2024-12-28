import { Flex } from "antd";

import { CustomButton } from "@Components/Button";

import DeleteModalIcon from "@Assets/icons/deleteModalIcon.svg";
import { useDeleteProduct } from "@Pages/AppScreens/ProductManagement/Queries/ProductListQuery";
import NotificationService from "@Services/NotificationService";

const PRODUCT_DELETION_ERROR = "Product has been deleted successfully.";
type DeleteModalType = {
    onFinish: (values: any) => void;
    productId: number;
};

const DeleteProduct = ({ onFinish, productId }: DeleteModalType) => {
    const handelSuccess = async () => {
        let data = await useDeleteProduct(productId);
        if (data?.status === 200) {
            NotificationService.success(PRODUCT_DELETION_ERROR);
        }
        onFinish(productId);
    };

    const handelClose = () => {
        onFinish(productId);
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-center mb-3 ">
                <DeleteModalIcon />
                <h1 className="font-[400] text-heading text-#202224 mb-2 mt-5">Delete Product</h1>
                <p className="font-[400] text-large text-#202224">
                    Are you sure you want to delete this product?
                </p>
            </div>
            <Flex justify="center" className="mt-8" vertical>
                <CustomButton
                    className="w-full"
                    title="Yes"
                    btnColor={"outlined"}
                    onClick={handelSuccess}
                />
                <CustomButton
                    className="w-full"
                    title="Cancel"
                    htmlType="button"
                    onClick={handelClose}
                />
            </Flex>
        </div>
    );
};

export default DeleteProduct;
