import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const CookiePolicy = () => {
  const sections = [
    {
      title: "Who We Are",
      content: (
        <>
          <p className="mb-2">This website is owned by <span className="font-bold text-black">Sebe Inc.</span>, a Canadian company based at 51 Lorridge St, Richmond Hill, ON, L4E 3W5 (OCN: 2396200).</p>
          <p>We determine the purpose and scope of how cookies are used on this site.</p>
        </>
      )
    },
    {
      title: "What Are Cookies?",
      content: "Cookies are small files placed on your device to store preferences, session data, or login status. They can be first-party (set by us) or third-party (analytics/ads). Some are temporary (session), others remain longer (persistent)."
    },
    {
      title: "Types We Use",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-bold text-black block text-xs uppercase tracking-wider mb-1">Essential</span>
            <p className="text-xs">Required for core functionality like forms and navigation. Cannot be disabled.</p>
          </div>
          <div>
            <span className="font-bold text-black block text-xs uppercase tracking-wider mb-1">Preference</span>
            <p className="text-xs">Stores settings like language to tailor your experience.</p>
          </div>
          <div>
            <span className="font-bold text-black block text-xs uppercase tracking-wider mb-1">Analytics</span>
            <p className="text-xs">Collects anonymized data to help us improve functionality.</p>
          </div>
          <div>
            <span className="font-bold text-black block text-xs uppercase tracking-wider mb-1">Marketing</span>
            <p className="text-xs">Tracks behavior to serve relevant ads and measure effectiveness.</p>
          </div>
        </div>
      )
    },
    {
      title: "Managing Consent",
      content: "Upon your first visit, a banner asks for permission to use non-essential cookies. You can accept all, reject all, or customize. You can revisit our site settings to change preferences at any time."
    },
    {
      title: "Disabling Cookies",
      content: (
        <>
          <p className="mb-2">You can adjust settings via your browser. Common guides:</p>
          <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wide">
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Chrome</a>
            <span className="text-gray-300">/</span>
            <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Firefox</a>
            <span className="text-gray-300">/</span>
            <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Safari</a>
            <span className="text-gray-300">/</span>
            <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Edge</a>
            <span className="text-gray-300">/</span>
            <a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Opera</a>
          </div>
        </>
      )
    },
    {
      title: "Ad Tracking",
      content: (
        <>
          <p className="mb-2">Ads may be based on your browsing behavior. Manage preferences via:</p>
          <div className="flex flex-col space-y-1">
            <a href="https://youradchoices.com" target="_blank" rel="noreferrer" className="font-mono text-xs hover:text-black hover:bg-gray-100 w-fit px-1 transition-colors">youradchoices.com ↗</a>
            <a href="https://www.networkadvertising.org" target="_blank" rel="noreferrer" className="font-mono text-xs hover:text-black hover:bg-gray-100 w-fit px-1 transition-colors">networkadvertising.org ↗</a>
          </div>
        </>
      )
    },
    {
      title: "Google Analytics",
      content: (
        <>
          <p className="mb-2">Used to understand visitor behavior (device, location, activity). We enable IP anonymization where possible.</p>
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="font-bold text-black hover:underline text-xs uppercase">Google Opt-Out Tool ↗</a>
        </>
      )
    },
    {
      title: "Security (reCAPTCHA)",
      content: (
        <>
          <p className="mb-2">We use Google reCAPTCHA to protect forms from bots. It analyzes hardware and software info.</p>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="font-bold text-black hover:underline text-xs uppercase">Google Privacy Policy ↗</a>
        </>
      )
    },
    {
      title: "Social Ads",
      content: "We may use Meta (Facebook) Custom Audiences for remarketing. This links on-site behavior to ads. We only activate this with your consent."
    }
  ];

  return (
    <div className="w-full mt-20 bg-white text-gray-900 font-sans py-20 px-6 lg:px-12 selection:bg-black selection:text-white">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER - COMPACT & FUTURISTIC */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2 leading-none">
              Cookie <br/> Policy
            </h1>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4">
              Effective Date: February 19th, 2025
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-sm font-bold">Sebe Inc.</p>
             <p className="text-xs text-gray-500">OCN: 2396200</p>
          </div>
        </div>

        {/* INTRO TEXT */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            This policy explains how <span className="text-black font-semibold">visauketa.com</span> uses cookies and tracking technologies, and outlines your rights to control them.
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
            <h4 className="font-bold text-lg">Data Privacy Concerns?</h4>
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

export default CookiePolicy;