import dayjs from "dayjs";

import utilService from "@Utils/utils.service";
import Status from "@Components/Status/Status";
import { GENERAL_FORMAT_DATE_ONLY, PlanType } from "@Constants/app";

export default function renderBannerColumns() {
    return [
        {
            title: "Request#",
            dataIndex: "id",
            key: "sNo",
            render: (data: string) => {
                return <p>{data}</p>;
            }
        },
        {
            title: "Banner Type",
            dataIndex: "package",
            key: "bannerType",
            render: (data: string) => <div> {PlanType[data?.type]?.name || "--"} </div>
        },

        {
            title: "Date Requested",
            dataIndex: "requestedDate",
            key: "dateRequested",
            render: (data: string) => (
                <div> {data ? utilService.formatDate(data, GENERAL_FORMAT_DATE_ONLY) : "--"} </div>
            )
        },
        {
            title: "Validity (To/From)",
            key: "validityRange",
            render: (data: string) => (
                <div>{utilService.calculateValidity(data?.startDate, data?.endDate)}</div>
            )
        },
        {
            title: "Duration",
            key: "duration",
            render: (data: string) => (
                <div>{`${utilService.calculateDuration(data?.startDate, data?.endDate)}`}</div>
            )
        },
        {
            title: "Remaining",
            key: "remaining",
            render: (data: string) => (
                <div>
                    {" "}
                    {data?.endDate
                        ? utilService.calculateRemainingDays(
                              dayjs.utc().format(GENERAL_FORMAT_DATE_ONLY),
                              data?.endDate
                          )
                        : "--"}
                </div>
            )
        },
        {
            title: "Status",
            dataIndex: "isBoosted",
            key: "status",
            align: "center",
            render: (data: boolean) => {
                return <Status active={data} />;
            }
        }
    ];
}
