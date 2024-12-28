import DarkLogo from "@Assets/icons/darkLogo.svg";

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center opacity-80">
            <div className="animate-pulse ">
                <DarkLogo className="text-main-orange" />
            </div>
        </div>
    );
};

export default FullPageLoader;
