import { Flex } from "antd";

import { SelectInput } from "@Components/SelectInput";
import { REVIEWS_STARS_OPTIONS } from "@Constants/app";
import { DataNotFound } from "@Components/DataNotFound";
import useReviewManagementContainer from "./useReviewManagementContainer";

import ReviewManagementListing from "../Components/ReviewManagementListing";

const STARS_KEY = "Stars";

type ProductReviewsType = {
    rating: number;
    updateRatingHandler: (value: number) => void;
};
export default function ReviewManagement({ rating, updateRatingHandler }: ProductReviewsType) {
    const {
        isError,
        addValues,
        filtersData,
        pageClickHandler,
        reviewListingData,
        isReviewListingLoading
    } = useReviewManagementContainer();

    return (
        <div>
            <Flex className="border-bottom  pb-2" justify="space-between" align="center">
                <h1 className="font-[600] text-base text-dark-main">Reviews</h1>
                <div className="flex">
                    <SelectInput
                        options={REVIEWS_STARS_OPTIONS}
                        onChange={(value: string) =>
                            addValues({
                                value: { [STARS_KEY]: value },
                                updatePageToDefault: true
                            })
                        }
                        placeholder="Status"
                        className="ml-2 shrink-0 flex-grow"
                        value={filtersData?.Stars}
                    />
                </div>
            </Flex>

            <ReviewManagementListing
                isError={isError}
                data={reviewListingData}
                filtersData={filtersData}
                isLoading={isReviewListingLoading}
                pageClickHandler={pageClickHandler}
            />
        </div>
    );
}
