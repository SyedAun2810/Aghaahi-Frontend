import React from "react";

type ColoredTextType = {
    text: string | number;
    className?: string;
    onClick?: () => void;
};
const ColoredText = ({ text, className, onClick }: ColoredTextType) => {
    return (
        <span
            className={`${className} font-[700] text-large text-link-color text-center`}
            onClick={onClick} 
        >
            {text}
        </span>
    );
};

export default ColoredText;
