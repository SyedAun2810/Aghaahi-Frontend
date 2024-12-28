import { Link } from "react-router-dom";

import Status from "@Components/Status/Status";
import { PlanType } from "@Constants/app";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";
import CustomSwitch from "@Components/CustomSwitch/CustomSwitch";

type BannerColumnsType = {
    onStatusUpdateClick: (id: number) => void;
    handleReOrder: (id: number) => void;
};

export const renderBannerColumns = ({ onStatusUpdateClick, handleReOrder }: BannerColumnsType) => [
    {
        title: "S.No",
        dataIndex: "id",
        key: "sNo",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
           render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (data: string) => {
            return <p>{data}</p>;
        }
    },
    {
        title: "Status",
        dataIndex: "isBoosted",
        key: "status",
        align: "center",
        render: (data: boolean) => {
            return <Status active={data} />;
        }
    },
    {
        title: "Action",
        // dataIndex: "isBoosted",
        key: "action",
        align: "center",
        render: (data: any) => {
            return (
                <div className="flex justify-center gap-2">
                    <CustomSwitch isDisabled handleUpdate={() =>{}}/>
                    <Link
                        to={`${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT_DETAILS}/${data?.id}`}
                        className="mr-2"
                    >
                        <DetailsIcon />
                    </Link>
                </div>
            );
        }
    }
];
