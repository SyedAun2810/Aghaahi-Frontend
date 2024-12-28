import { useQuery } from "@tanstack/react-query";

import NotificationService from "@Services/NotificationService";
import utilService from "@Utils/utils.service";

type FetchingListingApiType = {
    queryParams: any;
    queryKeyValue: string;
    apiService: (param: any) => Promise<any>;
    staleTimeGiven?: number;
};
const GENERAL_ERROR = "Something went wrong. Please try again later.";
export const useFetchingListingApi = ({
    apiService,
    queryParams,
    queryKeyValue,
    staleTimeGiven
}: FetchingListingApiType) => {
    const startDate =
        queryParams.StartDate !== null ? utilService.fromDateToUTC(queryParams?.StartDate) : null;
    const endDate =
        queryParams.EndDate !== null ? utilService.fromDateToUTC(queryParams?.EndDate) : null;

    const { data, isError, refetch, isFetching } = useQuery({
        queryKey: [queryKeyValue, { ...queryParams, EndDate: endDate, StartDate: startDate }],
        queryFn: async () => {
            const { ok, response, data } = await apiService({
                ...queryParams,
                EndDate: endDate,
                StartDate: startDate
            });
            if (ok) {
                return data;
            }
            NotificationService.error(response?.message || GENERAL_ERROR);
            throw new Error(GENERAL_ERROR);
        },
        ...(staleTimeGiven && { staleTime: staleTimeGiven })
    });

    return {
        data,
        isError,
        isFetching
    };
};
