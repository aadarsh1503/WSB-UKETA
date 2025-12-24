
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaCheck, FaPassport, FaGlobe, FaSearch, FaUser, FaShieldAlt, FaPlaneDeparture, FaArrowRight } from 'react-icons/fa';

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

  const filteredOptions = options.filter(option =>
    option.name.common.toLowerCase().includes(searchTerm.toLowerCase())
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
                    onChange(country.name.common);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`
                    px-4 py-3 cursor-pointer flex items-center justify-between transition-colors
                    ${value === country.name.common ? 'bg-[#106cb6]/5 text-[#106cb6]' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <span className="font-medium">{country.name.common}</span>
                  {value === country.name.common && <FaCheck />}
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
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for submission process
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
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

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

  // --- SUBMIT LOGIC ---
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
      // Connect to Backend
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- SHOW SUCCESS SCREEN ---
        // Add a small artificial delay for smoother UX transition
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
      } else {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
         <div className="w-16 h-16 border-4 border-gray-100 border-t-[#106cb6] rounded-full animate-spin"></div>
         <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Initializing Secure Form...</p>
      </div>
    );
  }

  // --- RENDER SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div className="min-h-screen mt-20 bg-white text-gray-900 font-sans flex flex-col items-center p-6 justify-center">
        {/* Confetti / Decor Background */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg bg-white p-8 md:p-12 animate-fade-in-up text-center">
          
          {/* Animated Success Icon */}
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
            <p className="text-gray-400 text-sm">
              We have initiated the review protocol for your Electronic Travel Authorisation. No further action is required from you at this moment.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-10 border border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <FaShieldAlt className="text-[#106cb6]" />
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Status</span>
             </div>
             <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wide">
               Processing
             </span>
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

  // --- RENDER FORM VIEW ---
  return (
    <div className="min-h-screen mt-32 bg-white text-gray-900 font-sans flex flex-col items-center p-6 selection:bg-blue-100">
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-[#106cb6] transition-all duration-700 ease-out shadow-[0_0_10px_#106cb6]"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="w-full max-w-3xl mt-12 animate-fade-in-up">
        
        {/* Header */}
        <div className="mb-16 relative">
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#106cb6] to-transparent opacity-50"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-gray-900">
            UK ETA <span className="text-[#106cb6]">APPLICATION.</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
            Complete the secure travel authorization form below.
            <br/>
            <span className="text-gray-400 text-sm font-normal">Fields marked with <span className="text-red-500">*</span> are mandatory for processing.</span>
          </p>
        </div>

        <form className="space-y-12 pb-24" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. Current Nationality */}
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

          {/* 2. Passport Number */}
          <div className="relative z-30">
            <FloatingInput 
              label="Passport Number"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              icon={FaPassport}
            />
          </div>

          {/* 3. Other Nationalities */}
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
                      ${isSelected 
                        ? 'border-[#106cb6] bg-white shadow-xl shadow-blue-100/50 -translate-y-1' 
                        : 'border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white'
                      }
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                      ${isSelected ? 'border-[#106cb6] bg-[#106cb6]' : 'border-gray-300 group-hover:border-gray-400'}
                    `}>
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

          {/* Conditional Second Nationality */}
          <div 
            className={`
              transition-all relative z-10 duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${formData.otherNationalities === 'yes' ? 'max-h-[300px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}
              ${isSectionVisible ? 'overflow-visible' : 'overflow-hidden'}
            `}
          >
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

          {/* Submit Button */}
          <div className="pt-4 relative z-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                group relative cursor-pointer  w-full py-6 bg-gray-900 text-white font-bold text-lg tracking-[0.2em] uppercase overflow-hidden rounded-sm transition-all duration-300 
                ${isSubmitting ? 'cursor-not-allowed opacity-80' : 'hover:shadow-2xl hover:shadow-gray-400/50 hover:-translate-y-1'}
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isSubmitting ? (
                  <>
                    Securely Transmitting... <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    Submit Application <FaCheck className="group-hover:scale-125 transition-transform duration-300"/>
                  </>
                )}
              </span>
              {!isSubmitting && (
                <div className="absolute inset-0 bg-[#106cb6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              )}
            </button>
            <p className="text-center text-gray-400 text-xs mt-6">
              By clicking submit, you agree to the Terms of Service.
            </p>
          </div>

        </form>
      </div>
      
      {/* Background Decor */}
      <div className="fixed top-20 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default EtaApplicationForm;
