import { colorChangeHandlerTypes } from "../../ProductTypes";
import EditStockIcon from "@Assets/icons/editStockIcon.svg";

interface VariantColorBox {
    quantity: number;
    variantId: number;
    isLoading: boolean;
    imagesLength: number;
    variantColorId: number;
    variantBackgroundColor: string;
    colorChangeHandler: ({
        quantity,
        imagesLength,
        variantColorId,
        variantBackgroundColor
    }: colorChangeHandlerTypes) => void;
}

const editStockStyles = {
    top: "10px",
    right: "3px"
};

export default function VariantColorBox({
    quantity,
    isLoading,
    imagesLength,
    variantColorId,
    colorChangeHandler,
    variantBackgroundColor
}: VariantColorBox) {
    return (
        <div className=" h-[145px] w-[90px] mr-4   flex items-center relative">
            <div className="mt-3">
                <div
                    className={`h-[80px] w-[80px]  rounded `}
                    style={{
                        backgroundColor: variantBackgroundColor
                    }}
                ></div>
                <p className="text-center mt-3">{!quantity ? 0 : quantity} pcs</p>
            </div>
            <EditStockIcon
                style={editStockStyles}
                className={"absolute cursor-pointer"}
                onClick={
                    isLoading
                        ? () => {}
                        : () =>
                              colorChangeHandler({
                                  quantity,
                                  imagesLength,
                                  variantColorId,
                                  variantBackgroundColor
                              })
                }
            />
        </div>
    );
}
