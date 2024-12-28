import { Flex } from "antd";
import { useParams } from "react-router-dom";

import DetailExceptReview from "./Components/DetailExceptReview";
import useProductDetailsContainer from "./ProductDetailsContainer";
import ProductDetailsHeader from "./Components/ProductDetailsHeader";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import ReviewManagement from "./ReviewManagement/ReviewManagement";

export default function ProductDetails() {
    const { id: productId } = useParams();

    const {
        price,
        rating,
        colors,
        images,
        variations,
        handleClick,
        updateRating,
        selectedSizeId,
        availableStock,
        productDetails,
        backButtonClick,
        selectedColorId,
        colorChangeHandler,
        productDetailsLoading
    } = useProductDetailsContainer();
    return (
        <Flex className="" vertical gap={"large"}>
            <RoundedContainer>
                <ProductDetailsHeader
                    backButtonClickHandler={backButtonClick}
                    productId={productId}
                />
                <DetailExceptReview
                    price={price}
                    colors={colors}
                    images={images}
                    variations={variations}
                    handleClick={handleClick}
                    productDetails={productDetails}
                    selectedSizeId={selectedSizeId}
                    availableStock={availableStock}
                    selectedColorId={selectedColorId}
                    colorChangeHandler={colorChangeHandler}
                    isLoading={productDetailsLoading}
                />
                <ReviewManagement rating={rating} updateRatingHandler={updateRating} />
            </RoundedContainer>
        </Flex>
    );
}
