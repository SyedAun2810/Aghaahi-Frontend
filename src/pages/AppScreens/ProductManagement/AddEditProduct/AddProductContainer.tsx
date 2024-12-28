import { Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import utilService from "@Utils/utils.service";
import { useGetProduct, useProduct } from "./ProductQuery";
import NotificationService from "@Services/NotificationService";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";
import { ModalMethods } from "@Components/CustomModal/CustomModalTypes";
import {
    BOX_REQUIREMENT_VALIDATION,
    BOX_WIDTH_VALIDATION,
    CREATE_VARIATION_ERROR,
    GENERAL_ERROR_MSG,
    IMAGES_UPLOADED_VALIDATION,
    SIZE_ALREADY_EXISTS
} from "./constants/ErrorAndSuccessMessages";
import {
    DIMENSION_FIELDS,
    PAYLOAD_DATA_WITHOUT_VARIATION,
    PAYLOAD_DATA_WITH_VARIATION,
    REMOVE_FIELDS_ON_VARIATION_UN_CHECK
} from "./constants/PayloadDataFields";
import {
    generalDataFieldsType,
    serverImageType,
    serverColorVariantType,
    serverVariationType,
    variationElementType,
    getProductResponseType,
    CategoryAndSubCategoryType,
    OptionType,
    BoxesDataTypes,
    BoxDataTypes
} from "../ProductTypes";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { PROCESSING_CATEGORY_STATUS_VALUES } from "@Constants/app";

const SIZE_KEY = "size";
const PRICE_KEY = "price";
const BOXES_KEY = "boxes";
const WIDTH_KEY = "width";
const WEIGHT_KEY = "weight";
const HEIGHT_KEY = "height";
const LENGTH_KEY = "length";
const QUANTITY_KEY = "quantity";
const IMAGE_IDS_KEY = "imageIds";
const BASE_COLOR_KEY = "#FC9F14";
const IS_VARIANT_KEY = "isVariant";
const DIMENSION_KEY = "dimensions";
const VARIATIONS_KEY = "variations";
const PROCESSING_KEY = "processingCategory";
const PACKAGING_OPTIONS_KEY = "packagingOptions";
const initialGeneralData: generalDataFieldsType = {
    sku: "",
    name: "",
    about: "",
    tags: "",
    length: "",
    height: "",
    width: ""
};
const variationElement = {
    size: "",
    weight: "",
    dimensions: "",
    price: 0,
    boxes: [],
    processingCategory: null,
    colorVariants: []
};
const variant = {
    id: 1,
    color: BASE_COLOR_KEY,
    imageIdsData: []
};
let imageFile: any = null;
let boxes: any = [];

export default function useAddProductContainer() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [isProductAdding, setIsProductAdding] = useState(false);
    const [isGettingProduct, setIsGettingProduct] = useState(id ? true : false);
    const [productSizes, setProductSizes] = useState<variationElementType[]>([]);
    const [isMultipleSizesSelected, setIsMultipleSizesSelected] = useState(false);
    const [singleProductImageError, setSingleProductImageError] = useState(false);
    const [productParentAndSubCategory, setProductParentAndSubCategory] =
        useState<CategoryAndSubCategoryType | null>(null);

    const variantsRefs = useRef({});
    const formDataRefs = useRef({});
    const mainContainerRef = useRef<HTMLDivElement | null>(null);

    const modalRefImageUpload = useRef<ModalMethods>(null);
    const modalRefAddProductCategory = useRef<ModalMethods>(null);

    const multipleSizesToggler = () => {
        if (!isMultipleSizesSelected) {
            REMOVE_FIELDS_ON_VARIATION_UN_CHECK.forEach((field) => {
                form.setFieldValue(field, "");
            });
            DIMENSION_FIELDS.forEach((field) => {
                form.setFieldValue(field, "");
            });
        }
        setIsMultipleSizesSelected(!isMultipleSizesSelected);
    };

    const onSuccess = () => {
        setIsProductAdding(false);
        navigate(NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT);
    };

    // modifying data for edit product
    const onGetProductSuccess = (data: getProductResponseType) => {
        setIsGettingProduct(true);
        try {
            // combining tags as single comma separated string
            let tags: string[] = [];
            data?.tags?.map((tag: any) => tags.push(tag?.name));

            // getting general data of product
            initialGeneralData.sku = data?.sku;
            initialGeneralData.name = data?.name;
            initialGeneralData.about = data?.about;
            initialGeneralData.tags = tags.join(", ");
            if (data?.variations?.length === 1 && !data?.variations[0]?.isVariant) {
                initialGeneralData.weight = data?.variations[0]?.weight;
                initialGeneralData.quantity = Number(data?.variations[0]?.quantity);
                // let dimensionsSeparated = data?.variations[0]?.dimensions?.split("/");
                initialGeneralData.length = data?.variations[0]?.length;
                initialGeneralData.height = data?.variations[0]?.height;
                initialGeneralData.width = data?.variations[0]?.width;
                initialGeneralData.price = data?.variations[0]?.price;
                initialGeneralData.processingCategory = data?.variations[0]?.processingCategory;
                form.setFieldValue(`${PROCESSING_KEY}`, data?.variations[0]?.processingCategory);
                data?.variations[0]?.packagingOptions?.forEach((box: BoxDataTypes, idx: number) => {
                    form.setFieldValue(`${LENGTH_KEY}-${idx}`, box?.length);
                    form.setFieldValue(`${HEIGHT_KEY}-${idx}`, box?.height);
                    form.setFieldValue(`${WIDTH_KEY}-${idx}`, box?.width);
                    form.setFieldValue(`${QUANTITY_KEY}-${idx}`, box.quantity);
                });
                let imageFileObj: { [key: number]: serverImageType } = {};
                data?.variations[0]?.images?.forEach(
                    (image: serverImageType, index: number) => (imageFileObj[index] = image)
                );
                imageFile = imageFileObj;
                boxes = data?.variations[0]?.packagingOptions;
            }
            // making the form validations update
            Object.keys(initialGeneralData).map((el: string) =>
                form.setFieldValue(el, initialGeneralData[el as keyof typeof initialGeneralData])
            );

            // filtering out sizes
            let prodSizes = [];
            const prodVariations: variationElementType[] = [];
            data?.sizes?.forEach((size: any) => {
                prodSizes.push(size?.name);
                let prodVariation = utilService.createDeepCopy(variationElement);
                prodVariation.size = size?.name;
                prodVariations.push(prodVariation);
            });

            // updating the variations' data
            prodVariations.forEach((prodVariation) => {
                data?.variations.map((variation: serverVariationType) => {
                    if (variation.size.name === prodVariation.size) {
                        prodVariation.weight = variation.weight;
                        prodVariation.price = variation.price;
                        // separating out the dimensions field to make length, width and height of them
                        prodVariation.dimensions = variation.dimensions;
                        prodVariation.boxes = variation?.packagingOptions;
                        prodVariation.processingCategory = variation?.processingCategory;
                        form.setFieldValue(
                            `${PROCESSING_KEY}-${prodVariation.size}`,
                            variation?.processingCategory
                        );
                        variation?.packagingOptions?.forEach((box: BoxDataTypes, idx: number) => {
                            form.setFieldValue(
                                `${LENGTH_KEY}-${prodVariation.size}-${idx}`,
                                box?.length
                            );
                            form.setFieldValue(
                                `${HEIGHT_KEY}-${prodVariation?.size}-${idx}`,
                                box?.height
                            );
                            form.setFieldValue(
                                `${WIDTH_KEY}-${prodVariation?.size}-${idx}`,
                                box?.width
                            );
                            form.setFieldValue(
                                `${QUANTITY_KEY}-${prodVariation?.size}-${idx}`,
                                box.quantity
                            );
                        });
                        prodVariation.length = variation?.length;
                        prodVariation.height = variation?.height;
                        prodVariation.width = variation?.width;
                        form.setFieldValue(`weight-${prodVariation.size}`, variation.weight);
                        form.setFieldValue(`price-${prodVariation.size}`, variation.price);
                        form.setFieldValue(`length-${prodVariation.size}`, variation?.length);
                        form.setFieldValue(`height-${prodVariation.size}`, variation?.height);
                        form.setFieldValue(`width-${prodVariation.size}`, variation?.width);
                        form.setFieldValue(`quantity-${prodVariation.size}`, variation.quantity);
                        let variantTemp: serverColorVariantType = {};
                        variantTemp.id = variation.id;
                        variantTemp.color = variation.color.name;
                        variantTemp.quantity = Number(variation.quantity);
                        variantTemp.imageIdsData = variation.images;
                        prodVariation.colorVariants.push(variantTemp);
                    }
                });
            });
            // making ready category and subcategory
            let productCategorySubCategory = {} as CategoryAndSubCategoryType;
            const productCategory = data?.categories[0];
            const subCategory: OptionType = {
                value: productCategory?.id,
                label: productCategory?.name
            };
            const parentCategory: OptionType = {
                label: productCategory?.parent?.name,
                value: productCategory?.parent?.id
            };
            productCategorySubCategory.subCategory = subCategory;
            productCategorySubCategory.parentCategory = parentCategory;
            setProductParentAndSubCategory({ ...productCategorySubCategory });
            setProductSizes([...prodVariations]);
            setIsMultipleSizesSelected(data?.variations[0]?.isVariant);
        } catch (err) {
        } finally {
            setIsGettingProduct(false);
        }
    };

    // mutations for create/update/get product
    const { mutate: addProductMutate, isLoading: isAddingProduct } = useProduct({ onSuccess, id });
    const { mutate: getProductById, isLoading: isGetProductLoading } = useGetProduct({
        onSuccess: onGetProductSuccess
    });
    const { mutateAsync: uploadDocument, isLoading: isUploadingDocument } = useUploadDocuments();

    // getting product for product edit
    useEffect(() => {
        async function getProduct() {
            let response = getProductById(Number(id));
            return response;
        }
        if (id) {
            let resp = getProduct();
        }
    }, [id]);

    // offloading the images
    useEffect(() => {
        return () => {
            imageFile = null;
            boxes = [];
            setProductParentAndSubCategory(null);
        };
    }, []);

    const scrollToTop = () => {
        if (mainContainerRef.current !== null) {
            mainContainerRef.current.scrollIntoView(true);
        }
    };
    // handling add and update product
    const handleSubmit = async (values) => {
        scrollToTop();
        setIsProductAdding(true);
        try {
            let payload;
            if (!isMultipleSizesSelected) {
                if (formDataRefs.current && !formDataRefs.current.imageFile) {
                    NotificationService.error(IMAGES_UPLOADED_VALIDATION);
                    return;
                }
                if (formDataRefs.current && !formDataRefs.current.boxes?.length) {
                    NotificationService.error(BOX_REQUIREMENT_VALIDATION);
                    return;
                }
                payload = await payloadWithoutSizeVariation(values);
            } else {
                if (!isValidDataHandler(values)) {
                    return;
                }
                payload = await payloadWithSizeVariation(values);
            }
            addProductMutate({ payload, isEdit: id ? true : false, productId: id });
        } catch (err) {
            NotificationService.error(GENERAL_ERROR_MSG);
        } finally {
            setIsProductAdding(false);
        }
    };

    // making payload for product having variation
    const payloadWithSizeVariation = async (values) => {
        values.categoryIds = [values.categoryIds];
        values.tags = values.tags.split(",").map((tag: string) => tag.trim());
        values.price = Number(values.price);
        values.quantity = values.quantity === "" ? 0 : Number(values.quantity);
        values.processingCategory = Number(values.processingCategory);
        let payload = {};
        PAYLOAD_DATA_WITHOUT_VARIATION.forEach((el: string) => {
            payload[el] = values[el];
        });
        delete payload.weight;
        payload[IS_VARIANT_KEY] = true;
        payload[VARIATIONS_KEY] = [];
        for (const variant in variantsRefs.current) {
            let variantValue = variantsRefs.current[variant];

            if (variantValue !== null) {
                let colorVariants = variantValue?.colorVariants;
                let colorVariantsLength = colorVariants?.length;
                // putting size, weight, dimensions from form data into variant
                variantValue[SIZE_KEY] = variant;
                PAYLOAD_DATA_WITH_VARIATION.forEach((dataKey) => {
                    if (dataKey === PRICE_KEY || dataKey === WEIGHT_KEY) {
                        variantValue[dataKey] = Number(values[`${dataKey}-${variant}`]);
                    } else if (dataKey === DIMENSION_KEY) {
                        variantValue[HEIGHT_KEY] = Number(values[`${HEIGHT_KEY}-${variant}`]);
                        variantValue[WIDTH_KEY] = Number(values[`${WIDTH_KEY}-${variant}`]);
                        variantValue[LENGTH_KEY] = Number(values[`${LENGTH_KEY}-${variant}`]);
                        variantValue[PROCESSING_KEY] = Number(
                            values[`${PROCESSING_KEY}-${variant}`]
                        );
                    } else if (dataKey === BOXES_KEY) {
                        const packagingOptions: BoxesDataTypes = [];
                        variantValue?.boxes?.forEach((box: BoxDataTypes, idx: number) => {
                            if (box) {
                                const tempBox = {} as BoxDataTypes;
                                tempBox.height = Number(values[`${HEIGHT_KEY}-${variant}-${idx}`]);
                                tempBox.width = Number(values[`${WIDTH_KEY}-${variant}-${idx}`]);
                                tempBox.length = Number(values[`${LENGTH_KEY}-${variant}-${idx}`]);
                                tempBox.quantity = Number(
                                    values[`${QUANTITY_KEY}-${variant}-${idx}`]
                                );
                                packagingOptions.push(tempBox);
                            }
                        });
                        variantValue[PACKAGING_OPTIONS_KEY] = packagingOptions;
                    } else {
                        variantValue[dataKey] = values[`${dataKey}-${variant}`];
                    }
                });
                for (let i = 0; i < colorVariantsLength; i++) {
                    let colorVariant = colorVariants[i];
                    colorVariant.quantity = isNaN(colorVariant.quantity)
                        ? 0
                        : Number(colorVariant.quantity);
                    colorVariant.imageIds = [];
                    let imagesCount = colorVariant.imageIdsData?.length;
                    for (let j = 0; j < imagesCount; j++) {
                        if (colorVariant?.imageIdsData[j]?.file) {
                            let imageId = await uploadImageHandling(
                                colorVariant?.imageIdsData[j]?.file
                            );
                            colorVariant.imageIds.push(imageId);
                        } else {
                            colorVariant.imageIds.push(colorVariant?.imageIdsData[j]?.id);
                        }
                    }
                }
                payload[VARIATIONS_KEY].push(variantValue);
            }
        }
        return payload;
    };

    // validating the variations and images in those variations
    const isValidDataHandler = (values) => {
        let isValid = true;
        if (isMultipleSizesSelected && utilService.isEmpty(variantsRefs.current)) {
            NotificationService.error(CREATE_VARIATION_ERROR);
            isValid = false;
        }
        if (!utilService.isEmpty(variantsRefs.current)) {
            Object.keys(variantsRefs.current).forEach((variant) => {
                variantsRefs.current[variant]?.colorVariants?.forEach((colorVariant) => {
                    if (colorVariant?.imageIdsData.length === 0) {
                        isValid = false;
                        NotificationService.error(IMAGES_UPLOADED_VALIDATION);
                        return false;
                    }
                });
                if (!variantsRefs.current[variant]?.boxes?.length) {
                    isValid = false;
                    NotificationService.error(BOX_REQUIREMENT_VALIDATION);
                    return false;
                }
                variantsRefs.current[variant]?.boxes?.forEach((box: BoxDataTypes, idx: number) => {
                    const tempBox = {} as BoxDataTypes;
                    tempBox.height = Number(values[`${HEIGHT_KEY}-${variant}-${idx}`]);
                    tempBox.width = Number(values[`${WIDTH_KEY}-${variant}-${idx}`]);
                    tempBox.length = Number(values[`${LENGTH_KEY}-${variant}-${idx}`]);
                    tempBox.quantity = Number(values[`${QUANTITY_KEY}-${variant}-${idx}`]);

                    let grith = 2 * tempBox.height + 2 * tempBox.width;
                    if (tempBox.length + grith > 108) {
                        isValid = false;
                        NotificationService.error(BOX_WIDTH_VALIDATION);
                        return false;
                    }
                });
            });
        }
        return isValid;
    };

    // making payload for product having variation
    const payloadWithoutSizeVariation = async (values) => {
        let payload = {};
        values.price = Number(values.price);
        values.weight = Number(values.weight);
        values.quantity = values.quantity === "" ? 0 : Number(values.quantity);
        values.categoryIds = [values.categoryIds];
        values.tags = values.tags.split(",").map((tag: string) => tag.trim());
        values.dimensions = `${values.length}/${values.height}/${values.width}`;
        if (!isMultipleSizesSelected) {
            PAYLOAD_DATA_WITHOUT_VARIATION.forEach((dataKey) => {
                if (dataKey === DIMENSION_KEY) {
                    payload[HEIGHT_KEY] = Number(values.height);
                    payload[WIDTH_KEY] = Number(values.width);
                    payload[LENGTH_KEY] = Number(values.length);
                    payload[PROCESSING_KEY] = Number(values.processingCategory);
                } else {
                    payload[dataKey] = values[dataKey];
                }
            });
            payload[PACKAGING_OPTIONS_KEY] = [];
            if (formDataRefs.current && formDataRefs.current.boxes) {
                const packagingOptions: BoxesDataTypes = [];
                formDataRefs.current.boxes?.forEach((box: BoxDataTypes, idx: number) => {
                    if (box) {
                        const tempBox = {} as BoxDataTypes;
                        tempBox.height = Number(values[`${HEIGHT_KEY}-${idx}`]);
                        tempBox.width = Number(values[`${WIDTH_KEY}-${idx}`]);
                        tempBox.length = Number(values[`${LENGTH_KEY}-${idx}`]);
                        tempBox.quantity = Number(values[`${QUANTITY_KEY}-${idx}`]);
                        packagingOptions.push(tempBox);
                    }
                });
                payload[PACKAGING_OPTIONS_KEY] = packagingOptions;
            }
            payload[IS_VARIANT_KEY] = false;
            payload[IMAGE_IDS_KEY] = [];
            if (formDataRefs.current && formDataRefs.current.imageFile) {
                let imagesCount = Object.keys(formDataRefs.current.imageFile).length;
                for (let i = 0; i < imagesCount; i++) {
                    if (formDataRefs.current.imageFile[i]?.url) {
                        payload[IMAGE_IDS_KEY].push(formDataRefs.current.imageFile[i]?.id);
                    } else {
                        let imageId = await uploadImageHandling(formDataRefs.current.imageFile[i]);
                        payload[IMAGE_IDS_KEY].push(imageId);
                    }
                }
            }
        }
        return payload;
    };

    const uploadImageHandling = async (imageFile) => {
        let imageId;
        const formData = new FormData();
        formData.append("Media", imageFile);
        await uploadDocument(formData)
            .then((res) => {
                imageId = res?.data?.data[0].id;
            })
            .catch((e) => console.error(e));
        return imageId;
    };

    const handleSubmitFailed = () => {
        scrollToTop();
        if (formDataRefs.current && !formDataRefs.current.imageFile) {
            setSingleProductImageError(true);
        }
    };

    const uploadImageHandler = (value) => {
        if (!value) {
            return;
        }
    };

    const openAddProductCategoryModalHandler = () => {
        modalRefAddProductCategory.current?.openModal();
    };

    const addNewSizeVariantHandler = (values: { size: string }) => {
        const ifSizeAlreadyExists = productSizes.filter((product) => product.name === values.size);
        if (ifSizeAlreadyExists.length === 1) {
            NotificationService.error(SIZE_ALREADY_EXISTS);
            return;
        }
        if (values && values?.size) {
            let prodVariation = utilService.createDeepCopy(variationElement);
            prodVariation.colorVariants.push(utilService.createDeepCopy(variant));
            prodVariation.size = values?.size;
            setProductSizes((prev) => [...prev, prodVariation]);
        }
        modalRefAddProductCategory.current?.closeModal();
    };

    const removeSizeVariantHandler = (value: string | undefined) => {
        if (!value) return;
        setProductSizes((prev) => prev.filter((variant) => variant.size !== value));
    };

    const uploadSingleProductHandler = (values) => {
        uploadImageHandler(values.image);
        modalRefImageUpload.current?.closeModal();
    };

    return {
        form,
        boxes,
        imageFile,
        productSizes,
        variantsRefs,
        formDataRefs,
        handleSubmit,
        isProductAdding,
        isGettingProduct,
        mainContainerRef,
        handleSubmitFailed,
        uploadImageHandler,
        isGetProductLoading,
        modalRefImageUpload,
        multipleSizesToggler,
        singleProductImageError,
        isMultipleSizesSelected,
        removeSizeVariantHandler,
        addNewSizeVariantHandler,
        uploadSingleProductHandler,
        modalRefAddProductCategory,
        productParentAndSubCategory,
        openAddProductCategoryModalHandler,
        isLoading: isProductAdding || isGetProductLoading || isGettingProduct
    };
}
