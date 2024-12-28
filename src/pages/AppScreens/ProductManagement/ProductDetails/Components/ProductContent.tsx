import StarIcon from "@Assets/icons/starIcon.svg";
import { serverVariationType } from "../../ProductTypes";
import Description from "./Description";
import utilService from "@Utils/utils.service";

type ProductContentType = {
    colors: any;
    variations: any;
    productDetails: any;
    price: number | null;
    availableStock: number | null;
    selectedSizeId: number | null;
    selectedColorId: number | null;
    sizeClickHandler: (id: number) => void;
    colorChangeHandler: (id: number) => void;
};

export default function ProductContent({
    price,
    colors,
    variations,
    availableStock,
    selectedSizeId,
    productDetails,
    selectedColorId,
    sizeClickHandler,
    colorChangeHandler
}: ProductContentType) {
    return (
        <div className=" mt-3 2xl:mt-0">
            <h1 className="font-[500] text-xxl text-dark-main mb-8">{productDetails?.name}</h1>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center ">
                    <p className="font-[500] text-large text-main-orange ">${price}</p>
                </div>
                <div className="flex">
                    <p className="font-[500] text-base text-dark-main ">
                        {utilService.valuesOrDashes(productDetails?.ratings)}{" "}
                        <span className="font-[400] text-sm text-light-text  mr-1">{`(${utilService.valuesOrDashes(productDetails?.ratingsCount)})`}</span>
                    </p>
                    <StarIcon className="cursor-pointer" />
                </div>
            </div>
            {variations?.[0]?.color && (
                <>
                    <div className="mb-8">
                        <p className="font-[600] text-base text-dark-main mb-3">Color</p>
                        <div className="flex items-center flex-wrap">
                            {colors?.map((color: serverVariationType, index: number) => (
                                <div
                                    className={`mt-2 h-[46.5px] w-[46.5px] mr-2  flex items-center justify-center ${
                                        selectedColorId === color?.color?.id
                                            ? "rounded-lg border-amber-300 border-2 border-solid"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <div
                                        className={`h-[40px] w-[40px]  rounded-lg cursor-pointer bg-[${color?.color?.name}]  `}
                                        onClick={() => colorChangeHandler(color?.color?.id)}
                                        style={{ backgroundColor: color?.color?.name }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-8">
                        <p className="font-[600] text-base text-dark-main mb-3">Size</p>
                        <div className="flex items-center flex-wrap	">
                            {(() => {
                                const displayedNames = new Set();
                                return variations?.map((item: any, index: number) => {
                                    if (!displayedNames.has(item?.size?.name)) {
                                        displayedNames.add(item?.size?.name);
                                        const isSelected = selectedSizeId === item?.size?.id;
                                        return (
                                            <div
                                                key={index}
                                                className={`mt-2 h-[40px] p-[10px] rounded-lg font-[500] mr-2 flex items-center justify-center cursor-pointer ${
                                                    isSelected ? "bg-[#A9A9A9]" : "bg-stroke-light"
                                                }`}
                                                onClick={() => sizeClickHandler(item?.size?.id)}
                                            >
                                                {item?.size?.name}
                                            </div>
                                        );
                                    }
                                    return null;
                                });
                            })()}
                        </div>
                    </div>
                </>
            )}
            <div className="mb-8">
                <p className="font-[600] text-base text-dark-main mb-2">Available Stock</p>
                <p className="text-light-text font-[400] text-sm">{availableStock}</p>
            </div>
            <Description about={productDetails?.about} />
        </div>
    );
}
