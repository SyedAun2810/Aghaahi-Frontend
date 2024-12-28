// const PAYLOAD_DATA_WITH_VARIATION = ["weight", "dimensions", "price", "quantity", "boxes"];
const PAYLOAD_DATA_WITH_VARIATION = ["weight", "price", "quantity", "boxes", "dimensions"];
const REMOVE_FIELDS_ON_VARIATION_UN_CHECK = ["weight", "price", "quantity"];
const PAYLOAD_DATA_WITHOUT_VARIATION = [
    "about",
    "name",
    "categoryIds",
    "sku",
    "weight",
    "dimensions",
    "price",
    "tags",
    "imageIds",
    "quantity"
    // "processingCategory"
];
const DIMENSION_FIELDS = ["length", "width", "height"];

const CATEGORY = "category";
const SUB_CATEGORY = "subCategory";
const CATEGORIES = "categories";
const CATEGORY_INPUT = "categoryInput";
const SUB_CATEGORIES = "subCategories";
const SUB_CATEGORIES_INPUT = "subCategoryInput";

export {
    DIMENSION_FIELDS,
    PAYLOAD_DATA_WITH_VARIATION,
    PAYLOAD_DATA_WITHOUT_VARIATION,
    CATEGORY,
    SUB_CATEGORY,
    CATEGORIES,
    CATEGORY_INPUT,
    SUB_CATEGORIES,
    SUB_CATEGORIES_INPUT,
    REMOVE_FIELDS_ON_VARIATION_UN_CHECK
};
