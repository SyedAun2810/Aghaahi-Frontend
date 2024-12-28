import React from "react";
import { Badge, Dropdown, Flex } from "antd";

import useAuthStore from "@Store/authStore";
import NotificationContainer from "./NotificationContainer";
import CustomSwitch from "@Components/CustomSwitch/CustomSwitch";

import NotificationsIcon from "@Assets/icons/notificationBing.svg";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";

const contentStyle: React.CSSProperties = {
    backgroundColor: "#ffff",
    borderRadius: "0px",
    width: "430px",
    // height: "550px",
    boxShadow: "0px 4px 30px 0px #00000026",
    padding: "15px",
    overflow: "auto"
};

const menuStyle: React.CSSProperties = {
    boxShadow: "none",
    padding: "0px"
};
const NotificationsDropdown = () => {
    const { userData } = useAuthStore();
    const { allowNotifications } = userData || {};

    const {
        meta,
        data: items,
        isFetching,
        scrollToTop,
        handleFetchMore,
        notificationCount,
        notificationRef,
        // mutateToggleStatus,
        // isToggleStatusLoading,
        handleRefetchNotifications
    } = NotificationContainer();

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
            onOpenChange={scrollToTop}
            dropdownRender={(menu) => {
                return (
                    <div
                        style={contentStyle}
                        className="h-[400px] 2xl:h-[550px]"
                        onScroll={handleFetchMore}
                        ref={notificationRef}
                    >
                        <div className="w-full pb-3">
                            <Flex className="items-center justify-between  px-1">
                                <h1 className="font-[500] text-xxl text-dark-main">
                                    Notifications
                                </h1>
                                {/* <CustomSwitch
                                    isChecked={allowNotifications}
                                    handleUpdate={mutateToggleStatus}
                                    loading={isToggleStatusLoading}
                                /> */}
                            </Flex>
                        </div>
                        {meta?.isInitialLoading ? (
                            <ProgressLoader />
                        ) : items?.length ? (
                            <>
                                {React.cloneElement(menu as React.ReactElement, {
                                    style: menuStyle
                                })}
                                {isFetching ? <ProgressLoader /> : null}
                            </>
                        ) : (
                            <div className="font-[500] text-center text-dark-main">
                                Data Not Found
                            </div>
                        )}
                    </div>
                );
            }}
            className="cursor-pointer profile-dropdown"
        >
            <div className="relative">
                <NotificationsIcon
                    className="cursor-pointer align-middle w-[29px] h-[29px]"
                    onClick={handleRefetchNotifications}
                />
                {typeof notificationCount === "number" && notificationCount ? (
                    <Badge
                        count={notificationCount}
                        color="#F38001"
                        className="absolute top-[11px] right-px"
                        size="small"
                        overflowCount={1000}
                    />
                ) : null}
            </div>
        </Dropdown>
    );
};

export default NotificationsDropdown;
