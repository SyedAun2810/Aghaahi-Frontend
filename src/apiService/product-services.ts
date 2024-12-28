import { PAGE_SIZE } from "@Constants/app";
import { API_CONFIG_URLS } from "@Constants/config";
import ApiService from "@Services/ApiService";
import useAuthStore from "@Store/authStore";
import { AddProductPayloadTypes } from "@Utils/types";
import utilService from "@Utils/utils.service";
import dayjs from "dayjs";

async function addProduct(payload: AddProductPayloadTypes) {
  const response = await ApiService.post(API_CONFIG_URLS.PRODUCT.ADD_PRODUCT, payload);
  return response;
}

async function deleteProduct(id: any) {

  const response = await ApiService.remove(`${API_CONFIG_URLS.PRODUCT.DELETE_PRODUCT}/${id}`);
  return response;
}
async function editProduct({productId, payload}){
  const response = await ApiService.put(`${API_CONFIG_URLS.PRODUCT.EDIT_PRODUCT}/${productId}`, payload);
  return response;
}

async function getProduct(id: number){
const response = await ApiService.get(`${API_CONFIG_URLS.PRODUCT.EDIT_PRODUCT}/${id}`); 
return response; }

async function viewProducts({
  userStoreId,
  page,
  search,
  startDate,
  endDate,
  subCategory,
  variation
}: {
  userStoreId: number;
  page: number;
  search: string;
  startDate: Date | null;
  endDate: Date | null;
  subCategory: string | null;
  variation: string | null;
}) {
  const queryParams = {
    PageNumber: page,
    StoreIds: userStoreId,
    PageSize: PAGE_SIZE,
    'SearchBy': search
  };

  if (subCategory !== undefined && subCategory !== null) {
    queryParams.CategoryIds = subCategory ;
  }

  
  if (startDate !== undefined && startDate !== null) {
    queryParams.StartDate = encodeURIComponent(utilService.fromDateToUTC(startDate));
  }

  if (endDate !== undefined && endDate !== null) {
    queryParams.EndDate = encodeURIComponent(utilService.fromDateToUTC(endDate));
  }
 
  if (variation !== undefined && variation !== null) {
    queryParams.Variations = variation === "Yes" ? true: false;
  }
  // Constructing query string
  const queryString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  const response = await ApiService.get(`${API_CONFIG_URLS.PRODUCT.VIEW_PRODUCT}?${queryString}`);
  return response;
}

async function productCategories(OnlyParent: boolean) {
  const response = await ApiService.get(`${API_CONFIG_URLS.LOOKUPS.CATEGORIES}`);
  return response;
}

async function productParentCategories({
  Keyword,
  OnlyParent,
  isLinear
}: {
  Keyword: string;
  OnlyParent: boolean;
  isLinear: boolean;
}) {
  const response = await ApiService.get(`${API_CONFIG_URLS.LOOKUPS.CATEGORIES}?OnlyParent=${OnlyParent}&Keyword=${Keyword}&isLinear=${isLinear}`);
  return response;
}

async function productParentCategoriesAddProduct(
  OnlyParent: true
  ) {
  const response = await ApiService.get(`${API_CONFIG_URLS.LOOKUPS.CATEGORIES}?OnlyParent=${OnlyParent}`);
  return response;
}

async function productSubCategories(params: { parentId: number | null; isLinear: boolean; Keyword: string; }) {
  const response = await ApiService.get(`${API_CONFIG_URLS.LOOKUPS.CATEGORIES}?ParentId=${params?.parentId}&isLinear=${params?.isLinear}&Keyword=${params?.Keyword}`);
  return response;
}


async function productDetails(id: number) {
  const response = await ApiService.get(`${API_CONFIG_URLS.PRODUCT.PRODUCT_DETAILS}/${id}`);
  return response;
}

async function orderListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.ORDER_MANAGEMENT.LISTING}`,
    queryParams
  );
  return response;
}

async function getOrderDetails(orderData: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.ORDER_MANAGEMENT.DETAIL}${orderData?.orderId}/management`
  );
  return response;
}

async function planListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.PLAN.LISTING}`,
    queryParams
  );
  return response;
}

async function bannerListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.BANNER_MANAGEMENT.LISTING}`,
    queryParams
  );
  return response;
}

async function makeBannerRequest(payload: any) {
  const response = await ApiService.post(API_CONFIG_URLS.BANNER_MANAGEMENT.MAKE_REQUEST, payload);
  return response;
}

async function getClientSecret() {
  const response = await ApiService.post(
    `${API_CONFIG_URLS.PAYMENT.CLIENT_SECRET}`
  );
  return response;
}

async function getLookupProducts(params: { Keyword: string; StoreIds: number }) {
  const response = await ApiService.get(`${API_CONFIG_URLS.LOOKUPS.PRODUCTS}?Keyword=${params?.Keyword}&StoreIds=${params?.StoreIds}`);
  return response;
}

async function bannerStatusUpdate(bannerId: number){
  const response = await ApiService.patch(`${API_CONFIG_URLS.BANNER_MANAGEMENT.STATUS_UPDATE}/${bannerId}/status`);
  return response;
}

async function reorderRequest({ id, payload }: {
  id: number;
  payload: { paymentMethodId: number };
}){
  const response = await ApiService.put(`${API_CONFIG_URLS.BANNER_MANAGEMENT.REORDER_REQUEST}/${id}`, payload);
  return response;
}


async function passwordVerification(payload: { password: string }) {
  const response = await ApiService.post(
    `${API_CONFIG_URLS.PAYMENT.PASSWORD_VERIFICATION}`,
    payload
  );
  return response;
}

async function StripeConnect() {
  const response = await ApiService.post(
    `${API_CONFIG_URLS.PAYMENT.STRIPE_CONNECT}`
  );
  return response;
}

async function getRequestDetails(requestId: number) {
  const response = await ApiService.get(`${API_CONFIG_URLS.BANNER_MANAGEMENT.REQUEST_DETAILS}${requestId}`);
  return response;
}


async function reviewListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.REVIEW_MANAGEMENT.LISTING}`,
    queryParams
  );
  return response;
}


async function myEarningListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.MY_EARNING_MANAGEMENT.LISTING}`,
    queryParams
  );
  return response;
}

async function myPayoutsListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.MY_EARNING_MANAGEMENT.PAYOUT_LISTING}`,
    queryParams
  );
  return response;
}

async function requestPayout(payload: { amount: number }) {
  const response = await ApiService.post(
    `${API_CONFIG_URLS.MY_EARNING_MANAGEMENT.REQUEST_PAYOUT}`,
    payload
  );
  return response;
}

async function getUspsConnectionUrl() {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.PAYMENT.USPS_CONNECT}`,
  );
  return response;
}

async function generateLabelsListing(queryParams: any) {
  const response = await ApiService.get(
    `${API_CONFIG_URLS.ORDER_MANAGEMENT.GENERATE_LABELS}`,
    queryParams
  );
  return response;
}

async function generateLabelAction(payload: { OrderId?: number; packageId?: number }) {
  let queryParam = payload?.OrderId ? `OrderId=${payload.OrderId}` : `packageId=${payload.packageId}`
  const response = await ApiService.post(
    `${API_CONFIG_URLS.ORDER_MANAGEMENT.GENERATE_LABELS_ACTION}?${queryParam}`,
    payload
  );
  return response;
}

export const ProductApiServices = {
    addProduct, 
    getProduct,
    editProduct,
    viewProducts, 
    deleteProduct,
    productDetails, 
    productCategories, 
    productSubCategories, 
    productParentCategories, 
    productParentCategoriesAddProduct,
    orderListing,
    getOrderDetails,
    planListing,
    bannerListing,
    makeBannerRequest,
    getClientSecret,
    getLookupProducts,
    bannerStatusUpdate,
    reorderRequest,
    passwordVerification,
    StripeConnect,
    getUspsConnectionUrl,
    getRequestDetails,
    reviewListing,
    myEarningListing,
    myPayoutsListing,
    requestPayout,
    generateLabelAction,
    generateLabelsListing
}