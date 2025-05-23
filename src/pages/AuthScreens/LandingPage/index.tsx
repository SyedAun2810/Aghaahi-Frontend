import React, { useState } from "react";
import LandingImage from "@Assets/images/baseLanding.png";
import ColoredImage from "@Assets/images/coloredRectangle.png";
import ChatBotImage from "@Assets/images/RobotImage.png";
import CustomerImage from "@Assets/images/customerImage.png";
import Graph1 from "@Assets/images/graph1.png";
import Graph2 from "@Assets/images/graph2.png";
import cardBg from "@Assets/images/cardBg.png";
import Moiz from "../../../assets/images/Moiz.jpg";
import Aun from "../../../assets/images/Aun.jpg";
import Sarah from "../../../assets/images/sarah.jpg";
import Khushbkaht from "../../../assets/images/khushbakht.jpg";
import Siraj from "@Assets/images/siraj.png";
import Stars from "@Assets/icons/stars.svg";
import Logo from "@Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import UnAuthenticated from "@Navigation/UnAuthenticated";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import Header from "../Header";

const faqs = [
    { 
        id: 1, 
        question: 'What is Agaahi, and who is it for?', 
        answer: 'Agaahi is an AI-powered data querying and insight-generation platform that allows users to interact with structured relational databases (like MySQL) using natural language. It also allows user to build custom dashboards without any technical knowledge. It\'s built for organizations seeking to democratize data access—empowering business users, analysts, and decision-makers to retrieve insights without needing technical skills or SQL knowledge.' 
    },
    { 
        id: 2, 
        question: 'Do I need technical expertise to use Agaahi?', 
        answer: 'Not at all. Agaahi was built with the non-technical user in mind. Anyone can type questions in everyday language, and the system will interpret, generate, and execute SQL queries automatically. There\'s no need to understand databases, write code, or learn new tools.' 
    },
    { 
        id: 3, 
        question: 'Can I use Agaahi with different types of databases?', 
        answer: 'The current version of Agaahi is optimized for relational databases like MySQL. However, its modular design makes it extensible to support other databases such as PostgreSQL and even NoSQL systems like MongoDB in future iterations.' 
    },
    { 
        id: 4, 
        question: 'How can I create dashboards using Agaahi?', 
        answer: 'Agaahi allows users to build dashboards effortlessly through natural language interactions. Users can select a chart type and enter prompt about the data that they wish to visualize ("Show me monthly sales for the last year") and Agaahi will add to the dashboard. Users can drag and adjust the positions of the charts being displayed and save changes for future reference. The dashboard interface supports multiple widgets—charts, tables, and summaries—allowing users to curate a live, interactive view of key business metrics. All dashboards are role-aware, meaning users only see data they\'re authorized to access. With no coding needed and fully customizable layouts, dashboards in Agaahi make monitoring insights simple, even for non-technical users.' 
    },
    { 
        id: 5, 
        question: 'Can Agaahi generate reports and in chat-visualizations?', 
        answer: 'Yes. Agaahi automatically transforms your query results into clear, structured reports. It also supports visualization of data using dynamic charts and graphs, user can say "Show above results in a graph" and it will generate a graph within chat if the data is conceptually viable for a graph. It can be customized and downloaded, making communication of insights more effective.' 
    },
    { 
        id: 6, 
        question: 'What are the pricing plans for Agaahi?', 
        answer: 'Yes we offer a 7-days free trail for businesses to get started and get an idea of how beneficial Agaahi is for their business. After that there are multiple subscription plans for users to choose from, you can view them here.' 
    },
    { 
        id: 7, 
        question: 'Can multiple team members collaborate using Agaahi?', 
        answer: 'Absolutely. Agaahi supports multi-user environments, allowing organizations to onboard different users—owners, admins, data analysts, and engineers—with specific permissions. The organization admin manages internal users, while a super-admin panel oversees company-wide onboarding.' 
    },
    { 
        id: 8, 
        question: 'How does Agaahi ensure the data shared is secure?', 
        answer: 'Agaahi enforces Role-Based Access Control (RBAC), meaning users can only access data relevant to their role. Each organization defines custom roles and table-level permissions during setup, ensuring sensitive data is only accessible to authorized personnel. Other than that you can view our privacy policy here.' 
    }
];

const LandingPage = () => {
    const [activeId, setActiveId] = useState(null);

    const navigate = useNavigate();

    const toggleFAQ = (id) => {
        setActiveId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-[#0B0D18] text-white">
            {/* Header */}
    
            <Header/>
            {/* Hero Section */}
            <main
                className="flex flex-col items-center justify-center text-center py-32 px-8 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${LandingImage})`,
                    backgroundColor: "#0B0D18",
                    borderRadius: "12px",
                    margin: "60px",
                    height: "350px", // Increased height
                }}
            >
                <h2 className="text-sm uppercase tracking-widest text-blue-400 mb-4">
                    Welcome to Agaahi
                </h2>
                <h1 className="text-5xl font-bold mb-6">
                    Transform the way you <br /> analyze your data
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Chat with your database, generate insights, and build dashboards — all in one place.
                </p>
                <div className="flex justify-center">
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-transparent hover:border-blue-500 shadow-[0_0_10px_2px_rgba(0,112,243,0.8)] transition-all duration-300"
                        onClick={() => window.location.href = "/register"} // Navigate user
                    >
                        Get Started For Free
                    </button>
                </div>
            </main>

            {/* Customer Support Section */}
            <div
                className="w-full h-full relative pb-24"
                style={{
                    backgroundImage: `url(${ColoredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <section
                    className="flex flex-col md:flex-row items-center justify-between bg-[#010314] text-white rounded-2xl rounded-xl shadow-lg p-12 mx-44 mt-16"
                    style={{
                        borderTop: "3px solid rgba(108, 99, 255, 0.5)", // Border at the top
                        borderBottom: "3px solid rgba(108, 99, 255, 0.5)", // Border at the bottom
                        boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)", // Add glowing effect
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-4">Intelligence That Drives Results</h2>

                                <p className="text-gray-400 mb-6">
                                    Agaahi is a game-changer for businesses. By turning complex data into simple conversations, it eliminates bottlenecks and empowers teams to act faster and smarter.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <img src={Siraj} alt="Customer Avatar" className="h-20 w-20 rounded-full" />
                                    <div>
                                        <p className="font-bold">Siraj-ul-Haq</p>
                                        <p className="text-gray-400 text-sm">CEO @ IoMechs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center mt-6 md:mt-0">
                                <img src={ChatBotImage} alt="Support Bot" className="h-72 w-80" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* How It Works Section */}
            <section
                className="py-16 px-8 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${ColoredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[450px]"
                        style={{
                            backgroundImage: `url(${cardBg})`, // Add card background
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)", // Border at the top
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)", // Border at the bottom
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)", // Add glowing effect
                        }}
                    >
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <Stars className="h-4 w-4 text-blue-400" />
                            <p className="text-sm uppercase tracking-widest text-blue-400">How It Works</p>
                        </div>
                        <h3 className="text-xl font-bold mb-4 mt-8">Customize Your Chatbot</h3>
                        <p className="text-gray-400 mb-6">
                            Set the role of your chatbot and profile photo of your chatbot to reflect your brand identity. Tailor its response length to what you like best.
                        </p>
                        <div className="flex w-full justify-center items-center">
                            <img src={Graph1} alt="Customize Chatbot" className="h-[60%] w-[90%]" />
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[450px]"
                        style={{
                            backgroundImage: `url(${cardBg})`, // Add card background
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)", // Border at the top
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)", // Border at the bottom
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)", // Add glowing effect
                        }}
                    >
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <Stars className="h-4 w-4 text-blue-400" />
                            <p className="text-sm uppercase tracking-widest text-blue-400">How It Works</p>
                        </div>
                        <h3 className="text-xl font-bold mb-4 mt-8">Ready in 5 Minutes</h3>
                        <p className="text-gray-400 mb-6">
                            Wait for less than 5 minutes to have the Chatbot learn all the information from the webpages of your website. Once done, you can instantly converse with it.
                        </p>
                        <div className="flex w-full justify-center items-center">
                            <img src={Graph2} alt="Ready in 5 Minutes" className="h-[60%] w-[90%]" />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="py-16 px-8 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${ColoredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h2 className="text-center text-3xl font-bold text-white mb-12">FAQ's</h2>
                <div className="max-w-6xl mx-auto bg-[#010314] text-white rounded-2xl shadow-lg p-8">
                    {faqs.map(faq => (
                        <div key={faq.id} className="border-b border-gray-700 py-4">
                            <div
                                onClick={() => toggleFAQ(faq.id)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <span className="text-lg font-medium">{faq.id.toString().padStart(2, '0')} {faq.question}</span>
                                <span className="text-xl">{activeId === faq.id ? '-' : '+'}</span>
                            </div>
                            {activeId === faq.id && (
                                <div className="mt-4 text-gray-400">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
       

            <footer style={{ backgroundColor: '#0c0c1d', padding: '1rem 2rem', color: '#999', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>© 2023  Agaahi Inc. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms of Service</a>
                        <a href="/privacy" style={{ color: '#999', textDecoration: 'none' }} onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.PRIVACY_POLICY)}>Privacy Policy</a>
                        <a href="/cookies" style={{ color: '#999', textDecoration: 'none' }}>Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;


