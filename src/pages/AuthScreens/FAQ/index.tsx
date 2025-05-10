import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: "What is no-code AI analytics?",
            answer: "No-code AI analytics lets you explore, visualize, and derive insights from your data without writing a single line of code—Agaahi does the heavy lifting."
        },
        {
            question: "How do I connect my data sources?",
            answer: "Agaahi integrates with databases, spreadsheets, and popular BI tools via a simple connector wizard—just authenticate and go."
        },
        {
            question: "Can I customize dashboards and charts?",
            answer: "Yes—drag & drop widgets, pick from 20+ chart types, and tailor layouts with our visual editor. No code needed."
        },
        {
            question: "Do you offer a free trial?",
            answer: "Absolutely! Sign up today and get a 14-day free trial—no credit card required."
        },
        {
            question: "How secure is my data on Agaahi?",
            answer: "We use enterprise-grade encryption at rest and in transit, SOC 2 compliance, and strict role-based access controls to protect your data."
        },
        {
            question: "Which data sources does Agaahi support?",
            answer: "Agaahi natively integrates with SQL databases (MySQL, PostgreSQL), NoSQL stores (MongoDB), cloud warehouses (BigQuery, Snowflake), CSV/Excel files, and can connect via REST APIs or webhooks."
        },
        {
            question: "Can I invite team members and manage roles?",
            answer: "Yes—Agaahi offers role-based access control (Admin, Editor, Viewer). You can invite users, assign roles, and restrict who can view or edit dashboards and data sources."
        },
        {
            question: "What SLA and uptime do you guarantee?",
            answer: "For Premium and Enterprise plans, we guarantee 99.9% uptime backed by a formal SLA, including dedicated support and escalation protocols."
        },
        {
            question: "How long is my data retained?",
            answer: "We retain your data for 90 days by default. Enterprise clients can request custom retention policies up to 1 year, or opt for on-premise deployment for full control."
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
                            onClick={() => navigate('/contact')}
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
                                className=" border-transparent  p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding"
                            >
                                <div className="bg-white  p-4">
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
                                        className={`mt-2 text-[#4B5563] transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
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