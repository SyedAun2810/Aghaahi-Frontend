import React, { ReactNode, useCallback, useRef, useState } from "react";

import styles from "./index.module.scss";

import TickCircleUnchecked from "@Assets/icons/tickCircleUnchecked.svg";
import TickCircleChecked from "@Assets/icons/tickCircleChecked.svg";

type TextInputWithCheckBoxes = {
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
    isYesChecked: boolean;
    areCheckBoxDisabled?: boolean;
    handleVariationClick: () => void;
};

const TextInputWithCheckBoxes: React.FC<TextInputWithCheckBoxes> = ({
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
    handleVariationClick,
    isYesChecked,
    areCheckBoxDisabled
}) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

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
            <div className="flex flex-col flex-grow mr-4">
                <label className={`${styles["custom-label"]} `}>{label}</label>
                <input
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value || ""}
                    className={`${styles["custom-input"]}`}
                    ref={inputRef}
                    onBlur={onBlur}
                    name={name}
                    type={isPassword && !showPassword ? "password" : "text"}
                    maxLength={maxLength}
                />
            </div>

            {
                <div className="flex align-center">
                    {
                        <div
                            className="flex align-center mr-3 cursor-pointer"
                            onClick={!isYesChecked ? handleVariationClick : () => {}}
                        >
                            {isYesChecked ? <TickCircleChecked /> : <TickCircleUnchecked />}{" "}
                            <span className="pl-1">Yes</span>
                        </div>
                    }
                    {
                        <div
                            className="flex align-center mr-3 cursor-pointer"
                            onClick={isYesChecked ? handleVariationClick : () => {}}
                        >
                            {isYesChecked ? <TickCircleUnchecked /> : <TickCircleChecked />}{" "}
                            <span className="pl-1">No</span>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default TextInputWithCheckBoxes;
