import React from 'react';
import { FaCheck, FaFlag } from 'react-icons/fa6';

const EtaDecision = () => {
  return (
    <section className="w-full bg-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <h2 className="text-center text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight mb-20">
          United Kingdom ETA Decision
        </h2>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Column 1: Processing Time */}
          <div className="flex flex-col items-start">
            <h3 className="text-4xl font-medium text-gray-900 mb-6 tracking-tight">
              Processing Time
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed mb-8">
              Most applicants receive a decision notification within <span className="font-bold">3 days</span> of submitting their UK ETA application.
            </p>
            <a href='/apply'>
            <button className="bg-gray-950 cursor-pointer text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200">
              APPLY NOW
            </button>
            </a>
          </div>

          {/* Column 2: Approval */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <h3 className="text-2xl font-bold text-gray-900 uppercase mb-4 tracking-wide">
              APPROVAL
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-10">
              If approved, you'll receive a confirmation by email. Your ETA will be digitally linked to your passport—no need to print anything.
            </p>
            {/* Custom Blue Check Icon Box */}
            <div className="w-16 h-16 bg-[#95b0f8] rounded-md flex items-center justify-center text-white text-3xl shadow-sm">
              <FaCheck />
            </div>
          </div>

          {/* Column 3: Rejection */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <h3 className="text-2xl font-bold text-gray-900 uppercase mb-4 tracking-wide">
              REJECTION
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-10">
              If your application is declined, you'll be notified of the reason. In some cases, you may be eligible to reapply or explore other visa options.
            </p>
            {/* Red Flag Icon */}
            <div className="text-[#ce0e2d] text-6xl drop-shadow-sm">
              <FaFlag />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EtaDecision;