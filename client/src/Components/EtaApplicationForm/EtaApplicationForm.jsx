import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaCheck, FaPassport, FaGlobe, FaSearch, FaUser, FaShieldAlt, FaPlaneDeparture, FaArrowRight } from 'react-icons/fa';

// --- DATA: YOUR SPECIFIC COUNTRY LIST ---
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
  { name: "Czech Republic", code: "cz" },
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
  { name: "Saint Vincent", code: "vc" },
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
  { name: "United Arab Emirates", code: "ae" },
  { name: "United States", code: "us" },
  { name: "Uruguay", code: "uy" }
];

// --- COMPONENTS ---

// 1. Modern Searchable Dropdown
const CustomSearchableSelect = ({ options, value, onChange, label, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Updated to look at option.name directly
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative group" ref={dropdownRef}>
      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest group-hover:text-[#106cb6] transition-colors duration-300">
        {label} <span className="text-red-500">*</span>
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-gray-50 hover:bg-white cursor-pointer relative flex items-center justify-between
          border-b-2 py-4 px-2 transition-all duration-300
          ${isOpen ? 'border-[#106cb6] bg-white shadow-lg shadow-blue-50' : 'border-gray-200'}
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && <Icon className={`text-lg transition-colors duration-300 ${value ? 'text-[#106cb6]' : 'text-gray-400'}`} />}
          <span className={`text-lg font-medium truncate ${value ? 'text-gray-900' : 'text-gray-400'}`}>
            {value || placeholder}
          </span>
        </div>
        <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#106cb6]' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search country..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border-none bg-white focus:ring-2 focus:ring-[#106cb6]/20 text-gray-700 placeholder-gray-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((country, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    onChange(country.name);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`
                    px-4 py-3 cursor-pointer flex items-center justify-between transition-colors
                    ${value === country.name ? 'bg-[#106cb6]/5 text-[#106cb6]' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <span className="font-medium">{country.name}</span>
                  {value === country.name && <FaCheck />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400 text-sm">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Floating Label Input
const FloatingInput = ({ label, name, value, onChange, icon: Icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group pt-6">
      <div className={`
        absolute left-0 top-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-bold
        ${isFocused || hasValue ? 'text-xs text-[#106cb6] translate-y-0' : 'text-xs text-gray-400 translate-y-8'}
      `}>
        {label} <span className="text-red-500">*</span>
      </div>
      
      <div className={`relative flex items-center border-b-2 transition-colors duration-300 ${isFocused ? 'border-[#106cb6]' : 'border-gray-200 hover:border-gray-300 mt-2'}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent text-xl font-medium text-gray-900 py-4 pl-8 pr-4 focus:outline-none"
        />
        <div className={`absolute left-0 transition-colors duration-300 ${isFocused || hasValue ? 'text-[#106cb6]' : 'text-gray-400'}`}>
          <Icon className="text-lg " />
        </div>
      </div>
    </div>
  );
};

// --- MAIN FORM ---

const EtaApplicationForm = () => {
  // Use static list directly instead of fetching
  const [countries] = useState(allCountries);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nationality: '',
    passportNumber: '',
    otherNationalities: null, 
    secondNationality: '',
  });

  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (formData.otherNationalities === 'yes') {
      timer = setTimeout(() => {
        setIsSectionVisible(true);
      }, 500);
    } else {
      setIsSectionVisible(false);
    }
    return () => clearTimeout(timer);
  }, [formData.otherNationalities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNationalityChange = (val, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: val }));
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({ 
      ...prev, 
      otherNationalities: value,
      secondNationality: value === 'no' ? '' : prev.secondNationality 
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nationality || !formData.passportNumber || !formData.otherNationalities) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    if (formData.otherNationalities === 'yes' && !formData.secondNationality) {
      alert("Please select your second nationality.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || 'Something went wrong.'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert("Network Error: Could not connect to the server.");
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    if (isSuccess) return 100;
    let filled = 0;
    let total = 3;
    if (formData.nationality) filled++;
    if (formData.passportNumber) filled++;
    if (formData.otherNationalities) filled++;
    if (formData.otherNationalities === 'yes') {
      total = 4;
      if (formData.secondNationality) filled++;
    }
    return (filled / total) * 100;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen mt-20 bg-white text-gray-900 font-sans flex flex-col items-center p-6 justify-center">
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="relative z-10 w-full max-w-lg bg-white p-8 md:p-12 animate-fade-in-up text-center">
          <div className="mx-auto mb-8 w-24 h-24 bg-[#106cb6]/10 rounded-full flex items-center justify-center relative">
             <div className="absolute inset-0 border-4 border-[#106cb6]/20 rounded-full animate-ping"></div>
             <FaCheck className="text-5xl text-[#106cb6] relative z-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Information <span className="text-[#106cb6]">Received.</span>
          </h1>
          <div className="space-y-4 mb-10">
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Your details have been securely transmitted to our processing center.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="group relative w-full py-4 bg-gray-900 text-white font-bold text-sm tracking-[0.2em] uppercase overflow-hidden rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Return Back <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#106cb6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-32 bg-white text-gray-900 font-sans flex flex-col items-center p-6 selection:bg-blue-100">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-[#106cb6] transition-all duration-700 ease-out shadow-[0_0_10px_#106cb6]"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="w-full max-w-3xl mt-12 animate-fade-in-up">
        <div className="mb-16 relative">
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#106cb6] to-transparent opacity-50"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-gray-900">
            UK ETA <span className="text-[#106cb6]">APPLICATION.</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
            Complete the secure travel authorization form below.
          </p>
        </div>

        <form className="space-y-12 pb-24" onSubmit={(e) => e.preventDefault()}>
          <div className="relative z-40">
            <CustomSearchableSelect 
              label="Current Nationality"
              options={countries}
              value={formData.nationality}
              onChange={(val) => handleNationalityChange(val, 'nationality')}
              icon={FaGlobe}
              placeholder="Select your nationality"
            />
          </div>

          <div className="relative z-30">
            <FloatingInput 
              label="Passport Number"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              icon={FaPassport}
            />
          </div>

          <div className="relative z-20 pt-4">
            <label className="block text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
              Do you have any other nationalities? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-6">
              {['yes', 'no'].map((option) => {
                const isSelected = formData.otherNationalities === option;
                return (
                  <div 
                    key={option}
                    onClick={() => handleRadioChange(option)}
                    className={`
                      cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 group
                      ${isSelected ? 'border-[#106cb6] bg-white shadow-xl shadow-blue-100/50 -translate-y-1' : 'border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white'}
                    `}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-[#106cb6] bg-[#106cb6]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                      {isSelected && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className={`text-lg font-bold uppercase tracking-wide ${isSelected ? 'text-[#106cb6]' : 'text-gray-500'}`}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`transition-all relative z-10 duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${formData.otherNationalities === 'yes' ? 'max-h-[300px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'} ${isSectionVisible ? 'overflow-visible' : 'overflow-hidden'}`}>
            <div className="pt-6 pb-2 relative z-50">
              <CustomSearchableSelect 
                label="Second Nationality"
                options={countries}
                value={formData.secondNationality}
                onChange={(val) => handleNationalityChange(val, 'secondNationality')}
                icon={FaUser}
                placeholder="Select second nationality"
              />
            </div>
          </div>

          <div className="pt-4 relative z-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`group relative cursor-pointer w-full py-6 bg-gray-900 text-white font-bold text-lg tracking-[0.2em] uppercase overflow-hidden rounded-sm transition-all duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-80' : 'hover:shadow-2xl hover:shadow-gray-400/50 hover:-translate-y-1'}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isSubmitting ? <>Securely Transmitting... <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></> : <>Submit Application <FaCheck className="group-hover:scale-125 transition-transform duration-300"/></>}
              </span>
              {!isSubmitting && <div className="absolute inset-0 bg-[#106cb6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtaApplicationForm;