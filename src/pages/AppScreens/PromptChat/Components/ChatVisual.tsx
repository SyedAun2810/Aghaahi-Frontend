import UserImage from "@Assets/images/avatar-placeholder.png";
import Logo from "@Assets/images/logo.png";
import Graph from "@Assets/images/visual.webp";

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useState } from "react";
import MessageContent from "./MessageContent";

function ChatVisual() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const content =
        "Show a chart of how many employees from store Alpha have been working for more than 5 years? ";
    return (
        <div>
            {" "}
            <Flex className="my-6">
                <div>
                    <img alt="User Image" src={UserImage} className="w-8 h-8" />
                </div>
                <MessageContent
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                    content={content}
                />
                {content.length > 300 && (
                    <div className="ml-2">
                        {!isExpanded ? (
                            <DownOutlined height={20} width={16} onClick={toggleExpand} />
                        ) : (
                            <UpOutlined height={20} width={16} onClick={toggleExpand} />
                        )}
                    </div>
                )}
            </Flex>
            <Flex>
                <img alt="User Image" src={Logo} className="w-8 h-8" />
                <img src={Graph} alt="graph here" width={500} />
            </Flex>
        </div>
    );
}

export default ChatVisual;