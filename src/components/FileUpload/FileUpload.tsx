import { message } from "antd";
import React from "react";

const FileUpload = ({
    accept = MediaExtensions[MediaType.IMAGE],
    max = 1,
    change,
    files = [],
    boxShape = true,
    children,
    maxSize = 5242880
}) => {
    const inputRef = React.useRef(null);

    const validateFileSize = (selectedFile) => {
        if (selectedFile.size > maxSize) {
            return false;
        }
        return true;
    };

    const handleChange = async (e) => {
        const selectedFiles = e.target.files;
        let filteredFiles = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            if (!validateFileSize(selectedFiles[i])) {
                message.error(`${selectedFiles[i].name} must not be greater than 5MB!`);
            } else {
                filteredFiles.push(selectedFiles[i]);
            }
        }
        if (filteredFiles.length) {
            const views = await getBase64(filteredFiles);
            if (views) {
                change(views);
            }
        } else {
            if (files.length > 0) {
                change([...files]);
            } else {
                change([]);
            }
        }
        e.target.value = null;
    };

    const getBase64 = async (selectedFiles) => {
        const filesArray = [...files];
        let l = max - files.length;
        const lengthIs = Math.min(selectedFiles.length, l);

        for (let i = 0; i < lengthIs; i++) {
            filesArray.push(selectedFiles[i]);
        }

        const promises = filesArray.map(
            (file, i) =>
                new Promise((resolve, reject) => {
                    if (file?.blobUrl) {
                        resolve(file);
                    } else if (file.media) {
                        resolve({
                            mediaId: file.media.id,
                            blobUrl: file.media.location + file.media.path
                        });
                    } else {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve({ file, blobUrl: reader.result, id: i });
                        reader.onerror = (error) => reject(error);
                    }
                })
        );

        const views = await Promise.all(promises);
        return views;
    };

    return (
        <div className="flex">
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={max > 1}
                maxLength={max}
                onChange={handleChange}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    inputRef?.current?.click();
                }}
                className={`border-none w-[16px] ${
                    max > files?.length ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={max > files?.length ? false : true}
            >
                {children}
            </button>
        </div>
    );
};

export default FileUpload;
