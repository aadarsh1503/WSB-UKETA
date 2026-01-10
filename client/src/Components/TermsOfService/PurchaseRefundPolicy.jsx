import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const PurchaseRefundPolicy = () => {
  const sections = [
    {
      title: "Service Overview",
      content: (
        <>
          <p className="mb-2">EETA UK provides optional, paid support for UK EETA applications. Our service includes human-reviewed document checks, submission support, and guidance.</p>
          <p>We are not affiliated with the UK government. You may apply independently at <a href="https://www.gov.uk" className="text-blue-700 hover:underline font-bold">gov.uk</a>. This is a personalized digital support service.</p>
        </>
      )
    },
    {
      title: "Fee Breakdown",
      content: (
        <>
          <p className="mb-3">The total cost includes our service fee plus the UK government’s ETA fee. We pay this on your behalf. Our fee covers:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono uppercase tracking-wide text-gray-500">
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Live Support</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Data Validation</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Secure Submission</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>Reprocessing Help</li>
          </ul>
        </>
      )
    },
    {
      title: "Refund Eligibility",
      content: (
        <>
          <p className="font-bold text-black mb-2">You may request a full refund if your application has not yet been submitted to UK authorities.</p>
          <p>Requests must be made within 90 days. Once submitted, applications cannot be cancelled or refunded. UK immigration decisions are final and outside our control.</p>
        </>
      )
    },
    {
      title: "How to Request",
      content: (
        <>
          <p className="mb-2">Contact <a href="mailto:info@eeta.uk" className="font-mono text-black border-b border-gray-300 hover:border-black transition-colors">info@eeta.uk</a> with:</p>
          <ul className="list-disc pl-4 space-y-1 marker:text-gray-400">
            <li>Full Name</li>
            <li>Order/Application Number</li>
            <li>Submission Date</li>
            <li>Reason for Request</li>
          </ul>
        </>
      )
    },
    {
      title: "Processing Time",
      content: "Approved refunds are processed within 5–7 business days to the original payment method. International bank processing times may vary."
    },
    {
      title: "Dispute Resolution",
      content: "Please contact us before disputing a charge with your bank. We aim to resolve issues fairly. If a chargeback is filed, we reserve the right to submit evidence that the service was provided."
    },
    {
      title: "Service Timeframes",
      content: (
        <>
          <p className="mb-2">We aim to process applications within 24 hours. This is not guaranteed due to potential government system delays.</p>
          <p className="text-xs uppercase tracking-widest font-bold text-red-600">Travel Warning: If traveling within 48 hours, apply directly via the government site.</p>
        </>
      )
    },
    {
      title: "Payment Methods",
      content: (
        <div className="flex flex-wrap gap-3">
          {['Visa', 'Mastercard', 'Amex', 'Discover'].map((card) => (
            <span key={card} className="px-3 py-1 bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600">
              {card}
            </span>
          ))}
          <p className="w-full mt-2 text-xs text-gray-500">Transactions are processed via PCI-compliant gateways.</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full mt-20  bg-white text-gray-900 font-sans py-20 px-6 lg:px-12 selection:bg-black selection:text-white">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER - COMPACT & FUTURISTIC */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2 leading-none">
              Purchase & <br/> Refund Policy
            </h1>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4">
              Effective Date: February 19th, 2025
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-sm font-bold">EETA UK</p>
             <p className="text-xs text-gray-500">CR NO: 2053122409</p>
          </div>
        </div>

        {/* INTRO TEXT */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            This policy outlines how payments and refunds are handled on <span className="text-black font-semibold">eeta.uk</span>. By placing an order, you acknowledge that processing begins shortly after purchase.
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
            <h4 className="font-bold text-lg">Questions or Concerns?</h4>
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

export default PurchaseRefundPolicy;