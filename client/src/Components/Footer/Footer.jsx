import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#eff4f8] text-gray-800 font-sans pt-16 pb-10 px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 1. BRANDING ROW */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <Link to="/" className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group">
            <div className="shrink-0">
              <img 
                src="LOGO1.png" 
                alt="Logo" 
                className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center border-l-0 md:border-l md:border-gray-300 md:pl-8 py-1">
              <span className="text-[16px] md:text-[18px] font-black tracking-tighter text-gray-900 uppercase leading-tight">
                United Kingdom online E-Visa 
                <span className="block md:inline md:ml-2 text-gray-500 font-bold opacity-90">
                  ( Electronic Travel Authorisation ETA )
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* 2. CONTACT & INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* CONTACT CARDS */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-white hover:border-blue-200 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <FaPhone className="text-white text-xs" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Call Us</p>
                <p className="text-sm font-bold truncate">+966 554026599</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-white hover:border-blue-200 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-white text-xs" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Email Us</p>
                <a href="mailto:info@eeta.uk" className="text-sm font-bold hover:text-blue-700 transition-colors truncate block">info@eeta.uk</a>
              </div>
            </div>
          </div>

          {/* ADDRESS & DIGITAL */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">Location</h4>
              <div className="flex gap-3">
                <FaLocationDot className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm font-bold text-gray-700 leading-snug uppercase tracking-tight">
                  Kingdom of Saudi Arabia
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">Digital Presence</h4>
              <div className="flex gap-3">
                <FaGlobe className="text-gray-400 mt-0.5 shrink-0" />
                <a href="https://eeta.uk/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-tight break-all">
                  www.eeta.uk
                </a>
              </div>
            </div>

            {/* QUICK LINKS PILLS */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">Quick Links</h4>
              <div className="flex flex-wrap gap-2">
                {['Terms', 'Refunds', 'Cookies', 'Privacy', 'Disclaimer'].map((name) => (
                  <Link 
                    key={name}
                    to={`/${name.toLowerCase()}`} 
                    className="px-3 py-1.5 bg-white/40 hover:bg-black hover:text-white border border-gray-200 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. LEGAL BLOCK */}
        <div className="border-y border-gray-200 py-10 mb-10">
          <div className="relative p-6 md:p-8 rounded-2xl bg-white/40 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700" />
            <p className="text-[13px] leading-relaxed text-gray-600 max-w-6xl">
              This website is operated by <span className="font-extrabold text-black uppercase tracking-tighter">World Services Bureau ( WSB )</span>, 
              an independent travel support company based in <span className="font-bold text-black uppercase tracking-tighter">Saudi Arabia</span> 
              <span className="inline-block mx-2 font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">CR: 2053122409</span>. 
            </p>
          </div>
        </div>

        {/* 4. COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-black text-gray-400 uppercase text-center md:text-left">
            © {new Date().getFullYear()} EETA UK. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:block h-px w-12 bg-gray-300" />
             {/* <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Official Support Channel</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;