import React from 'react';
import hero from "./hero.webp"
const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full mt-32 font-sans relative">
      
      
      <div className="w-full lg:w-1/2 flex flex-col">
        
        {/* Top Section */}
        <div className="bg-white px-8 py-12 lg:px-20 lg:pt-24 lg:pb-16 flex flex-col justify-center">
          <h1 className="text-5xl lg:text-[71px] font-bold text-gray-900 tracking-tight mb-4">
            Apply for a UK ETA
          </h1>
          <h2 className="text-4xl lg:text-[55px] text-gray-900 tracking-tight leading-none mb-8">
            <span className="block">United Kingdom</span>
            <span className="block">Electronic Travel</span>
            <span className="block">Authorization</span>
          </h2>
          
          <p className="text-gray-700 text-lg max-w-md mb-10 leading-relaxed">
            Your guide to understanding the Bahrain Electronic Travel Authorization (ETA) requirements and completing your application accurately and efficiently.
          </p>

          <div>
            <a href='/apply'>
            <button className="bg-gray-950 cursor-pointer text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200">
              APPLY NOW
            </button>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-slate-50 px-8 py-12 lg:px-20 lg:py-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            What is a UK ETA and How We Can Help
          </h3>
          
          <div className="space-y-6 text-gray-700 leading-relaxed max-w-xl">
            <p>
              The UK Electronic Travel Authorization (ETA) is a digital travel clearance required for visitors from eligible visa-exempt countries entering the United Kingdom for tourism, business, transit, or short-term study.
            </p>
            <p>
              We are an independent travel assistance provider. Our role is to offer optional support and guidance with the ETA application process, helping travelers complete and submit their applications accurately and confidently.
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN (Image) */}
    
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0">
        
       
        <div className="w-full h-full lg:absolute lg:inset-0 overflow-hidden lg:rounded-tl-[100px]">
          <img 
            src={hero}
            alt="London Red Bus and Big Ben" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;