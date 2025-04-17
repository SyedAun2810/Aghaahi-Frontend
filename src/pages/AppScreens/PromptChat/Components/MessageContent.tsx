
const MessageContent = ({ isExpanded, toggleExpand, content }: any) => {
    return (


        <div className="whitespace-pre-wrap ml-4">
            {content}
        </div>
    );
};

export default MessageContent;
