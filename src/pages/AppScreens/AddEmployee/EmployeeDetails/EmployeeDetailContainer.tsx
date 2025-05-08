import { queryClient } from "@Api/Client";
import { queryKeys } from "@Constants/queryKeys";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import NotificationService from "@Services/NotificationService";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDeleteCoupon } from "../Queries/DeleteCoupon";
// import { useCouponDetails } from "../Queries/CouponDetails";

const COUPON_DELETE_SUCCESS_MESSAGE = "Coupon has been deleted successfully.";
export default function useCouponDetailsContainer() {
    const { id: couponId } = useParams();
    const navigate = useNavigate();

    const deleteCouponModalRef = useRef();

    // const backButtonClick = () => {
    //     navigate(NavigationRoutes.DASHBOARD_ROUTES.COUPON_MANAGEMENT);
    // };

    // // getting data for update
    // const { data: couponDetailsData, isLoading: isCouponDataLoading } = useCouponDetails({
    //     couponId: Number(couponId)
    // });

    // // delete functionality

    // //delete category api logic
    // const { mutateAsync: deleteCoupon, isError: deleteCouponError } = useDeleteCoupon();

    // const deleteIconClickHandler = (id: number) => {
    //     deleteCouponModalRef?.current?.openModal();
    // };

    // const modalCloseHandler = () => {
    //     deleteCouponModalRef?.current?.closeModal();
    // };

    // delete handling
    const deleteHandler = async () => {
        // await deleteCoupon(Number(couponId));
        // NotificationService.success(COUPON_DELETE_SUCCESS_MESSAGE);
        // deleteCouponModalRef?.current?.closeModal();
        // if (!deleteCouponError) {
        //     queryClient.invalidateQueries({
        //         queryKey: [queryKeys.couponManagement.listing]
        //     });
        //     navigate(NavigationRoutes.DASHBOARD_ROUTES.COUPON_MANAGEMENT);
        // }
    };

    return {
        // deleteHandler,
        // couponDetailsData,
        // backButtonClick,
        // modalCloseHandler,
        // isCouponDataLoading,
        // deleteCouponModalRef,
        // deleteIconClickHandler
    };
}
