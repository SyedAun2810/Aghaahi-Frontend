import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { EventHandler, KeyboardEvent } from "react";
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { APP_NAME, FROM_SCREEN, GENERAL_FORMAT_DATE_ONLY, dateFormats } from "@Constants/app";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { queryClient } from "@Api/Client";
import { queryKeys } from "@Constants/queryKeys";
import { Message } from "@Pages/AppScreens/Chat/types";

function redirectTo(url: string) {
    window.location.href = utilService.baseUrl + url;
}

export function setPageTitle(pathname: string) {
    if (pathname === "/") {
        pathname = "| Dashboard";
    }

    pathname = pathname
        .split("/")
        .map((route) =>
            route
                .split("-")
                .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                .join(" ")
        )
        .join(" | ");
    document.title = `${APP_NAME}  ${pathname} `;
}

function valueNormalizer(val: number | string, character: string = "$"): string {
    let formattedValue: string;

    if (typeof val === "number") {
        const roundedValue = Math.round(val * 100) / 100;
        formattedValue = roundedValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        formattedValue = val;
    }

    return `${character}${formattedValue}`;
}

function formatCurrency(number: number) {
    return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convertDateTime(
    date: string | number | Date = new Date(),
    fromCurrentTime: boolean = false,
    format: string = "MMM DD, YYYY"
) {
    if (date) {
        if (fromCurrentTime) {
            return dayjs(date).fromNow();
        }
        return dayjs(date).format(format);
    }
}

function goBack() {
    window.history.back();
}

function getPageSizeOptions(numberOfPages: number) {
    return Array.from({ length: Math.min(numberOfPages, 10) }, (_, i) => {
        const value = `${10 * (i + 1)}`;
        return {
            label: value,
            value
        };
    });
}

function getBlobUrl(obj: any) {
    if (obj && obj?.location) {
        return `${obj?.location}${obj?.path}`;
    }

    return undefined;
}

function isEmpty(value: string | number | boolean | Array<any> | object): boolean {
    return (
        value === undefined ||
        value === null ||
        value === false ||
        value === 0 ||
        Number.isNaN(value) ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
}

function formatDate(dateString: string, format: string) {
    return dayjs.utc(dateString).local().format(format);
}

function getAvatarText(name: string) {
    if (name == null || name === undefined) {
        return "";
    }
    let avatar = name.split(" ");
    return `${avatar[0]?.trim()[0]?.toUpperCase() ?? ""}${
        avatar[1]?.trim()[0]?.toUpperCase() ?? ""
    }`;
}

function getCurrentTime(format = "YYYY-MM-DD") {
    return dayjs().format(format);
}

function scrollBottom(ref) {
    if (ref?.current) {
        ref.current.scrollTop = ref?.current?.scrollHeight;
    }
}

function uploadMediaToChat(payload: any, chatId: number) {
    queryClient.setQueryData(
        [...queryKeys.chat.chatListing, { ChatId: chatId }],
        (myData = { pages: [] }) => ({
            ...myData,
            pages: [
                {
                    ...myData.pages?.[0],
                    Data: [payload].concat(myData.pages?.[0]?.Data)
                },
                ...myData.pages?.splice(1)
            ]
        })
    );
}

function updateMessageListing(
    data: { ChatEventIds: number[] },
    chatId: number,
    isOnlyDelivered = false
) {
    queryClient.setQueryData(
        [...queryKeys.chat.chatListing, { ChatId: chatId ?? data?.event?.ChatId }],
        (myData = { pages: [] }) => ({
            ...myData,
            pages: [
                {
                    ...myData?.pages[0],
                    Data: myData?.pages[0]?.Data?.map?.((item: any) => ({
                        ...item,
                        MessageEventInfos: item?.MessageEventInfos?.map((mesg: any) => {
                            return {
                                ...mesg,
                                IsDelivered: true,
                                ...(!isOnlyDelivered && {
                                    IsRead: true
                                })
                            };
                        })
                    }))
                },
                ...myData?.pages.splice(1)
            ]
        })
    );
}

export function updatedMessageDataOnDelete({
    messageId,
    ChatId
}: {
    messageId: number;
    ChatId: number;
}) {
    const storageKey = [...queryKeys.chat.chatListing, { ChatId }];

    let messageListing = queryClient.getQueryData(storageKey) as InfiniteData<{
        Data: Message[];
    }>;

    if (!messageListing) return;

    messageListing = {
        ...messageListing,
        pages: messageListing.pages.map((page) => ({
            ...page,
            Data: page.Data.filter((message) => message.Id !== messageId)
        }))
    };

    queryClient.setQueryData(storageKey, messageListing);
}

export function updatedMessageDataOnUpdate({
    messageId,
    ChatId,
    content
}: {
    messageId: number;
    ChatId: number;
    content: string;
}) {
    const storageKey = [...queryKeys.chat.chatListing, { ChatId }];

    let messageListing = queryClient.getQueryData(storageKey) as InfiniteData<{
        Data: Message[];
    }>;

    if (!messageListing) return;

    messageListing = {
        ...messageListing,
        pages: messageListing.pages.map((page) => ({
            ...page,
            Data: page.Data.map((message) => {
                if (message.Id === messageId) {
                    return {
                        ...message,
                        Content: content
                    };
                }
                return message;
            })
        }))
    };

    queryClient.setQueryData(storageKey, messageListing);
}
function createDynamicUrl(dynamicUrl: string, object: any) {
    for (const key in object) {
        if (!isEmpty(object[key]) && typeof object[key] === "object") {
            for (const childKey in object[key]) {
                dynamicUrl = dynamicUrl.replace(`{${childKey}}`, object[key][childKey]);
            }
        } else {
            dynamicUrl = dynamicUrl.replace(`{${key}}`, object[key] ?? "");
        }
    }
    return dynamicUrl;
}

function formatDateAndTime(inputDateString: string, format: string): string {
    const [, timePart] = inputDateString.split("T");
    const [hours, minutes] = timePart.split(":").map(Number);
    const formattedTime = `${(hours % 12).toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
    const datePart = formatDate(inputDateString, format);
    return `${datePart} ${formattedTime} (UTC)`;
}

function findPreviousScreen(fromScreen: number | null) {
    return fromScreen === FROM_SCREEN.SIGN_UP ? true : false;
}

const preventFormSubmitOnSelectingAddress: EventHandler<KeyboardEvent<HTMLInputElement>> = (
    e: KeyboardEvent
) => {
    if (e.key === "Enter") e.preventDefault();
};

function formatAndCapitalizeString(str: string) {
    const words = str.replace(/[-_]/g, " ").split(" ");

    const formattedString = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return formattedString;
}

function createDeepCopy(data: any) {
    if (data) {
        return JSON.parse(JSON.stringify(data));
    }
}

function fromDateToUTC(dateString: string | Date | Dayjs | null) {
    if (dateString === null) return;
    const isValidDate = !isNaN(new Date(dateString));
    if (isValidDate) {
        const dateFormatted = new Date(dateString).toISOString();
        return dateFormatted;
    }
}

function addDaysUsingDayjs(dateString: Dayjs, noOfDays: number) {
    if (dateString) return dateString.add(noOfDays, "day");
}

const uploadImageHandling = async (imageFile, uploadFunc) => {
    let imageId;
    const formData = new FormData();
    formData.append("Media", imageFile);
    await uploadFunc(formData)
        .then((res) => {
            imageId = res?.data?.data[0].id;
        })
        .catch((e) => console.error(e));
    return imageId;
};

function calculateDuration(startDate: string, endDate: string) {
    if (startDate && endDate) {
        const duration = dayjs(endDate).diff(dayjs(startDate), "day");
        return duration <= 0 ? "0 Days" : `${duration} Days`;
    }
    return "--";
}

const calculateValidity = (startDate: string, endDate: string) => {
    const finalStartDate = startDate ? formatDate(startDate, GENERAL_FORMAT_DATE_ONLY) : "--";

    const finalEndDate = endDate ? formatDate(endDate, GENERAL_FORMAT_DATE_ONLY) : "--";
    return `${finalStartDate} - ${finalEndDate} `;
};

function calculateRemainingDays(startDate: string, endDate: string) {
    if (startDate && endDate) {
        let remainingDays = dayjs(endDate).diff(dayjs(startDate), "day");
        return remainingDays <= 0 ? "0 Days" : `${remainingDays} Days`;
    }
}

function isNullOrUndefined(data: string | number | null | undefined) {
    if (data === null || data === undefined) return true;
    return false;
}

function valuesOrDashes(data: string | number | null | undefined) {
    return !isNullOrUndefined(data) ? data : "--";
}

function chatNormalizeInfiniteQuery(data: InfiniteData<any>) {
    const dump = data.pages.flatMap((page) => page?.Data);
    return dump[0] ? dump : [];
}

function handleFetchOnScroll(
    { currentTarget }: React.UIEvent<HTMLElement>,
    meta: Omit<UseInfiniteQueryResult<any, any>, "data" | "isLoading" | "isFetching">
) {
    const { scrollHeight, scrollTop, clientHeight } = currentTarget;
    const { hasNextPage, isFetchingNextPage, fetchNextPage } = meta;
    if (scrollHeight - Math.abs(scrollTop) <= clientHeight + 10) {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }
}

function renderDate(date: string) {
    const dateString = dayjs(date);
    const today = dayjs().startOf("day");
    const yesterday = today.subtract(1, "day");
    const pastWeekStart = today.subtract(6, "day");

    if (dateString.isSame(today, "day")) {
        return "Today";
    } else if (dateString.isSame(yesterday, "day")) {
        return "Yesterday";
    } else if (dateString.isAfter(pastWeekStart)) {
        return dateString.format("dddd");
    } else {
        return dateString.format("MM/DD/YY");
    }
}

function renderDateAndTime(date: string) {
    const dateString = dayjs(date);
    const today = dayjs().startOf("day");
    if (dateString.isSame(today, "day")) {
        return dateString.format("hh:mm A");
    } else {
        return dateString.format("MM/DD/YY");
    }
}
async function uploadOnAzure(file: File, sasUrl: string) {
    const response = await fetch(sasUrl, {
        method: "PUT",
        body: file,
        headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "application/octet-stream"
        }
    });
    return response;
}

const getValueDollarAppendedOrDashes = (data: number | null | undefined) => {
    return !isNullOrUndefined(data) ? `$${Math.abs(data?.toFixed(2))}` : "--";
};

const getValueOrDashes = (data: number | null | undefined) => {
    return !isNullOrUndefined(data) ? Math.abs(data?.toFixed(2)) : "--";
};

const checkStripeConnection = (data: number | boolean) => {
    if (data === null || data === undefined || data === 1 || data === false) return false;
    return true;
};

const utilService = {
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    apiUrl: import.meta.env.VITE_APP_API_URL,
    redirectTo,
    isEmpty,
    convertDateTime,
    formatCurrency,
    getPageSizeOptions,
    goBack,
    valueNormalizer,
    getBlobUrl,
    createDynamicUrl,
    formatDateAndTime,
    formatDate,
    getAvatarText,
    getCurrentTime,
    scrollBottom,
    findPreviousScreen,
    formatAndCapitalizeString,
    preventFormSubmitOnSelectingAddress,
    createDeepCopy,
    fromDateToUTC,
    addDaysUsingDayjs,
    uploadImageHandling,
    calculateValidity,
    calculateRemainingDays,
    calculateDuration,
    isNullOrUndefined,
    valuesOrDashes,
    chatNormalizeInfiniteQuery,
    uploadMediaToChat,
    updateMessageListing,
    handleFetchOnScroll,
    renderDate,
    uploadOnAzure,
    getValueDollarAppendedOrDashes,
    getValueOrDashes,
    renderDateAndTime,
    checkStripeConnection
};

export default utilService;
