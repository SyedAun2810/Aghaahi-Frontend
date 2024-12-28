import PaginationWithDescription from "@Components/PaginationWithDescription";
import TextTruncateWrapper from "@Components/TextTruncateWrapper/TextTruncateWrapper";
import { ReviewResponseType } from "@Utils/types";
import { Avatar, Flex, Rate } from "antd";

import UserAvatarTwo from "@Assets/images/user7.png";
import { DataNotFound } from "@Components/DataNotFound";
const RATING_STAR_COLOR = "#F38001";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

type ReviewManagementListingTypes = {
    data: any;
    isError: boolean;
    isLoading: boolean;
    filtersData: any;
    pageClickHandler: (page: number) => void;
};
export default function ReviewManagementListing({
    data,
    isError,
    isLoading,
    filtersData,
    pageClickHandler
}: ReviewManagementListingTypes) {
    if (isLoading) {
        return <div></div>;
    }
    return (
        <>
            {isError || !data?.data?.length ? (
                <DataNotFound />
            ) : (
                data?.data?.map((review: ReviewResponseType) => (
                    <div className="mt-3">
                        <div className="mb-2 flex items-center">
                            <Avatar
                                size={40}
                                src={
                                    <img
                                        src={review?.user?.image?.compressed || UserAvatarTwo}
                                        alt="avatar"
                                    />
                                }
                            />
                            <p className="font-[600] text-base text-dark-main ml-2">
                                {review?.user?.firstName || "--"}
                            </p>
                            <Flex gap="middle" vertical className="ml-2">
                                <Rate
                                    className=""
                                    value={review?.ratings}
                                    tooltips={desc}
                                    onChange={() => {}}
                                    style={{ color: RATING_STAR_COLOR }}
                                />
                            </Flex>
                        </div>
                        <TextTruncateWrapper text={review?.text} />
                    </div>
                ))
            )}
            <PaginationWithDescription
                selectedPage={filtersData?.PageNumber}
                onPaginate={pageClickHandler}
                totalCount={data?.pagination?.totalCount || 0}
            />
        </>
    );
}
