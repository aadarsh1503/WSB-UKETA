import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaLocationDot, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#eff4f8] text-gray-800 font-sans pt-20 pb-10 px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative futuristic element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-32 -mt-32 uppercase" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* TOP SECTION: BRANDING & CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* BRANDING - Occupies 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-5 group">
              <div className="relative">
                <img 
                  src="LOGO1.png" 
                  alt="Logo" 
                  className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute -inset-2 border border-blue-200 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col border-l-2 border-gray-900/10 pl-5 py-1">
                <span className="text-[20px] md:text-[24px] font-black tracking-tighter text-gray-900 uppercase italic leading-none">
                  United Kingdom
                </span>
                <span className="text-[12px] font-bold text-blue-700 tracking-[0.25em] uppercase mt-1">
                  Online E-Visa
                </span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest mt-2 uppercase">
                  Electronic Travel Authorisation (ETA)
                </span>
              </div>
            </Link>

            {/* CONTACT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-white hover:border-blue-200 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                  <FaPhone className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Call Us</p>
                  <p className="text-sm font-bold">+966 554026599</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-white hover:border-blue-200 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Us</p>
                  <a href="mailto:info@eeta.uk" className="text-sm font-bold hover:text-blue-700 transition-colors">info@eeta.uk</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - INFO & ADDRESS - Occupies 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Address */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-700">Location</h4>
                <div className="flex gap-4">
                  <FaLocationDot className="text-gray-400 mt-1" />
                  {/* <p className="text-sm font-bold text-gray-700 leading-relaxed uppercase tracking-tight">
                    King Khalid Str., Dammam,<br/> Kingdom of Saudi Arabia
                  </p> */}
                    <p className="text-sm font-bold text-gray-700 leading-relaxed uppercase tracking-tight">
                   Kingdom of Saudi Arabia
                  </p>
                </div>
              </div>
              {/* Website */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-700">Digital Presence</h4>
                <div className="flex gap-4">
                  <FaGlobe className="text-gray-400 mt-1" />
                  <a href="https://eeta.uk/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-tight">
                    www.eeta.uk
                  </a>
                </div>
              </div>
            </div>

            {/* QUICK LINKS - Futuristic Pill Navigation */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Terms', path: '/terms-of-Service' },
                { name: 'Refunds', path: '/purchase-Refund' },
                { name: 'Cookies', path: '/cookies' },
                { name: 'Privacy', path: '/privacy-policy' },
                { name: 'Disclaimer', path: '/disclaimer' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact-us' },
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="px-4 py-2 bg-white/30 hover:bg-black hover:text-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LEGAL DISCLAIMER BLOCK */}
        <div className="border-y border-gray-200 py-10 mb-10">
          <div className="relative p-8 rounded-2xl bg-white/40 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700" />
            <p className="text-[12px] leading-relaxed text-gray-600 max-w-6xl">
              This website is operated by <span className="font-extrabold text-black uppercase tracking-tighter">EETA UK</span>, 
              an independent travel support company based in <span className="font-bold text-black uppercase tracking-tighter">Saudi Arabia</span> 
              <span className="mx-2 font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">CR: 2053122409</span>. 
              We are not affiliated with the UK government or any official authority. Our service offers optional, fee-based assistance for travelers applying for the United Kingdom’s Electronic Travel Authorization (ETA). You may apply directly through the official UK government website at 
              <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline ml-1 inline-flex items-center gap-1">
                www.gov.uk <FaArrowRight className="text-[8px]" />
              </a> without incurring additional service fees.
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] tracking-[0.4em] font-black text-gray-400 uppercase">
            © {new Date().getFullYear()} EETA UK. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
             <div className="h-px w-12 bg-gray-300" />
             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Support Hub</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;