import React from 'react';

const HowWeHelp = () => {
  const steps = [
    {
      number: "1",
      title: "Fill Out The Application Form",
      subtitle: "BEGIN BY PRESSING APPLY NOW",
      description: "Complete the online application form with accurate personal and travel details as required. Ensure all information provided is correct and matches your passport."
    },
    {
      number: "2",
      title: "Pay The Required Fees",
      subtitle: "ALL MAJOR PAYMENTS ACCEPTED",
      description: "Once the application form is submitted, pay the required processing fee using a valid payment method, such as a credit or debit card."
    },
    {
      number: "3",
      title: "Receive Your ETA",
      subtitle: "PROCESSING TIME WITHIN 3 DAYS",
      description: "After the payment is processed and the application is reviewed, you will receive your UK EETA decision via email. Ensure to check your inbox regularly for updates and notifications regarding your application status."
    }
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN - STEPS */}
        <div className="w-full lg:w-2/3 flex flex-col gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-950 text-white rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-[0_15px_30px_rgba(0,0,0,0.25)]">
                  <span className="font-light">{step.number}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col pt-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">
                  {step.subtitle}
                </p>
                
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-xl">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT COLUMN - HEADLINE & BUTTON */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-12">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900 mb-10 leading-[1.1]">
              How We Help You <br className="hidden lg:block"/> Apply
            </h2>
<a href='/apply'>
            <button className="bg-gray-950 cursor-pointer text-white px-10 py-4 rounded-full font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors duration-200 shadow-lg">
              APPLY NOW
            </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeHelp;