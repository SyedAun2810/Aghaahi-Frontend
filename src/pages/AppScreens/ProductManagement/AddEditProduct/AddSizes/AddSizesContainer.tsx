import { useImperativeHandle, useRef, useState } from "react";

import utilService from "@Utils/utils.service";
import NotificationService from "@Services/NotificationService";
import { ModalMethods } from "@Components/CustomModal/CustomModalTypes";
import {
    colorChangeHandlerTypes,
    colorVariantTypes,
    imageRemovalTypes,
    UpdateColorVariationType
} from "../../ProductTypes";

const BASE_COLOR_KEY = "#FC9F14";
const COLOR_ALREADY_EXISTS_ERROR = "Color already selected, kindly choose a different color.";
const variationElement = {
    size: "",
    weight: "",
    dimensions: "",
    price: 0,
    boxes: [],
    colorVariants: [
        {
            id: 1,
            quantity: 0,
            color: BASE_COLOR_KEY,
            imageIdsData: []
        }
    ]
};
const colorVariantElement = {
    id: 1,
    quantity: 0,
    color: BASE_COLOR_KEY,
    imageIdsData: []
};

const singleBox = {
    height: 1,
    weight: 1,
    width: 1,
    length: 1,
    quantity: 1
};

let selectedColorId = -1;

export default function useAddSizesContainer({ form, ref, productData }) {
    let tempColorVariation = { ...colorVariantElement };
    tempColorVariation.imageIdsData = [];

    const modalRefAddNewVariant = useRef<ModalMethods>(null);
    const modalRefColorPicker = useRef<ModalMethods>(null);
    const modalRefProductImageUpload = useRef<ModalMethods>(null);
    const modalRefDeleteSize = useRef<ModalMethods>(null);
    const [variation, setVariation] = useState(productData);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColorAndQuantity, setSelectedColorAndQuantity] = useState({
        color: BASE_COLOR_KEY,
        quantity: 0
    });

    useImperativeHandle(
        ref,
        () => {
            return variation;
        },
        []
    );

    const colorChangeHandler = ({
        quantity,
        variantColorId,
        variantBackgroundColor
    }: colorChangeHandlerTypes) => {
        selectedColorId = variantColorId;
        setSelectedColorAndQuantity({ color: variantBackgroundColor, quantity });
        modalRefColorPicker.current?.openModal();
    };

    const removeImageHandler = ({ imageId, colorVariantId }: imageRemovalTypes) => {
        variation.colorVariants.filter((colorVariant: colorVariantTypes) => {
            let updatedimageIdsData = colorVariant.imageIdsData;
            if (colorVariant.id === colorVariantId) {
                updatedimageIdsData = colorVariant.imageIdsData.filter(
                    (el: any) => el.id !== imageId
                );
            }
            colorVariant.imageIdsData = updatedimageIdsData;
        });
        setVariation({ ...variation });
    };

    const clickImageHandler = ({ colorVariantId }: { colorVariantId: number }) => {
        selectedColorId = colorVariantId;
        modalRefProductImageUpload.current?.openModal();
    };

    const AddNewColorHandler = () => {
        modalRefAddNewVariant.current?.openModal();
    };

    const deleteModalOpenHandler = (size: string) => {
        setSelectedSize(size);
        modalRefDeleteSize.current?.openModal();
    };

    const addColorVariantHandler = (values: { color: string; image: any }) => {
        let ifColorAlreadyExists = checkingIfColorAlreadyExists(values.color.toUpperCase());
        if (ifColorAlreadyExists) {
            NotificationService.error(COLOR_ALREADY_EXISTS_ERROR);
            return;
        }
        let deepCopyColorVariation = utilService.createDeepCopy(colorVariantElement);
        deepCopyColorVariation.color = values.color.toUpperCase();
        // deepCopyColorVariation.quantity = Number(values.quantity);
        Object.keys(values.image).forEach((imgKey, idx) => {
            let imageObj = {};
            imageObj.file = values.image[imgKey];
            imageObj.id = idx;
            deepCopyColorVariation.imageIdsData.push(imageObj);
        });
        deepCopyColorVariation.id = calculateUniqueId(variation.colorVariants);
        variation.colorVariants.push(deepCopyColorVariation);

        setVariation({ ...variation });
    };

    const checkingIfColorAlreadyExists = (color: string) => {
        let matchedColorVariant = variation.colorVariants.find(
            (colorVariant: colorVariantTypes) => colorVariant.color === color
        );
        return matchedColorVariant;
    };

    const calculateUniqueId = (value: any) => {
        return value.length === 0 ? 1 : value[value.length - 1].id + 1;
    };

    const updatedVariationColor = (value: UpdateColorVariationType) => {
        variation.colorVariants.forEach((colorVariant: colorVariantTypes) => {
            if (colorVariant?.id === selectedColorId) {
                colorVariant.color = value?.color?.toUpperCase();
                colorVariant.quantity = Number(value?.quantity);
            }
        });
        setVariation({ ...variation });
    };

    const updateSizesColorsHandler = (values: UpdateColorVariationType) => {
        updatedVariationColor(values);
        modalRefColorPicker.current?.closeModal();
    };

    const addColorVariantModalFinishHandler = (values: { color: string; image: any }) => {
        addColorVariantHandler(values);
        modalRefAddNewVariant.current?.closeModal();
    };

    const uploadProductImageHandler = (values: any) => {
        uploadImageHandler(values);
        modalRefProductImageUpload.current?.closeModal();
    };

    const uploadImageHandler = (value: any) => {
        if (!value) {
            return;
        }
        variation?.colorVariants?.forEach((colorVariant: colorVariantTypes) => {
            if (colorVariant.id === selectedColorId) {
                const sumOfImages =
                    colorVariant?.imageIdsData?.length + Object.keys(value?.image)?.length;
                const moreImageCanBeUploaded = 5 - colorVariant?.imageIdsData?.length;
                if (sumOfImages > 5) {
                    NotificationService.error(
                        `Max 5 images are allowed! Kindly upload ${moreImageCanBeUploaded} more images.`
                    );
                    return;
                }
                Object.keys(value?.image).forEach((imgKey) => {
                    let imageObj = {};
                    imageObj.file = value?.image[imgKey];
                    imageObj.id = calculateUniqueId(colorVariant.imageIdsData);
                    colorVariant.imageIdsData.push(imageObj);
                });
                // if (value.quantity && selectedColorImagesSize === 0) {
                //     colorVariant.quantity = Number(value.quantity);
                // }
            }
        });
        setVariation({ ...variation });
    };

    // add new box to boxes
    const addBoxClickHandler = () => {
        const tempSingleBox = { ...singleBox };
        variation.boxes.push(tempSingleBox);
        setVariation({ ...variation });
    };

    // remove box
    const removeBoxHandler = (idx: number) => {
        if (variation?.boxes?.length) {
            variation.boxes[idx] = null;
            setVariation({ ...variation });
        }
    };
    return {
        variation,
        selectedSize,
        removeBoxHandler,
        addBoxClickHandler,
        clickImageHandler,
        colorChangeHandler,
        removeImageHandler,
        modalRefDeleteSize,
        AddNewColorHandler,
        modalRefColorPicker,
        modalRefAddNewVariant,
        addColorVariantHandler,
        deleteModalOpenHandler,
        selectedColorAndQuantity,
        updateSizesColorsHandler,
        uploadProductImageHandler,
        modalRefProductImageUpload,
        addColorVariantModalFinishHandler
    };
}
