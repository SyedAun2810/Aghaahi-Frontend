import { Button } from "antd";
import React, { Children, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
    title?: string | ReactNode;
    className?: string;
    type?: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined;
    btnColor?: "purple" | "gray" | "blue" | "green" | "red" | "white";
    isLoading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    htmlType?: "button" | "submit" | "reset" | undefined;
    children?: any;
    textClassName?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
    title,
    className = "",
    type = "primary",
    onClick = () => {},
    htmlType = "submit",
    icon = null,
    btnColor = null,
    isLoading = false,
    disabled = false,
    children,
    textClassName
}) => {
    return (
        <Button
            onClick={onClick}
            htmlType={htmlType}
            type={type}
            disabled={disabled}
            icon={icon}
            loading={isLoading}
            className={`${styles["hr-btn-" + (btnColor ?? type)]} ${styles["hr-btn"]} ${className}`}
        >
            <>
                <span className={`${textClassName}`}>{title}</span>
                {children}
            </>
        </Button>
    );
};

export default CustomButton;
