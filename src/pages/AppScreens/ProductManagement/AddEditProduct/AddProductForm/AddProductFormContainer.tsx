import { useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useProductParentCategories,
    useProductSubCategories
} from "../../Queries/ProductListQuery";

import { imageValidations } from "@Services/fileUploadService";
import { OptionType } from "../../ProductTypes";

let parentIdUpdatedCount = 0;
const singleBox = {
    height: 1,
    weight: 1,
    width: 1,
    length: 1,
    quantity: 1
};

export default function useAddProductFormContainer({
    ref,
    form,
    images,
    productBoxes,
    productCategories
}) {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(images);
    const [boxes, setBoxes] = useState([]);
    const [parentId, setParentId] = useState<number | string | null>(null);
    const [parentCategories, setParentCategories] = useState<OptionType[]>([]);
    const [subCategories, setSubCategories] = useState<OptionType[]>([]);

    useImperativeHandle(
        ref,
        () => {
            return { imageFile, boxes };
        },
        [imageFile, boxes?.length]
    );

    useEffect(() => {
        setImageFile(images);
    }, [images]);
    useEffect(() => {
        setBoxes(productBoxes);
    }, [productBoxes]);
    const goBackClickHandler = () => {
        navigate(-1);
    };

    const handleImageUpload = (file: any) => {
        let tempImageFile = {};
        let isValid = true;
        Object.keys(file).every((singleFile) => {
            if (!imageValidations(file[singleFile])) {
                isValid = false;
                return false;
            }
        });

        if (isValid) {
            Object.keys(file).forEach((singleFile) => {
                tempImageFile[singleFile] = file[singleFile];
            });
            setImageFile(tempImageFile);
        }
    };

    const OnlyParent = true;

    const { data: productParentCategoryListing } = useProductParentCategories(OnlyParent);

    const { data: productSubCategoryListing, refetch: refetchProductSubCategoryData } =
        useProductSubCategories({ parentId: parentId, isLinear: true, Keyword: "" });

    useEffect(() => {
        if (parentId !== null && parentIdUpdatedCount !== 1) {
            refetchProductSubCategoryData();
        }
    }, [parentId]);

    useEffect(() => {
        if (productCategories !== null) {
            setParentId(productCategories?.parentCategory?.value);
            parentIdUpdatedCount = 1;
            form.setFieldValue("parentCategoryIds", [productCategories?.parentCategory?.label]);
            if (!parentCategories.length) {
                parentCategories.push(productCategories?.parentCategory);
                setParentCategories([...parentCategories]);
            }
            if (!subCategories.length) {
                subCategories.push(productCategories?.subCategory);
                setSubCategories([...subCategories]);
            }
        }
    }, [productCategories]);

    useEffect(() => {
        if (productParentCategoryListing?.data) {
            const parentCategoryOptionsModified = productParentCategoryListing?.data.map(
                (item: any) => ({
                    value: item.id,
                    label: item.name
                })
            );
            setParentCategories([...parentCategoryOptionsModified]);
        }
    }, [productParentCategoryListing?.data]);

    useEffect(() => {
        if (productSubCategoryListing?.data) {
            const parentCategoryOptionsModified = productSubCategoryListing?.data.map(
                (item: any) => ({
                    value: item.id,
                    label: item.name
                })
            );
            setSubCategories([...parentCategoryOptionsModified]);
        }
    }, [productSubCategoryListing?.data]);

    useEffect(() => {
        if (parentIdUpdatedCount === 1) {
            form.setFieldValue("categoryIds", productCategories?.subCategory?.value);
        }
    }, [parentIdUpdatedCount]);

    const handleCategoryChange = (value: any) => {
        parentIdUpdatedCount++;
        setParentId(value);
        form.setFieldsValue({ categoryIds: [] });
    };

    useEffect(() => {
        return () => {
            setParentCategories([]);
            setSubCategories([]);
            parentIdUpdatedCount = 0;
        };
    }, []);

    const addBoxClickHandler = () => {
        const tempSingleBox = { ...singleBox };
        setBoxes((prev) => [...prev, tempSingleBox]);
    };

    // remove box
    const removeBoxHandler = (idx: number) => {
        if (boxes?.length) {
            boxes[idx] = null;
            setBoxes([...boxes]);
        }
    };
    return {
        goBackClickHandler,
        handleImageUpload,
        removeBoxHandler,
        imageFile,
        parentCategories,
        subCategories,
        handleCategoryChange,
        boxes,
        addBoxClickHandler
    };
}
