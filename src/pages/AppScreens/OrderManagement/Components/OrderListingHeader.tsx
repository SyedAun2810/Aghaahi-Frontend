import { Dayjs } from "dayjs";

import { SelectInput } from "@Components/SelectInput";
import FilterButton from "@Components/FilterButton/FilterButton";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import { ORDER_STATUS_OPTIONS } from "@Constants/app";

type InputChangeTypes = {
    searchValue: string;
    fieldName: string;
};

type OrderListingHeaderType = {
    endDate: Dayjs | null;
    startDate: Dayjs | null;
    clearFilter: () => void;
    selectedStatus?: string;
    updateValuesHandler: ({ value, updatePageToDefault }: any) => void;
    onChangeSearch: ({ searchValue, fieldName }: InputChangeTypes) => void;
};
export default function OrderListingHeader({
    endDate,
    startDate,
    clearFilter,
    selectedStatus,
    onChangeSearch,
    updateValuesHandler
}: OrderListingHeaderType) {
    const onChangeInput = (text: string) => {
        onChangeSearch({ searchValue: text, fieldName: "SearchBy" });
    };

    const statusUpdateHandler = (value: string) => {
        updateValuesHandler({
            value: { Status: value },
            updatePageToDefault: true
        });
    };

    const onChangingEndDate = (date: Dayjs | null) => {
        updateValuesHandler({
            value: { EndDate: date },
            updatePageToDefault: true
        });
    };

    const onChangingStartDate = (date: Dayjs | null) => {
        updateValuesHandler({
            value: { StartDate: date },
            updatePageToDefault: true
        });
    };

    return (
        <div className="grid xl:grid-cols-1 2xl:grid-cols-2 border-bottom py-4">
            <div>
                <div className="flex items-center h-full shrink-0 flex-grow">
                    <CustomSearch
                        debounceSearch={(text) => {
                            onChangeInput(text);
                        }}
                    />
                </div>
            </div>
            <div className=" mt-3 2xl:mt-0">
                <div className="flex justify-end md:flex-row flex-col">
                    <div className="flex">
                        <SelectInput
                            options={ORDER_STATUS_OPTIONS}
                            onChange={statusUpdateHandler}
                            placeholder="Status"
                            className="ml-2 shrink-0 flex-grow"
                            value={selectedStatus}
                        />
                    </div>
                    <div className="flex mt-3 md:mt-0">
                        <CustomDatePicker
                            endDate={endDate}
                            startDate={startDate}
                            updateEndDate={onChangingEndDate}
                            updateStartDate={onChangingStartDate}
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
