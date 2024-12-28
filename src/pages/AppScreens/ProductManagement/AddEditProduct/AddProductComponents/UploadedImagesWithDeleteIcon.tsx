import { Image } from "antd";

import AddImageIcon from "@Assets/icons/addImageIcon.png";
import ImageDeleteIcon from "@Assets/icons/imageCrossIcon.svg";
import { imageRemovalTypes } from "../../ProductTypes";

const deleteIconStyles = {
    top: "-10px",
    right: "6px"
};

interface UploadedImagesWithDeleteIconTypes {
    colorVariant: any;
    isLoading: boolean;
    clickImageHandler: ({ colorVariantId }: { colorVariantId: number }) => void;
    removeImageHandler: ({ imageId, colorVariantId }: imageRemovalTypes) => void;
}
export default function UploadedImagesWithDeleteIcon({
    isLoading,
    colorVariant,
    clickImageHandler,
    removeImageHandler
}: UploadedImagesWithDeleteIconTypes) {
    return (
        <div className="flex items-center flex-wrap">
            {colorVariant?.imageIdsData?.map((image, idx) => (
                <div className="relative" key={idx}>
                    <div className=" mr-4  ">
                        <Image
                            src={image?.file ? URL.createObjectURL(image.file) : image.url}
                            width={120}
                            className="h-[120px] rounded-lg "
                            alt="image"
                            preview={false}
                        />
                    </div>
                    <ImageDeleteIcon
                        style={deleteIconStyles}
                        className={`absolute ${
                            isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={
                            isLoading
                                ? () => {}
                                : () =>
                                      removeImageHandler({
                                          imageId: image.id,
                                          colorVariantId: colorVariant.id
                                      })
                        }
                    />
                </div>
            ))}

            {colorVariant.imageIdsData.length < 5 ? (
                <div className="mr-4  ">
                    <Image
                        src={AddImageIcon}
                        alt={"add icon"}
                        preview={false}
                        className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
                        onClick={
                            isLoading
                                ? () => {}
                                : () =>
                                      clickImageHandler({
                                          colorVariantId: colorVariant.id
                                      })
                        }
                    />
                </div>
            ) : null}
        </div>
    );
}
