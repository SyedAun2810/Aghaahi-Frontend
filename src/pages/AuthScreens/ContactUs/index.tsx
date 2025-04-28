import React from 'react';
import robot_contact_us from '@Assets/images/robot_contact_us.jpg'; // Adjust the path as necessary 

const ContactUsPage = () => {
  return (
    <div className="relative text-gray-800">
      {/* Background Shapes */}
      <div
        className="shape-circle"
        style={{
          background: 'linear-gradient(to top right, #A855F7, #FFD1A4)',
          width: '18rem',
          height: '23rem',
          position: 'absolute',
          top: 0,
          left: '25%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      ></div>
      <div
        className="shape-circle"
        style={{
          background: 'linear-gradient(to bottom right, #A855F7, #FFD1A4)',
          width: '14rem',
          height: '14rem',
          position: 'absolute',
          bottom: 0,
          right: '33%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      ></div>

      {/* Banner Section */}
      <section
        className="text-white py-16 px-4 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0F172A' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span
            style={{
              background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            className='text-[48px] font-bold mb-4'
          >
            Get in touch
          </span>
        </h1>
        <p className="text-white-400 text-center max-w-xl">
          Reach out, and let's create a universe of possibilities together!
        </p>
      </section>

      {/* Contact Form Section */}
      <div
        className="max-w-6xl mx-auto mt-12 mb-20 p-1 rounded-lg relative"
        style={{
          background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
        }}
      >
        <section className="bg-white p-6 grid md:grid-cols-2 gap-8 items-center rounded-lg relative">
          {/* Left Side Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Let's connect constellations</h2>
            <p className="text-gray-600">
              Let's create a constellation of innovation. Fill out the form and let's light up the sky together.
            </p>

            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#A855F7' }}
                />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#A855F7' }}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ focusRingColor: '#A855F7' }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ focusRingColor: '#A855F7' }}
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ focusRingColor: '#A855F7' }}
              ></textarea>
              <button
                type="submit"
                className="w-full text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
                style={{
                  background: 'linear-gradient(to right, #A855F7, #FFD1A4)',
                }}
              >
                Send to the moon 🚀
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

      {/* Map Section */}
      <section className="px-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7235.970366857713!2d67.10825628788486!3d24.93257466152853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338bf22becb0f%3A0xd5e50842c5c4867b!2sNED%20University%20Of%20Engineering%20%26%20Technology%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1745823092502!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
          title="NED University Map"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactUsPage;
