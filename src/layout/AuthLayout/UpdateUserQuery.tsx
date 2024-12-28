import { AuthApiService } from "@Api/auth-service";
import { useQuery } from "@tanstack/react-query";

export const authQueryKeys = {
    userDetail: ["USER_DETAIL"]
};

export const useUserDetail = (onSuccess: (data: any) => void) => {
    return useQuery(
        authQueryKeys.userDetail,
        async () => {
            const { ok, response, data } = await AuthApiService.userDetails();
            if (ok) {
                onSuccess(data);
                return data;
            }
            throw response?.message;
        },
        {
            onError: (err) => {
                throw err;
            }
        }
    );
};
