import type { ThemeConfig } from "antd";
import { ConfigProvider, Layout } from "antd";

import useAuthStore from "@Store/authStore";
import Authenticated from "@Navigation/Authenticated";
import UnAuthenticated from "@Navigation/UnAuthenticated";
import React from "react";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";

const config: ThemeConfig = {
    token: {
        colorPrimary: "#5950CB"
    }
};

const Navigator = () => {
    const { isAuth } = useAuthStore();

    return (
        <ConfigProvider theme={config}>
            <Layout className="">
                {isAuth ? (
                    <React.Suspense fallback={<FullPageLoader />}>
                        <Authenticated />
                    </React.Suspense>
                ) : (
                    <UnAuthenticated />
                )}
            </Layout>
        </ConfigProvider>
    );
};

export default Navigator;
