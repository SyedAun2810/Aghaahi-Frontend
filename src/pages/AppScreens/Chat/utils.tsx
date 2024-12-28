import { queryClient } from "@Api/Client";
import { queryKeys } from "@Constants/queryKeys";
import dayjs from "dayjs";

export function updateUnreadMsgCount(chatId: number) {
    queryClient.setQueryData(
        [
            ...queryKeys.chat.userListing,
            { PageNumber: 1, PageSize: 10, SearchBy: "", pageSize: 10 }
        ],
        (myData = { pages: [] }) => ({
            ...myData,
            pages: [
                {
                    ...myData?.pages[0],
                    Data: myData?.pages[0]?.Data?.map?.((item: any) => ({
                        ...item,
                        ...(item.Id === chatId && { UnreadCount: 0 })
                    }))
                },
                ...myData?.pages.splice(1)
            ]
        })
    );
}

export const getDateByTime = (date?: string) => {
    if (date === null || date === undefined) return "";
    const currentDate = dayjs();
    const inputDay = dayjs(date);
    if (currentDate.isSame(inputDay, "day")) {
        const diffInSeconds = currentDate.diff(inputDay, "second");

        if (diffInSeconds < 60) {
            return "Few seconds ago";
        } else {
            const diffInMinutes = currentDate.diff(inputDay, "minute");
            if (diffInMinutes < 60) {
                return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"}  ago`;
            }
            const diffInHours = currentDate.diff(inputDay, "hour");

            return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}  ago`;
        }
    } else {
        return inputDay.format("MMM D, YYYY");
    }
};
