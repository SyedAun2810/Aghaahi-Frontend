import ImageSlider from "@Components/ImagesSlider/ImageSlider";
import ProductContent from "./ProductContent";
import { serverVariationType } from "../../ProductTypes";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import Description from "./Description";

interface DetailExceptReviewType {
    images: any[];
    isLoading: boolean;
    price: number | null;
    availableStock: number | null;
    selectedSizeId: number | null;
    selectedColorId: number | null;
    colors: serverVariationType[];
    handleClick: (sizeId: number) => void;
    productDetails: any;
    variations: serverVariationType[] | null;
    colorChangeHandler: (colorId: number) => void;
}
export default function DetailExceptReview({
    price,
    colors,
    images,
    isLoading,
    variations,
    handleClick,
    selectedSizeId,
    availableStock,
    productDetails,
    selectedColorId,
    colorChangeHandler
}: DetailExceptReviewType) {
    if (isLoading) {
        return <ProgressLoader containerClasses={"h-[200px]"} />;
    }
    return (
        <>
            <div className="grid gap-0 lg:gap-12    grid-cols-1 lg:grid-cols-2  py-4">
                <div>
                    <ImageSlider
                        images={images}
                        className=" sm:w-[535px] lg:w-full 2xl:w-[535px]  w-full mx-auto"
                    />
                </div>
                <ProductContent
                    price={price}
                    colors={colors}
                    availableStock={availableStock}
                    variations={variations}
                    selectedSizeId={selectedSizeId}
                    productDetails={productDetails}
                    selectedColorId={selectedColorId}
                    sizeClickHandler={handleClick}
                    colorChangeHandler={colorChangeHandler}
                />
            </div>
        </>
    );
}
