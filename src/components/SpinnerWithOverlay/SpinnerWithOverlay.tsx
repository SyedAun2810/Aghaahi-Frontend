import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const styles = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
};
interface SpinnerWithOverlayType {
    showInformationText?: boolean;
    informationText?: string;
}
function SpinnerWithOverlay({ showInformationText, informationText }: SpinnerWithOverlayType) {
    return (
        <>
            <div style={styles}></div>
            <div>
                <Space
                    className="absolute  left-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ top: "50vh" }}
                >
                    <div>
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="large"
                            className="block mb-3"
                        />
                        {showInformationText ? (
                            <p className="text-center text-large text-white">{informationText}</p>
                        ) : null}
                    </div>
                </Space>
            </div>
        </>
    );
}

export default SpinnerWithOverlay;
