import { Flex } from "antd";
import { Link } from "react-router-dom";

import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import BackIcon from "@Assets/icons/backIcon.svg";
import EditIcon from "@Assets/icons/editIcon.svg";

interface ProductDetailsHeaderType {
    productId: string | undefined;
    backButtonClickHandler: () => void;
}

export default function ProductDetailsHeader({
    productId,
    backButtonClickHandler
}: ProductDetailsHeaderType) {
    return (
        <Flex align="center" gap={"middle"} justify="space-between" className="border-bottom pb-6">
            <Flex align="center" gap={"middle"}>
                <BackIcon className="cursor-pointer mt-[3px]" onClick={backButtonClickHandler} />
                <h1 className="font-[500] text-xxl text-dark-main">Product Detail </h1>
            </Flex>
            <Link
                to={`${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_EDIT}/${productId}`}
                className="text-large text-main-orange font-[500] cursor-pointer"
            >
                Edit Product
                <EditIcon className=" ml-2" />
            </Link>
        </Flex>
    );
}
