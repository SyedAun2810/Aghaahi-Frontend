import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="relative  text-gray-800 font-sans min-h-screen ">
        {/* Animated Background Shapes */}
        {/* <div className="absolute rounded-full bg-gradient-to-tr from-purple-500 to-orange-300 w-72 h-72 top-16 left-1/3 filter blur-[100px] opacity-60 animate-pulse"></div>
        <div className="absolute rounded-full bg-gradient-to-br from-purple-500 to-orange-300 w-56 h-56 bottom-20 right-1/4 filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute rounded-full bg-gradient-to-bl from-purple-400 to-orange-200 w-64 h-64 top-1/2 left-1/4 filter blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div> */}

        {/* Banner */}
        <section className="bg-[#0B0D18] text-white py-16 px-4 flex flex-col items-center justify-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-300 text-center mt-4">Your trust is our priority.</p>
        </section>

        {/* Content */}
        <section className="relative z-10 max-w-5xl mx-auto p-6 space-y-4 py-12">
          <style>
            {`
              @keyframes slideInLeft {
                from {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              .animate-slide-in-left {
                animation: slideInLeft 0.5s ease-out forwards;
              }
              .animate-slide-in-right {
                animation: slideInRight 0.5s ease-out forwards;
              }
            `}
          </style>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-left">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">Effective Date:</span>
              </h2>
              <p className="text-gray-600">16th May 2025</p>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-right">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">1. Information We Collect</span>
              </h2>
              <p className="text-gray-600">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
                <li className="hover:text-purple-500 transition-colors duration-300">
                  <b>Personal Information:</b> Such as name, email address, and organizational role when you register or interact with the platform.
                </li>
                <li className="hover:text-purple-500 transition-colors duration-300">
                  <b>Usage Data:</b> Information about how you use Agaahi, such as the queries you run, dashboards you customize, and reports you download.
                </li>
                <li className="hover:text-purple-500 transition-colors duration-300">
                  <b>Device and Technical Information:</b> Includes browser type, IP address, and device identifiers.
                </li>
              </ul>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-left">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">2. How We Use Your Information</span>
              </h2>
              <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
                <li className="hover:text-purple-500 transition-colors duration-300">Provide, operate, and maintain the Agaahi platform.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Personalize your experience based on your role and permissions.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Improve our services through usage analysis and feedback.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Communicate important updates, system notifications, or support responses.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Ensure security by validating access rights and protecting against unauthorized activities.</li>
              </ul>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-right">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">3. Data Security</span>
              </h2>
              <p className="text-gray-600">We prioritize the protection of your data by:</p>
              <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
                <li className="hover:text-purple-500 transition-colors duration-300">Using secure servers and encrypted connections.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Enforcing strict Role-Based Access Control (RBAC) to limit who can see specific data.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Regularly updating our systems to guard against vulnerabilities.</li>
              </ul>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-left">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">4. Data Sharing</span>
              </h2>
              <p className="text-gray-600">
                We do not sell or share your personal information with third parties for marketing purposes. Data may only be shared with authorized system administrators or partners strictly for operational and support purposes, and only under confidentiality agreements.
              </p>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-right">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">5. Your Choices</span>
              </h2>
              <p className="text-gray-600">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
                <li className="hover:text-purple-500 transition-colors duration-300">Access, update, or delete your personal information.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Restrict certain uses of your data by contacting our support team.</li>
                <li className="hover:text-purple-500 transition-colors duration-300">Withdraw consent for communications at any time.</li>
              </ul>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-left">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">6. Changes to This Policy</span>
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
              </p>
            </div>
          </div>

          <div className="border-transparent p-1 bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-padding animate-slide-in-right">
            <div className="bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#202224] mb-4 group">
                <span className="font-medium text-lg text-[#202224]">7. Contact Us</span>
              </h2>
              <p className="text-gray-600">
                If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at:
              </p>
              <p className="text-gray-600 mt-4 flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300">
                <span className="text-2xl">📧</span>
                <span>support@agaahi.ai</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
