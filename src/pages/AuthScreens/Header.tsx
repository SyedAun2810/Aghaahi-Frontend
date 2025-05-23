import { useNavigate } from "react-router-dom";
import Logo from "@Assets/images/logo.png";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { COLORS } from "@Constants/colors";
import useAuthStore from "@Store/authStore";

function Header(){
    const navigate = useNavigate();
    const {isAuth} = useAuthStore();

    
    return (
        <header className="flex justify-between items-center py-6 px-8 bg-[#0B0D18] " >
        <div className="flex items-center space-x-2" onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.ABOUT_US)}>
            <img src={Logo} alt=" Agaahi Logo" className="h-16 w-16" />
            <div className="text-3xl font-bold tracking-wide text-white"> Agaahi</div>
        </div>
        <nav className="flex space-x-8">
            <a href="#pricing" className="hover:underline text-[#77798F]" onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.ABOUT_US)}>Home</a>
            <a href="#pricing" className="hover:underline text-[#77798F]" onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.PRIVACY_POLICY)}>Privacy Policy</a>
            <a href="#contact" className="hover:underline text-[#77798F]" onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.CONTACT_US)}>Contact Us</a>
            <a href="#faq" className="hover:underline text-[#77798F]" onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.FAQ)}>FAQ</a>
        </nav>
        <div className="flex space-x-4">
            {isAuth ? (
                <button
                    className="px-8 py-3 rounded-full text-white bg-[#0F172A] border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300"
                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                >
                    Go to Chat
                </button>
            ) : (
                <>
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0F172A] border-2 border-[#77798F] hover:border-[#ffffff] transition-all duration-300"
                        onClick={() => window.location.href = "/login"}
                    >
                        Sign In
                    </button>
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0F172A]  border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300"
                        onClick={() => window.location.href = "/register"}
                    >
                        Sign Up
                    </button>
                </>
            )}
        </div>
    </header>
    )
}

export default Header;