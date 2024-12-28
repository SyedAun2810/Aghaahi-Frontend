export interface imageRemovalTypes {
    imageId: number;
    colorVariantId: number;
}
export interface colorChangeHandlerTypes {
    variantColorId: number;
    variantBackgroundColor: string;
}

export interface colorVariantTypes {
    id: number;
    color: string;
    imageIdsData: any;
}

export interface generalDataFieldsType {
    sku: string;
    name: string;
    about: string;
    tags: string;
    weight?: string;
    quantity?: number;
    dimensions?: string;
    price?: number;
}

export interface serverImageType {
    id: number;
    name: string;
    fileName: string;
    originalName: string;
    originalFileName: string;
    extension: string;
    path: string;
    folderPath: string;
    contentType: string;
    url: string;
    thumbnail200X200: string;
    compressed: string;
    fileType: number;
}

export interface colorVariantType {
    id?: number;
    color?: string;
    imageIdsData?: [];
}

export interface serverColorVariantType {
    id?: number;
    color?: string;
    imageIdsData?: serverImageType[];
}

export interface variationElementType {
    size: string;
    weight: string;
    dimensions: string;
    price: number;
    quantity: number;
    colorVariants: serverColorVariantType[];
}

export interface serverSizeType {
    id: number;
    name: string;
    icon: string | null;
}

export interface serverColorType {
    id: number;
    name: string;
    icon: string | null;
}

export interface serverTagsType {
    id: number;
    name: string;
    normalizeName: string;
}
export interface serverVariationType {
    id: number;
    size: serverSizeType;
    color: serverColorType;
    weight: string;
    dimensions: string;
    price: number;
    quantity: number;
    status: number;
    isVariant: boolean;
    images: serverImageType[];
}

export interface serverCategoryType {
    id: number;
    name: string;
    parent: serverCategoryType;
}

export interface getProductResponseType {
    id: number;
    name: string;
    about: string;
    sku: string;
    isHidden: boolean;
    isBoosted: boolean;
    isFavorite: boolean;
    status: number;
    sizes: serverSizeType[];
    colors: serverColorType[];
    store?: any;
    categories: serverCategoryType[];
    variations: serverVariationType[];
    tags: serverTagsType[];
}

export interface OptionType {
    label: number | string;
    value: number | string;
}
export interface CategoryAndSubCategoryType {
    parentCategory: OptionType;
    subCategory: OptionType;
}

export interface compressedImagesType {
    id: number;
    img: string;
}
