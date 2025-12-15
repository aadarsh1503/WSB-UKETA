import React from 'react';

// A simple custom icon component to match the half-circle graphic in the screenshot
const HalfMoonIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mb-8"
  >
    <path 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V22Z" 
      fill="black" 
      transform="rotate(180 12 12)" // Rotated to match the left-filled look
    />
  </svg>
);

const FeatureCards = () => {
  return (
    <section className="w-full relative bottom-20 py-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 
            Flex container for the cards.
            On Desktop (lg): We use 'items-start' to allow the margin-top trick to stagger them.
        */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
          
          {/* CARD 1: Designed for Simplicity */}
          {/* Added 'lg:mt-16' to push this card down relative to the middle one */}
          <div className="w-full lg:w-1/3 bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:mt-16 border border-gray-50">
            <HalfMoonIcon />
            <h3 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
              Designed for <br /> Simplicity
            </h3>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
              Whether you’re on desktop or mobile, our interface is built to be clean, intuitive, and efficient. Upload a photo of your passport, answer a few key questions, and let us handle the rest.
            </p>
          </div>

          {/* CARD 2: Advanced Passport Validation */}
          {/* No margin-top means this card sits higher (natural position) */}
          <div className="w-full lg:w-1/3 bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-50">
            <HalfMoonIcon />
            <h3 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
              Advanced <br /> Passport <br /> Validation
            </h3>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
              Our platform uses industry-leading OCR and MRZ scanning technology to securely validate your passport. This helps catch errors before they’re submitted—avoiding typos, formatting issues, or delays.
            </p>
          </div>

          {/* CARD 3: Live Regulatory Monitoring */}
          {/* Added 'lg:mt-16' to push this card down as well */}
          <div className="w-full lg:w-1/3 bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:mt-16 border border-gray-50">
            <HalfMoonIcon />
            <h3 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
              Live Regulatory <br /> Monitoring
            </h3>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
              We track updates to the UK’s ETA requirements in real time through direct data sources. You can trust that your application is based on the most current criteria available.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureCards;