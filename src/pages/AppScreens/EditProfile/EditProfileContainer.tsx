import { Form } from "antd";

import useAuthStore from "@Store/authStore";
import { useEditProfile } from "./EditProfileQuery";
import usePlaceHandler from "@Hooks/usePlaceHandler";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";

const useEditProfileContainer = () => {
    const [form] = Form.useForm();
    const { userData, chatToken,role } = useAuthStore();

    console.log("userData", userData?.name);
    const {
        latitude,
        longitude,
        selectedAddress,
        handlePlaceSelect,
        streetStateCountryData,
        CHANGED_AFTER_SELECTION_ERROR
    } = usePlaceHandler(form);

    const formData = new FormData();

    const { mutateAsync: uploadDocument, isLoading: isUploadingDocument } = useUploadDocuments();
    const { mutate: updateProfile, isLoading: isEditingProfile } = useEditProfile();

    const initialValues = {
        name: userData?.name,
        email: userData?.email,
        phoneNumber: userData?.phone_number,
        countryCode: userData?.country_code,
        salary: userData?.salary,
        status: userData?.status ? "Active" : "Inactive",
        language: userData?.language,
        gender: userData?.gender,
        image: userData?.image,
        role: {
            id: userData?.role?.id,
            name: userData?.role?.name,
            description: userData?.role?.description,
            status: userData?.role?.status,
        },
        company: {
            id: userData?.company?.id,
            name: userData?.company?.name,
            email: userData?.company?.email,
            phoneNumber: userData?.company?.phone_number,
            countryCode: userData?.company?.country_code,
            language: userData?.company?.language,
            firstName: userData?.company?.first_name,
            lastName: userData?.company?.last_name,
            isActive: userData?.company?.is_active,
            isEmailVerified: userData?.company?.is_email_verified,
            isPhoneVerified: userData?.company?.is_phone_verified,
            isDatabaseValidated: userData?.company?.is_database_validated,
        },
    };

    const handleFinish = async (payload: any) => {
        const { profileImage } = payload;
        payload.store.address.id = initialValues?.store?.address.id;
        payload.store.imageId = initialValues?.imageId || null;
        payload.store.address.latitude = latitude || userData?.store?.address?.latitude;
        payload.store.address.longitude = longitude || userData?.store?.address?.longitude;
        payload.store.address.stateCode =
            streetStateCountryData?.state || userData?.store?.address?.stateCode;
        payload.store.address.countryCode =
            streetStateCountryData?.country || userData?.store?.address?.countryCode;
        payload.chatToken = chatToken;
        if (profileImage) {
            formData.append("Media", profileImage?.originFileObj);
            uploadDocument(formData)
                .then((res) => {
                    payload.store.imageId = res?.data?.data[0].id;
                    updateProfile(payload);
                })
                .catch((e) => console.error(e));
        } else {
            updateProfile(payload);
        }
    };

    return {
        initialValues,
        handleFinish,
        isUploadingDocument,
        isEditingProfile,
        latitude,
        longitude,
        selectedAddress,
        handlePlaceSelect,
        CHANGED_AFTER_SELECTION_ERROR,
        form,
        role
    };
};

export default useEditProfileContainer;
