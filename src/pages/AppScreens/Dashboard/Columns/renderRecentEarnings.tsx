import utilService from "@Utils/utils.service";
import { dateFormats, payoutStatus } from "@Constants/app";

export default function renderRecentEarnings() {
    return [
        {
            title: "id",
            dataIndex: "id",
            key: "serialNo",
            render: (data: string) => {
                return <p>{data || "--"}</p>;
            }
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "Amount",
            render: (data: string) => (
                <p>{!utilService.isNullOrUndefined(data) ? `$${data}` : "--"}</p>
            )
        },
        {
            title: "Date Requested",
            dataIndex: "requestedDate",
            key: "dateRequested",
            render: (data: string) => (
                <p>
                    {" "}
                    {data ? utilService.formatDate(data, dateFormats.US_DATE_FORMAT_SLASH) : "--"}
                </p>
            )
        },
        {
            title: "Date Transferred",
            dataIndex: "transferredDate",
            key: "dateTransferred",
            render: (data: string) => (
                <p>
                    {data ? utilService.formatDate(data, dateFormats.US_DATE_FORMAT_SLASH) : "--"}
                </p>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (data: number) => <p>{payoutStatus[data] || "--"}</p>
        }
    ];
}
