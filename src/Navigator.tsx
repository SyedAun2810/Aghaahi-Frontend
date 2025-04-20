import type { ThemeConfig } from "antd";
import { ConfigProvider, Layout } from "antd";

import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import Authenticated from "@Navigation/Authenticated";
import UnAuthenticated from "@Navigation/UnAuthenticated";
import useAuthStore from "@Store/authStore";
import React from "react";

const config: ThemeConfig = {
    token: {
        colorPrimary: "#5950CB"
    }

   
};

const Navigator = () => {
    const { isAuth } = useAuthStore();
    let isCreatedRoles = false;

    
    return (
        <ConfigProvider theme={config}>
            <Layout className="">
                {true ? (
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
