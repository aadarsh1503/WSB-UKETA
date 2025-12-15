import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import FeatureCards from './FeatureCards';
import WhyChooseUs from './WhyChooseUs';

const AboutUs = () => {
  return (
    <>
    <div className="w-full mt-32 font-sans">
      
      {/* SECTION 1: ABOUT US (Split Layout) */}
      <section className="w-full bg-[#F9FBFF] flex flex-col lg:flex-row min-h-[600px]">
        
        {/* LEFT COLUMN - IMAGE */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          {/* 
             Image Container styling:
             lg:rounded-tr-[140px] -> Creates the large curve on the top-right
             corner of the image, matching the specific shape in your screenshot.
          */}
          <div className="h-full w-full overflow-hidden lg:rounded-tr-[140px]">
            <img 
              src="https://i0.wp.com/visauketa.com/wp-content/uploads/2025/01/social-media-hero.jpg?w=960&ssl=1" 
              alt="Professional woman using tablet" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* RIGHT COLUMN - TEXT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:pl-24 lg:pr-20">
          
          {/* Heading */}
          <h2 className="text-5xl lg:text-7xl font-medium text-gray-900 tracking-tight mb-10">
            About Us
          </h2>

          {/* Text Content */}
          <div className="space-y-8 text-gray-800 text-lg lg:text-xl leading-relaxed">
            <p>
              Sebe Inc. is an independent travel support provider dedicated to helping travelers complete their UK Electronic Travel Authorisation (ETA) application with accuracy, clarity, and confidence. Our goal is to make the process easier through guided assistance, helpful tools, and responsive support—without the confusion that often comes with government portals.
            </p>
            <p>
              We are not affiliated with the UK government. Instead, we offer a fully optional service designed for those who prefer a streamlined and supported experience when submitting their ETA application.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: HOW WE HELP (Added below as requested) */}
      <section className="w-full bg-white py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Centered Heading */}
          <h2 className="text-center text-5xl lg:text-5xl font-medium text-gray-900 tracking-tight mb-16">
            How We Help
          </h2>

          {/* List Items */}
          <div className="flex flex-col gap-6">
            
            {/* Item 1 */}
            <div className="flex items-start gap-5">
              <FaCheck className="mt-1.5 text-black flex-shrink-0" size={20} strokeWidth={2} />
              <p className="text-lg lg:text-xl text-gray-900 leading-snug">
                Unlimited free resubmissions within two years after a passport change
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-5">
              <FaCheck className="mt-1.5 text-black flex-shrink-0" size={20} strokeWidth={2} />
              <p className="text-lg lg:text-xl text-gray-900 leading-snug">
                Access to expert assistance and fast, responsive support
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-5">
              <FaCheck className="mt-1.5 text-black flex-shrink-0" size={20} strokeWidth={2} />
              <p className="text-lg lg:text-xl text-gray-900 leading-snug">
                Full refund if your ETA application is denied—no questions asked
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
    <FeatureCards />
    <WhyChooseUs />
    </>
  );
};

export default AboutUs;