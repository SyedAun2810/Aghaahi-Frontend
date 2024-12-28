import React from "react";
import { Space } from "antd";

import RenderImages from "../RenderImages/RenderImages";
import utilService from "@Utils/utils.service";

const SenderContainer = ({ text, attachments, time }) => {
    const { mediaImages } = React.useMemo(() => {
        const mediaImages = [];
        const otherAttachments = [];

        return {
            mediaImages,
            otherAttachments
        };
    }, [attachments]);

    function messageStatus() {
        return <></>;
    }

    return (
        <div className="sender flex flex-col gap-1 items-end max-w-[58%] ml-auto  overflow-hidden mb-3">
            {mediaImages.length > 0 && <RenderImages mediaImages={mediaImages} />}

            {text ? (
                <div className="flex justify-end gap-2 w-full mt-3 ">
                    <p className="rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none bg-stroke-light text-light-text p-4 max-w-[95%] break-words overflow-wrap">
                        {text}
                    </p>
                </div>
            ) : null}
            <Space className="justify-end">
                <p className={"text-xs"}>{utilService.convertDateTime(time, true)}</p>
                <div className="flex justify-end">{messageStatus()}</div>
            </Space>
        </div>
    );
};

export default SenderContainer;
