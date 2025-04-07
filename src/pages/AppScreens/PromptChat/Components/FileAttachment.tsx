import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { Flex } from "antd";
import DownloadIcon  from "@Assets/icons/downloadIcon.svg";

export default function FileAttachment({
    fileName = "Sample-Spreadsheet-10-rows.csv",
    fileSize = "1 kB",
    fileType = "CSV"
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleDownload = () => {
        window.location.href = "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv";
        setIsDownloaded(true);
    };

    return (
        <Flex
            className="p-4 bg-gray-100 rounded-md shadow-lg w-[50%] items-center my-4"
            align="center"
            gap={16}
        >
            <FileText className="text-gray-600 w-8 h-8" size={32} />
            <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                    {fileName}
                </h2>
                <p className="text-sm text-gray-700">
                    {fileType} • <span className="font-bold text-green-600">{fileSize}</span>
                </p>
            </div>
            {!isDownloaded && (
                <button
                    className={`bg-transparent border-none p-0 m-0 text-inherit font-inherit cursor-pointer outline-none transition ${isHovered ? "" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleDownload}
                >
                    <DownloadIcon style={{ width: '28px', height: '28px' }} />
                </button>
            )}
        </Flex>
    );
}
