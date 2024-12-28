import { ReactNode } from "react";

interface CustomErrorWrapperTypes {
    hasError: boolean;
    error: string;
    children: ReactNode;
}

export default function CustomErrorWrapper({ hasError, error, children }: CustomErrorWrapperTypes) {
    return (
        <>
            {children}
            {hasError ? <span className="text-[#ff4d4f]">{error}</span> : null}
        </>
    );
}
