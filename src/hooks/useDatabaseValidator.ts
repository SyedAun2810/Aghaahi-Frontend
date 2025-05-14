import { useMutation } from "@tanstack/react-query";
import { DatabaseValidatorService } from "@Api/database-validator-service";

export const useDatabaseValidator = () => {
    const mutation = useMutation({
        mutationFn: (query: string) => DatabaseValidatorService.getDataAndSqlQuery(query),
        onError: (error: any) => {
            console.error("Error executing query:", error);
        }
    });

    return {
        executeQuery: mutation.mutate,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data?.data
    };
}; 