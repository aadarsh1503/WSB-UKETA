import React from 'react';

// Comprehensive list of countries with ISO 2-digit codes for flags
const allCountries = [
  { name: "Afghanistan", code: "af" },
  { name: "Albania", code: "al" },
  { name: "Algeria", code: "dz" },
  { name: "Andorra", code: "ad" },
  { name: "Angola", code: "ao" },
  { name: "Antigua and Barbuda", code: "ag" },
  { name: "Argentina", code: "ar" },
  { name: "Armenia", code: "am" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Azerbaijan", code: "az" },
  { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" },
  { name: "Bangladesh", code: "bd" },
  { name: "Barbados", code: "bb" },
  { name: "Belarus", code: "by" },
  { name: "Belgium", code: "be" },
  { name: "Belize", code: "bz" },
  { name: "Benin", code: "bj" },
  { name: "Bhutan", code: "bt" },
  { name: "Bolivia", code: "bo" },
  { name: "Bosnia and Herzegovina", code: "ba" },
  { name: "Botswana", code: "bw" },
  { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" },
  { name: "Bulgaria", code: "bg" },
  { name: "Burkina Faso", code: "bf" },
  { name: "Burundi", code: "bi" },
  { name: "Cabo Verde", code: "cv" },
  { name: "Cambodia", code: "kh" },
  { name: "Cameroon", code: "cm" },
  { name: "Canada", code: "ca" },
  { name: "Central African Republic", code: "cf" },
  { name: "Chad", code: "td" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Comoros", code: "km" },
  { name: "Congo (DRC)", code: "cd" },
  { name: "Congo (Republic)", code: "cg" },
  { name: "Costa Rica", code: "cr" },
  { name: "Croatia", code: "hr" },
  { name: "Cuba", code: "cu" },
  { name: "Cyprus", code: "cy" },
  { name: "Czech Republic", code: "cz" },
  { name: "Denmark", code: "dk" },
  { name: "Djibouti", code: "dj" },
  { name: "Dominica", code: "dm" },
  { name: "Dominican Republic", code: "do" },
  { name: "East Timor", code: "tl" },
  { name: "Ecuador", code: "ec" },
  { name: "Egypt", code: "eg" },
  { name: "El Salvador", code: "sv" },
  { name: "Equatorial Guinea", code: "gq" },
  { name: "Eritrea", code: "er" },
  { name: "Estonia", code: "ee" },
  { name: "Eswatini", code: "sz" },
  { name: "Ethiopia", code: "et" },
  { name: "Fiji", code: "fj" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "Gabon", code: "ga" },
  { name: "Gambia", code: "gm" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Ghana", code: "gh" },
  { name: "Greece", code: "gr" },
  { name: "Grenada", code: "gd" },
  { name: "Guatemala", code: "gt" },
  { name: "Guinea", code: "gn" },
  { name: "Guinea-Bissau", code: "gw" },
  { name: "Guyana", code: "gy" },
  { name: "Haiti", code: "ht" },
  { name: "Honduras", code: "hn" },
  { name: "Hong Kong", code: "hk" },
  { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" },
  { name: "India", code: "in" },
  { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" },
  { name: "Iraq", code: "iq" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "Italy", code: "it" },
  { name: "Ivory Coast", code: "ci" },
  { name: "Jamaica", code: "jm" },
  { name: "Japan", code: "jp" },
  { name: "Jordan", code: "jo" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Kenya", code: "ke" },
  { name: "Kiribati", code: "ki" },
  { name: "Korea (North)", code: "kp" },
  { name: "Korea (South)", code: "kr" },
  { name: "Kosovo", code: "xk" },
  { name: "Kuwait", code: "kw" },
  { name: "Kyrgyzstan", code: "kg" },
  { name: "Laos", code: "la" },
  { name: "Latvia", code: "lv" },
  { name: "Lebanon", code: "lb" },
  { name: "Lesotho", code: "ls" },
  { name: "Liberia", code: "lr" },
  { name: "Libya", code: "ly" },
  { name: "Liechtenstein", code: "li" },
  { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" },
  { name: "Macao", code: "mo" },
  { name: "Madagascar", code: "mg" },
  { name: "Malawi", code: "mw" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Mali", code: "ml" },
  { name: "Malta", code: "mt" },
  { name: "Marshall Islands", code: "mh" },
  { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" },
  { name: "Mexico", code: "mx" },
  { name: "Micronesia", code: "fm" },
  { name: "Moldova", code: "md" },
  { name: "Monaco", code: "mc" },
  { name: "Mongolia", code: "mn" },
  { name: "Montenegro", code: "me" },
  { name: "Morocco", code: "ma" },
  { name: "Mozambique", code: "mz" },
  { name: "Myanmar", code: "mm" },
  { name: "Namibia", code: "na" },
  { name: "Nauru", code: "nr" },
  { name: "Nepal", code: "np" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" },
  { name: "Nigeria", code: "ng" },
  { name: "North Macedonia", code: "mk" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Pakistan", code: "pk" },
  { name: "Palau", code: "pw" },
  { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" },
  { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Rwanda", code: "rw" },
  { name: "Saint Kitts and Nevis", code: "kn" },
  { name: "Saint Lucia", code: "lc" },
  { name: "Saint Vincent", code: "vc" },
  { name: "Samoa", code: "ws" },
  { name: "San Marino", code: "sm" },
  { name: "Sao Tome and Principe", code: "st" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Senegal", code: "sn" },
  { name: "Serbia", code: "rs" },
  { name: "Seychelles", code: "sc" },
  { name: "Sierra Leone", code: "sl" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Solomon Islands", code: "sb" },
  { name: "Somalia", code: "so" },
  { name: "South Africa", code: "za" },
  { name: "South Sudan", code: "ss" },
  { name: "Spain", code: "es" },
  { name: "Sri Lanka", code: "lk" },
  { name: "Sudan", code: "sd" },
  { name: "Suriname", code: "sr" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" },
  { name: "Taiwan", code: "tw" },
  { name: "Tajikistan", code: "tj" },
  { name: "Tanzania", code: "tz" },
  { name: "Thailand", code: "th" },
  { name: "Togo", code: "tg" },
  { name: "Tonga", code: "to" },
  { name: "Trinidad and Tobago", code: "tt" },
  { name: "Tunisia", code: "tn" },
  { name: "Turkey", code: "tr" },
  { name: "Turkmenistan", code: "tm" },
  { name: "Tuvalu", code: "tv" },
  { name: "Uganda", code: "ug" },
  { name: "Ukraine", code: "ua" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
  { name: "Uruguay", code: "uy" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Vanuatu", code: "vu" },
  { name: "Vatican City", code: "va" },
  { name: "Venezuela", code: "ve" },
  { name: "Vietnam", code: "vn" },
  { name: "Yemen", code: "ye" },
  { name: "Zambia", code: "zm" },
  { name: "Zimbabwe", code: "zw" }
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