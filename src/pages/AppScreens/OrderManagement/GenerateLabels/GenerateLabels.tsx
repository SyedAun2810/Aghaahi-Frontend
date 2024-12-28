import useGenerateLabelsContainer from "./useGenerateLabelsContainer";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { Flex } from "antd";
import GridView from "@Components/GridView";
import { PAGE_SIZE } from "@Constants/app";
import renderOrderColumns from "./tableColumns";

import BackIcon from "@Assets/icons/backIcon.svg";
import { CustomButton } from "@Components/Button";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const PAGE_TITLE = "Generate Labels";
const GENERATE_ALL_LABELS_KEY = "Generate All Labels";
const LABEL_GENERATION_INFO =
    "Label generated after Due Date might result in increased shipping fee.";
export default function GenerateLabels() {
    const {
        filtersData,
        pageClickHandler,
        buttonLoaderData,
        onBackButtonClick,
        isLabelGenerating,
        onGenerateLabelClick,
        isGenerateLabelsLoading,
        generateAllLabelsHandler,
        generateLabelsListingData
    } = useGenerateLabelsContainer();

    return (
        <RoundedContainer>
            <Flex className="border-bottom h-[65px] pb-4" justify="space-between" align="center">
                <div>
                    <Flex align="center" gap={"middle"}>
                        <BackIcon className="cursor-pointer mt-[3px]" onClick={onBackButtonClick} />
                        <h1 className="font-[500] text-xxl text-dark-main">{PAGE_TITLE}</h1>
                    </Flex>
                    <p className="text-[red] font-[500] mt-2">
                        <ExclamationCircleOutlined className="mr-1" />
                        {LABEL_GENERATION_INFO}
                    </p>
                </div>

                <div className="flex flex-col items-end">
                    <CustomButton
                        title={GENERATE_ALL_LABELS_KEY}
                        className="w-[175px] text-sm mt-0 mb-0"
                        textClassName=" font-[500]"
                        isLoading={buttonLoaderData.isGenerateAllSelected && isLabelGenerating}
                        onClick={generateAllLabelsHandler}
                    />
                </div>
            </Flex>
            <GridView
                showPagination
                columns={renderOrderColumns(
                    onGenerateLabelClick,
                    isLabelGenerating,
                    buttonLoaderData
                )}
                pagination={{
                    total: generateLabelsListingData?.pagination?.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={generateLabelsListingData?.pagination?.totalCount}
                onPaginate={(page) => {
                    pageClickHandler(page);
                }}
                selectedPage={filtersData?.PageNumber}
                pageSize={PAGE_SIZE}
                isLoading={isGenerateLabelsLoading}
                isFetching={isGenerateLabelsLoading}
                data={generateLabelsListingData?.data || []}
            />
        </RoundedContainer>
    );
}
