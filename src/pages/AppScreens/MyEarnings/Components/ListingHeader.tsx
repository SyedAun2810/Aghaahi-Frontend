import { Dayjs } from "dayjs";

import FilterButton from "@Components/FilterButton/FilterButton";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import { MyEarningFilterDataTypes } from "../useMyEarningsContainer";

type InputChangeTypes = {
    fieldName: string;
    searchValue: string;
};

type OrderListingHeaderType = {
    clearFilter: () => void;
    filterData: MyEarningFilterDataTypes;
    updateValuesHandler: ({ value, updatePageToDefault }: any) => void;
    onChangeSearch: ({ searchValue, fieldName }: InputChangeTypes) => void;
};

const END_DATE_KEY = "EndDate";
const START_DATE_KEY = "StartDate";
export default function ListingHeader({
    clearFilter,
    filterData,
    onChangeSearch,
    updateValuesHandler
}: OrderListingHeaderType) {
    const onChangeInput = (text: string) => {
        onChangeSearch({ searchValue: text, fieldName: "SearchBy" });
    };
    const onChangingDate = (dateKey: string) => (date: Dayjs | null) => {
        updateValuesHandler({
            value: { [dateKey]: date },
            updatePageToDefault: true
        });
    };

    return (
        <div className="grid xl:grid-cols-1 2xl:grid-cols-2 border-bottom py-4">
            <div></div>
            <div className=" mt-3 2xl:mt-0">
                <div className="flex justify-end md:flex-row flex-col">
                    <div className="flex"></div>
                    <div className="flex mt-3 md:mt-0">
                        <CustomDatePicker
                            endDate={filterData?.EndDate}
                            startDate={filterData?.StartDate}
                            updateEndDate={onChangingDate(END_DATE_KEY)}
                            updateStartDate={onChangingDate(START_DATE_KEY)}
                            className="ml-0 md:ml-2"
                            inputCustomClass={"w-full md:w-[130px] 2xl:w-[140px] "}
                        />
                        <FilterButton
                            className={"ml-2 cursor-pointer shrink-0 flex-grow"}
                            onClick={clearFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
