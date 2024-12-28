const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const alphanumericDashRegex = /^[a-zA-Z0-9-]+$/;
export const atLeast3Alphanumeric = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]{3,}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// export const numberRegex = /^\d+$/;
export const numberRegex =
  /^(1?)(-| ?)(\()?([0-9]{3})(\)|-| |\)-|\) )?([0-9]{3})(-| )?([0-9]{4}|[0-9]{4})$/;

export const dateRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
// export const usPhone = /^\(\d{3}\)\s\d{3}\-\d{4}$/;
export const passwordRegex =
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_+{}.><,]).{8,}$/;
const loginPasswordRegex = /^[^\s]+$/;
export const urlPattern =
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";
export const zipCodeRegex = /^(\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z]\s\d[A-Z]\d)$/;
export const ssnRegex = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
const domainRegex = /^[a-z]+(?:-[a-z]+)*$/;
// export const phoneRegex = /^\d{10}$/;
// export const phoneRegex = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/;
export const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/
export const amountRegex = /^\d+(\.\d{1,2})?$/;

export const ERROR_MESSAGES = {
  TEMPLATE_NAME_REQUIRED: "Form name is required",
  INVALID_TEMPLATE_NAME: "Invalid template name",
  NAME_REQUIRED: "Name is required",
  ACCOUNT_TITLE_REQUIRED:"Account title is required",
  BANK_NAME_REQUIRED:"Bank Name is required",
  ACCOUNT_NUMBER_REQUIRED:"Account number is required",
  IBAN_REQUIRED:"IBAN is required",
  FIRST_NAME_REQUIRED: "First name is required",
  INVALID_FIRST_NAME: "Invalid first name",
  LAST_NAME_REQUIRED: "Last name is required",
  INVALID_LAST_NAME: "Invalid last name",

  EMAIL_REQUIRED: "Email address is required",
  INVALID_EMAIL: "Email is invalid",
  PHONE_REQUIRED: "Phone number is required",
  INVALID_PHONE: "Phone number is invalid",
  LABEL_REQUIRED: "Label is required",
  INVALID_LABEL:
    "Label contains only alpha numeric character and at least 3 characters.",
  INVALID_PLACEHOLDER:
    "Placeholder contains only alpha numeric character and at least 3 characters.",
  INVALID_CHECKBOX_VALUE:
    "Checkbox value contains only alpha numeric character and at least 3 characters.",
  INVALID_CHECKBOX_LABEL:
    "Checkbox label contains only alpha numeric character and at least 3 characters.",

  CHECKBOX_LABEL_REQUIRED: "Checkbox label is required",
  CHECKBOX_VALUE_REQUIRED: "Checkbox value is required",
  RADIO_LABEL_REQUIRED: "Radio label is required",
  RADIO_VALUE_REQUIRED: "Radio value is required",
  SECTION_TITLE_REQUIRED: "Section title is required",
  INVALID_SECTION_TITLE:
    "Section title label contains only alpha numeric character and at least 3 characters.",
  DROPDOWN_LABEL_REQUIRED: "Dropdown label is required",

  INVALID_DATE: "Please enter date in DD-MM-YYYY format",

  INVALID_SSN: "Please enter a valid SSN",
  INVALID_ZIP: "Please enter a valid zip code",
  INVALID_INTEGER: "Please enter a valid number",
};

const validateConfirmPassword = ({ getFieldValue }: any) => ({
  validator(_: any, value: any) {
    if (!value || getFieldValue("newPassword") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Passwords do not match");
  },
});

export const VALIDATE = {
  EMAIL: [
    { required: true, message: ERROR_MESSAGES.EMAIL_REQUIRED },
    { type: "email", message: ERROR_MESSAGES.INVALID_EMAIL },
  ],
  PASSWORD: [
    { required: true, message: "Password is required" },
    {
      pattern: new RegExp(loginPasswordRegex),
      message: "Spaces are not allowed in the password.",
    },
  ],
  PASSWORD_PATTERN: [
    { required: true, message: "Password is required" },
    {
      pattern: new RegExp(passwordRegex),
      message:
        "Password must be at least 8 characters and contain 1 number, 1 uppercase letter, 1 lowercase letter and 1 symbol.",
    },
  ],
  CONFIRM_PASSWORD: [
    { required: true, message: "Confirm password is required" },
    validateConfirmPassword,
  ],
  SELLER_NAME: [{ required: true, message: ERROR_MESSAGES.NAME_REQUIRED }],
  ACCOUNT_TITLE: [{ required: true, message: ERROR_MESSAGES.ACCOUNT_TITLE_REQUIRED },
 
  ],
  BANK_NAME: [{ required: true, message: ERROR_MESSAGES.BANK_NAME_REQUIRED }],
  ACCOUNT_NUMBER: [{ required: true, message: ERROR_MESSAGES.ACCOUNT_NUMBER_REQUIRED },
    {
      pattern: new RegExp(amountRegex),
      message: "Please enter a valid account number",
    },
    
  ],
  IBAN: [{ required: true, message: ERROR_MESSAGES.IBAN_REQUIRED }],
  STORE_NAME: [{ required: true, message: "Store name is required"}],
  
  STORE_ADDRESS: [{ required: true, message: "Store address is required" }],
  STORE_ADDRESS_CITY: [{ required: true, message: "City name is required" }],
  STORE_ADDRESS_STREET: [{ required: true, message: "Street address is required" }],
  STORE_ADDRESS_STATE: [{ required: true, message: "State name is required" }],
  STORE_ADDRESS_POSTAL_CODE: [{ required: true, message: "Postal code is required" }],
  STORE_ADDRESS_COUNTRY: [{ required: true, message: "Country name is required" }],
  PHONE: [
    { required: true, message: ERROR_MESSAGES.PHONE_REQUIRED },
    { pattern: new RegExp(phoneRegex), message: ERROR_MESSAGES.INVALID_PHONE },
  ],
  AMOUNT: [
    { required: true, message: "Payout Amount is required" },
    {
      pattern: new RegExp(amountRegex),
      message: "Enter a valid amount",
    },
  ],
  AGREE: [{ required: true, message: "Please agree to the Terms & Conditions and Privacy Policy to proceed with registration." }],
  Product: {
    SKU: [{ required: true, message: "SKU is required" }],
    PRODUCT_TITLE: [{ required: true, message: "Product Title is required" }],
    CATEGORY: [{ required: true, message: "Category is required" }],
    SUB_CATEGORY: [{ required: true, message: "Sub Category is required" }],
    TAGS: [{ required: true, message: "Tags are required" }],
    DESCRIPTION: [{ required: true, message: "Description is required" }],
    PROCESSING_CATEGORY : [{required: true, message: "Processing Category is required"}],
    SIZE: [{required: true, message: "Size is required"}],
    WEIGHT: [{required: true, message: "Weight is required"}],
    STOCK: [{required: true, message: "Stock is required"}],
    PRICE: [{ required: true, message: "Price is required" }],
    DIMENSION: [{required: true, message: "Dimension is required"}],
    LENGTH: [{ required: true, message: "Length is required" }],
    HEIGHT: [{ required: true, message: "Height is required" }],
    WIDTH: [{ required: true, message: "Width is required" }],
    QUANTITY: [{ required: true, message: "Quantity is required" }],

  }
};
