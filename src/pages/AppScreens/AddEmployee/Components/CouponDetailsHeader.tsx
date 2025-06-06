import { Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import BackIcon from "@Assets/icons/backIcon.svg";
import EditIcon from "@Assets/icons/editIcon.svg";
import DeleteIcon from "@Assets/icons/deleteIcon.svg";
import { CustomButton } from "@Components/Button";

interface CouponDetailsHeaderType {
    status: number;
    couponId: number;
    backButtonClickHandler: () => void;
    deleteIconClickHandler: (couponId: number) => void;
}

export default function CouponDetailsHeader({
    status,
    couponId,
    backButtonClickHandler,
    deleteIconClickHandler
}: CouponDetailsHeaderType) {
    const navigate = useNavigate();

    return (
        <Flex align="center" gap={"middle"} justify="space-between" className="border-bottom pb-6 px-4 dark:border-gray-700">
            <Flex align="center" gap={"middle"}>
                <BackIcon className="cursor-pointer mt-[3px] dark:brightness-0 dark:invert" onClick={() => navigate(-1)} />
                <h1 className="font-[500] text-[1.2rem] md:text-xxl text-dark-main dark:text-white">
                    Employee Details
                </h1>
            </Flex>
            <div className="flex justify-center items-center gap-4">
                <CustomButton
                    title={"View Employee Chat"}
                    className="text-sm px-4 py-2 w-auto h-auto dark:bg-[#5950CB] dark:text-white dark:hover:bg-[#4a42b3]" // Smaller text and button size
                    onClick={() =>
                        navigate(`/${couponId}/${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_PROMPT_CHAT}`)
                    }
                />
                <Link
                    to={`${NavigationRoutes.DASHBOARD_ROUTES.UPDATE_EMPLOYEE}/${couponId}`}
                    className="text-large text-main-orange font-[500] cursor-pointer dark:text-orange-400"
                >
                    <EditIcon className="ml-2 dark:brightness-0 dark:invert" />
                </Link>
            </div>
        </Flex>
    );
}

export const COUPON_STATUS = {
    0: { name: "Active", bgColor: "#F380011A", color: "#F38001" },
    1: { name: "In-Active", bgColor: "#FA513A1A", color: "#FA513A" }
};
