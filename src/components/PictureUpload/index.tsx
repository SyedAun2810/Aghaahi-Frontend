import { useRef, useState } from "react";
import { Skeleton, Upload, message } from "antd";
import EditOutlined from "@Assets/icons/editProfileIcon.svg";

import CustomAvatar from "../CustomAvatar";
import "./index.scss";
import NotificationService from "@Services/NotificationService";

const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        NotificationService.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        NotificationService.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const PictureUpload = ({
    classes,
    name,
    onChange,
    image,
    disabled,
    userName,
    isLoading,
    imgClasses
}: any) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(image);
    const inputRef = useRef<HTMLImageElement>(null);
    const handleChange = (info: any) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url: string) => {
                setLoading(false);
                setImageUrl(url);
                onChange(info.file);
            });
        }
    };
    if (isLoading) return <Skeleton.Avatar size={120} active shape="circle"></Skeleton.Avatar>;

    return (
        <div className="edit-profile">
            <EditOutlined className="edit-icon" onClick={() => inputRef.current?.click()} />
            <Upload
                name={name}
                multiple={false}
                listType="picture-circle"
                className={`avatar-uploader ${classes}`}
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={(e: any) => {
                    setTimeout(() => e.onSuccess("ok"), 0);
                }}
                disabled={disabled}
                accept={"IMAGE"}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: "100%"
                        }}
                        className={`profile-img ${imgClasses}`}
                        ref={inputRef}
                    />
                ) : (
                    <CustomAvatar
                        name={userName}
                        textSize={"text-6xl"}
                        className="rounded-full mb-4"
                        imageUrl={image}
                        inputRef={inputRef}
                    />
                )}
            </Upload>
        </div>
    );
};

export default PictureUpload;
