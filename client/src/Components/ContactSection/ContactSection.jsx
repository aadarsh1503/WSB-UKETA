import React from 'react';
import ReadyToApply from '../ReadyToApply/ReadyToApply';

// Custom Half-Moon Icon Component
const HalfMoonIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:rotate-180 transition-transform duration-500 ease-in-out"
  >
    <path 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V22Z" 
      fill="black" 
      transform="rotate(180 12 12)" 
    />
  </svg>
);

const ContactSection = () => {
  return (
    <>
    <div className="w-full mt-24 font-sans text-gray-900">
      
      {/* SECTION 1: HEADER (Exact match to Screenshot 1) */}
      <section className="w-full bg-[#f4f7fa] py-24 px-6 flex flex-col items-center text-center">
        
        <h1 className="text-6xl md:text-7xl font-medium tracking-tight mb-12 text-black">
          Contact us
        </h1>

        <div className="max-w-3xl space-y-8">
          <p className="text-lg text-gray-800 leading-relaxed">
            If you have questions about your application or need further assistance, our support team is here to help.
          </p>
          
          <p className="text-lg text-gray-800 leading-relaxed">
            You can contact us by email, through our contact form, or by leaving a message.
          </p>

          <div className="pt-6 space-y-6">
            <div>
              <h3 className="font-bold text-black mb-1">Support Availability</h3>
              <p className="text-gray-700">24/7, including weekends and holidays</p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-1">Response Time</h3>
              <p className="text-gray-700">We typically respond within 8 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WE'RE HERE TO HELP (Futuristic & Sexy Version) */}
      <section className="w-full bg-white py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Area */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-8">
              We’re Here to Help
            </h2>
            
            <p className="max-w-4xl text-sm md:text-base text-gray-600 leading-relaxed mb-16">
              Please note application submissions may take up to 3 business day to be processed. Factors extending processing times include: Additional Security Checks, High Volume of Applications, or Incomplete Documentation.
            </p>

            {/* The Warning Message - Styled as a High-Tech Notification */}
            <div className="relative group overflow-hidden bg-gray-50 border-l-4 border-black p-8 transition-all duration-300 hover:bg-gray-100">
              <h3 className="text-2xl md:text-3xl leading-tight font-medium text-black relative z-10">
                If you have already submitted an application please ensure the email and spelling of your name is included in your email to us.
              </h3>
            </div>
          </div>

          {/* The Info Grid - Architectural & Sexy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Column 1: COMPANY */}
            <div className="group relative pt-8 border-t-2 border-gray-200 hover:border-black transition-colors duration-500">
              <div className="mb-6">
                <HalfMoonIcon />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400 group-hover:text-black transition-colors">
                Company
              </h4>
              <p className="text-xl md:text-2xl font-medium text-black">
                WSB World
              </p>
            </div>

            {/* Column 2: ADDRESS */}
            <div className="group relative pt-8 border-t-2 border-gray-200 hover:border-black transition-colors duration-500 delay-75">
              <div className="mb-6">
                <HalfMoonIcon />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400 group-hover:text-black transition-colors">
                Address
              </h4>
              <p className="text-xl md:text-2xl font-medium text-black leading-snug max-w-xs">
                King Khalid Str., Dammam, Kingdom of Saudi Arabia
              </p>
            </div>

            {/* Column 3: CONTACT */}
            <div className="group relative pt-8 border-t-2 border-gray-200 hover:border-black transition-colors duration-500 delay-150">
              <div className="mb-6">
                <HalfMoonIcon />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400 group-hover:text-black transition-colors">
                Contact
              </h4>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-medium text-black">
                  <span className="font-bold text-sm uppercase tracking-wider text-gray-500 block mb-1">Email</span>
                  info@eeta.uk
                </p>
                <p className="text-xl md:text-2xl font-medium text-black pt-4">
                  <span className="font-bold text-sm uppercase tracking-wider text-gray-500 block mb-1">Phone</span>
                  +966 554026599
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
    <ReadyToApply />
    </>
  );
};

export default ContactSection;