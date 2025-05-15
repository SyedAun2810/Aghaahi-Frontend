import { Col, Row } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import Logo from "@Assets/images/logo.png";
import styles from "./index.module.scss";

export default function AuthLayout() {
    const location = useLocation();

    if (location.pathname === "/home" ||  location.pathname === "/contact-us" || location.pathname === "/privacy-policy" || location.pathname === "/pricing" || location.pathname === "/privacy-policy" || location.pathname === "/about-us" || location.pathname === "/faq") {
        return <Outlet />;
    }

    return (
        <div className={`${styles["wrapper-container"]} `}>
            <Row className="h-[100vh] overflow-y-auto"> 
                <Col
                    xs={0}
                    sm={0}
                    md={12}
                    lg={14}
                    xl={14}
                    xxl={15}
                    className={`${styles["left-container"]}`}
                >
                    <div className={`mt-8 ml-20 flex flex-col h-screen pb-16`}>
                        <img src={Logo} width={150} height={150} className="" />
                        <div className="mt-auto text-white ">
                            <h1 className="2xl:text-[34px] xl:text-[34px] lg:text-[34px] mt-4 max-w-xl font-[700]">
                                Agaahi Get your Insights by Prompts
                            </h1>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={9} className="bg-white h-[92vh] overflow-y-auto ">
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
}
