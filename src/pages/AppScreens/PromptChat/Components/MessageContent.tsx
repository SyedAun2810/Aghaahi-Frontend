
const MessageContent = ({ isExpanded, toggleExpand, content }: any) => {
    return (
        <div className="ml-4">
            <p className={`text-base ${isExpanded ? "" : "line-clamp-3"}`}>{content || ""}</p>
        </div>
    );
};

export default MessageContent;