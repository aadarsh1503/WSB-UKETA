import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white flex flex-col lg:flex-row min-h-[600px] font-sans">
      
      {/* LEFT COLUMN - IMAGE */}
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
        {/* 
           Image Container styling:
           lg:rounded-tr-[140px] -> Creates the large smooth curve on the top-right
           corner of the image container, matching the design aesthetic.
        */}
        <div className="h-full w-full overflow-hidden lg:rounded-tr-[140px]">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
            alt="Diverse team working together on laptop" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* RIGHT COLUMN - CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:pl-24 lg:pr-20">
        
        {/* Heading */}
        <h2 className="text-5xl lg:text-7xl font-medium text-gray-900 tracking-tight mb-10">
          Why Choose Us
        </h2>

        {/* Main Text */}
        <p className="text-lg text-gray-800 leading-relaxed mb-12">
          Our mission is to make the ETA process easier, not harder. We combine advanced document checking, live compliance updates, and personal support to give you peace of mind. Whether you’re applying for leisure, business, or a layover, we’re here to help you move forward—accurately and confidently.
        </p>

        {/* Contact Details */}
        <div className="space-y-1 mb-12 text-lg text-gray-800">
          <p className="font-bold text-gray-900">EETA UK</p>
          <p>King Khalid Str., Dammam, Kingdom of Saudi Arabia</p>
          <p>
            Email: <a href="mailto:info@eeta.uk" className="text-blue-700 hover:underline">info@eeta.uk</a>
          </p>
          <p>Phone: +966 554026599</p>
        </div>

        {/* Button */}
        <div>
          <button className="bg-gray-950 text-white px-10 py-4 rounded-full font-medium text-sm tracking-widest hover:bg-gray-800 transition-colors duration-200 uppercase">
            Contact Us
          </button>
        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;