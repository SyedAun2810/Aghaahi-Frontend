import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";

export const DatabaseValidatorService = {
    getTablesWithColumns: async () => {
        const response = await ApiService.get(API_CONFIG_URLS.DatabaseValidator.TABLES_WITH_COLUMNS);
        return response;
    },
    getDataAndSqlQuery: async (query: string) => {
        const response = await ApiService.post(API_CONFIG_URLS.DatabaseValidator.DATA_AND_SQL_QUERY, { question:query });
        return response;
    }
}; 