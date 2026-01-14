import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const TermsOfService = () => {
  const sections = [
    {
      title: "Role & Scope",
      content: (
        <>
          <p className="mb-2">EETA UK provides optional, fee-based support for travelers applying for the UK EETA. We assist with review, guidance, and processing.</p>
          {/* <p>We are a third-party provider, not affiliated with the UK government. You may apply directly at <a href="https://www.gov.uk" className="text-blue-700 hover:underline font-bold">gov.uk</a> without our fees.</p> */}
        </>
      )
    },
    {
      title: "Eligibility",
      content: (
        <ul className="list-disc pl-4 space-y-1 marker:text-black">
          <li>Must be 18+ or have guardian consent.</li>
          <li>Must be legally entitled to submit documentation.</li>
          <li>Must provide truthful, accurate information.</li>
          <li>We reserve the right to refuse service for fraud or misuse.</li>
        </ul>
      )
    },
    {
      title: "Authorization",
      content: "By using our platform, you authorize EETA UK to act on your behalf to prepare and submit your ETA application to UK authorities and communicate with third parties for this purpose."
    },
    {
      title: "Turnaround",
      content: "We aim to process applications within 1-3 business days. We do not control UK Home Office decisions or processing speeds. Final approval lies solely with the UK government."
    },
    {
      title: "Fees & Refunds",
      content: (
        <>
          <p className="mb-2">Service fees are disclosed prior to payment. The government fee is included in the total. We accept major cards and digital wallets.</p>
          <p className="font-medium text-black">Refund Policy: Full refund available if cancelled before submission. Once submitted, all charges are final.</p>
        </>
      )
    },
    {
      title: "Content Ownership",
      content: "All content, code, and design on eeta.uk is owned by EETA UK Unauthorized reproduction or distribution is prohibited. Third-party trademarks belong to their respective owners."
    },
    {
      title: "Prohibited Actions",
      content: "You may not submit false info, use bots/scrapers, disrupt our systems, or harvest user data. Violations result in immediate termination."
    },
    {
      title: "Disclaimers",
      content: "We do not guarantee approval. Services are provided 'as is'. EETA UK disclaims liability for indirect or consequential damages to the extent permitted by law."
    },
    {
      title: "Termination",
      content: "We reserve the right to terminate access for violations of these Terms. You may stop using the service at any time."
    },
    {
      title: "Governing Law",
      content: "Governed by the laws of Saudi Arabia . Disputes are subject to the exclusive jurisdiction of the courts of Toronto, Ontario."
    },
    {
      title: "Updates",
      content: "Terms may be updated at any time. Continued use after changes constitutes acceptance."
    }
  ];

  return (
    <div className="w-full mt-20 bg-white text-gray-900 font-sans py-20 px-6 lg:px-12 selection:bg-black selection:text-white">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER - COMPACT & FUTURISTIC */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2">
              Terms of Service
            </h1>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Last Updated: February 19th, 2025
            </p>
          </div>
          <div className="text-right mt-4 md:mt-0">
             <p className="text-sm font-bold">EETA UK</p>
             <p className="text-xs text-gray-500">CR NO: 2053122409</p>
          </div>
        </div>

        {/* INTRO TEXT */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to <span className="text-black font-semibold">eeta.uk</span>. By accessing our platform, you accept these terms. We provide optional assistance for UK EETA applications.
          </p>
        </div>

        {/* TERMS GRID - SEXY & COMPACT */}
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
            <h4 className="font-bold text-lg">Contact Support</h4>
            <p className="text-sm text-gray-500">Kingdom of Saudi Arabia</p>
          </div>
          <div className="flex flex-col md:items-end">
            <a href="mailto:info@eeta.uk" className="font-mono text-sm hover:bg-black hover:text-white px-2 py-1 transition-colors -mr-2">
              info@eeta.uk
            </a>
            <span className="font-mono text-sm px-2">+966554026599</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;