import React from "react";
import LandingImage from "@Assets/images/baseLanding.png";
import ColoredImage from "@Assets/images/coloredRectangle.png";
import Logo from "@Assets/images/logo.png";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#0B0D18] text-white">
            {/* Header */}
            <header className="container mx-auto flex justify-between items-center py-6 px-8">
                <div className="flex items-center space-x-2">
                    <img src={Logo} alt="Agaahi Logo" className="h-16 w-16" />
                    <div className="text-3xl font-bold tracking-wide">Agaahi</div> {/* Increased font size and added letter spacing */}
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
                    >
                        Sign In
                    </button>
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300"
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
                    Welcome to Wonderchat
                </h2>
                <h1 className="text-5xl font-bold mb-6">
                    Instantly build an AI chatbot <br /> with your knowledge base
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Share your site link or upload any PDF file to create a ChatGPT-powered custom chatbot in 5 minutes.
                </p>
                <div className="flex space-x-4">
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-transparent hover:border-blue-500 shadow-[0_0_10px_2px_rgba(0,112,243,0.8)] transition-all duration-300"
                    >
                        Get Started For Free
                    </button>
                    <button
                        className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-transparent hover:border-blue-500 shadow-[0_0_10px_2px_rgba(0,112,243,0.8)] transition-all duration-300"
                    >
                        Watch Video
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
                    className="flex flex-col md:flex-row items-center justify-between bg-[#010314] text-white rounded-t-lg rounded-b-lg shadow-lg p-24 mx-24 mt-16"
                    style={{
                        border: "2px solid rgba(108, 99, 255, 0.5)", // Add border
                        boxShadow: "0 0 15px rgba(108, 99, 255, 0.8)", // Add glowing effect
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-4">Self-Serve Customer Support</h2>
                                <p className="text-gray-400 mb-6">
                                    Ever since implementing Wonderchat on our site, I've seen up to a 70% reduction of customer support queries in my inbox.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <img src="" alt="Customer Avatar" className="h-12 w-12 rounded-full" />
                                    <div>
                                        <p className="font-bold">BRYCE CONWAY</p>
                                        <p className="text-gray-400 text-sm">Founder and CEO of 10xTravel</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center mt-6 md:mt-0">
                                <img src="" alt="Support Bot" className="h-32 w-32" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
