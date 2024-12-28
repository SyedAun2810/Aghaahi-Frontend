import { SelectInput } from "@Components/SelectInput";
import FilterButton from "@Components/FilterButton/FilterButton";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import CustomDatePicker from "@Components/DateRangePicker/DateRangePicker";
import AutoCompleteCustom from "@Components/AutoComplete/AutoCompleteCustom";
import { CATEGORY, SUB_CATEGORY } from "../AddEditProduct/constants/PayloadDataFields";
import {
    CategoryOptionType,
    END_DATE_KEY,
    FilterDataTypes,
    OptionsFetchedTypes,
    OptionsInputSearchType,
    SEARCH_KEY,
    START_DATE_KEY,
    VARIATION_KEY
} from "../ProductListing/ProductListingContainer";

const VarietyOptions = [
    {
        value: "Yes",
        label: "Yes"
    },
    {
        value: "No",
        label: "No"
    }
];
type ProductListingFiltersType = {
    filterData: FilterDataTypes;
    options: OptionsFetchedTypes;
    clearFilterHandler: () => void;
    optionsInputSearch: OptionsInputSearchType;
    handleOptionsClear: (fieldName: string) => void;
    updateCategorySearchUpdate: (value: string, fieldName: string) => void;
    updateCategory: (option: CategoryOptionType, fieldName: string) => void;
    updateDataHandler: (fieldName: string, value: string | number | Date, pageNo?: number) => void;
};
export default function ProductListingFilters({
    options,
    filterData,
    updateDataHandler,
    updateCategory,
    clearFilterHandler,
    optionsInputSearch,
    handleOptionsClear,
    updateCategorySearchUpdate
}: ProductListingFiltersType) {
    const onStartDateChange = (startDate: Date) => {
        updateDataHandler(START_DATE_KEY, startDate, 1);
    };
    const onEndDateChange = (endDate: Date) => {
        updateDataHandler(END_DATE_KEY, endDate, 1);
    };
    const onVariationChange = (variation: string) => {
        updateDataHandler(VARIATION_KEY, variation, 1);
    };

    return (
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 border-bottom py-4">
            <div>
                <div className="flex items-center h-full shrink-0 flex-grow">
                    <CustomSearch
                        debounceSearch={(text) => {
                            updateDataHandler(SEARCH_KEY, text, 1);
                        }}
                    />
                </div>
            </div>
            <div className=" mt-3 xl:mt-0">
                <div className="flex justify-end md:flex-row flex-col">
                    <div className="flex">
                        <AutoCompleteCustom
                            allowClear
                            placeholder="Category"
                            options={options?.categories}
                            className="ml-0 md:ml-2 shrink-0 flex-grow"
                            onSearch={(value: string) =>
                                updateCategorySearchUpdate(value, CATEGORY)
                            }
                            onClear={() => handleOptionsClear(CATEGORY)}
                            onSelect={(value, option) => updateCategory(option, CATEGORY)}
                            showSearch
                            value={optionsInputSearch?.category}
                        />
                        <AutoCompleteCustom
                            showSearch
                            allowClear
                            placeholder="Sub category"
                            onSelect={(value, option) => updateCategory(option, SUB_CATEGORY)}
                            options={options?.subCategories}
                            className="ml-0 md:ml-2 shrink-0 flex-grow "
                            onClear={() => handleOptionsClear(SUB_CATEGORY)}
                            onSearch={(value: string) =>
                                updateCategorySearchUpdate(value, SUB_CATEGORY)
                            }
                            value={optionsInputSearch?.subCategory}
                        />
                        <SelectInput
                            options={VarietyOptions}
                            onChange={onVariationChange}
                            placeholder="Variation"
                            className="ml-2 shrink-0 flex-grow"
                            value={filterData?.variation}
                        />
                    </div>
                    <div className="flex mt-3 md:mt-0">
                        <CustomDatePicker
                            endDate={filterData?.endDate}
                            startDate={filterData?.startDate}
                            updateEndDate={onEndDateChange}
                            updateStartDate={onStartDateChange}
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
        </div>
    );
}
