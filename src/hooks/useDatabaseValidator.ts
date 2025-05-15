import { useMutation } from "@tanstack/react-query";
import { DatabaseValidatorService } from "@Api/database-validator-service";
import NotificationService from "@Services/NotificationService";

export const useDatabaseValidator = () => {
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: (query: string) => DatabaseValidatorService.getDataAndSqlQuery(query),
        onError: (error: any) => {
            console.error("Error executing query:", error);
        }
    });

    return {
        executeQuery: mutate,
        isLoading,
        isError,
        error,
        data: data?.data
    };
}; 