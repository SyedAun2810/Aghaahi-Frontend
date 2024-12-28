import { ModalMethodsTypes } from "@Utils/types";
import Sider from "antd/es/layout/Sider";
import { useRef } from "react";
import Logo from "@Assets/images/logo.png";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { Button, Flex } from "antd";
import PlusIcon from "@Assets/icons/PlusIcon.svg";
import ChatIcon from "@Assets/icons/messages.svg";
import DeleteIcon from "@Assets/icons/deleteIcon.svg";
import { CustomButton } from "@Components/Button";

const historyChats = ["Employee Details", "Earnings Details", "Leave Details", "Sales Details"];

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();

    const modalRef = useRef<ModalMethodsTypes | null>(null);
    // const sidebarMenu = [
    //     // {
    //     //     key: "dashboard",
    //     //     label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD}>Seller Dashboard</Link>,
    //     //     icon: <DashboardIcon />
    //     // },
    //     // {
    //     //     key: "product-management",
    //     //     label: (
    //     //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT}>
    //     //             Product Management
    //     //         </Link>
    //     //     ),
    //     //     icon: <PrdouctIcon />
    //     // },
    //     // {
    //     //     key: "my-earnings",
    //     //     label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS}>My Earnings</Link>,
    //     //     icon: <EarningsIcon />
    //     // },
    //     // {
    //     //     key: "payment-details",
    //     //     label: (
    //     //         <a
    //     //             onClick={() => {
    //     //                 // Open the modal here
    //     //                 modalRef?.current?.openModal();
    //     //             }}
    //     //         >
    //     //             Payment Details
    //     //         </a>
    //     //     ),
    //     //     icon: <PaymentIcon />
    //     // },
    //     // {
    //     //     key: "order-management",
    //     //     label: (
    //     //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}>
    //     //             Order Management
    //     //         </Link>
    //     //     ),
    //     //     icon: <OrderIcon />
    //     // },
    //     // {
    //     //     key: "user-management",
    //     //     label: (
    //     //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT}>
    //     //             User Management
    //     //         </Link>
    //     //     ),
    //     //     icon: <UserIcon />
    //     // },
    //     // {
    //     //     key: "request-management",
    //     //     label: (
    //     //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.REQUEST_MANAGEMENT}>
    //     //             Request Management
    //     //         </Link>
    //     //     ),
    //     //     icon: <PaymentIcon />
    //     // }
    // ];

    const customSiderClass =
        selectedKey === "banner-ad-management" ? " change-svg custom-sidebar" : "custom-sidebar";

    return (
        <div className="">
            <Sider
                width={220}
                breakpoint="lg"
                collapsedWidth="0"
                collapsible
                theme="light"
                className={` bg-light-bg ${customSiderClass} h-[100vh] `}
            >
                <Flex className="cursor-pointer" justify="center">
                    <img
                        src={Logo}
                        className="text-main-orange h-32 w-32"
                        onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                    />
                </Flex>
                <Flex justify="center" align="center">
                    <PlusIcon height={28} width={28} />
                    <p className="ml-2">New Chat</p>
                </Flex>
                <p className="ml-4 mt-4">Recent</p>
                <div className="mt-6">
                    {historyChats.map((chat, index) => (
                        <Flex align="center" className="ml-4 m-2">
                            <ChatIcon height={28} width={28} />
                            <p className="ml-2">{chat}</p>
                        </Flex>
                    ))}
                </div>

                {/* <Flex align="center" className=" bg-header-primary rounded-3xl w-40 h-12" justify="center" >
                        
                    </Flex> */}
                <div className="absolute bottom-0 mb-4 mx-8">
                    <CustomButton className="border-none  flex items-center justify-center ">
                        <Flex align="center">
                            <DeleteIcon height={24} width={24} />
                            <p className="ml-2  mt-[2px] text-white font-[500]">
                                {"Delete History"}
                            </p>
                        </Flex>
                    </CustomButton>
                </div>
            </Sider>
        </div>
    );
};

export default SideBar;
