import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaLocationDot, FaCrown } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full bg-[#eff4f8] text-gray-800 font-sans pt-12 pb-8 px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP ROW - LINKS */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-[10px] sm:text-xs uppercase tracking-widest font-medium text-gray-600 mb-6 text-center">
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">Purchase and Refund Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">Cookie Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">Disclaimer</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">About Us</a>
          <span>|</span>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
        </div>

        {/* DISCLAIMER TEXT */}
        <div className="text-[11px] leading-relaxed text-center text-gray-700 max-w-7xl mx-auto mb-6">
          <p>
            This website is operated by <span className="font-bold text-black">Sebe Inc.</span>, an independent travel support company based in Toronto, Canada (OCN Registration Number: <span className="text-blue-700 font-medium">2396200</span>). We are not affiliated with the UK government or any official authority. Our service offers optional, fee-based assistance for travelers applying for the United Kingdom’s Electronic Travel Authorization (ETA). This includes application guidance, document validation, and customer support. You are not required to use our service—travelers may apply directly through the official UK government website at <a href="https://www.gov.uk" className="text-blue-700 font-bold hover:underline">www.gov.uk</a> without incurring additional service fees.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs font-medium text-black mb-12">
          © 2025 All Rights Reserved.
        </div>

        {/* BOTTOM ROW - INFO & LOGO */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 text-xs lg:text-sm text-gray-700">
          
          {/* Logo Construction */}
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
          <div className="flex items-center">
    <img 
      src="LOGO.png" 
      alt="Logo" 
      className="h-20 w-32"   // 👈 size control
    />
  </div>
          </div>

          {/* Contact Details Grid */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-end gap-6 lg:gap-12 w-full lg:w-auto">
            
            <div className="flex items-center gap-2">
              <FaPhone className="text-black" />
              <span>+966 554026599</span>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope className="text-black" />
              <a href="mailto:info@eeta.uk" className="hover:text-black">info@eeta.uk</a>
            </div>

            <div className="flex items-center gap-2">
              <FaGlobe className="text-black" />
              <span>Sebe Inc</span>
            </div>

            <div className="flex items-center gap-2">
              <FaLocationDot className="text-black" />
              <span>King Khalid Str., Dammam,
              Kingdom of Saudi Arabia</span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;