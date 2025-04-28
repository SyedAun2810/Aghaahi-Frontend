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
import Stars from "@Assets/icons/stars.svg";
import Logo from "@Assets/images/logo.png";

const faqs = [
    { id: 1, question: 'What is Agaahi?', answer: 'Wonderchat is a chatbot platform designed to simplify customer interactions.' },
    { id: 2, question: 'Does it support all languages?', answer: 'Yes, Agaahi supports multiple languages to help global users.' },
    { id: 3, question: 'Do I need to know code to use Agaahi?', answer: 'No coding skills are required to set up and use Agaahi.' },
    { id: 4, question: 'Will I be able to embed the chatbot into my website?', answer: 'Yes, you can easily embed the chatbot into any website.' },
    { id: 5, question: 'Can multiple team members in my organization manage my chatbots?', answer: 'Yes, you can invite team members to collaborate.' },
];

const LandingPage = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-[#0B0D18] text-white">
            {/* Header */}
            <header className="container mx-auto flex justify-between items-center py-6 px-8">
                <div className="flex items-center space-x-2">
                    <img src={Logo} alt=" Agaahi Logo" className="h-16 w-16" />
                    <div className="text-3xl font-bold tracking-wide"> Agaahi</div> {/* Increased font size and added letter spacing */}
                </div>
                <nav className="flex space-x-8">
                    <a href="#features" className="hover:underline text-[#77798F]">Features</a>
                    <a href="#pricing" className="hover:underline text-[#77798F]">Pricing</a>
                    <a href="#contact" className="hover:underline text-[#77798F]">Contact</a>
                    <a href="#affiliates" className="hover:underline text-[#77798F]">Affiliates</a>
                </nav>
                <div className="flex space-x-4">
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-[#77798F] hover:border-[#ffffff] transition-all duration-300"
                        onClick={() => window.location.href = "/login"} // Navigate user
                    >
                        Sign In
                    </button>
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300"
                        onClick={() => window.location.href = "/register"} // Navigate user
                    >
                        Sign Up
                    </button>
                </div>
            </header>

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
                    Instantly build an AI chatbot <br /> with your knowledge base
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Share your site link or upload any PDF file to create a ChatGPT-powered custom chatbot in 5 minutes.
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
                                <h2 className="text-3xl font-bold mb-4">Self-Serve Customer Support</h2>
                                <p className="text-gray-400 mb-6">
                                    Ever since implementing Agaahi on our site, I've seen up to a 70% reduction of customer support queries in my inbox.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <img src={CustomerImage} alt="Customer Avatar" className="h-20 w-20 rounded-full" />
                                    <div>
                                        <p className="font-bold">BRYCE CONWAY</p>
                                        <p className="text-gray-400 text-sm">Founder and CEO of 10xTravel</p>
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
            <section
                className="py-16 px-4 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${ColoredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h2 className="text-center text-3xl font-bold text-white mb-12">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Card 1 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[550px] w-[350px] mx-auto"
                        style={{
                            backgroundImage: `url(${cardBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)",
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)",
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)",
                        }}
                    >
                        <img src={Sarah} alt="Sarah Sami - Manager & AI Expert" className="h-[350px] w-[300px] rounded-lg mb-4 object-cover" />
                        <h3 className="text-xl font-bold">Sarah Sami</h3>
                        <p className="text-gray-400 text-sm">Manager & AI Expert</p>
                        <p className="text-[#77798F] text-center mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[550px] w-[350px] mx-auto"
                        style={{
                            backgroundImage: `url(${cardBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)",
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)",
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)",
                        }}
                    >
                        <img src={Moiz} alt="Moiz Naveed - Backend Engineer" className="h-[350px] w-[300px] rounded-lg mb-4 object-cover" />
                        <h3 className="text-xl font-bold">Moiz Naveed</h3>
                        <p className="text-gray-400 text-sm">Backend Engineer</p>
                        <p className="text-[#77798F] text-center mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[550px] w-[350px] mx-auto"
                        style={{
                            backgroundImage: `url(${cardBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)",
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)",
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)",
                        }}
                    >
                        <img src={Khushbkaht} alt="Khushbakht Khan - Prompt Engineer & Content Writer" className="h-[350px] w-[300px] rounded-lg mb-4 object-cover" />
                        <h3 className="text-xl font-bold">Khushbakht Khan</h3>
                        <p className="text-gray-400 text-sm">Prompt Engineer & Content Writer</p>
                        <p className="text-[#77798F] text-center mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                    </div>
                    {/* Card 4 */}
                    <div
                        className="text-white rounded-2xl shadow-lg p-8 relative h-[550px] w-[350px] mx-auto"
                        style={{
                            backgroundImage: `url(${cardBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderTop: "3px solid rgba(108, 99, 255, 0.5)",
                            borderBottom: "3px solid rgba(108, 99, 255, 0.5)",
                            boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)",
                        }}
                    >
                        <img src={Aun} alt="Aun Muhammad - Full Stack Engineer" className="h-[350px] w-[300px] rounded-lg mb-4 object-cover" />
                        <h3 className="text-xl font-bold">Aun Muhammad</h3>
                        <p className="text-gray-400 text-sm">Full Stack Engineer</p>
                        <p className="text-[#77798F] text-center mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                    </div>
                </div>
            </section>

            <footer style={{ backgroundColor: '#0c0c1d', padding: '1rem 2rem', color: '#999', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>© 2023  Agaahi Inc. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms of Service</a>
                        <a href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="/cookies" style={{ color: '#999', textDecoration: 'none' }}>Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
