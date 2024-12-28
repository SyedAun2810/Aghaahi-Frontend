import { Avatar } from "antd";
import { Link } from "react-router-dom";

import utilService from "@Utils/utils.service";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import EditIcon from "@Assets/icons/editIcon.svg";
import DeleteIcon from "@Assets/icons/deleteIcon.svg";
import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";

export default function tableColumns({
    deleteIconClickHandler
}: {
    deleteIconClickHandler: (id: number) => void;
}) {
    return [
        {
            title: "Product Image",
            dataIndex: "defaultImage",
            key: "productImage",
            render: (data: string) => {
                return (
                    <div className="my-3">
                        <Avatar
                            className="rounded"
                            shape="square"
                            size={100}
                            src={<img src={data?.compressed} alt="avatar" />}
                        />
                    </div>
                );
            }
        },
        {
            title: "Sku #",
            dataIndex: "sku",
            key: "sku",
            render: (data: string) => <p className="max-w-[200px]">{data}</p>
        },
        {
            title: "Category",
            dataIndex: "categories",
            key: "category",
            render: (data: string) => <p>{data[0]?.name || "--"}</p>
        },
        {
            title: "Product Title",
            dataIndex: "name",
            key: "productTitle",
            render: (data: string) => <p className="max-w-[200px]">{data}</p>
        },
        {
            title: "Date Added",
            dataIndex: "createdOn",
            key: "dateAdded",
            render: (data: string) => <p>{utilService.formatDate(data, "MM/DD/YYYY")}</p>
        },
        {
            title: "Variations",
            dataIndex: "variations",
            key: "variations",
            render: (data: string) => <p>{data ? "Yes" : "No"}</p>
        },
        {
            title: "Starting Price",
            dataIndex: "price",
            key: "startingPrice",
            render: (data: string) => <p>${data}</p>
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (data: number) => (
                <div>
                    <Link
                        to={`${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_DETAILS}/${data}`}
                        className="mr-2"
                    >
                        <DetailsIcon />
                    </Link>
                    <Link
                        to={`${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_EDIT}/${data}`}
                        className="mr-2"
                    >
                        <EditIcon />
                    </Link>
                    <div
                        onClick={() => deleteIconClickHandler(data)}
                        className="inline-block cursor-pointer"
                    >
                        <DeleteIcon />
                    </div>
                </div>
            )
        }
    ];
}
