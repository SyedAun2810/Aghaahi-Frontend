import { Form } from "antd";
import { ChangePasswordPayload } from "@Utils/types";
import { useChangePassword } from "./ChangePasswordQuery";

const useChangePasswordContainer = () => {
    const { mutate: changePassword, isLoading: isChangingPassword } = useChangePassword(onChangeSuccess);
    const [form] = Form.useForm();

    function onChangeSuccess(){
        form.resetFields();
    
    }

    const handleFinish = (values: ChangePasswordPayload) => {
        changePassword(values);
    };

    return {
        form,
        handleFinish,
        isChangingPassword
    };
};

export default useChangePasswordContainer;
