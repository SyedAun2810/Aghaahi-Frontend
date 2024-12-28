import React from "react";
import { Avatar } from "antd";

import "./index.scss";
import utilService from "@Utils/utils.service";

interface propParams {
  imageUrl: string | null | undefined;
  name: string | undefined;
  size?: number;
  className?: string;
  textSize?: string;
  inputRef?:any
}

const { getAvatarText } = utilService;

const CustomAvatar: React.FC<propParams> = ({
  imageUrl,
  name,
  size = 40,
  className,
  textSize,
  inputRef
}) => {
  return (
    <Avatar src={imageUrl} className={className} size={size} ref={inputRef}>
      {!imageUrl && (
        <h2 className={`avatar-text ${textSize ?? "text-lg"}`}>
          {getAvatarText(name ?? "")}
        </h2>
      )}
    </Avatar>
  );
};

export default CustomAvatar;
