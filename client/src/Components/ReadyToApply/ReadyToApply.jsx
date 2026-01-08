import React from 'react';

const ReadyToApply = () => {
  return (
    <section className="w-full  bg-white flex flex-col lg:flex-row min-h-[500px] lg:min-h-[650px] font-sans">
      
      {/* LEFT COLUMN - TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:pl-24 lg:pr-12">
        
        {/* Heading */}
        <h2 className="text-5xl lg:text-7xl text-gray-900 tracking-tight leading-[1.1] mb-8">
          Ready to Apply for <br />
          Your UK EETA?
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-800 mb-10">
          Visit the simple application to begin the process
        </p>

        {/* Button */}
        <div>
          <a href='/apply'>
          <button className="bg-gray-950 cursor-pointer text-white px-12 py-4 rounded-full font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200 shadow-lg">
            APPLY NOW
          </button>
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN - IMAGE */}
      <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
        {/* 
           Image Container
           lg:rounded-bl-[100px] -> Creates the large curve on the bottom-left 
           corner of the image, matching the design.
        */}
        <div className="h-full w-full overflow-hidden lg:rounded-bl-[120px]">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop" 
            alt="People working on application" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

    </section>
  );
};

export default ReadyToApply;