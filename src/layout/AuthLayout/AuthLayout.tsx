import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AppHeader from "@Layout/AuthLayout/AppHeader/AppHeader";
import "./index.scss";

import SideBar from "./SideBar";
import useAuthStore from "@Store/authStore";
import { useUserDetail } from "./UpdateUserQuery";
// import { makeSocketConnection } from "@Services/socket-service";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import { useUpdateOnlineStatus } from "@Pages/AppScreens/Chat/Queries/useUpdateOnlineStatus";
import { useGetUnreadMsgsCount } from "@Pages/AppScreens/Chat/Queries/useGetUnreadMsgsCount";

const { Header, Content } = Layout;
const AppLayout = () => {
    const { updateUserData } = useAuthStore();

    const onUserDetailsSuccess = (data: any) => {
        updateUserData(data?.data);
    };

    const { data: userData, isLoading: userDetailsLoading } = useUserDetail(onUserDetailsSuccess);

    // update online status for socket
    const { mutate: updateOnlineStatus } = useUpdateOnlineStatus();
    const { data: unreadMsgsCount } = useGetUnreadMsgsCount();
    const { chatToken, userData: user } = useAuthStore.getState();

    useEffect(() => {
        let statusInterval = null as NodeJS.Timeout | null;
        if (chatToken && user !== null) {
            statusInterval = setInterval(updateOnlineStatus, 8000);
            // makeSocketConnection();
        }
        return () => {
            statusInterval && clearInterval(statusInterval);
        };
    }, [user?.id]);

    return (
        <>
            <Layout hasSider className={`m-0 min-h-screen h-full`}>
                <SideBar />
                <Layout className="body-bg h-[100vh]">
                    <Header
                        className="cus-header bg-white flex justify-end h-[7vh]"
                        style={{
                            padding: 0
                        }}
                    >
                        <AppHeader chatUnreadMessagesCount={0} />
                    </Header>
                    <Content
                        // style={{
                        //     padding: "2vh 20px 20px 2vh"
                        // }}
                        className="cus-main-content overflow-y-auto h-[89vh] bg-light-bg"
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
