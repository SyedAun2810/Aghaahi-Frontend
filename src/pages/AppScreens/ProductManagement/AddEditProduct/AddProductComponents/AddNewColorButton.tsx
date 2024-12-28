interface AddNewColorButtonTypes {
    variantId: number;
    AddNewColorHandler: (variantId: number) => void;
}

export default function AddNewColorButton({
    variantId,
    AddNewColorHandler
}: AddNewColorButtonTypes) {
    return (
        <p
            className={`font-[400] text-sm text-main-orange underline mt-4 underline-offset-4 inline-block cursor-pointer`}
            onClick={() => AddNewColorHandler(variantId)}
        >
            Add Another Color
        </p>
    );
}
