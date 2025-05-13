import GridView from "@Components/GridView";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { renderEmployeeColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@Constants/queryKeys";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { PAGE_SIZE } from "@Constants/app";

const EmployeeView = () => {
    const { data: employeeResponse, isFetching } = useEmployeeListing();

    const employees = employeeResponse?.data?.employees || [];
    return (
        <RoundedContainer className="my-4 mx-4"> 
            <GridView
                showPagination
                totalCount={employeeResponse?.data?.count}
                onPaginate={(page) => {
                    // pageClickHandler(page);
                }}
                pageSize={PAGE_SIZE}
                isLoading={isFetching}
                isFetching={isFetching}
                data={employees}
                columns={renderEmployeeColumns()}
                pagination={{
                    total: 10
                }}
                selectedPage={1}
                reactFiltersRender={() => (
                    <div>
                        <h1 className="font-[500] text-xxl text-dark-main border-bottom h-[56px] dark:text-white">
                            Company Employees
                        </h1>
                    </div>
                )}
            />
        </RoundedContainer>
    );
};

export default EmployeeView;

const useEmployeeListing = () => {
    return useQuery([queryKeys.employee.getEmployee], async () => {
        const { ok, data } = await GetEmployeeRoles();
        if (ok) {
            return data;
        }
        throw new Error("Failed to fetch employee roles");
    });
};

async function GetEmployeeRoles() {
    const response = await ApiService.get(`${API_CONFIG_URLS.EMPLOYEE.LISTING}`);
    return response;
}
