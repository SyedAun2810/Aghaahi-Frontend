import { useParams } from "react-router-dom";
import { useGetRequestDetails } from "../Queries/RequestQueries";

export default function useBannerRequestContainer() {
    const { id } = useParams();
    const {
        data: requestDetailsData,
        isFetching: isRequestDataLoading,
        isError: isRequestDataError
    } = useGetRequestDetails({ requestId: Number(id) });
    const isRequestDataFetchingOrLoading = isRequestDataLoading;

    return {
        requestDetailsData: requestDetailsData?.data,
        isRequestDataFetchingOrLoading
    };
}
