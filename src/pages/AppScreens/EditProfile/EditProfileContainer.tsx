import { Form } from "antd";

import useAuthStore from "@Store/authStore";
import { useEditProfile } from "./EditProfileQuery";
import usePlaceHandler from "@Hooks/usePlaceHandler";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";

const useEditProfileContainer = () => {
    const [form] = Form.useForm();
    const { userData, chatToken } = useAuthStore();
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
        firstName: userData?.firstName,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,

        image: userData?.store?.image?.url,
        addressId: userData?.store?.address?.id,
        imageId: userData?.store?.image?.id,
        store: {
            name: userData?.store?.name,
            address: {
                fullAddress: userData.store?.address.fullAddress,
                city: userData?.store?.address?.city,
                state: userData?.store?.address?.state,
                country: userData?.store?.address?.country,
                zipCode: userData?.store?.address?.zipCode,
                id: userData?.store?.address?.id,
                street: userData?.store?.address?.street
            }
        }
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
        form
    };
};

export default useEditProfileContainer;
