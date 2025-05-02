import React, { useState } from 'react';

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-800 relative overflow-x-hidden">
      {/* Banner Section */}
      <section
        className="py-16 px-4 flex flex-col items-center justify-center text-white"
        style={{ backgroundColor: '#0F172A' }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          style={{
            background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Our Plans
        </h1>
        <p className="text-center max-w-xl">
          Flexible pricing to match your needs. Start with a 7-day free trial — no credit card required.
        </p>
      </section>

      {/* Pricing Plans Section */}
      <div
        className="max-w-7xl mx-auto mt-12 mb-20 p-1 rounded-lg relative"
        style={{
          background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
        }}
      >
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-primary to-peach opacity-60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-gradient-to-br from-primary to-peach opacity-60 rounded-full blur-3xl"></div>

        <section className="bg-white rounded-lg p-10 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Trial */}
            <div className="p-6 rounded-2xl border border-primary hover:scale-105 transition transform space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Free Trial</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-2 text-gray-600">/7 days</span>
              </div>
              <p className="text-primary">7 days full access</p>
              <ul className="space-y-2 text-gray-600">
                <li>✔ Access all core features</li>
                <li>✔ 100 queries/day</li>
                <li>✔ Basic support</li>
              </ul>
              <button
                className="w-full mt-6 px-6 py-3 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                style={{ backgroundColor: '#A855F7' }}
              >
                Start Free Trial →
              </button>
            </div>
            {/* Basic */}
            <div className="p-6 rounded-2xl border border-primary hover:scale-105 transition transform space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$14.99</span>
                <span className="ml-2 text-gray-600">/month</span>
              </div>
              <p className="text-primary">Ideal for individuals</p>
              <ul className="space-y-2 text-gray-600">
                <li>✔ Unlimited queries</li>
                <li>✔ Scheduled reports</li>
                <li>✔ API access (1k calls/day)</li>
                <li>✔ Community support</li>
              </ul>
              <button
                className="w-full mt-6 px-6 py-3 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                style={{ backgroundColor: '#A855F7' }}
              >
                Choose Basic →
              </button>
            </div>
            {/* Premium */}
            <div className="p-6 rounded-2xl border-2 border-primary bg-primary bg-opacity-10 hover:scale-105 transition transform space-y-6">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold" style={{ color: '#A855F7' }}>
                  Premium
                </h3>
                <span>⭐</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="ml-2 text-gray-600">/month</span>
              </div>
              <p className="text-primary">For businesses & power users</p>
              <ul className="space-y-2 text-gray-600">
                <li>✔ Everything in Basic</li>
                <li>✔ Priority support</li>
                <li>✔ API access (Unlimited)</li>
                <li>✔ Custom AI models</li>
                <li>✔ Team collaboration</li>
              </ul>
              <button
                className="w-full mt-6 px-6 py-3 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                style={{ backgroundColor: '#A855F7' }}
              >
                Go Premium →
              </button>
            </div>
            {/* Pay-As-You-Go */}
            <div className="p-6 rounded-2xl border border-primary hover:scale-105 transition transform space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Pay-As-You-Go</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">From $0.10</span>
                <span className="ml-2 text-gray-600">/query</span>
              </div>
              <p className="text-primary">Flexible usage-based pricing</p>
              <ul className="space-y-2 text-gray-600">
                <li>✔ No monthly commitment</li>
                <li>✔ Only pay for what you use</li>
                <li>✔ Access all features</li>
                <li>✔ Auto top-up</li>
              </ul>
              <button
                className="w-full mt-6 px-6 py-3 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                style={{ backgroundColor: '#A855F7' }}
              >
                Pay As You Go →
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FAQs Section */}
      <section className="relative max-w-4xl mx-auto px-4 mb-24 space-y-4">
        <div
          className="border-2 rounded-lg p-4"
          style={{
            borderImage: 'linear-gradient(to right, #A855F7, #FFD1A4) 1',
          }}
        >
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => toggleFaq(0)}
          >
            <span className="font-medium text-lg">What is no-code AI analytics?</span>
            <svg
              className={`w-6 h-6 transform transition-transform ${
                activeFaq === 0 ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {activeFaq === 0 && (
            <div className="mt-2 text-gray-600">
              No-code AI analytics lets you explore, visualize, and derive insights from your data without writing a single line of code—Agaahi does the heavy lifting.
            </div>
          )}
        </div>
        {/* Repeat similar FAQ items */}
      </section>
    </div>
  );
};

export default Pricing;
