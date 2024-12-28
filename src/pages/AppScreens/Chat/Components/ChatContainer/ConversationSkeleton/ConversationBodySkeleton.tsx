const messagesSkeleton = [1, 0, 0, 0, 1, 1, 0, 1];
const widths = ["w-60", "w-56", "w-52", "w-72", "w-44", "w-72", "w-36"];

const ConversationBodySkeleton = () => {
    return (
        <div className="overflow-hidden px-4 flex-grow">
            {messagesSkeleton.map((page, index) =>
                page ? (
                    <div
                        key={index}
                        className="flex items-center justify-start mb-4 h-[60px] cursor-pointer px-2 max-w-[50%] animate-pulse"
                    >
                        <div
                            className={`h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 h-12 mb-2.5 rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-3xl text-white p-4 ${
                                widths[index % widths.length]
                            }`}
                        ></div>
                    </div>
                ) : (
                    <div
                        key={index}
                        className="flex items-center justify-end mb-4 h-[60px] cursor-pointer px-2 animate-pulse"
                    >
                        <div
                            className={`h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 h-12 mb-2.5 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none bg-stroke-light text-light-text p-4 max-w-[95%] break-words overflow-wrap ${
                                widths[index % widths.length]
                            }`}
                        ></div>
                    </div>
                )
            )}
        </div>
    );
};

export default ConversationBodySkeleton;
