import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="relative bg-gray-50 text-gray-800 font-sans">
      {/* Spatial Background Shapes */}
      <div
        className="absolute rounded-full"
        style={{
          background: 'linear-gradient(to top right, #A855F7, #FFD1A4)',
          width: '18rem',
          height: '18rem',
          top: '4rem',
          left: '33%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      ></div>
      <div
        className="absolute rounded-full"
        style={{
          background: 'linear-gradient(to bottom right, #A855F7, #FFD1A4)',
          width: '14rem',
          height: '14rem',
          bottom: '5rem',
          right: '25%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      ></div>

      {/* Banner */}
      <section
        className="py-16 px-4 flex flex-col items-center justify-center relative z-10 text-white"
        style={{ backgroundColor: '#0F172A' }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold text-center"
          style={{
            background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Privacy Policy
        </h1>
        <p className="text-center mt-4">Your trust is our priority.</p>
      </section>

      {/* Content */}
      <section className="relative z-10 max-w-5xl mx-auto p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            Effective Date:
          </h2>
          <p className="text-gray-600">28th April 2025</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            1. Information We Collect
          </h2>
          <p className="text-gray-600">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>
              <b>Personal Information:</b> Such as name, email address, and organizational role when you register or interact with the platform.
            </li>
            <li>
              <b>Usage Data:</b> Information about how you use Agaahi, such as the queries you run, dashboards you customize, and reports you download.
            </li>
            <li>
              <b>Device and Technical Information:</b> Includes browser type, IP address, and device identifiers.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>Provide, operate, and maintain the Agaahi platform.</li>
            <li>Personalize your experience based on your role and permissions.</li>
            <li>Improve our services through usage analysis and feedback.</li>
            <li>Communicate important updates, system notifications, or support responses.</li>
            <li>Ensure security by validating access rights and protecting against unauthorized activities.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            3. Data Security
          </h2>
          <p className="text-gray-600">We prioritize the protection of your data by:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>Using secure servers and encrypted connections.</li>
            <li>Enforcing strict Role-Based Access Control (RBAC) to limit who can see specific data.</li>
            <li>Regularly updating our systems to guard against vulnerabilities.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            4. Data Sharing
          </h2>
          <p className="text-gray-600">
            We do not sell or share your personal information with third parties for marketing purposes. Data may only be shared with authorized system administrators or partners strictly for operational and support purposes, and only under confidentiality agreements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            5. Your Choices
          </h2>
          <p className="text-gray-600">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Restrict certain uses of your data by contacting our support team.</li>
            <li>Withdraw consent for communications at any time.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            6. Changes to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#A855F7' }}>
            7. Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at:
          </p>
          <p className="text-gray-600 mt-2">📧 Email: support@agaahi.ai</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
