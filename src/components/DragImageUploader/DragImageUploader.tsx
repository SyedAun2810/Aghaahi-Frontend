import { Flex } from "antd";
import React, { useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";

import UploadIcon from "@Assets/icons/uploadIcon.svg";
import UploadImageIcon from "@Assets/icons/uploadImageIcon.svg";
import NotificationService from "@Services/NotificationService";
import { calculateImagePadding, calculateImageStyles } from "./utils";

const fileTypes = ["JPG", "PNG", "JPEG"];
type DragImageUploaderProps = {
    handleImageUpload: (file: any) => void;
    imageFile: any;
    imageCaption?: string;
    imageInfoMsg?: string;
    containerClasses?: string;
    imageWidth?: number;
    imageHeight?: number;
    isMulti?: boolean;
    maxImageUpload?: number;
    disabled?: boolean;
};

function imageOnLoadHandler(img: any, imageWidth?: number, imageHeight?: number) {
    return new Promise((resolve, reject) => {
        img.onload = () => {
            let isNotValid: boolean = false;
            const widthWithinRange = !imageWidth || img.width < imageWidth;
            const heightWithinRange = !imageHeight || img.height < imageHeight;

            if (widthWithinRange && imageWidth) {
                isNotValid = true;
                NotificationService.error(`Image width should not be less than ${imageWidth}px.`);
            }

            if (heightWithinRange && imageHeight) {
                isNotValid = true;
                NotificationService.error(`Image height should not be less than ${imageHeight}px.`);
            }
            resolve(isNotValid);
        };
    });
}
const validateImageDimensions = async (file: any, imageWidth?: number, imageHeight?: number) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    let isNotValid = await imageOnLoadHandler(img, imageWidth, imageHeight);
    return isNotValid;
};

const maxImageUploadError = (maxImageUploadSize: number) => {
    return `Max ${maxImageUploadSize} image can be uploaded.`;
};
const DragImageUploader: React.FC<DragImageUploaderProps> = React.memo(
    ({
        handleImageUpload,
        imageFile,
        imageCaption,
        imageInfoMsg,
        containerClasses = "",
        imageWidth,
        imageHeight,
        isMulti,
        maxImageUpload,
        disabled
    }) => {
        const onFileChange = useCallback(
            async (file: any) => {
                if (isMulti && maxImageUpload && Object.keys(file).length > maxImageUpload) {
                    NotificationService.error(maxImageUploadError(maxImageUpload));
                    return;
                }
                if (isMulti) {
                    for (let i = 0; i < Object.keys(file).length; i++) {
                        let isValid = await validateImageDimensions(
                            file[Object.keys(file)[i]],
                            imageWidth,
                            imageHeight
                        );
                        if (isValid) {
                            return false;
                        }
                    }
                } else {
                    let isValid = await validateImageDimensions(file, imageWidth, imageHeight);
                    if (isValid) {
                        return false;
                    }
                }
                if (handleImageUpload) {
                    if (Object.keys(file).length && isMulti) {
                        handleImageUpload(file);
                    } else {
                        handleImageUpload(file);
                    }
                }
            },
            [imageWidth, imageHeight, handleImageUpload]
        );
        return (
            <FileUploader
                types={fileTypes}
                multiple={isMulti}
                handleChange={onFileChange}
                disabled={disabled}
            >
                <Flex
                    className={` py-4 bg-#FFEEDB border border-dashed border-main-orange rounded-[8px] cursor-pointer ${containerClasses}`}
                    align="center"
                    justify="center"
                    vertical
                >
                    {imageFile ? (
                        isMulti ? (
                            <div className="flex flex-wrap justify-start w-[431px] h-[334px]">
                                {Object.keys(imageFile).map((singleFile, idx) => (
                                    <img
                                        key={idx}
                                        src={
                                            imageFile[singleFile]?.url
                                                ? imageFile[singleFile]?.url
                                                : URL.createObjectURL(imageFile[singleFile])
                                        }
                                        alt="Uploaded File"
                                        style={calculateImageStyles(imageFile)}
                                        className={` max-w-full  ${calculateImagePadding(idx)}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Uploaded File"
                                className="max-h-full max-w-full w-[431px] h-[334px]"
                            />
                        )
                    ) : (
                        <>
                            <UploadImageIcon />
                            <Flex align="center">
                                <UploadIcon />
                                {imageCaption && (
                                    <span className="text-[#FF6600] text-[9px] ml-1">
                                        {imageCaption}
                                    </span>
                                )}
                            </Flex>
                            {imageInfoMsg && (
                                <p className="text-[9px] text-light-text">{imageInfoMsg}</p>
                            )}
                        </>
                    )}
                </Flex>
            </FileUploader>
        );
    }
);

export default DragImageUploader;
