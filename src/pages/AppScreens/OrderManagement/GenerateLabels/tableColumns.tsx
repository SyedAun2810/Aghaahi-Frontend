import { CustomButton } from "@Components/Button";
import { ButtonLoaderDataType } from "./useGenerateLabelsContainer";
import utilService from "@Utils/utils.service";
import { GENERAL_FORMAT_DATE_ONLY } from "@Constants/app";

const GENERATE_LABEL_KEY = "Generate Label";
export default function tableColumns(
    onGenerateLabelClick: (data: number) => void,
    isLabelGenerating: boolean,
    buttonLoaderData: ButtonLoaderDataType
) {
    return [
        {
            title: "Item #",
            dataIndex: "orderItemId",
            key: "order"
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Weight (lb)",
            dataIndex: "weight",
            key: "weight",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Width (in)",
            dataIndex: "width",
            key: "width",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Length (in)",
            dataIndex: "length",
            key: "length",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Height (in)",
            dataIndex: "height",
            key: "height",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Due Date",
            dataIndex: "expectecdMailingDate",
            key: "expectedMailingDate",
            render: (data: string) => (
                <div> {data ? utilService.formatDate(data, GENERAL_FORMAT_DATE_ONLY) : "--"} </div>
            )
        },
        {
            title: "Mailing Date",
            dataIndex: "mailingDate",
            key: "mailingDate",
            render: (data: string) => (
                <div> {data ? utilService.formatDate(data, GENERAL_FORMAT_DATE_ONLY) : "--"} </div>
            )
        },
        {
            title: "Tracking Number",
            dataIndex: "trackingNumber",
            key: "trackingNumber",
            render: (data: string) => <p>{data || "--"}</p>
        },
        {
            title: "Action",
            headerAlign: "center",
            align: "center",
            key: "newkey",
            render: (data: any) => {
                return !data?.trackingNumber ? (
                    <>
                        {" "}
                        <CustomButton
                            title={GENERATE_LABEL_KEY}
                            isLoading={
                                !buttonLoaderData.isGenerateAllSelected &&
                                isLabelGenerating &&
                                buttonLoaderData.selectedPackageId === data.id
                            }
                            className="w-[160px] text-sm my-0"
                            textClassName=" font-[500]"
                            onClick={() => onGenerateLabelClick(data?.id)}
                        />
                    </>
                ) : (
                    <a href={data?.labelDocument?.url} target="_blank">
                        Download PDF
                    </a>
                );
            }
        }
    ];
}
