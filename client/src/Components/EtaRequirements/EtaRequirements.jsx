import React from 'react';
// Changed FaPoundSign to FaSterlingSign
import { FaPassport, FaCamera, FaSterlingSign, FaAddressCard } from 'react-icons/fa6';

const EtaRequirements = () => {
  const requirements = [
    {
      id: 1,
      title: "Passport",
      icon: <FaPassport />,
      description: "Applicants must possess a valid passport from an eligible country with a minimum validity period beyond their intended stay in the UK."
    },
    {
      id: 2,
      title: "Personal Photo",
      icon: <FaCamera />,
      description: "A recent, clear passport-sized photo of the applicant is required, meeting specific size and format requirements outlined by the UK authorities."
    },
    {
      id: 3,
      title: "Payment Method",
      // Updated the icon usage here
      icon: <FaSterlingSign />,
      description: "Applicants need a valid payment method, such as a credit or debit card, to pay the processing fee for the UK ETA application."
    },
    {
      id: 4,
      title: "Email address",
      icon: <FaAddressCard />,
      description: "A valid email address is essential for receiving updates, notifications, and the final decision on the UK ETA application."
    }
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-center text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-16">
          United Kingdom ETA Requirements
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-[40px] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon Container */}
              <div className="text-4xl text-gray-950 mb-6 mt-4">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium text-gray-900 mb-6">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EtaRequirements;