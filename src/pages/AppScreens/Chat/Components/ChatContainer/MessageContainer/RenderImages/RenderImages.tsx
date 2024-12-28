import { Image } from "antd";
import "../index.scss";

export const findBorderRadius = (index: number) => {
    switch (index) {
        case 0:
            return "rounded-tl-[30px] rounded-tr-[0px] rounded-bl-[0px] rounded-br-[0px]";
        case 1:
            return "rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[30px] rounded-br-[0px]";
        case 2:
            return "rounded-tl-[0px] rounded-tr-[30px] rounded-bl-[0px] rounded-br-[0px]";
        case 3:
            return "rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[0px] rounded-br-[30px]";
    }
};

const RenderImages = ({ mediaImages, borderColor, message, color, borderRadius }) => {
    const showImages = 4;
    return (
        <div className={`${borderRadius} p-3 bg-main-orange w-fit mt-4 ${borderColor}`}>
            <div
                className={`image-grid  grid-${mediaImages?.length > 4 ? "4" : mediaImages?.length}`}
            >
                <Image.PreviewGroup
                    preview={{
                        rootClassName: "chat-images-preview"
                    }}
                >
                    {mediaImages?.map((img, i) => {
                        return (
                            <div
                                key={`${img?.Id}_${i}`}
                                className={`chat-img bg-light-gray img-${i + 1} ${
                                    i > showImages - 1 ? "hidden" : ""
                                } `}
                            >
                                <Image
                                    src={img?.BlobUrl}
                                    onClick={() => {}}
                                    className={`${mediaImages?.length >= 4 ? findBorderRadius(i) : "rounded-[30px]"} `}
                                ></Image>

                                {i === showImages - 1 && mediaImages?.length > showImages ? (
                                    <span className="more-image">
                                        + {mediaImages?.length - showImages}
                                    </span>
                                ) : null}
                            </div>
                        );
                    })}
                </Image.PreviewGroup>
            </div>
            {!!message ? <p className={`${color} p-2 pb-0 break-words`}>{message}</p> : null}
        </div>
    );
};

export default RenderImages;
