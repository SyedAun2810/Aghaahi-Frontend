
const ConversationHeaderSkeleton = () => {
    return (
        <div
            key={1}
            className="flex items-center animate-pulse justify-between mb-4 h-[75px] cursor-pointer px-2 border-bottom"
        >
            <div className="flex items-center gap-2">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-10 h-10"></div>
                <div className="mt-2">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5"></div>
                </div>
            </div>
        </div>
    );
};

export default ConversationHeaderSkeleton;
