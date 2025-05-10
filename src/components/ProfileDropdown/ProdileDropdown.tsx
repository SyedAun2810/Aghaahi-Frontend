import { Avatar, Dropdown, Flex, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "@Store/authStore";
import CustomAvatar from "@Components/CustomAvatar";
import DropdownIcon from "@Assets/icons/dropdownIcon.svg";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import Logo from "@Assets/images/logo.png";



interface propParams {
    logout: () => void;
    username?: string;
}

const ProfileDropdown: React.FC<propParams> = ({ logout }) => {
    const navigate = useNavigate();
    const { userData } = useAuthStore();

    const image = userData?.store?.image?.url || "";
    const name = userData?.name || "";
//console.log("userData", userData);
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.DASHBOARD_ROUTES.EDIT_PROFILE);
                    }}
                >
                    Edit Profile
                </h5>
            )
        },
        {
            key: "2",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.DASHBOARD_ROUTES.CHANGE_PASSWORD);
                    }}
                >
                    Change Password
                </h5>
            )
        },
        {
            type: 'divider'
        },
        {
            key: "4",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.AUTH_ROUTES.ABOUT_US);
                    }}
                >
                    About Us
                </h5>
            )
        },
        {
            key: "5",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.AUTH_ROUTES.PRIVACY_POLICY);
                    }}
                >
                    Privacy Policy
                </h5>
            )
        },
        {
            key: "6",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.AUTH_ROUTES.FAQ);
                    }}
                >
                    FAQ
                </h5>
            )
        },
        {
            key: "7",
            label: (
                <h5
                    onClick={() => {
                        navigate(NavigationRoutes.AUTH_ROUTES.CONTACT_US);
                    }}
                >
                    Contact Us
                </h5>
            )
        },
        {
            type: 'divider'
        },
        {
            key: "3",
            label: (
                <div className="display-flex" onClick={logout}>
                    <h5 className="text-red">Logout</h5>
                </div>
            )
        }
    ];

    return (
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    arrow
                    overlayClassName="top-[60px]"
                >
                    <Flex align="center" gap={8}>
                        {false ? (
                            <Avatar alt="User Image" src={Logo} />
                        ) : (
                            <CustomAvatar
                                name={name}
                                textSize={"text-6xl"}
                                className="rounded-full "
                                imageUrl={image}
                                size={32}
                            />
                        )}
                        <h4 className="hr-mr-12 hr-mr-6">{name}</h4>
                        <DropdownIcon />
                    </Flex>
                </Dropdown>
    );
};

export default ProfileDropdown;
