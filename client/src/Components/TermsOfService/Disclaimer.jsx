import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const Disclaimer = () => {
  const sections = [
    {
      title: "No Govt. Affiliation",
      content: (
        <>
          <p className="mb-2">WSB World is an independent company. We are <span className="font-bold text-black">not affiliated with</span>, endorsed by, or acting on behalf of the UK Home Office or any government body.</p>
          <p className="text-xs text-gray-500">We offer optional support services. You may apply directly at <a href="https://www.gov.uk" className="text-black underline font-bold hover:no-underline">www.gov.uk</a> without our fees.</p>
        </>
      )
    },
    {
      title: "Information Only",
      content: "The content on this website is for general information purposes only. It does not constitute legal advice. For immigration status questions, consult a licensed lawyer."
    },
    {
      title: "Content Accuracy",
      content: "We aim for accuracy, but cannot guarantee that all information is error-free. UK immigration policies and fees may change without notice. We are not responsible for reliance placed on this information."
    },
    {
      title: "Scope of Support",
      content: (
        <>
          <p className="mb-3">Our service is optional. Fees cover the government cost plus our support fee. Services include:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono uppercase tracking-wide text-gray-500">
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Data Review</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Doc Verification</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Submission Handling</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Reprocessing Help</li>
          </ul>
        </>
      )
    },
    {
      title: "Liability Limits",
      content: "To the extent permitted by law, WSB World disclaims all liability for damages (denials, delays, data issues) resulting from the use of this site or our services."
    },
    {
      title: "External Resources",
      content: "We may link to third-party websites for convenience. We do not control or endorse their content, privacy policies, or security."
    },
    {
      title: "User Responsibilities",
      content: (
        <ul className="list-disc pl-4 space-y-1 marker:text-black">
          <li>Ensure accuracy of all submitted info.</li>
          <li>Confirm eligibility before applying.</li>
          <li>Understand that misleading info leads to denial.</li>
        </ul>
      )
    },
    {
      title: "Availability",
      content: "We aim for reliability but cannot guarantee uninterrupted access due to maintenance, technical issues, or provider outages."
    },
    {
      title: "Acceptance",
      content: "By using our website, you agree to this Disclaimer, our Terms of Service, Privacy Policy, Cookie Policy, and Purchase Policy. If you disagree, do not use our services."
    }
  ];

  return (
    <div className="w-full mt-20 bg-white text-gray-900 font-sans py-20 px-6 lg:px-12 selection:bg-black selection:text-white">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER - COMPACT & FUTURISTIC */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2 leading-none">
              Disclaimer
            </h1>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4">
              Effective Date: February 19th, 2025
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-sm font-bold">WSB World</p>
             <p className="text-xs text-gray-500">OCN: 2396200</p>
          </div>
        </div>

        {/* INTRO TEXT */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            This Disclaimer applies to <span className="text-black font-semibold">visauketa.com</span>. Please read carefully before using our services.
          </p>
        </div>

        {/* DISCLAIMER GRID - SEXY & COMPACT */}
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
            <h4 className="font-bold text-lg">Legal Inquiries?</h4>
            <p className="text-sm text-gray-500">51 Lorridge St, Richmond Hill, ON</p>
          </div>
          <div className="flex flex-col md:items-end">
            <a href="mailto:support@visauketa.com" className="font-mono text-sm hover:bg-black hover:text-white px-2 py-1 transition-colors -mr-2">
              support@visauketa.com
            </a>
            <span className="font-mono text-sm px-2">613-454-5636</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Disclaimer;