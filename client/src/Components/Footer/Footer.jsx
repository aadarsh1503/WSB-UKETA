import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#eff4f8] text-gray-800 font-sans pt-12 pb-8 px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP ROW - LINKS */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-[10px] sm:text-xs uppercase tracking-widest font-medium text-gray-600 mb-6 text-center">
          <Link to="/terms-of-Service" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
          <span>|</span>
          <Link to="/purchase-Refund" className="hover:text-black transition-colors">
            Purchase and Refund Policy
          </Link>
          <span>|</span>
          <Link to="/cookies" className="hover:text-black transition-colors">
            Cookie Policy
          </Link>
          <span>|</span>
          <Link to="/privacy-policy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/disclaimer" className="hover:text-black transition-colors">
            Disclaimer
          </Link>
          <span>|</span>
          <Link to="/about" className="hover:text-black transition-colors">
            About Us
          </Link>
          <span>|</span>
          <Link to="/contact-us" className="hover:text-black transition-colors">
            Contact
          </Link>
        </div>

        {/* DISCLAIMER TEXT */}
        <div className="text-[11px] leading-relaxed text-center text-gray-700 max-w-7xl mx-auto mb-6">
          <p>
            This website is operated by <span className="font-bold text-black">EETA UK</span>, an independent travel support company based in Toronto, Canada (OCN Registration Number: <span className="text-blue-700 font-medium">2396200</span>). We are not affiliated with the UK government or any official authority. Our service offers optional, fee-based assistance for travelers applying for the United Kingdom’s Electronic Travel Authorization (ETA). This includes application guidance, document validation, and customer support. You are not required to use our service—travelers may apply directly through the official UK government website at <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">www.gov.uk</a> without incurring additional service fees.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs font-medium text-black mb-12">
  © {new Date().getFullYear()} All Rights Reserved.
</div>


        {/* BOTTOM ROW - INFO & LOGO */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 text-xs lg:text-sm text-gray-700">
          
          {/* Logo Construction */}
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="LOGO1.png" 
                alt="Logo" 
                className="h-20 w-32 object-contain"
              />
            </Link>
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
  <a
    href="https://eeta.uk/"
    className="flex items-center gap-2"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGlobe className="text-black" />
    <span>eeta.uk</span>
  </a>
</div>


            <div className="flex items-center gap-2">
              <FaLocationDot className="text-black" />
              <span className="text-right sm:text-left">King Khalid Str., Dammam,<br className="sm:hidden"/> Kingdom of Saudi Arabia</span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;