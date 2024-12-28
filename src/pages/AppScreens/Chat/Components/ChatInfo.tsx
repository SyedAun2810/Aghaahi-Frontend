import { Card } from "antd";
import NoChatSelectedImage from "@Assets/images/noChatSelect.png";
const ChatInfo = () => (
    <Card className="flex justify-center items-center h-full w-full bg-light-bg rounded-none border-none">
        <img src={NoChatSelectedImage} alt="no chats selected" />
        <p className="text-center text-base font-[500] text-light-text mt-2">No Chat Selected</p>
    </Card>
);

export default ChatInfo;
