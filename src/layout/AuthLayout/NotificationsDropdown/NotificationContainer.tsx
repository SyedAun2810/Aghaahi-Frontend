import { useRef, useState } from "react";

import utilService from "@Utils/utils.service";
import { notificationsNormalizeInfiniteQuery } from "./util";
import { useToggleNotifications } from "../Queries/useToggleNotifications";
import { useGetNotificationCount } from "../Queries/useGetNotificationCount";
import { useGetNotificationsListing } from "../Queries/useGetNotificationListing";

export default function NotificationContainer() {
    const [notificationCount, setNotificationCount] = useState(0);
    const notificationRef = useRef(null);
    // fetching notification data
    const {
        data = [],
        isLoading,
        isFetching,
        ...meta
    } = useGetNotificationsListing(
        { pageSize: 10 },
        {
            select: notificationsNormalizeInfiniteQuery
        }
    );

    const onNotificationCountSuccess = (data) => {
        setNotificationCount(data?.data);
    };

    // fetching notification count
    const { data: count, isFetching: isCountFetching } = useGetNotificationCount({
        onSuccess: onNotificationCountSuccess
    });

    // handling notification status
    // const {
    //     mutateAsync: mutateToggleStatus,
    //     isLoading: isToggleStatusLoading,
    //     isError: toggleStatusError
    // } = useToggleNotifications();

    const handleFetchMore = (e: React.UIEvent<HTMLElement>) => {
        utilService.handleFetchOnScroll(e, meta);
    };

    const handleRefetchNotifications = () => {
        setNotificationCount(0);
        meta.refetch();
    };

    const scrollToTop = () => {
        notificationRef?.current?.scrollTo(0, 0);
    };

    return {
        data,
        meta,
        isFetching,
        scrollToTop,
        notificationRef,
        handleFetchMore,
        notificationCount,
        // mutateToggleStatus,
        // isToggleStatusLoading,
        handleRefetchNotifications
    };
}
