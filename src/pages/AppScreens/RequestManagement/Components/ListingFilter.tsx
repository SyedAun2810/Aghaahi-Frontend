import { Dayjs } from "dayjs";

import { SelectInput } from "@Components/SelectInput";
import FilterButton from "@Components/FilterButton/FilterButton";
import { BANNER_STATUS_OPTIONS, BANNER_TYPES } from "@Constants/app";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import CustomSearch from "@Components/CustomSearch/CustomSearch";

type ListingFiltersType = {
    endDate: Dayjs | null;
    startDate: Dayjs | null;
    clearFilter: () => void;
    selectedType?: string;
    selectedStatus?: string;
    updateValuesHandler: ({ value, updatePageToDefault }: any) => void;
};

export default function ListingFilters({
    endDate,
    startDate,
    clearFilter,
    selectedType,
    selectedStatus,
    updateValuesHandler
}: ListingFiltersType) {
    const typeStatusUpdateHandler = (value: string, isType: boolean) => {
        updateValuesHandler({
            value: { ...(isType ? { Type: value } : { isHidden: value }) },
            updatePageToDefault: true
        });
    };

    const onFilter = (key: string) => (val: any) => {
        updateValuesHandler({
            value: { [key]: val },
            updatePageToDefault: true
        });
    };

    return (
        <div className="grid xl:grid-cols-1 2xl:grid-cols-2 border-bottom py-4">
            <div><CustomSearch debounceSearch={() => {}}/></div>
            <div className=" mt-3 2xl:mt-0">
                <div className="flex justify-end md:flex-row flex-col">
                    <div className="flex">
                        <SelectInput
                            options={BANNER_STATUS_OPTIONS}
                            onChange={(value) => typeStatusUpdateHandler(value, false)}
                            placeholder={"Status"}
                            className="ml-2 shrink-0 flex-grow"
                            value={selectedStatus}
                        />
                    </div>
                    <div className="flex mt-3 md:mt-0">
                        <CustomDatePicker
                            endDate={endDate}
                            startDate={startDate}
                            updateEndDate={onFilter("EndDate")}
                            updateStartDate={onFilter("StartDate")}
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
