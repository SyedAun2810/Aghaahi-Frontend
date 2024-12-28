import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useProductDetails } from "../Queries/ProductListQuery";
import { serverVariationType } from "../ProductTypes";
import { modifyAndKeepCompressedImages } from "../utils";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

export default function useProductDetailsContainer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState<number>(3);
    const [variations, setVariations] = useState<serverVariationType[] | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [availableStock, setAvailableStock] = useState<number | null>(null);
    const [colors, setColors] = useState<serverVariationType[]>([]);
    const [images, setImages] = useState<any[]>([]);

    const {
        data: productDetails,
        isFetching: productDetailsLoading,
        refetch: refetchproductDetails
    } = useProductDetails(Number(id));

    useEffect(() => {
        if (productDetails?.variations) {
            const defaultVariation = productDetails?.variations?.filter(
                (variation: serverVariationType) =>
                    productDetails?.variations[0]?.size?.id === variation?.size?.id
            );
            const compressedImages = modifyAndKeepCompressedImages(defaultVariation[0]?.images);
            setVariations(productDetails?.variations);
            setPrice(defaultVariation[0]?.price);
            setColors(defaultVariation);
            setImages(compressedImages);
            setAvailableStock(defaultVariation[0]?.quantity);
            const isProductVariant = defaultVariation[0]?.isVariant;
            if (isProductVariant) {
                setSelectedSizeId(defaultVariation[0]?.size?.id);
                setSelectedColorId(defaultVariation[0]?.color?.id);
            }
        }
    }, [productDetails]);

    const handleClick = (sizeId: number) => {
        setSelectedSizeId(sizeId);

        const selectedVariations = variations?.filter(
            (variation: serverVariationType) => variation?.size?.id === sizeId
        );

        if (selectedVariations) {
            const compressedImages = modifyAndKeepCompressedImages(selectedVariations[0]?.images);
            setImages(compressedImages);
            setSelectedColorId(selectedVariations[0]?.color?.id);
            setPrice(selectedVariations[0]?.price);
            setAvailableStock(selectedVariations[0]?.quantity);
            setColors(selectedVariations);
        }
    };

    const colorChangeHandler = (colorId: number) => {
        setSelectedColorId(colorId);
        const selectedVariations = colors?.filter(
            (variation: serverVariationType) => variation?.color?.id === colorId
        );
        const compressedImages = modifyAndKeepCompressedImages(selectedVariations[0]?.images);
        setImages(compressedImages);
        setAvailableStock(selectedVariations[0]?.quantity);
    };

    const backButtonClick = () => {
        navigate(NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT);
    };

    const updateRating = (value: number) => {
        setRating(value);
    };

    return {
        price,
        rating,
        colors,
        images,
        variations,
        handleClick,
        updateRating,
        selectedSizeId,
        productDetails,
        availableStock,
        backButtonClick,
        selectedColorId,
        colorChangeHandler,
        productDetailsLoading
    };
}
