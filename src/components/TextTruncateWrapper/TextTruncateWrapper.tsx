import { useState } from "react";

export default function TextTruncateWrapper({
    text,
    charLimit = 100,
    showMoreOrLess = true,
    classes = "text-light-text"
}: {
    text: string;
    charLimit?: number;
    showMoreOrLess?: boolean;
    classes?: string;
}) {
    const [isTruncated, setIsTruncated] = useState(text?.length > charLimit);
    return (
        <div className={`mt-1 w-[70%] font-[400] text-sm ${classes}`}>
            <p className="inline">
                {text?.length > charLimit && isTruncated ? text?.substring(0, charLimit) : text}
            </p>
            {text?.length > charLimit ? (
                showMoreOrLess ? (
                    <p
                        className="inline font-[600] cursor-pointer"
                        onClick={() => setIsTruncated(!isTruncated)}
                    >
                        {isTruncated ? " ...show more" : " ...show less"}
                    </p>
                ) : (
                    <p className="inline font-[600] cursor-pointer">{"..."}</p>
                )
            ) : null}
        </div>
    );
}
