import React from "react";
import { Col, Row } from "antd";

import RenderImages from "../RenderImages/RenderImages";
import utilService from "@Utils/utils.service";

const ReceiverContainer = ({ text, attachments, seen, delivered, id, time }) => {
    const { mediaImages } = React.useMemo(() => {
        const mediaImages = attachments;
        const otherAttachments = [];

        // if (Array.isArray(attachments)) {
        //   attachments?.forEach((ele) => {
        //     if (ele.attachment?.type === MediaType.IMAGE) {
        //       mediaImages.push(ele);
        //     } else {
        //       otherAttachments.push(ele);
        //     }
        //   });
        // }

        return {
            mediaImages,
            otherAttachments
        };
    }, [attachments]);

    return (
        <Row gutter={[8, 20]} className="max-w-[50%] mb-3" align={"top"} justify={"start"}>
            <Col className="receiver flex flex-col justify-start gap-1 " xs={20}>
                {mediaImages.length > 0 && <RenderImages mediaImages={mediaImages} />}

                <div className="flex justify-start w-full">
                    {text ? (
                        <p
                            className={
                                "rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-3xl bg-main-orange text-white p-4 "
                            }
                        >
                            {text}
                        </p>
                    ) : null}
                </div>

                <p className={"text-xs"}>{utilService.convertDateTime(time, true)}</p>
            </Col>
        </Row>
    );
};

export default ReceiverContainer;
