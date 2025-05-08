import { Col, Row } from "antd";
import { motion } from "framer-motion";
import utilService from "@Utils/utils.service";

// Status configuration
const EMPLOYEE_STATUS = {
  0: { name: "Active", color: "#52C41A", bgColor: "#F6FFED" },
  1: { name: "Inactive", color: "#FF4D4F", bgColor: "#FFF2F0" }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EmployeeDetailBody({ data = null }: { data: any }) {
    const { isNullOrUndefined } = utilService;
    const employee = data || {};
    
    // Employee details
    const {
        name,
        email,
        country_code,
        phone_number,
        salary,
        gender,
        status,
        role,
        company
    } = employee;

    // Format status
    const formattedStatus = typeof status === 'boolean' ? (status ? 0 : 1) : 1;
    
    return (
        <motion.div
            className="px-4 my-4 pb-4 pt-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Row gutter={[10, 20]}>
                {/* Personal Information Section */}
                <Col span={24}>
                    <motion.h3
                        className="text-lg font-semibold mb-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Personal Information
                    </motion.h3>
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Full Name" />
                    <Value value={name || "--"} />
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Email" />
                    <Value value={email || "--"} />
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Phone Number" />
                    <Value value={`${country_code || ""} ${phone_number || ""}`.trim() || "--"} />
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Gender" />
                    <Value value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "--"} />
                </Col>

                {/* Employment Details Section */}
                <Col span={24} className="mt-4">
                    <motion.h3
                        className="text-lg font-semibold mb-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Employment Details
                    </motion.h3>
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Role" />
                    <Value value={role?.name || "--"} />
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Salary" />
                    <Value value={salary ? `$${salary}` : "--"} />
                </Col>
                
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Status" />
                    <motion.div
                        className={`px-[12px] py-[4px] rounded-[4px] inline-block`}
                        style={{
                            color: EMPLOYEE_STATUS[formattedStatus as keyof typeof EMPLOYEE_STATUS]?.color,
                            backgroundColor: EMPLOYEE_STATUS[formattedStatus as keyof typeof EMPLOYEE_STATUS]?.bgColor,
                            width: "fit-content"
                        }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {EMPLOYEE_STATUS[formattedStatus as keyof typeof EMPLOYEE_STATUS]?.name}
                    </motion.div>
                </Col>

                {/* Company Information Section */}
                {company && (
                    <>
                        <Col span={24} className="mt-4">
                            <motion.h3
                                className="text-lg font-semibold mb-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                Company Information
                            </motion.h3>
                        </Col>
                        
                        <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                            <Label title="Company Name" />
                            <Value value={company.name || "--"} />
                        </Col>
                        
                        <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                            <Label title="Company Email" />
                            <Value value={company.email || "--"} />
                        </Col>
                        
                        <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                            <Label title="Company Phone" />
                            <Value value={`${company.country_code || ""} ${company.phone_number || ""}`.trim() || "--"} />
                        </Col>
                        
                        <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                            <Label title="Verification Status" />
                            <motion.div
                                className="flex gap-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <StatusPill 
                                    verified={company.is_email_verified} 
                                    text="Email" 
                                />
                                <StatusPill 
                                    verified={company.is_phone_verified} 
                                    text="Phone" 
                                />
                            </motion.div>
                        </Col>
                    </>
                )}
            </Row>
        </motion.div>
    );
}

const Label = ({ title }: { title: string }) => {
    return <p className="text-#717171 text-xs font-[400] mb-2">{title}</p>;
};

const Value = ({ value }: { value: string }) => {
    return <p className="text-dark-main text-[14px] font-[400] break-words">{value}</p>;
};

const StatusPill = ({ verified, text }: { verified: boolean, text: string }) => {
    return (
        <span className={`px-2 py-1 rounded text-xs ${
            verified 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
        }`}>
            {text}: {verified ? "Verified" : "Not Verified"}
        </span>
    );
};