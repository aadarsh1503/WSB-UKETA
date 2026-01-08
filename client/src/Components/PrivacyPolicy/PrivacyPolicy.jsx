import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Who We Are",
      content: (
        <>
          <p className="mb-2">EETA UK is a Canadian company based at 51 Lorridge St, Richmond Hill, ON, L4E 3W5 (OCN: 2396200).</p>
          <p>We provide optional, third-party assistance for UK EETA applications. We are not affiliated with the UK government.</p>
        </>
      )
    },
    {
      title: "Data Collection",
      content: (
        <>
          <p className="mb-3">We collect information necessary to provide services, including:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-wide text-gray-500">
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Identity (Name, Passport)</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Contact (Email, Phone)</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Travel Data (Dates, Purpose)</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Tech Data (IP, Device)</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400">We do not knowingly collect data from individuals under 16.</p>
        </>
      )
    },
    {
      title: "How We Use It",
      content: "We use data to process your UK EETA application, communicate status, provide support, and meet legal requirements. Processing is based on legitimate interest, contractual necessity, or consent."
    },
    {
      title: "Data Sharing",
      content: (
        <>
          <p className="mb-2">We share data only with trusted parties: UK government platforms (for submission), payment processors, and service providers.</p>
          <p>International transfers are protected by legal safeguards (Standard Contractual Clauses). We do not sell or rent personal data.</p>
        </>
      )
    },
    {
      title: "Security Measures",
      content: (
        <>
          <p className="mb-2">We use HTTPS encryption, secure storage, access controls, and audits to protect data.</p>
          <p className="text-xs text-gray-500">Note: No online platform can be 100% secure, but we take reasonable steps to reduce risk.</p>
        </>
      )
    },
    {
      title: "Retention",
      content: "We retain personal information only as long as needed to fulfill its purpose or meet legal obligations. Afterward, it is securely deleted or anonymized."
    },
    {
      title: "Your Rights",
      content: (
        <>
          <p className="mb-2">You have the right to access, correct, delete, or restrict your data. To exercise these rights, contact us.</p>
          <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 hover:border-black transition-colors">
            File a complaint with ICO (UK) ↗
          </a>
        </>
      )
    },
    {
      title: "Cookies & Tracking",
      content: (
        <>
          <p className="mb-2">We use cookies to improve functionality. Non-essential cookies require consent. We may use Google Analytics for anonymized usage patterns.</p>
          <p className="text-xs text-gray-500">See our <span className="text-black font-medium underline">Cookie Policy</span> for details.</p>
        </>
      )
    },
    {
      title: "Policy Updates",
      content: "We may update this policy to reflect legal or technical changes. Revisions will be posted here. Continued use implies acceptance."
    }
  ];

  return (
    <div className="w-full bg-white mt-20 text-gray-900 font-sans py-20 px-6 lg:px-12 selection:bg-black selection:text-white">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER - COMPACT & FUTURISTIC */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2 leading-none">
              Privacy <br/> Policy
            </h1>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4">
              Effective Date: February 19th, 2025
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-sm font-bold">EETA UK</p>
             <p className="text-xs text-gray-500">OCN: 2396200</p>
          </div>
        </div>

        {/* INTRO TEXT */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            This policy explains how <span className="text-black font-semibold">eeta.uk</span> collects, uses, and protects your personal information. By using our services, you agree to these practices.
          </p>
        </div>

        {/* POLICY GRID - SEXY & COMPACT */}
        <div className="border-t border-gray-200">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-gray-200 hover:border-black transition-colors duration-300 items-start"
            >
              {/* Numbering */}
              <div className="md:col-span-1 text-xs font-mono font-bold text-gray-400 group-hover:text-black transition-colors pt-1">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold tracking-tight uppercase group-hover:translate-x-1 transition-transform duration-300">
                  {section.title}
                </h3>
              </div>

              {/* Content */}
              <div className="md:col-span-7 text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                {section.content}
              </div>

              {/* Hover Icon */}
              <div className="md:col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* COMPACT FOOTER */}
        <div className="mt-16 pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="font-bold text-lg">Privacy Concerns?</h4>
            <p className="text-sm text-gray-500">51 Lorridge St, Richmond Hill, ON</p>
          </div>
          <div className="flex flex-col md:items-end">
            <a href="mailto:info@eeta.uk" className="font-mono text-sm hover:bg-black hover:text-white px-2 py-1 transition-colors -mr-2">
              info@eeta.uk
            </a>
            <span className="font-mono text-sm px-2">613-454-5636</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;