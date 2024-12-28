import utilService from "@Utils/utils.service";
import ActionIcon from "@Assets/icons/actionIcon.svg";
import { dateFormats, ORDER_STATUS } from "@Constants/app";

type ColumnTypes = {
    handleView: (orderId: number | string) => void;
};
export const renderOrderColumns = ({ handleView }: ColumnTypes) => [
    {
        title: "Order #",
        dataIndex: "id",
        key: "orderId",
        render: (data: string) => {
            return <p>{data}</p>;
        }
    },
    {
        title: "Customer Name",
        dataIndex: "shippingDetails",
        key: "shippingDetails",
        render: (data: string) => {
            return <p>{data?.name || "--"}</p>;
        }
    },
    {
        title: "Order Date",
        dataIndex: "createdOn",
        key: "orderDate",
        render: (data: any) => {
            return (
                <div>
                    {" "}
                    {data
                        ? utilService.formatDate(data, dateFormats.US_DATE_FORMAT_SLASH)
                        : "--"}{" "}
                </div>
            );
        }
    },
    {
        title: "Amount",
        dataIndex: "totalAmount",
        key: "amount",
        render: (data: string) => <p>{data ? `$${data}` : "$0"}</p>
    },
    {
        title: "Items",
        dataIndex: "items",
        key: "items",
        render: (data: string) => <p>{data}</p>
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (data: string) => <p>{data}</p>
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "statur",
        render: (data: string) => (
            <div
                className={`px-[12px] py-[4px] rounded-[4px] `}
                style={{
                    color: ORDER_STATUS[data]?.color,
                    backgroundColor: ORDER_STATUS[data]?.bgColor,
                    width: "fit-content"
                }}
            >
                {ORDER_STATUS[data]?.name}
            </div>
        )
    },
    {
        title: "Action",
        dataIndex: "id",
        render: (data: string) => {
            return (
                <div
                    onClick={() => handleView(data)}
                    style={{ cursor: "pointer", display: "inline-block" }}
                >
                    <ActionIcon />
                </div>
            );
        }
    }
];
