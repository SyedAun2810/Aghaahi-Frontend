import { dateFormats } from "@Constants/app";
import utilService from "@Utils/utils.service";
import { Link } from "react-router-dom";

import EditIcon from "@Assets/icons/editIcon.svg";
import DeleteIcon from "@Assets/icons/deleteIcon.svg";
import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

export const renderEmployeeColumns = () => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (data: number) => {
            return <p>{data || "--"}</p>;
        }
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (data: string) => <p>{data || "--"}</p>
    },
    {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        render: (data: string, record: any) => (
            <p>
                {record.country_code} {data || "--"}
            </p>
        )
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (data: string) => <p>{data || "--"}</p>
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (data: boolean) => <p>{data ? "Active" : "Inactive"}</p>
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (data: string) => (
            <p>{data ? data.charAt(0).toUpperCase() + data.slice(1) : "--"}</p>
        )
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role: any) => <p>{role?.name || "--"}</p>
    },
    {
        title: "Company",
        dataIndex: "company",
        key: "company",
        render: (company: any) => <p>{company?.name || "--"}</p>
    },
    {
        title: "Created At",
        dataIndex: "company",
        key: "created_at",
        render: (company: any) => (
            <p>
                {company?.created_at
                    ? utilService.formatDate(company.created_at, dateFormats.US_DATE_FORMAT_SLASH)
                    : "--"}
            </p>
        )
    },
    {
        title: "View Details",
        dataIndex: "id",
        render: (data: number) => (
            <div>
                <Link
                    to={`${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_DETAIL}/${data}`}
                    className="mr-2"
                >
                    <DetailsIcon />
                </Link>
                <Link
                    to={`${NavigationRoutes.DASHBOARD_ROUTES.UPDATE_EMPLOYEE}/${data}`}
                    className="text-large text-main-orange font-[500] cursor-pointer"
                >
                    <EditIcon className=" ml-2" />
                </Link>
            </div>
        )
    }
];
