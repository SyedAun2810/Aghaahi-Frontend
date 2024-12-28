import { Form } from "antd";
import { useEffect, useState } from "react";

import useAuthStore from "@Store/authStore";
import { useGetProducts } from "../Queries/PurchasePlanQuery";
import { imageValidations } from "@Services/fileUploadService";

export interface OptionType {
    label: string;
    value: string;
    key: number;
}

interface ProductDropDownDataTypes {
    selectedProduct: number | undefined;
    inputField: string;
}

const INPUT_FIELD = "inputField";
const SELECTED_PRODUCT_KEY = "selectedProduct";

export default function usePurchasePlanContainer(
    onFinish: (values: any) => void,
    isProductAdvertisement: boolean
) {
    const { userData } = useAuthStore();
    const userStoreId = userData?.store?.id;

    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [productOptions, setProductOptions] = useState<OptionType[]>([]);
    const [productDropDownData, setProductDropDownData] = useState<ProductDropDownDataTypes>({
        selectedProduct: undefined,
        inputField: ""
    });

    const handleFinish = (values: any) => {
        onFinish({ ...values, image: imageFile, productId: productDropDownData?.selectedProduct });
    };

    // handling image upload
    const handleImageUpload = (file: any) => {
        if (imageValidations(file)) setImageFile(file);
        form.setFieldValue("image", file?.name);
        form.validateFields(["image"]);
    };

    // fetching products
    const { data: products, isFetching: loadingProducts } = useGetProducts({
        queryParams: { Keyword: productDropDownData?.inputField, StoreIds: userStoreId },
        isProduct: isProductAdvertisement
    });

    // modifying products data to create options
    useEffect(() => {
        if (!loadingProducts && products?.data) {
            const productsOptions = products?.data.map((item: any) => ({
                key: item.id,
                value: item.name,
                label: item.name
            }));
            setProductOptions([...productsOptions]);
        }
    }, [loadingProducts]);

    // product select handler
    const updateProduct = (value: OptionType | string, isInput: boolean) => {
        setProductDropDownData((prev) => ({
            ...prev,
            ...(!isInput && { [SELECTED_PRODUCT_KEY]: value?.key }),
            [INPUT_FIELD]: isInput ? value : value?.value
        }));
    };

    return {
        form,
        imageFile,
        handleFinish,
        productOptions,
        updateProduct,
        handleImageUpload,
        productDropDownData
    };
}
