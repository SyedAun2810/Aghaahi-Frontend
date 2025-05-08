import { Col, Row } from "antd";
import { motion } from "framer-motion";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import useEditProfileContainer from "./EditProfileContainer";
import PictureUpload from "@Components/PictureUpload";

const EditProfile = () => {
    const { initialValues } = useEditProfileContainer();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <RoundedContainer className="pt-12 px-12">
            <motion.h1
                className="font-[500] text-xxl border-bottom pb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                Your Profile
            </motion.h1>
            <motion.div
                className="mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Row gutter={[16, 16]} className="mb-8">
                    <Col span={8} className="text-center">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <PictureUpload
                                userName={initialValues.name}
                                image={initialValues.image}
                                isLoading={false}
                            />
                            <h2 className="mt-4 text-xl font-bold">{initialValues.name}</h2>
                            <p className="text-gray-500">{initialValues.role?.name}</p>
                        </motion.div>
                    </Col>
                    <Col span={16}>
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Email</h3>
                                <p className="text-gray-800">{initialValues.email}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Contact#</h3>
                                <p className="text-gray-800">
                                    {initialValues.countryCode} {initialValues.phoneNumber}
                                </p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Salary</h3>
                                <p className="text-gray-800">{initialValues.salary}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Language</h3>
                                <p className="text-gray-800">{initialValues.language}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Gender</h3>
                                <p className="text-gray-800">{initialValues.gender}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Status</h3>
                                <p className="text-gray-800">{initialValues.status ? "Active" : "Inactive"}</p>
                            </div>
                        </motion.div>
                    </Col>
                </Row>
                <motion.h2
                    className="text-lg font-bold mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Company Details
                </motion.h2>
                <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mb-4">
                        <h3 className="text-gray-600 font-semibold">Company Name</h3>
                        <p className="text-gray-800">{initialValues.company?.name}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-600 font-semibold">Company Email</h3>
                        <p className="text-gray-800">{initialValues.company?.email}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-600 font-semibold">Company Contact#</h3>
                        <p className="text-gray-800">
                            {initialValues.company?.countryCode} {initialValues.company?.phoneNumber}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-600 font-semibold">First Name</h3>
                        <p className="text-gray-800">{initialValues.company?.firstName}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-600 font-semibold">Last Name</h3>
                        <p className="text-gray-800">{initialValues.company?.lastName}</p>
                    </div>
                </motion.div>
            </motion.div>
        </RoundedContainer>
    );
};

export default EditProfile;
