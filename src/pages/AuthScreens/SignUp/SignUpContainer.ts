import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import { useRegister } from "./SignupQuery";
import { FROM_SCREEN } from "@Constants/app";
import usePlaceHandler from "@Hooks/usePlaceHandler";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import NotificationService from "@Services/NotificationService";
import { useUploadDocuments } from "@Hooks/useDocumentUploadQuery";
import useAuthStore from "@Store/authStore";

export default function useSignUpContainer() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { setUserAuthentication } = useAuthStore();

    const {
        latitude,
        longitude,
        selectedAddress,
        handlePlaceSelect,
        streetStateCountryData,
        CHANGED_AFTER_SELECTION_ERROR
    } = usePlaceHandler(form);

    const onSignupSuccess = (data: any | null) => {
        const authData = {...data, isAuth: false };
        setUserAuthentication(authData);
        navigate(NavigationRoutes.AUTH_ROUTES.VALIDATE_DATABASE, {
            state: { from: FROM_SCREEN.SIGN_UP, companyId: data.company?.id }
        });
    };

    const { mutate: registerMutate, isLoading: isSigningUp } = useRegister(onSignupSuccess);
    const { mutateAsync: uploadDocument, isLoading: isUploadingDocument } = useUploadDocuments();

    const handleSubmit = (data: any) => {

        registerMutate(data);
        // const { profileImage } = data;
        // if (!latitude || !longitude || !selectedAddress) {
        //     NotificationService.error(CHANGED_AFTER_SELECTION_ERROR);
        //     return;
        // }
        // if (data?.store?.address?.fullAddress !== selectedAddress) {
        //     NotificationService.error(CHANGED_AFTER_SELECTION_ERROR);
        //     return;
        // }
        // data.store.address.latitude = latitude;
        // data.store.address.longitude = longitude;
        // data.store.address.stateCode = streetStateCountryData?.state
        // data.store.address.countryCode = streetStateCountryData?.country
        // delete data.isAgree;
        // if (!profileImage) {
        //     NotificationService.error("Kindly upload the image.");
        //     return;
        // }
        // const formData = new FormData();
        // formData.append("Media", profileImage?.originFileObj);
        // uploadDocument(formData)
        //     .then((res) => {
        //         data.store.imageId = res?.data?.data[0].id;
        //         delete data.profileImage;
        //         registerMutate(data);
        //     })
        //     .catch((e) => console.error(e));
        
    };

   

    const handleLoginClick = () => {
        navigate(NavigationRoutes.AUTH_ROUTES.LOGIN);
    };

    const validateIsAgree = (rule: any, value: any) => {
        if (!value) {
            return Promise.reject("You must agree to the Terms & Conditions and Privacy Policy");
        }
        return Promise.resolve();
    };
    return {
        form,
        handleSubmit,
        isSigningUp,
        handleLoginClick,
        handlePlaceSelect,
        validateIsAgree
    };
}
