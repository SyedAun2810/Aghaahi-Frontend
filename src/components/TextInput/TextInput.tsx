import React, { ReactNode, useCallback, useRef, useState } from "react";

import styles from "./index.module.scss";
import OpenEye from "@Assets/icons/openEye.svg";
import CloseEye from "@Assets/icons/closeEye.svg";

type TextInputProps = {
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    name?: string;
    isPassword?: boolean;
    rightIcon?: ReactNode;
    className?: string;
    label: string;
    maxLength?: number;
    type?: string;
};

const Input: React.FC<TextInputProps> = ({
    placeholder = "Enter Placeholder Text",
    label,
    value,
    disabled,
    onChange = () => {},
    onBlur,
    name,
    isPassword = false,
    rightIcon,
    maxLength,
    type = "text",
    ...rest
}) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const togglePasswordVisibility = useCallback((e) => {
        setShowPassword((prevState) => !prevState);
    }, []);

    const isOccupied = focus;
    return (
        <div
            className={`${styles.container} ${isOccupied && styles["active-input"]} `}
            onFocus={() => {
                setFocus(true);
            }}
            onBlur={() => setFocus(false)}
            onClick={handleClick}
        >
            <div className="flex flex-col flex-grow mr-4 max-w-full">
                <label className={`${styles["custom-label"]} `}>{label}</label>
                <input
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    className={`${styles["custom-input"]}`}
                    ref={inputRef}
                    onBlur={onBlur}
                    name={name}
                    type={isPassword && !showPassword ? "password" : type}
                    maxLength={maxLength}
                    {...rest}
                />
            </div>
            {isPassword && (
                <div
                    onClick={togglePasswordVisibility}
                    className="flex items-center cursor-pointer"
                >
                    {showPassword ? <OpenEye /> : <CloseEye />}
                </div>
            )}

            {rightIcon && rightIcon}
        </div>
    );
};

export default Input;
