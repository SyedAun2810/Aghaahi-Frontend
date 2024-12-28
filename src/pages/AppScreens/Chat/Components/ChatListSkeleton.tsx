const ChatListSkeleton = () => {
    const items = Array.from({ length: 10 });
    return (
        <div className="px-3 h-[88vh]  pt-4">
            {items.map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between mb-4 h-[60px] cursor-pointer animate-pulse"
                >
                    <div className="flex items-center gap-2">
                        <div className="lg:w-[38px] xl:w-[40px] 2xl:w-[45px] md:w-[36px] lg:h-[38px] xl:h-[40px] 2xl:h-[45px] md:h-[36px] rounded-full bg-gray-300 dark:bg-gray-600 "></div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
            ))}
        </div>
    );
};

export default ChatListSkeleton;
