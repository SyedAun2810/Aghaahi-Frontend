import { useQuery } from "@tanstack/react-query";
import { API_CONFIG_URLS } from "../../../constants/config";
import ApiService from "../../../services/ApiService";

interface HistoryResponse {
  data: Array<{
    id: string;
    query: string;
    timestamp: string;
    status: string;
    // Add other fields as needed
  }>;
  total: number;
  page: number;
  limit: number;
}

export const useGetDatabaseHistory = (page: number = 1, limit: number = 10) => {
  return useQuery<HistoryResponse>({
    queryKey: ["database-history", page, limit],
    queryFn: async () => {
      const response = await ApiService.get(
        `${API_CONFIG_URLS.DatabaseValidator.HISTORY}?page=${page}&limit=${limit}`
      );
      return response.data;
    },
  });
}; 