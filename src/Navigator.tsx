import type { ThemeConfig } from "antd";
import { ConfigProvider, Layout } from "antd";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import Authenticated from "@Navigation/Authenticated";
import UnAuthenticated from "@Navigation/UnAuthenticated";
import useAuthStore from "@Store/authStore";
import React, { useEffect } from "react";

const config: ThemeConfig = {
    token: {
        colorPrimary: "#5950CB"
    }
};

const Navigator = () => {
    const { isAuth, isDark } = useAuthStore();

    // Initialize theme on app load
    useEffect(() => {
        // Apply theme class based on stored preference
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []); // Empty dependency array means this runs once on mount

    // Update theme when isDark changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <ConfigProvider theme={config}>
            <Layout className={`min-h-screen ${isDark ? 'dark:bg-gray-900' : 'bg-white'}`}>
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
