import React, { ReactNode, useCallback, useRef, useState } from "react";
import styles from "./index.module.scss";

type TextAreaInputProps = {
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    name?: string;
    isPassword?: boolean;
    rightIcon?: ReactNode;
    className?: string;
    label: string;
    maxLength?: number;
    rows?: number;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({
    placeholder = "Please Enter",
    label,
    value,
    disabled,
    onChange = () => {},
    onBlur,
    name,
    maxLength,
    rows
}) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

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
                <textarea
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value || ""}
                    className={`${styles["custom-input"]}`}
                    ref={inputRef}
                    onBlur={onBlur}
                    name={name}
                    maxLength={maxLength}
                    rows={rows}
                />
            </div>
        </div>
    );
};

export default TextAreaInput;
