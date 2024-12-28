import { Col, Flex, Form, Row } from "antd";

import { CustomButton } from "@Components/Button";
import Input from "@Components/TextInput/TextInput";
import PictureUpload from "@Components/PictureUpload";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import useEditProfileContainer from "./EditProfileContainer";
import { VALIDATE } from "@Constants/validationConstants";
import { GoogleAutocomplete } from "@Components/GoogleAutocomplete";
import { MAP_OPTIONS } from "@Pages/AuthScreens/SignUp/SignUp";
import utilService from "@Utils/utils.service";

const EditProfile = () => {
    const {
        form,
        initialValues,
        handleFinish,
        isEditingProfile,
        isUploadingDocument,
        handlePlaceSelect
    } = useEditProfileContainer();
    return (
        <RoundedContainer className="">
            <h1 className="font-[500] text-xxl border-bottom pb-4  ">Edit Profile</h1>
            <Form
                form={form}
                onKeyDown={(e) => utilService.preventFormSubmitOnSelectingAddress(e)}
                onFinish={handleFinish}
                initialValues={initialValues}
                className="mt-4"
            >
                <Form.Item name="profileImage">
                    <PictureUpload
                        userName={initialValues.store?.name}
                        image={initialValues.image}
                        isLoading={false}
                    />
                </Form.Item>
                <Row gutter={[12, 0]}>
                    <Col span={12}>
                        <Form.Item name="firstName" rules={VALIDATE.SELLER_NAME as never}>
                            <Input label="Name" placeholder="Enter your name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                            <Input label="Email" placeholder="Enter your email" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 0]}>
                    <Col span={12}>
                        <Form.Item name={["store", "name"]} rules={VALIDATE.STORE_NAME as never}>
                            <Input label="Store Name" placeholder="Enter store name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phoneNumber" rules={VALIDATE.PHONE as never}>
                            <Input label="Contact#" placeholder="Enter contact number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 0]}>
                    <Col span={12}>
                        <Form.Item
                            name={["store", "address", "fullAddress"]}
                            rules={VALIDATE.STORE_ADDRESS as never}
                            shouldUpdate
                        >
                            <GoogleAutocomplete
                                label={"Store Address"}
                                inputStyles="course-input"
                                placeholder={"Enter store address"}
                                onLocationSelect={handlePlaceSelect}
                                componentRestrictions={MAP_OPTIONS}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={["store", "address", "street"]}
                            rules={VALIDATE.STORE_ADDRESS_STREET as never}
                            shouldUpdate
                        >
                            <Input label="Street Address" placeholder="Enter Street Address" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={["store", "address", "city"]}
                            rules={VALIDATE.STORE_ADDRESS_CITY as never}
                        >
                            <Input label="City Name" placeholder="Enter city name" />
                        </Form.Item>
                    </Col>
                    {/* </Row>

                <Row gutter={[12, 0]}> */}
                    <Col span={12}>
                        <Form.Item
                            validateFirst
                            name={["store", "address", "state"]}
                            rules={VALIDATE.STORE_ADDRESS_STATE as never}
                        >
                            <Input label="State Name" placeholder="Enter state name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            shouldUpdate
                            name={["store", "address", "country"]}
                            rules={VALIDATE.STORE_ADDRESS_COUNTRY as never}
                        >
                            <Input label="Country Name" placeholder="Enter country name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            shouldUpdate
                            name={["store", "address", "zipCode"]}
                            rules={VALIDATE.STORE_ADDRESS_POSTAL_CODE as never}
                        >
                            <Input label="Postal Code" placeholder="Enter postal code" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="text-center mt-8">
                    <Flex justify="flex-end">
                        <CustomButton
                            title={"Save"}
                            className="text-base  w-auto px-12"
                            htmlType="submit"
                            isLoading={isEditingProfile || isUploadingDocument}
                        />
                    </Flex>
                </Form.Item>
            </Form>
        </RoundedContainer>
    );
};

export default EditProfile;
