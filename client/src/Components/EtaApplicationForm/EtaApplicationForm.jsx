import React, { useState, useEffect, useRef } from 'react';
import { 
  FaChevronDown, FaCheck, FaGlobe, FaSearch, FaUser, 
  FaPlus, FaTrash, FaCamera, FaFileAlt, FaArrowRight, FaSpinner 
} from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// --- DATA: COUNTRIES ---
const allCountries = [
  { name: "Andorra", code: "ad" }, { name: "Antigua and Barbuda", code: "ag" },
  { name: "Argentina", code: "ar" }, { name: "Australia", code: "au" },
  { name: "Austria", code: "at" }, { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" }, { name: "Barbados", code: "bb" },
  { name: "Belgium", code: "be" }, { name: "Belize", code: "bz" },
  { name: "Botswana", code: "bw" }, { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" }, { name: "Bulgaria", code: "bg" },
  { name: "Canada", code: "ca" }, { name: "Chile", code: "cl" },
  { name: "Costa Rica", code: "cr" }, { name: "Croatia", code: "hr" },
  { name: "Cyprus", code: "cy" }, { name: "Czech Republic", code: "cz" },
  { name: "Denmark", code: "dk" }, { name: "Estonia", code: "ee" },
  { name: "Finland", code: "fi" }, { name: "France", code: "fr" },
  { name: "Germany", code: "de" }, { name: "Greece", code: "gr" },
  { name: "Grenada", code: "gd" }, { name: "Guatemala", code: "gt" },
  { name: "Guyana", code: "gy" }, { name: "Hong Kong", code: "hk" },
  { name: "Hungary", code: "hu" }, { name: "Iceland", code: "is" },
  { name: "Italy", code: "it" }, { name: "Japan", code: "jp" },
  { name: "Kiribati", code: "ki" }, { name: "Korea (South)", code: "kr" }, 
  { name: "Kuwait", code: "kw" }, { name: "Latvia", code: "lv" },
  { name: "Liechtenstein", code: "li" }, { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" }, { name: "Macao", code: "mo" },
  { name: "Malaysia", code: "my" }, { name: "Maldives", code: "mv" },
  { name: "Malta", code: "mt" }, { name: "Marshall Islands", code: "mh" },
  { name: "Mauritius", code: "mu" }, { name: "Mexico", code: "mx" },
  { name: "Micronesia", code: "fm" }, { name: "Monaco", code: "mc" },
  { name: "Nauru", code: "nr" }, { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" }, { name: "Nicaragua", code: "ni" },
  { name: "Norway", code: "no" }, { name: "Oman", code: "om" },
  { name: "Palau", code: "pw" }, { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" }, { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" }, { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" }, { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" }, { name: "Saint Kitts and Nevis", code: "kn" },
  { name: "Saint Lucia", code: "lc" }, { name: "Saint Vincent", code: "vc" },
  { name: "Samoa", code: "ws" }, { name: "San Marino", code: "sm" },
  { name: "Saudi Arabia", code: "sa" }, { name: "Seychelles", code: "sc" },
  { name: "Singapore", code: "sg" }, { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" }, { name: "Solomon Islands", code: "sb" },
  { name: "Spain", code: "es" }, { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" }, { name: "Taiwan", code: "tw" },
  { name: "Tonga", code: "to" }, { name: "Trinidad and Tobago", code: "tt" },
  { name: "Tuvalu", code: "tv" }, { name: "United Arab Emirates", code: "ae" },
  { name: "United States", code: "us" }, { name: "Uruguay", code: "uy" }
];

// --- COMPONENTS ---
const CustomSearchableSelect = ({ options, value, onChange, label, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative group mb-6" ref={dropdownRef}>
      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{label} *</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-50 cursor-pointer flex items-center justify-between border-b-2 py-3 px-2 transition-all ${isOpen ? 'border-[#106cb6] bg-white' : 'border-gray-200'}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && <Icon className={value ? 'text-[#106cb6]' : 'text-gray-400'} />}
          <span className={`text-base font-medium truncate ${value ? 'text-gray-900' : 'text-gray-400'}`}>
            {value || placeholder}
          </span>
        </div>
        <FaChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-1 bg-white shadow-2xl border border-gray-100 max-h-60 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-white border-b">
            <input 
              type="text" placeholder="Search..." 
              className="w-full p-2 text-sm bg-gray-50 border-none focus:ring-0"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredOptions.length > 0 ? filteredOptions.map((country, index) => (
            <div 
              key={index}
              onClick={() => { onChange(country.name); setIsOpen(false); setSearchTerm(''); }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex justify-between items-center"
            >
              {country.name} {value === country.name && <FaCheck className="text-[#106cb6]" />}
            </div>
          )) : <div className="p-4 text-xs text-gray-400">No results found</div>}
        </div>
      )}
    </div>
  );
};

const FileUpload = ({ label, icon: Icon, onChange, file, accept }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex-1">
      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{label} *</label>
      <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all min-h-[120px] ${file ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-[#106cb6]'}`}>
        {preview ? (
          <div className="relative w-full flex flex-col items-center">
            <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded mb-2 border border-green-200 shadow-sm" />
            <span 
              className="text-[10px] font-bold text-green-600 uppercase truncate max-w-[90px] text-center" 
              title={file.name}
            >
              {file.name}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Icon className="text-gray-400 text-xl mb-2" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter text-center">Upload Image</span>
          </div>
        )}
        <input 
          type="file" 
          className="hidden" 
          accept={accept} 
          onChange={(e) => {
            if (e.target.files[0]) onChange(e.target.files[0]);
          }} 
        />
      </label>
    </div>
  );
};

// --- MAIN FORM ---
const EtaApplicationForm = () => {
  const [applicants, setApplicants] = useState([
    { id: Date.now(), nationality: '', otherNationalities: 'no', secondNationality: '', photo: null, passportCopy: null }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const addApplicant = () => {
    if (applicants.length < 10) {
      setApplicants([...applicants, { id: Date.now(), nationality: '', otherNationalities: 'no', secondNationality: '', photo: null, passportCopy: null }]);
    }
  };

  const removeApplicant = (id) => {
    if (applicants.length > 1) setApplicants(applicants.filter(a => a.id !== id));
  };

  const updateApplicant = (id, field, value) => {
    setApplicants(applicants.map(a => {
      if (a.id === id) {
        if (field === 'nationality' && value === a.secondNationality) {
          return { ...a, [field]: value, secondNationality: '' };
        }
        return { ...a, [field]: value };
      }
      return a;
    }));
  };

  const validateForm = () => {
    for (const app of applicants) {
      if (!app.nationality || !app.photo || !app.passportCopy) return false;
      if (app.otherNationalities === 'yes' && !app.secondNationality) return false;
    }
    return true;
  };

  const handlePaymentSuccess = async (details) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    applicants.forEach((app, index) => {
      formData.append(`applicant_${index}_nationality`, app.nationality);
      formData.append(`applicant_${index}_other`, app.otherNationalities);
      formData.append(`applicant_${index}_second`, app.secondNationality || 'N/A');
    });
  
    applicants.forEach((app, index) => {
      if (app.photo) formData.append(`photo_${index}`, app.photo);
      if (app.passportCopy) formData.append(`passport_${index}`, app.passportCopy);
    });
  
    formData.append('paymentId', details.id);
    formData.append('totalPaid', applicants.length * 120);
  
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <FaCheck className="text-4xl text-green-600" />
      </div>
      <h1 className="text-3xl font-black mb-4 uppercase">Submission Successful</h1>
      <p className="text-gray-500 max-w-md mb-8">Your documents are being processed. A confirmation has been sent to info@eeta.uk.</p>
      <button onClick={() => window.location.reload()} className="bg-black text-white px-10 py-4 font-bold rounded uppercase tracking-widest text-sm transition-transform hover:scale-105">
        Start New Application
      </button>
    </div>
  );

  return (
    <PayPalScriptProvider options={{ 
        "client-id": "AQSk-kF_6PJF925qFQVBMgxq43ARQaBCyH96KPZaEhYhzUW4HsNUwox3zkKKRqNXYwTNDMV7HOiP5Dvu",
        currency: "USD",
        // ADDED: This line disables credit/debit and other options
        "disable-funding": "credit,card,paylater"
    }}>
      <div className="min-h-screen mt-10 bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 border-l-4 border-[#106cb6] pl-6">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">UK ETA Group Application</h1>
            <p className="text-gray-500 mt-2 font-medium">Processing Fee: $120.00 USD per applicant</p>
          </header>

          <div className="space-y-8">
            {applicants.map((app, index) => (
              <div key={app.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <h3 className="text-xl font-bold text-[#106cb6]">Applicant #{index + 1}</h3>
                  {applicants.length > 1 && (
                    <button onClick={() => removeApplicant(app.id)} className="text-red-400 hover:text-red-600">
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <CustomSearchableSelect 
                    label="Current Nationality" 
                    options={allCountries} 
                    value={app.nationality}
                    onChange={(val) => updateApplicant(app.id, 'nationality', val)} 
                    icon={FaGlobe}
                    placeholder="Select nationality"
                  />
                  
                  <div className="flex gap-4">
                    <FileUpload 
                      label="Passport Photo" icon={FaCamera} 
                      accept="image/jpeg, image/jpg, image/png"
                      file={app.photo} 
                      onChange={(file) => updateApplicant(app.id, 'photo', file)}
                    />
                    <FileUpload 
                      label="Passport Copy" icon={FaFileAlt} 
                      accept="image/jpeg, image/jpg, image/png"
                      file={app.passportCopy} 
                      onChange={(file) => updateApplicant(app.id, 'passportCopy', file)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Other Nationalities?</label>
                    <div className="flex gap-4 mt-2">
                        {['yes', 'no'].map(opt => (
                            <button 
                                key={opt}
                                onClick={() => updateApplicant(app.id, 'otherNationalities', opt)}
                                className={`px-8 py-2 rounded-lg border font-bold uppercase text-xs transition-all ${app.otherNationalities === opt ? 'bg-[#106cb6] text-white border-[#106cb6]' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {app.otherNationalities === 'yes' && (
                  <div className="mt-6 animate-fade-in">
                    <CustomSearchableSelect 
                      label="Second Nationality" 
                      options={allCountries.filter(c => c.name !== app.nationality)} 
                      value={app.secondNationality}
                      onChange={(val) => updateApplicant(app.id, 'secondNationality', val)} 
                      icon={FaUser}
                      placeholder="Select second nationality"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-[#106cb6] flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
                <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Total Amount Due</p>
                <h2 className="text-5xl font-black text-gray-900">${applicants.length * 120}.00</h2>
                <p className="text-gray-400 text-sm mt-1">For {applicants.length} Applicant(s)</p>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-[350px]">
                {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl text-[#106cb6] font-bold">
                        <FaSpinner className="animate-spin text-3xl mb-3" />
                        SECURELY UPLOADING...
                    </div>
                ) : !showPayment ? (
                    <>
                        {applicants.length < 10 && (
                            <button onClick={addApplicant} className="w-full py-3 border-2 border-gray-200 text-gray-500 font-bold rounded-lg hover:bg-gray-50 uppercase text-xs tracking-widest transition-colors">
                                + Add Applicant
                            </button>
                        )}
                        <button 
                            onClick={() => validateForm() ? setShowPayment(true) : alert("Please complete all fields and upload images.")}
                            className="bg-black text-white px-12 py-4 font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                            PROCEED TO PAYMENT <FaArrowRight />
                        </button>
                    </>
                ) : (
                    <div className="w-full animate-fade-in">
                        <PayPalButtons 
                            style={{ layout: "vertical", shape: "rect", label: "paypal" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        description: `UK ETA Application Fee for ${applicants.length} Applicants`,
                                        amount: { value: (applicants.length * 120).toString() }
                                    }]
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then(handlePaymentSuccess);
                            }}
                        />
                        <button onClick={() => setShowPayment(false)} className="w-full text-center text-xs font-bold text-gray-400 uppercase mt-4 hover:text-gray-600">
                            ← Edit Details
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default EtaApplicationForm;