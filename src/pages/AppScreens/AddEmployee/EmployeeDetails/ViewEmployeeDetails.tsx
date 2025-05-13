import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import useCouponDetailsContainer from "./EmployeeDetailContainer";
import EmployeeDetailBody from "../Components/CouponDetailBody";
import CouponDetailsHeader from "../Components/CouponDetailsHeader";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";

export default function ViewEmployeeDetails() {
    const { id: employeeId } = useParams();

    const { data: employeeDetails, isLoading: isEmployeeLoading } = useEmployeeDetail(employeeId);

    const data = employeeDetails?.data;

    if (isEmployeeLoading) {
        return <FullPageLoader />;
    }
    //console.log(data);
    return (
        <>
            <Flex className="min-h-screen bg-light-bg dark:bg-[#212121]" vertical gap={"large"}>
                <RoundedContainer className="mx-4 my-4 p-8" >
                    <CouponDetailsHeader
                        status={0}
                        couponId={Number(employeeId)}
                        backButtonClickHandler={()=>{
                            //console.log('backButtonClickHandler');
                        }}
                        deleteIconClickHandler={()=>{
                            //console.log('backButtonClickHandler');
                        }}
                    />
                    <EmployeeDetailBody data={data || {}} />
                </RoundedContainer>
            </Flex>
            {/* <CustomModal ref={deleteCouponModalRef}>
                <DeleteCouponModal
                    deleteHandler={deleteHandler}
                    modalCloseHandler={modalCloseHandler}
                    selectedCouponId={Number(couponId)}
                />
            </CustomModal> */}
        </>
    );
}
const useEmployeeDetail = (id: string | undefined) => {
    return useQuery(
        [queryKeys.employee.getEmployeeDetail], // Unique query key with employee ID
        async () => {
            if (!id) throw new Error("Employee ID is required");
            const { ok, data } = await GetEmployeeDetail(Number(id));
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch employee details");
        },
        {
            enabled: !!id // Only fetch if `id` is provided
        }
    );
};

async function GetEmployeeDetail(id: number) {
    const response = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.DETAIL}/${id}`);
    return response;
}