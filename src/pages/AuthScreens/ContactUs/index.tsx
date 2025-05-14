import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import robot_contact_us from '@Assets/images/robot_contact_us.jpg'; 

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT/contact', formData);
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-sans min-h-screen">
        {/* Animated Background Shapes */}
        {/* <div className="absolute rounded-full bg-gradient-to-tr from-purple-500 to-orange-300 w-72 h-92 top-0 left-1/4 filter blur-[100px] opacity-60 animate-pulse"></div>
        <div className="absolute rounded-full bg-gradient-to-br from-purple-500 to-orange-300 w-56 h-56 bottom-0 right-1/3 filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div> */}

        {/* Banner Section */}
        <section className="bg-[#0B0D18] text-white py-16 px-4 flex flex-col items-center justify-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#FFD1A4] bg-clip-text text-transparent">
              Get in touch
            </span>
          </h1>
          <p className="text-gray-300 text-center max-w-xl">
            Reach out, and let's create a universe of possibilities together!
          </p>
        </section>

        {/* Contact Form Section */}
        <div className="max-w-6xl mx-auto mt-12 mb-20 p-1 bg-gradient-to-r from-purple-500 to-orange-300 rounded-lg">
          <section className="bg-white p-6 grid md:grid-cols-2 gap-8 items-center rounded-lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Let's connect constellations</h2>
              <p className="text-gray-600">Let's create a constellation of innovation. Fill out the form and let's light up the sky together.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-orange-300 text-white py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send to the moon 🚀'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-500 text-center mt-2">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center mt-2">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>

            <div className="flex flex-col items-center">
              <img src={robot_contact_us} alt="Contact Illustration" className="w-80 h-auto mb-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300" />
              <p className="text-gray-600 italic text-center max-w-xs">
                "Ready to harness no-code AI analytics? Reach out and unlock your data's full potential with Agaahi"
              </p>
            </div>
          </section>
        </div>

        {/* Map Section */}
        <section className="px-6 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7235.970366857713!2d67.10825628788486!3d24.93257466152853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338bf22becb0f%3A0xd5e50842c5c4867b!2sNED%20University%20Of%20Engineering%20%26%20Technology%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1745823092502!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </section>
      </div>
    </>
  );
};

export default ContactUs;