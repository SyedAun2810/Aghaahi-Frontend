import React, { useState, useRef } from 'react';
import robot_contact_us from '@Assets/images/robot_contact_us.jpg'; // Adjust the path as necessary 
import { useMutation } from '@tanstack/react-query';
import NotificationService from '@Services/NotificationService';
import ApiService from '@Services/ApiService';
import { API_CONFIG_URLS } from '@Constants/config';
import Header from '../Header'; // Import the Header component

const ContactUsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submitContactForm = useSubmitContactForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      first_name: formData.get('firstName'),
      last_name: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phoneNumber'),
      message: formData.get('message'),
    };

    setIsLoading(true);
    try {
      await submitContactForm.mutateAsync(payload);
      //console.log('Form submitted successfully:', payload);
      formRef.current?.reset(); // Reset the form
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="relative bg-[#0B0D18] text-gray-800 font-sans">
        {/* Background Shapes */}
        <div
          className="shape-circle"
        ></div>
        <div
          className="shape-circle"
          // style={{
          //   background: 'linear-gradient(to bottom right, #A855F7, #FFD1A4)',
          //   width: '14rem',
          //   height: '14rem',
          //   position: 'absolute',
          //   bottom: 0,
          //   right: '33%',
          //   filter: 'blur(100px)',
          //   opacity: 0.6,
          // }}
        ></div>

        {/* Banner Section */}
        <section
          className="py-20 px-4 flex flex-col items-center justify-center relative z-10 text-white bg-[#0B0D18]"
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-center"
            style={{
              background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Get in Touch
          </h1>
          <p className="text-center mt-4">Reach out, and let's create a universe of possibilities together!</p>
        </section>

        {/* Contact Form Section */}
        <div className="bg-[#0B0D18] py-4">
          <div
            className="max-w-6xl mx-auto  mb-20 p-1 rounded-lg relative"
            style={{
              background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
            }}
          >
            <section className=" p-6 grid md:grid-cols-2 gap-8 items-center rounded-lg relative bg-[#0B0D18]">
              {/* Left Side Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Let's connect constellations</h2>
                <p className="text-white">
                  Let's create a constellation of innovation. Fill out the form and let's light up the sky together.
                </p>

                <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#0B0D18]"
                      style={{ focusRingColor: '#A855F7' }}
                    />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#0B0D18]"
                      style={{ focusRingColor: '#A855F7' }}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#0B0D18]"
                    style={{ focusRingColor: '#A855F7' }}
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#0B0D18]"
                    style={{ focusRingColor: '#A855F7' }}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#0B0D18]"
                    style={{ focusRingColor: '#A855F7' }}
                  ></textarea>
                  <button
                    type="submit"
                    className={`w-full text-white py-3 rounded-md font-semibold hover:opacity-90 transition ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send to the moon 🚀'}
                  </button>
                </form>
              </div>

              {/* Right Side Image */}
              <div className="flex flex-col items-center">
                <img src={robot_contact_us} alt="Contact Illustration" className="w-80 h-auto mb-6" />
                <p className="text-gray-600 italic text-center max-w-xs">
                  "Ready to harness no-code AI analytics? Reach out and unlock your data’s full potential with Agaahi"
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Map Section */}
        <section className="px-6 bg-[#0B0D18] py-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7235.970366857713!2d67.10825628788486!3d24.93257466152853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338bf22becb0f%3A0xd5e50842c5c4867b!2sNED%20University%20Of%20Engineering%20%26%20Technology%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1745823092502!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{
              border: 0,
              filter: 'invert(90%) hue-rotate(180deg)', // Dark mode styling
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
            title="NED University Map"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default ContactUsPage;


export const useSubmitContactForm = () => {
  return useMutation((payload: any) => submitcontactResponse(payload), {
      onSuccess: ({ ok, response, data }: any, payload: any) => {
          if (ok) {
              NotificationService.success("Your Response has been Recorded.");
              return data;
          }
          //console.log("error", response);
          NotificationService.error(response?.message);
          throw response.message;
      },
      onError: (err: any) => {
          throw err;
      }
  });
};

async function submitcontactResponse(payload: any) {
  const response = await ApiService.post("contact-us", payload);
  return response;
}