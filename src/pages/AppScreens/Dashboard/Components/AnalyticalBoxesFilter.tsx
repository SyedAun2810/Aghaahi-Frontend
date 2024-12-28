import { Dayjs } from "dayjs";

import FilterButton from "@Components/FilterButton/FilterButton";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import { AnalyticalBoxesFilterDataTypes } from "../useDashboardContainer";

const END_DATE_KEY = "EndDate";
const START_DATE_KEY = "StartDate";

export type AnalyticalBoxesFilterType = {
    clearFilterHandler: () => void;
    filtersData: AnalyticalBoxesFilterDataTypes;
    addValues: ({ value, updatePageToDefault }: any) => void;
};

export default function AnalyticalBoxesFilter({
    clearFilterHandler,
    filtersData,
    addValues
}: AnalyticalBoxesFilterType) {
    const onChangingDate = (dateKey: string) => (date: Dayjs | null) => {
        addValues({
            value: { [dateKey]: date },
            updatePageToDefault: true
        });
    };

    return (
        <div className=" mt-3 2xl:mt-0">
            <div className="flex justify-end md:flex-row flex-col">
                <div className="flex"></div>
                <div className="flex mt-3 md:mt-0">
                    <CustomDatePicker
                        endDate={filtersData?.EndDate}
                        startDate={filtersData?.StartDate}
                        updateEndDate={onChangingDate(END_DATE_KEY)}
                        updateStartDate={onChangingDate(START_DATE_KEY)}
                        className="ml-0 md:ml-2"
                        inputCustomClass={"w-full md:w-[130px] 2xl:w-[140px] "}
                    />
                    <FilterButton
                        className={"ml-2 cursor-pointer shrink-0 flex-grow"}
                        onClick={clearFilterHandler}
                    />
                </div>
            </div>
        </div>
    );
}
