import DarkLogo from "@Assets/icons/darkLogo.svg";
import Logo from "@Assets/images/logo.png";

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center opacity-80">
            <div className="animate-pulse ">
                <img src= {Logo} className="w-24 h-24" />
            </div>
        </div>
    );
};

export default FullPageLoader;
