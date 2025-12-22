import React from 'react';

// Comprehensive list of countries with ISO 2-digit codes for flags
const allCountries = [
  { name: "Andorra", code: "ad" },
  { name: "Antigua and Barbuda", code: "ag" },
  { name: "Argentina", code: "ar" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" },
  { name: "Barbados", code: "bb" },
  { name: "Belgium", code: "be" },
  { name: "Belize", code: "bz" },
  { name: "Botswana", code: "bw" },
  { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" },
  { name: "Bulgaria", code: "bg" },
  { name: "Canada", code: "ca" },
  { name: "Chile", code: "cl" },
  { name: "Costa Rica", code: "cr" },
  { name: "Croatia", code: "hr" },
  { name: "Cyprus", code: "cy" },
  { name: "Czech Republic", code: "cz" }, // Input mein Czechia tha
  { name: "Denmark", code: "dk" },
  { name: "Estonia", code: "ee" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
  { name: "Grenada", code: "gd" },
  { name: "Guatemala", code: "gt" },
  { name: "Guyana", code: "gy" },
  { name: "Hong Kong", code: "hk" },
  { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "Kiribati", code: "ki" },
  { name: "Korea (South)", code: "kr" }, 
  { name: "Kuwait", code: "kw" },
  { name: "Latvia", code: "lv" },
  { name: "Liechtenstein", code: "li" },
  { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" },
  { name: "Macao", code: "mo" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Malta", code: "mt" },
  { name: "Marshall Islands", code: "mh" },
  { name: "Mauritius", code: "mu" },
  { name: "Mexico", code: "mx" },
  { name: "Micronesia", code: "fm" },
  { name: "Monaco", code: "mc" },
  { name: "Nauru", code: "nr" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Palau", code: "pw" },
  { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Saint Kitts and Nevis", code: "kn" },
  { name: "Saint Lucia", code: "lc" },
  { name: "Saint Vincent", code: "vc" }, // St. Vincent and the Grenadines
  { name: "Samoa", code: "ws" },
  { name: "San Marino", code: "sm" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Seychelles", code: "sc" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Solomon Islands", code: "sb" },
  { name: "Spain", code: "es" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Taiwan", code: "tw" },
  { name: "Tonga", code: "to" },
  { name: "Trinidad and Tobago", code: "tt" },
  { name: "Tuvalu", code: "tv" },
  { name: "United Arab Emirates", code: "ae" }, // Input mein UAE tha
  { name: "United States", code: "us" },
  { name: "Uruguay", code: "uy" }
];

const UkEtaRequirements = () => {
  return (
    // Added py-16 lg:py-24 for proper gapping from the above component
    <div className="w-full bg-white flex flex-col lg:flex-row font-sans relative py-16 lg:py-24">
      
      {/* LEFT SIDE - COUNTRY LIST TABLE */}
      <div className="w-full lg:w-1/2 p-0 lg:px-12 border-b lg:border-b-0 lg:border-r border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-gray-200 mx-auto max-w-2xl lg:max-w-none">
          {allCountries.map((country, index) => (
            <div 
              key={index} 
              className="flex items-center p-4 border-b border-r border-gray-200 bg-gray-50/30 hover:bg-gray-50 transition-colors"
            >
              {/* Flag Image */}
              <img 
                src={`https://flagcdn.com/w40/${country.code}.png`}
                srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                width="28"
                height="20"
                alt={`${country.name} flag`}
                className="mr-3 shadow-sm rounded-sm object-cover flex-shrink-0"
              />
              <span className="text-gray-900 font-medium text-sm">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - CONTENT */}
      {/* 
          1. Removed 'overflow-y-auto' -> Removes scrollbar.
          2. Removed fixed 'h-screen' -> Prevents cutting off content.
          3. Added 'lg:min-h-screen' + 'justify-center' -> Centers content vertically if it fits.
          4. Kept 'lg:sticky top-0' -> Ensures it floats along with the user as they scroll flags.
      */}
      <div className="w-full lg:w-1/2 bg-white relative">
        <div className="lg:sticky lg:top-0 lg:min-h-screen px-8 py-12 lg:pr-24 lg:pl-12 flex flex-col justify-center">
          
          {/* Heading */}
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-8">
            Who Needs a UK ETA
          </h2>

          {/* Intro Text */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            As of 2024, most travelers from visa-exempt countries will need an Electronic Travel Authorization (ETA) before visiting the United Kingdom. This includes visitors from countries such as the United States, Canada, Australia, and most of Europe.
          </p>

          {/* Subheading */}
          <h3 className="text-gray-900 font-bold text-lg mb-4">
            An ETA may be required for the following types of travel:
          </h3>

          {/* List */}
          <ul className="space-y-4 mb-12 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-black text-xl leading-none">•</span>
              <span>
                <strong className="text-gray-900">Tourism</strong> – Leisure visits, family travel, and sightseeing
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-black text-xl leading-none">•</span>
              <span>
                <strong className="text-gray-900">Business</strong> – Attending meetings, events, or conferences
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-black text-xl leading-none">•</span>
              <span>
                <strong className="text-gray-900">Short-Term Study</strong> – Workshops, courses, or academic programs
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-black text-xl leading-none">•</span>
              <span>
                <strong className="text-gray-900">Transit</strong> – Traveling through the UK on the way to another destination
              </span>
            </li>
          </ul>

          {/* Fees Section */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Fees and Processing
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Our support service includes a separate fee. Government fees are additional and disclosed before checkout.
          </p>

          {/* Button */}
          <div>
            <a href='/apply'>
            <button className="bg-gray-950 cursor-pointer text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200">
              APPLY NOW
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UkEtaRequirements;