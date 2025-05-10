import React from 'react';
import Header from '../Header';
import './styles.css'; // We'll create this file for animations
import WhoWeAre from '@Assets/images/whoweare.jpg';
import Workflow from '@Assets/images/workflow with border.png';
import WorkFlowWithoutBorder from '@Assets/images/workflow without border.png';
import Moiz from "../../../assets/images/Moiz.jpg";
import Aun from "../../../assets/images/Aun.jpg";
import Sarah from "../../../assets/images/sarah.jpg";
import Khushbkaht from "../../../assets/images/khushbakht.jpg";

const AboutUs = () => {
  return (
    <div className="relative bg-gray-50 text-gray-800 font-sans">
      <Header />

      {/* Spatial Background Shapes */}
      {/* <div className="shape-circle bg-gradient-to-tr from-[#A855F7] to-[#FFD1A4] w-72 h-72 top-16 left-1/3"></div>
      <div className="shape-circle bg-gradient-to-br from-[#A855F7] to-[#FFD1A4] w-56 h-56 bottom-20 right-1/4"></div> */}

      {/* Updated Banner Section */}
      <section className="relative bg-[#0B0D18] text-white py-24 overflow-hidden">
        {/* Background Shapes */}
        <div className="shape-circle bg-[#0B0D18]]/20 w-96 h-96 -top-32 left-1/4"></div>
        <div className="shape-circle bg-[#FFD1A4]/20 w-64 h-64 bottom-0 right-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* <div className="mb-8">
            <span className="px-8 py-3 rounded-full text-white bg-[#0F172A]  border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300">
              About Agaahi
            </span>
          </div> */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-text text-transparent">
              Pioneering Smarter Data Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where artificial intelligence meets human intuition to transform raw information into strategic assets
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="px-8 py-3 rounded-full text-white bg-[#0B0D18] border-2 border-transparent hover:border-blue-500 shadow-[0_0_10px_2px_rgba(0,112,243,0.8)] transition-all duration-300"
              onClick={() => window.location.href = "/register"} // Navigate user
            >
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative hover-tilt">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7] to-[#FFD1A4] rounded-3xl transform -rotate-2"></div>
              <img src={WhoWeAre} alt="Team Collaboration" className="relative rounded-3xl shadow-xl object-cover w-full h-96" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#0F172A]">Who We Are</h2>
              <p className="text-lg text-gray-600">
                Agaahi is a team of data enthusiasts, AI experts, and security specialists dedicated to revolutionizing business analytics. Founded at NED University, we combine academic rigor with industry insights to create solutions that bridge the gap between complex data systems and business users.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#A855F7]/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Pioneers in AI Analytics</h3>
                    <p className="text-gray-600 text-sm">Combining LLM expertise with practical business applications</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#A855F7]/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Based in Karachi</h3>
                    <p className="text-gray-600 text-sm">Serving global clients from Pakistan's tech hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow Visualization Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-6">Transforming Data into Decisions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            Our intelligent pipeline converts unstructured information into actionable insights through a seamless seven-stage process:
          </p>
          <div className="relative hover-tilt flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <img src={Workflow} alt="Data Flow Process" className="mx-auto " />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Side-by-Side */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl gradient-border hover-tilt">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Agaahi, we're transforming how businesses interact with their data. By bridging the gap between complex data systems and everyday business users, we enable organizations to make data-driven decisions faster than ever before.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#A855F7]/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Transformative Analytics</h3>
                    <p className="text-gray-600 text-sm">Redefining data interaction paradigms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#A855F7]/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Seamless Integration</h3>
                    <p className="text-gray-600 text-sm">Compatible with existing infrastructure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl gradient-border hover-tilt">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our Values</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Value items */}
                {[
                  {
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Accuracy First",
                    description: "Precision in every insight"
                  },
                  {
                    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                    title: "Security Built-In",
                    description: "End-to-end protection"
                  },
                  {
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    title: "Collaborative Approach",
                    description: "Cross-functional teamwork"
                  },
                  {
                    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                    title: "Ethical AI",
                    description: "Responsible technology use"
                  },
                  {
                    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                    title: "Continuous Learning",
                    description: "Always evolving"
                  },
                  {
                    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                    title: "Agile Execution",
                    description: "Rapid implementation"
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-[#A855F7]/10 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Visualizations */}
      <section className="py-24 bg-gradient-to-br from-[#A855F7]/10 to-[#FFD1A4]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools that transform your data workflow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature cards */}
            {[
              {
                title: "Interactive NL-to-SQL-to-NL",
                description: "Convert natural language queries to optimized SQL commands. Receive results in conversational English with AI-powered accuracy.",
                visualization: (
                  <svg viewBox="0 0 800 300" className="w-full h-full">
                    <g fontFamily="sans-serif" fontSize="16" fill="#0F172A">
                      <rect x="50" y="50" width="200" height="80" rx="15" fill="#FFD1A4" className="animate-pulse" />
                      <foreignObject x="60" y="60" width="180" height="60">
                        <div className="text-lg font-semibold text-[#0F172A] p-2">
                          <span className="typing-animation">Show sales of 2023</span>
                        </div>
                      </foreignObject>
                      <rect x="300" y="50" width="200" height="80" rx="15" fill="#A855F7" className="opacity-50" />
                      <foreignObject x="310" y="60" width="180" height="60">
                        <div className="text-sm font-mono text-white">
                          <span className="sql-build-animation">
                            SELECT SUM(amount)<br />
                            FROM sales<br />
                            WHERE year = 2023
                          </span>
                        </div>
                      </foreignObject>
                      <rect x="550" y="50" width="200" height="80" rx="15" fill="#FFD1A4" />
                      <foreignObject x="560" y="60" width="180" height="60">
                        <div className="text-lg font-semibold text-[#0F172A] p-2 response-text">
                          Total 2023 Sales:<br />
                          $2.4M
                        </div>
                      </foreignObject>
                    </g>
                    <path d="M250 90 Q275 60 300 90" fill="none" stroke="#0F172A" strokeWidth="2" className="animated-path" />
                    <path d="M500 90 Q525 60 550 90" fill="none" stroke="#0F172A" strokeWidth="2" className="animated-path" />
                    <rect x="580" y="150" width="40" height="0" fill="#A855F7" className="chart-animation">
                      <animate attributeName="height" from="0" to="120" dur="1s" begin="2s" fill="freeze" />
                    </rect>
                    <text x="600" y="280" textAnchor="middle" fill="#0F172A">$2.4M</text>
                  </svg>
                )
              },
              {
                title: "Role-Based Security",
                description: "Granular permissions with dynamic data masking. Ensure compliance while maintaining full audit trails.",
                visualization: (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" fill="#FFD1A4" opacity="0.2" />
                    <path d="M100 100 L100 20 L180 100 Z" fill="#A855F7" opacity="0.8" />
                    <circle cx="100" cy="100" r="40" fill="#0F172A" />
                  </svg>
                )
              },
              {
                title: "Smart Dashboards",
                description: "Real-time visualizations tailored to your data patterns. Customizable widgets with automatic insight generation.",
                visualization: (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <rect x="30" y="80" width="40" height="100" fill="#A855F7" />
                    <rect x="80" y="50" width="40" height="130" fill="#FFD1A4" />
                    <rect x="130" y="30" width="40" height="150" fill="#0F172A" />
                  </svg>
                )
              },
              {
                title: "Insights & Reporting",
                description: "Get meaningful data driven insights. Generate and download detailed reports.",
                visualization: (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path d="M20 100 Q100 180 180 100" fill="none" stroke="#0F172A" strokeWidth="8" className="animated-path" />
                    <g transform="translate(140 30)">
                      <rect x="0" y="0" width="40" height="50" rx="4" fill="#FFD1A4" />
                      <path d="M10 12 L30 12 M10 20 L30 20 M10 28 L25 28" stroke="#0F172A" strokeWidth="2" />
                    </g>
                    <circle cx="20" cy="100" r="10" fill="#A855F7" className="animate-pulse" />
                    <circle cx="100" cy="180" r="10" fill="#A855F7" className="animate-pulse-delayed" />
                    <circle cx="180" cy="100" r="10" fill="#A855F7" className="animate-pulse" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover-tilt">
                <div className="w-full h-48 mb-4 relative">
                  {feature.visualization}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-5xl mx-auto p-6 my-16">
        <div className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">70%</p>
              <p className="mt-2">Reduction in IT dependency</p>
            </div>
            <div>
              <p className="text-4xl font-bold">5x</p>
              <p className="mt-2">Faster decision making</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1000+</p>
              <p className="mt-2">Daily insights generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 max-w-7xl mx-auto p-6 my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-text text-transparent">
              The Minds Behind Agaahi
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A passionate team of innovators bridging AI and human-centric design</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team members */}
          {[
            {
              name: "Khushbakht Khan",
              role: "Automation Engineer",
              description: "Implementing RBAC-powered workflows and NLP-driven automation.",
              img: Khushbkaht
            },
            {
              name: "Sarah Sami",
              role: "LLM Engineer",
              description: "Developing advanced LLM solutions through LangChain architecture",
              img: Sarah
            },
            {
              name: "Syed Aun Muhammad",
              role: "Full Stack Engineer",
              description: "Developing end-to-end solutions with focus on responsive UI and API integrations",
              img: Aun
            },
            {
              name: "Moiz Naveed",
              role: "Full Stack Engineer",
              description: "Building scalable full-stack systems with focus on backend systems for enterprise needs",
              img: Moiz
            }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:transform hover:scale-105 transition-all">
              <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">{member.name}</h3>
              <p className="text-[#A855F7] text-sm mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.description}</p>
              <div className="flex justify-center space-x-3">
                {['instagram', 'facebook', 'linkedin'].map((social, i) => (
                  <a key={i} href="#" className="text-[#A855F7] hover:text-[#FFD1A4] transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'instagram' && (
                        <path d="M12 2c2.8 0 3.2 0 4.3.1 2.5.1 4.1 1.7 4.2 4.2.1 1.1.1 1.5.1 4.3s0 3.2-.1 4.3c-.1 2.5-1.7 4.1-4.2 4.2-1.1.1-1.5.1-4.3.1s-3.2 0-4.3-.1c-2.5-.1-4.1-1.7-4.2-4.2-.1-1.1-.1-1.5-.1-4.3s0-3.2.1-4.3c.1-2.5 1.7-4.1 4.2-4.2 1.1-.1 1.5-.1 4.3-.1zm0 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4.5-6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      )}
                      {social === 'facebook' && (
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      )}
                      {social === 'linkedin' && (
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-8 11v5h-2v-5h2zm-1-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 4v3h-2v-3a2 2 0 0 0-2-2 1 1 0 0 0-1 1v2h-2v-3c0-1 1-2 2-2 1.5 0 3 1 3 3z" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Data Strategy?</h2>
          <div className="flex justify-center gap-4">
            <a href="/contact.html" className="px-8 py-4 rounded-full text-white bg-[#0F172A]  border-2 border-[#6C63FF] shadow-[0_0_10px_2px_rgba(108,99,255,0.8)] hover:shadow-[0_0_15px_4px_rgba(108,99,255,1)] transition-all duration-300">
              Start Free Trial
            </a>
            <a href="/demo.html" className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Watch Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;