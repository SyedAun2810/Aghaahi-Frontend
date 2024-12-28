import { FloatButton } from "antd";
import { useImperativeHandle, useState } from "react";

import DropdownIcon from "@Assets/icons/dropdownIcon.svg";
import "./index.scss";

function ScrollButton({
    scrollRef,
    scrollBoxRef
}: {
    scrollBoxRef: React.RefObject<HTMLElement | null>;
    scrollRef: React.RefObject<{
        open: () => void;
        close: () => void;
        isOpen: () => boolean;
    }>;
}) {
    const [showScrollButton, setShowScrollButton] = useState(false);
    useImperativeHandle(
        scrollRef,
        () => ({
            open: () => setShowScrollButton(true),
            close: () => setShowScrollButton(false),
            isOpen: () => showScrollButton
        }),
        [showScrollButton]
    );

    const buttonClickHandler = () => {
        scrollBoxRef.current?.scroll({
            top: scrollBoxRef.current?.scrollHeight,
            behavior: "smooth"
        });
    };

    return (
        <>
            {showScrollButton ? (
                <FloatButton
                    className="floating-button-chat "
                    icon={<DropdownIcon />}
                    onClick={buttonClickHandler}
                />
            ) : null}
        </>
    );
}

export default ScrollButton;
