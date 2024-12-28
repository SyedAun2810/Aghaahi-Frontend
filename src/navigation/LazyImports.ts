import { lazy } from "react";

// DASHBOARD
const Dashboard = lazy(
  () => import("@Pages/AppScreens/Dashboard/Dashboard")
);

const Chat = lazy(
  () => import("@Pages/AppScreens/Chat/Chat")
);

const MyEarnings = lazy(
  () => import("@Pages/AppScreens/MyEarnings/MyEarnings")
);

const OrderManagement = lazy(
  () => import("@Pages/AppScreens/OrderManagement/OrderListing/OrderListing")
);

const OrderDetails = lazy(
  () => import("@Pages/AppScreens/OrderManagement/OrderDetail/OrderDetails")
);

const GenerateLabels= lazy(()=> import("@Pages/AppScreens/OrderManagement/GenerateLabels/GenerateLabels"));

const ProductManagement = lazy(
  () => import("@Pages/AppScreens/ProductManagement/ProductListing/ProductListing")
);
const PaymentDetails = lazy(
  () => import("@Pages/AppScreens/PaymentDetails/PaymentDetailsPage/PaymentDetails")
);
const ProductDetails = lazy(() => import("@Pages/AppScreens/ProductManagement/ProductDetails/ProductDetails"))
const AddProduct = lazy(() => import("@Pages/AppScreens/ProductManagement/AddEditProduct/AddProduct"))

const UserManagement = lazy(
  () => import("@Pages/AppScreens/BannerManagement/UserManagement")
);

const BannerManagementDetails = lazy(
  () => import("@Pages/AppScreens/BannerManagement/BannerDetails/BannerRequestDetail")
)
const RequestBanner = lazy(
  () => import("@Pages/AppScreens/RequestBanner/RequestBanner")
);

const ChangePassword = lazy(
  () => import("@Pages/AppScreens/ChangePassoword/ChangePassword")
);

const  EditProfile = lazy(
  () => import("@Pages/AppScreens/EditProfile/EditProfile")
);

export {
    Chat,
    Dashboard,
    MyEarnings,
    EditProfile,
    OrderDetails,
    RequestBanner,
    PaymentDetails,
    ChangePassword,
    OrderManagement,
    UserManagement,
    ProductManagement,
    ProductDetails,
    AddProduct,
    GenerateLabels,
    BannerManagementDetails
};
