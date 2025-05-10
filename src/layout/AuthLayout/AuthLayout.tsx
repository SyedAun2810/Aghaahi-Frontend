import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "@Layout/AuthLayout/AppHeader/AppHeader";
import "./index.scss";

import useAuthStore from "@Store/authStore";
import SideBar from "./SideBar";
import { useUserDetail } from "./UpdateUserQuery";
// import { makeSocketConnection } from "@Services/socket-service";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";
import { shouldHideHeader } from "@Constants/dashboard.constants";

const { Header, Content } = Layout;
const AppLayout = () => {
    const { updateUserData } = useAuthStore();

    const onUserDetailsSuccess = (data: any) => {
        updateUserData(data?.data);
    };
    const { route } = useAuthLayoutContainer();
    let isStatic =shouldHideHeader(route);
    // const { data: userData, isLoading: userDetailsLoading } = useUserDetail(onUserDetailsSuccess);

    return (
        <>
            <Layout hasSider className={`m-0 min-h-screen h-full`}>
                <SideBar />
                <Layout className="body-bg h-[100vh]">
                  {!isStatic && (
                    <Header
                        className="cus-header bg-white flex justify-end h-[8vh]"
                        style={{
                            padding: 0
                        }}
                    >
                        <AppHeader chatUnreadMessagesCount={0} />
                    </Header>
                  )}
                    <Content className={`${isStatic ? "": "p-2"}`}
                        // style={{
                        //     padding: "2vh 20px 20px 2vh"
                        // }}
                    >
                        <React.Suspense fallback={<FullPageLoader />}>
                            <Outlet />
                        </React.Suspense>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AppLayout;
