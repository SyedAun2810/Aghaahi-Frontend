import ApiService from "@Services/ApiService";
import { axiosInstance, jsonInstance } from "../services";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type ApiResponse = {
  [key in string]: string | boolean | number;
  // Define your API response type here
};

export default function useGetApi(
  url: string | Array<string>,
  secure: boolean = true,
  options?: UseQueryOptions<ApiResponse, Error>
) {
  const final_url = Array.isArray(url) ? url : [url];
  return useQuery<ApiResponse, Error>(
    final_url,
    async () => {
      // const instance = secure ? jsonInstance : axiosInstance;
      const response = await ApiService.get(final_url.join(""));
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      ...options,
    }
    // { ...options, refetchOnWindowFocus: false, retry: false }
  );
}
