import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ProgressLoader({ containerClasses }: { containerClasses?: string }) {
    return (
        <>
            <div className={`flex items-center justify-center ${containerClasses}`}>
                <Spin indicator={<LoadingOutlined spin />} size="large" className="block " />
            </div>
        </>
    );
}

export default ProgressLoader;
