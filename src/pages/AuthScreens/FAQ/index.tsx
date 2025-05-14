import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { NavigationRoutes } from '@Navigation/NavigationRoutes';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: "What is Agaahi, and who is it for?",
            answer: "Agaahi is an AI-powered data querying and insight-generation platform that allows users to interact with structured relational databases (like MySQL) using natural language. It also allows user to build custom dashboards without any technical knowledge. It's built for organizations seeking to democratize data access—empowering business users, analysts, and decision-makers to retrieve insights without needing technical skills or SQL knowledge."
        },
        {
            question: "Do I need technical expertise to use Agaahi?",
            answer: "Not at all. Agaahi was built with the non-technical user in mind. Anyone can type questions in everyday language, and the system will interpret, generate, and execute SQL queries automatically. There's no need to understand databases, write code, or learn new tools."
        },
        {
            question: "Can I use Agaahi with different types of databases?",
            answer: "The current version of Agaahi is optimized for relational databases like MySQL. However, its modular design makes it extensible to support other databases such as PostgreSQL and even NoSQL systems like MongoDB in future iterations."
        },
        {
            question: "How can I create dashboards using Agaahi?",
            answer: "Agaahi allows users to build dashboards effortlessly through natural language interactions. Users can select a chart type and enter prompt about the data that they wish to visualize ('Show me monthly sales for the last year') and Agaahi will add to the dashboard. Users can drag and adjust the positions of the charts being displayed and save changes for future reference. The dashboard interface supports multiple widgets—charts, tables, and summaries—allowing users to curate a live, interactive view of key business metrics. All dashboards are role-aware, meaning users only see data they're authorized to access. With no coding needed and fully customizable layouts, dashboards in Agaahi make monitoring insights simple, even for non-technical users."
        },
        {
            question: "Can Agaahi generate reports and in chat-visualizations?",
            answer: "Yes. Agaahi automatically transforms your query results into clear, structured reports. It also supports visualization of data using dynamic charts and graphs, user can say 'Show above results in a graph' and it will generate a graph within chat if the data is conceptually viable for a graph. It can be customized and downloaded, making communication of insights more effective."
        },
        {
            question: "What are the pricing plans for Agaahi?",
            answer: "We offer a 7-days free trial for businesses to get started and get an idea of how beneficial Agaahi is for their business. After that there are multiple subscription plans for users to choose from. You can view them on our pricing page."
        },
        {
            question: "Can multiple team members collaborate using Agaahi?",
            answer: "Absolutely. Agaahi supports multi-user environments, allowing organizations to onboard different users—owners, admins, data analysts, and engineers—with specific permissions. The organization admin manages internal users, while a super-admin panel oversees company-wide onboarding."
        },
        {
            question: "How does Agaahi ensure the data shared is secure?",
            answer: "Agaahi enforces Role-Based Access Control (RBAC), meaning users can only access data relevant to their role. Each organization defines custom roles and table-level permissions during setup, ensuring sensitive data is only accessible to authorized personnel. You can view our privacy policy for more details."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Header />
            <div className="relative bg-[#F8F9FA] font-sans text-[#202224] min-h-screen">
                {/* Animated Background Shapes */}
                {/* <div className="absolute rounded-full bg-gradient-to-tr from-[#A855F7] to-[#FFD1A4] w-72 h-72 top-8 left-1/4 filter blur-[100px] opacity-60 animate-pulse"></div>
                <div className="absolute rounded-full bg-gradient-to-br from-[#A855F7] to-[#FFD1A4] w-56 h-56 bottom-12 right-1/3 filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div> */}

                {/* FAQ Header CTA */}
                <div className="relative p-8 bg-[#0B0D18] text-white py-16 px-4 flex flex-col items-center justify-center backdrop-blur-lg shadow-lg">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                        <span className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h1>
                    <div className="flex justify-center gap-4 mb-4">
                        <button
                            onClick={() => navigate(NavigationRoutes.AUTH_ROUTES.REGISTER)}
                            className="px-4 py-2 bg-[#A855F7] text-white rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                        >
                            Book a Demo
                        </button>
                        <a
                            href="mailto:support@agaahi.ai"
                            className="px-4 py-2 bg-white text-[#A855F7] border border-[#A855F7] rounded-full hover:bg-[#A855F7] hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Support
                        </a>
                    </div>
                    <p className="text-[#CBD5E1] text-center">
                        Find answers in a flash or book a live demo for deeper dives.
                    </p>
                </div>

                {/* FAQ Accordion Grid */}
                <section className="relative z-10 max-w-4xl mx-auto px-4 mb-24 mt-20">
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding"
                            >
                                <div className="bg-white p-4">
                                    <button
                                        className="w-full text-left flex justify-between items-center bg-transparent border-none p-0 m-0 appearance-none focus:outline-none"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span className="font-medium text-lg text-[#202224]">{item.question}</span>
                                        <svg
                                            className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`mt-2 text-[#4B5563] transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default FAQ; 