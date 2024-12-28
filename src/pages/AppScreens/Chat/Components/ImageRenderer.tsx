import { Button, Spin } from "antd";

import CloseOutlined from "@ant-design/icons/CloseOutlined";

type ImageRendererTypes = {
    img: any;
    idx: number;
    imageDeleteHandler: (idx: number) => void;
};

const ImageRenderer = ({ img, idx, imageDeleteHandler }: ImageRendererTypes) => {
    return (
        <>
            <div className="w-12 h-12 relative mx-1 mb-2 " key={1}>
                {img?.uploading ? (
                    <div className=" flex items-center justify-center w-full h-full">
                        <Spin size="small" className="my-auto" />
                    </div>
                ) : null}
                <img
                    src={img?.BlobUrl}
                    className={`absolute top-0 w-full h-full object-cover ${img?.uploading ? "opacity-20" : ""}`}
                />
                <Button onClick={() => imageDeleteHandler(idx)} type="text" className="close-btn">
                    <CloseOutlined className="icon" />
                </Button>
            </div>
        </>
    );
};

export default ImageRenderer;
