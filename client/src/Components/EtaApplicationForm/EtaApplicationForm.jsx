import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown, FaCloudUploadAlt, FaCalendarAlt, 
  FaUser, FaGlobe, FaSpinner, FaCheck, FaTrash, FaPlus, FaShieldAlt 
} from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// --- FIXED PHONE INPUT IMPORT ---
import _PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const PhoneInput = _PhoneInput.default || _PhoneInput;

// --- ETA ELIGIBLE COUNTRIES LIST ---
const ETA_ELIGIBLE_NAMES = [
    "Andorra", "Antigua and Barbuda", "Argentina", "Australia", "Austria", "Bahamas", "Bahrain", 
    "Barbados", "Belgium", "Belize", "Botswana", "Brazil", "Brunei", "Bulgaria", "Canada", "Chile", 
    "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", 
    "Germany", "Greece", "Grenada", "Guatemala", "Guyana", "Hong Kong", "Hungary", "Iceland", 
    "Italy", "Japan", "Kiribati", "South Korea", "Kuwait", "Latvia", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Macao", "Malaysia", "Maldives", "Malta", "Marshall Islands", "Mauritius", 
    "Mexico", "Micronesia", "Monaco", "Nauru", "Netherlands", "New Zealand", "Nicaragua", "Norway", 
    "Oman", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Poland", "Portugal", 
    "Qatar", "Romania", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
    "Samoa", "San Marino", "Saudi Arabia", "Seychelles", "Singapore", "Slovakia", "Slovenia", 
    "Solomon Islands", "Spain", "Sweden", "Switzerland", "Taiwan", "Tonga", "Trinidad and Tobago", 
    "Tuvalu", "United Arab Emirates", "United States", "Uruguay"
];

// --- UI HELPERS ---
const SectionHeader = ({ title }) => (
  <div className="w-full bg-[#002d85] text-white py-4 px-8 rounded-xl mb-10 shadow-lg flex items-center gap-3">
    <div className="w-1 h-6 bg-blue-300/50 rounded-full" />
    <h2 className="text-xl font-bold tracking-wide uppercase">{title}</h2>
  </div>
);

const FormLabel = ({ children, required = false }) => (
  <label className="block text-sm font-bold text-[#002d85] mb-2 uppercase tracking-tight">
    {children} {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const RadioButton = ({ label, name, value, checked, onChange }) => (
  <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${checked ? 'bg-[#002d85] border-[#002d85] text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}>
    <input type="radio" name={name} value={value} className="hidden" onChange={onChange} checked={checked} />
    <span className="font-bold uppercase tracking-widest text-sm text-center">{label}</span>
  </label>
);

const SexyCountrySelect = ({ value, onChange, placeholder = "Select Country", countries }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    const selected = countries.find(c => c.name.common === value);
  
    return (
      <div className="relative" ref={dropdownRef}>
        <div onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl cursor-pointer transition-all ${isOpen ? 'border-[#002d85] bg-white ring-4 ring-blue-50' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            {selected ? (
              <><img src={selected.flags.svg} alt="" className="w-6 h-4 object-cover rounded-sm" /><span className="font-semibold text-gray-800">{selected.name.common}</span></>
            ) : (
              <><FaGlobe className="text-gray-400" /><span className="text-gray-400 font-medium">{placeholder}</span></>
            )}
          </div>
          <FaChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-50">
                <input type="text" placeholder="Search..." className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filtered.length > 0 ? filtered.map(c => (
                  <div key={c.name.common} onClick={() => { onChange(c.name.common); setIsOpen(false); }} className="flex items-center gap-3 px-6 py-4 hover:bg-blue-50 cursor-pointer">
                    <img src={c.flags.svg} className="w-6 h-4 object-cover" alt="" /><span className="text-sm font-bold text-gray-700">{c.name.common}</span>
                  </div>
                )) : <div className="p-4 text-center text-gray-400 text-xs font-bold uppercase">No results found</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
};

const FileUploadField = ({ label, instructions, exampleImg, id, file, setFile, showMultipleExamples = false }) => {
    const [preview, setPreview] = useState(null);
    const [isPdf, setIsPdf] = useState(false);
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        // Check file size (5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            alert(`File size too large! Please select a file smaller than 5MB. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB.`);
            e.target.value = ''; // Clear the input
            return;
        }
        
        setFile(selectedFile);
    };
    
    useEffect(() => {
        if (!file) { 
            setPreview(null); 
            setIsPdf(false);
            return; 
        }
        
        if (file.type === 'application/pdf') {
            setIsPdf(true);
            setPreview(null);
        } else {
            setIsPdf(false);
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-start">
            <div className="space-y-4">
                <FormLabel required>{label}</FormLabel>
                <label htmlFor={id} className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${file ? 'border-green-500 bg-green-50' : 'border-blue-100 bg-blue-50/20 hover:border-[#002d85]'}`}>
                    {isPdf ? (
                        <div className="text-center">
                            <div className="text-4xl text-red-600 mb-2">📄</div>
                            <p className="text-sm text-green-600 font-bold">{file.name}</p>
                            <p className="text-xs text-gray-500">PDF Document ({(file.size / (1024 * 1024)).toFixed(2)}MB)</p>
                        </div>
                    ) : preview ? (
                        <div className="text-center">
                            <img src={preview} alt="Preview" className="h-32 object-contain rounded-xl" />
                            <p className="text-xs text-gray-500 mt-2">({(file.size / (1024 * 1024)).toFixed(2)}MB)</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <FaCloudUploadAlt className="text-3xl text-[#002d85]/40 mx-auto mb-2" />
                            <p className="text-sm text-[#002d85] font-bold">Choose File</p>
                            <p className="text-xs text-gray-500 mt-1">Images or PDF (Max 5MB)</p>
                        </div>
                    )}
                    <input id={id} type="file" className="hidden" accept="image/jpeg, image/jpg, image/png, image/heic, application/pdf" onChange={handleFileChange} />
                </label>
                <p className="p-4 bg-gray-50 rounded-2xl text-[11px] text-gray-500 italic whitespace-pre-line">{instructions}</p>
            </div>
            <div className="space-y-4">
                <p className="text-sm font-bold text-gray-800">{showMultipleExamples ? 'Examples' : 'Example'}</p>
                {showMultipleExamples ? (
                    <div className="grid grid-cols-2 gap-3">
                        <img src={exampleImg} alt="Example 1" className="w-full rounded-2xl border-2 border-gray-100 grayscale-[0.3]" />
                        <img src="https://res.cloudinary.com/dhxzk7pgp/image/upload/v1767877316/examples_pj2wlj.webp" alt="Example 2" className="w-32 h-96 rounded-2xl border-2 border-gray-100 grayscale-[0.3]" />
                    </div>
                ) : (
                    <img src={exampleImg} alt="Example" className="w-full max-w-[200px] rounded-2xl border-2 border-gray-100 grayscale-[0.3]" />
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const UKETAApplication = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [etaCountries, setEtaCountries] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [countryCode, setCountryCode] = useState('1'); 
    
    // Get today's date in YYYY-MM-DD format for input constraints
    const today = new Date().toISOString().split('T')[0];

    const [globalDeclarations, setGlobalDeclarations] = useState({
        confirmCorrect: false,
        acceptTerms: false,
        confirmBusinessDays: false
    });

    const createNewApplicant = () => ({
        id: Date.now() + Math.random(),
        nationality: '', arrivalDate: '', hasAnotherInitial: 'no', extraNationalities: [],
        fullName: '', phone: '', email: '',
        street: '', building: '', apartment: '', area: '', postal: '', additionalAddress: '', town: '', country: '',
        hasJob: '', jobDetails: '',
        hasCriminalConviction: '', convictedLast12Months: '', crimeDescription: '',
        convictionCountry: '', sentencedOver12Months: '', otherCrimesLast12Months: '',
        prisonSentenceDetails: '', convictionDate: '', prisonConvictionCountry: '',
        securityRisk: '', warCrimes: false, terrorism: false, extremism: false,
        passportFile: null, photoFile: null
    });

    const [applicants, setApplicants] = useState([createNewApplicant()]);

    useEffect(() => {
        const fetchCountryCode = async () => {
          try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            setCountryCode(data.country_code?.toLowerCase() || 'us'); 
          } catch (error) {
            setCountryCode('us'); 
          }
        };
        fetchCountryCode();
    }, []);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setAllCountries(sorted);
                const filtered = sorted.filter(c => ETA_ELIGIBLE_NAMES.includes(c.name.common));
                setEtaCountries(filtered);
            });
    }, []);

    useEffect(() => {
        if (applicants.length > 1) {
            const lastApplicant = applicants[applicants.length - 1];
            setTimeout(() => {
                const element = document.getElementById(`applicant-section-${lastApplicant.id}`);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [applicants.length]);

    const updateApp = (id, field, value) => {
        setApplicants(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const addApplicant = () => { if (applicants.length < 10) setApplicants([...applicants, createNewApplicant()]); };
    const removeApplicant = (id) => { if (applicants.length > 1) setApplicants(applicants.filter(a => a.id !== id)); };

    const validateAll = () => {
        for (const [index, app] of applicants.entries()) {
            if (index === 0) {
                // Main applicant - full validation
                if (!app.nationality || !app.fullName || !app.email || !app.passportFile || !app.photoFile) {
                    alert(`Please complete all required fields and uploads for the Main Applicant`);
                    return false;
                }
            } else {
                // Additional applicants - only need passport and photo
                if (!app.passportFile || !app.photoFile) {
                    alert(`Please upload passport copy and personal photo for Additional Applicant #${index}`);
                    return false;
                }
            }
        }
        if (!globalDeclarations.confirmCorrect || !globalDeclarations.acceptTerms || !globalDeclarations.confirmBusinessDays) {
            alert("Please complete the Declarations section at the bottom.");
            return false;
        }
        return true;
    };

    const handlePaymentSuccess = async (details) => {
        setIsSubmitting(true);
        setTransactionId(details.id); // Store transaction ID immediately
        
        const formData = new FormData();
        formData.append('paymentId', details.id);
        formData.append('totalPaid', (applicants.length * 120).toString());
        formData.append('applicantCount', applicants.length);

        applicants.forEach((app, i) => {
            Object.keys(app).forEach(key => {
                if (!['passportFile', 'photoFile', 'extraNationalities'].includes(key)) {
                    formData.append(`app_${i}_${key}`, app[key]);
                }
            });
            formData.append(`app_${i}_extraNationalities`, JSON.stringify(app.extraNationalities));
            if (app.passportFile) formData.append(`passport_${i}`, app.passportFile);
            if (app.photoFile) formData.append(`photo_${i}`, app.photoFile);
        });

        try {
            // Show success immediately after payment
            setIsSuccess(true);
            setIsSubmitting(false);
            window.scrollTo(0, 0);
            
            // Send data to backend asynchronously (don't wait for email)
            fetch('/api/applications', { method: 'POST', body: formData })
                .then(res => {
                    if (!res.ok) {
                        console.error('Backend submission failed, but payment was successful');
                    }
                })
                .catch(e => {
                    console.error('Backend error, but payment was successful:', e);
                });
                
        } catch (e) { 
            alert("Payment successful but there was a network issue. Your application is being processed.");
            setIsSuccess(true);
            setIsSubmitting(false);
        }
    };

    if (isSuccess) return (
        <div className="min-h-screen mt-20 bg-gradient-to-br from-[#f3f6ff] via-white to-[#f3f6ff] flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Success Animation Container */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-8"
                >
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                        >
                            <FaCheck className="text-5xl text-white" />
                        </motion.div>
                        
                        {/* Animated rings */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ delay: 0.4, duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 w-32 h-32 mx-auto border-4 border-green-400 rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 w-32 h-32 mx-auto border-2 border-green-300 rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-[#002d85] mb-4 tracking-tight">
                        APPLICATION SUBMITTED!
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Your UK EETA application has been received successfully
                    </p>
                </motion.div>

                {/* Transaction Details Card */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 mb-8"
                >
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 bg-[#002d85] text-white px-6 py-3 rounded-2xl mb-6">
                            <FaShieldAlt className="text-lg" />
                            <span className="font-bold uppercase tracking-widest text-sm">Transaction Confirmed</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Transaction ID</p>
                                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                                    <p className="text-2xl font-black text-[#002d85] tracking-wider font-mono">
                                        {transactionId}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Applicants</p>
                                    <p className="text-xl font-black text-[#002d85]">{applicants.length}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Amount Paid</p>
                                    <p className="text-xl font-black text-green-600">${applicants.length * 120}.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-blue-50 rounded-[2rem] border border-blue-100 p-6 mb-8"
                >
                    <h3 className="text-lg font-black text-[#002d85] mb-4 text-center">What happens next?</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#002d85] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                            <p><strong>Confirmation Email:</strong> Check your inbox for application details and receipt</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#002d85] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                            <p><strong>Processing:</strong> Your application will be processed within 24-72 hours</p>
                        </div>
                        {/* <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#002d85] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                            <p><strong>ETA Delivery:</strong> Your UK ETA will be sent to your email once approved</p>
                        </div> */}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-[#002d85] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#001a4f] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Submit Another Application
                    </button>
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="bg-white text-[#002d85] border-2 border-[#002d85] px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#002d85] hover:text-white transition-all shadow-lg"
                    >
                        Return to Home
                    </button>
                </motion.div>
            </div>
        </div>
    );

    return (
        <PayPalScriptProvider options={{ "client-id": "AQSk-kF_6PJF925qFQVBMgxq43ARQaBCyH96KPZaEhYhzUW4HsNUwox3zkKKRqNXYwTNDMV7HOiP5Dvu", currency: "USD", "disable-funding": "credit,card,paylater" }}>
            <div className="min-h-screen bg-[#f3f6ff] py-16 px-4">
                
                <style>{`
                    .sexy-phone-input .form-control {
                        width: 100% !important;
                        height: 60px !important;
                        background: #f9fafb !important;
                        border: 2px solid #f3f4f6 !important;
                        border-radius: 1rem !important;
                        font-family: inherit !important;
                        font-weight: 600 !important;
                    }
                    .sexy-phone-input .form-control:focus { border-color: #002d85 !important; background: white !important; box-shadow: 0 0 0 4px rgba(0, 45, 133, 0.05) !important; }
                    .sexy-phone-input .flag-dropdown { background: transparent !important; border: none !important; border-radius: 1rem 0 0 1rem !important; }
                    .sexy-phone-input .selected-flag { background: transparent !important; border-radius: 1rem 0 0 1rem !important; }
                    
                    /* BETTER CALENDAR UI */
                    input[type="date"] {
                        position: relative;
                        appearance: none;
                        -webkit-appearance: none;
                        min-height: 60px;
                    }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        background: transparent;
                        bottom: 0;
                        color: transparent;
                        cursor: pointer;
                        height: auto;
                        left: 0;
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: auto;
                    }
                    input[type="date"]::after {
                        content: attr(placeholder);
                        color: #9ca3af;
                    }
                `}</style>

                <div className="max-w-5xl mt-10 mx-auto">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white mb-10">
                        
                        {/* <div className="p-12 md:p-20 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
                            <h1 className="text-5xl md:text-6xl font-black text-[#002d85] tracking-tighter mb-4 uppercase">UK EETA Group Application</h1>
                        </div> */}

                        {applicants.map((app, index) => (
                            <div key={app.id} id={`applicant-section-${app.id}`} className={`p-12 md:p-20 space-y-20 ${index !== 0 ? 'border-t-8 border-gray-50' : ''}`}>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl font-black text-[#002d85] uppercase">
                                        {index === 0 ? 'Applicant Form' : `Additional Applicant #${index}`}
                                    </h2>
                                    {applicants.length > 1 && (
                                        <button onClick={() => removeApplicant(app.id)} className="text-red-500 p-4 hover:bg-red-50 rounded-2xl transition-all"><FaTrash /></button>
                                    )}
                                </div>

                                {/* For additional applicants, only show basic info and file uploads */}
                                {index === 0 ? (
                                    <>
                                        <section className="grid md:grid-cols-2 gap-10">
                                            <div>
                                                <FormLabel required>Current Nationality</FormLabel>
                                                <SexyCountrySelect countries={etaCountries} value={app.nationality} onChange={(v) => updateApp(app.id, 'nationality', v)} />
                                            </div>
                                            <div>
                                                <FormLabel required>Arrival Date</FormLabel>
                                                <div className="relative">
                                                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    <input 
                                                        type="date" 
                                                        min={today} 
                                                        value={app.arrivalDate} 
                                                        onChange={(e) => updateApp(app.id, 'arrivalDate', e.target.value)} 
                                                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85] focus:bg-white font-semibold text-gray-700" 
                                                    />
                                                </div>
                                                
                                            </div>
                                            <div className="md:col-span-2">
                                                <FormLabel required>Do you have other nationalities?</FormLabel>
                                                <div className="flex gap-4">
                                                    <RadioButton label="Yes" name={`has_${app.id}`} value="yes" checked={app.hasAnotherInitial === 'yes'} onChange={() => { updateApp(app.id, 'hasAnotherInitial', 'yes'); if(app.extraNationalities.length===0) updateApp(app.id, 'extraNationalities', ['']); }} />
                                                    <RadioButton label="No" name={`has_${app.id}`} value="no" checked={app.hasAnotherInitial === 'no'} onChange={() => { updateApp(app.id, 'hasAnotherInitial', 'no'); updateApp(app.id, 'extraNationalities', []); }} />
                                                </div>
                                            </div>
                                            {app.hasAnotherInitial === 'yes' && app.extraNationalities.map((extra, exIdx) => (
                                                <div key={exIdx} className="md:col-span-2 p-8 bg-blue-50/30 rounded-[2rem] border border-blue-100">
                                                    <FormLabel>Additional Nationality #{exIdx+1}</FormLabel>
                                                    <SexyCountrySelect countries={etaCountries} value={extra} onChange={(val) => {
                                                        const newEx = [...app.extraNationalities];
                                                        newEx[exIdx] = val;
                                                        updateApp(app.id, 'extraNationalities', newEx);
                                                    }} />
                                                    <button type="button" onClick={() => updateApp(app.id, 'extraNationalities', [...app.extraNationalities, ''])} className="mt-4 text-[#002d85] text-xs font-black uppercase tracking-widest">+ Add Another</button>
                                                </div>
                                            ))}
                                        </section>

                                        <FileUploadField 
                                            label="Passport Copy" 
                                            id={`pass-${app.id}`} 
                                            file={app.passportFile} 
                                            setFile={(f) => updateApp(app.id, 'passportFile', f)}
                                            instructions={`Passport Copy*
The photo must be unaltered by effects or filters
original, not a screenshot or photocopy
in colour, horizontal (landscape)
all 4 corners of the personal details page must be visible
clear and in focus, without glare or reflections
JPEG, HEIC, PNG or PDF, 5MB max`}
                                            exampleImg="https://res.cloudinary.com/dhxzk7pgp/image/upload/v1767877181/passport_xoywse.webp"
                                        />

                                        <section>
                                            <SectionHeader title="Personal Details" />
                                            <div className="grid md:grid-cols-2 gap-10 mb-12">
                                                <div className="md:col-span-2"><FormLabel required>Full Name</FormLabel><input placeholder="As in passport" value={app.fullName} onChange={(e) => updateApp(app.id, 'fullName', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" /></div>
                                                
                                                <div className="sexy-phone-input">
                                                    <FormLabel required>Phone Number</FormLabel>
                                                    <PhoneInput
                                                        country={countryCode}
                                                        value={app.phone}
                                                        onChange={(val) => updateApp(app.id, 'phone', val)}
                                                        enableSearch={true}
                                                        containerClass="w-full"
                                                        inputProps={{ name: `phone_${app.id}`, required: true }}
                                                    />
                                                </div>

                                                <div><FormLabel required>Email Address</FormLabel><input type="email" placeholder="example@mail.com" value={app.email} onChange={(e) => updateApp(app.id, 'email', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" /></div>
                                            </div>
                                            <FileUploadField 
                                                label="Personal Photo" 
                                                id={`photo-${app.id}`} 
                                                file={app.photoFile} 
                                                setFile={(f) => updateApp(app.id, 'photoFile', f)} 
                                                instructions={`Personal Photo*
JPEG, HEIC, PNG or PDF, 5MB max
The photo must be unaltered by effects or filters
original, not a screenshot or photocopy
with a plain light background
no objects or people behind you
with no shadows or glare on your face or behind you
without glasses
your head, shoulders and upper body must be visible
in colour, recently taken (no more than 3 months old)
vertical (portrait)
with a neutral facial expression`}
                                                exampleImg="https://res.cloudinary.com/dhxzk7pgp/image/upload/v1767877181/photo_knna2a.webp"
                                                showMultipleExamples={true}
                                            />
                                        </section>

                                        <section>
                                            <SectionHeader title="Home Address" />
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <FormLabel required>Street Name</FormLabel>
                                                    <input placeholder="Street Name" value={app.street} onChange={(e) => updateApp(app.id, 'street', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel required>Building/Villa No.</FormLabel>
                                                    <input placeholder="Building/Villa No." value={app.building} onChange={(e) => updateApp(app.id, 'building', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel>Apartment (if applicable)</FormLabel>
                                                    <input placeholder="Apartment" value={app.apartment} onChange={(e) => updateApp(app.id, 'apartment', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel>Area (optional)</FormLabel>
                                                    <input placeholder="Area" value={app.area} onChange={(e) => updateApp(app.id, 'area', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel required>Postal code or zip code</FormLabel>
                                                    <input placeholder="Postal code or zip code" value={app.postal} onChange={(e) => updateApp(app.id, 'postal', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel>Additional address (optional)</FormLabel>
                                                    <input placeholder="Additional address" value={app.additionalAddress} onChange={(e) => updateApp(app.id, 'additionalAddress', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel required>Town or City</FormLabel>
                                                    <input placeholder="Town or City" value={app.town} onChange={(e) => updateApp(app.id, 'town', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85]" />
                                                </div>
                                                <div>
                                                    <FormLabel required>Country</FormLabel>
                                                    <SexyCountrySelect countries={allCountries} value={app.country} onChange={(v) => updateApp(app.id, 'country', v)} placeholder="Select Country" />
                                                </div>
                                            </div>
                                        </section>

                                        <section className="space-y-16">
                                            <SectionHeader title="Additional Information" />
                                            <div className="space-y-6">
                                                <FormLabel required>Do you have a job? This includes self-employment.</FormLabel>
                                                <div className="flex gap-4">
                                                    <RadioButton label="Yes" name={`job_${app.id}`} value="yes" checked={app.hasJob === 'yes'} onChange={() => updateApp(app.id, 'hasJob', 'yes')} />
                                                    <RadioButton label="No" name={`job_${app.id}`} value="no" checked={app.hasJob === 'no'} onChange={() => updateApp(app.id, 'hasJob', 'no')} />
                                                </div>
                                                {app.hasJob === 'yes' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                                        <FormLabel required>Describe your job (200 characters max)</FormLabel>
                                                        <textarea maxLength="200" placeholder="Job title and company..." value={app.jobDetails} onChange={(e) => updateApp(app.id, 'jobDetails', e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none min-h-[100px] focus:border-[#002d85]" />
                                                        <p className="text-right text-[10px] text-gray-400 font-bold mt-1">{(app.jobDetails || '').length}/200</p>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="space-y-8">
                                                <FormLabel required>Have you ever had a criminal conviction? (Any country)</FormLabel>
                                                <div className="flex gap-4">
                                                    <RadioButton label="Yes" name={`crim_${app.id}`} value="yes" checked={app.hasCriminalConviction === 'yes'} onChange={() => updateApp(app.id, 'hasCriminalConviction', 'yes')} />
                                                    <RadioButton label="No" name={`crim_${app.id}`} value="no" checked={app.hasCriminalConviction === 'no'} onChange={() => updateApp(app.id, 'hasCriminalConviction', 'no')} />
                                                </div>
                                                <p className="text-xs text-gray-400 italic">Exclude activities legal in the UK (e.g. trade unions).</p>

                                                {app.hasCriminalConviction === 'yes' && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100 space-y-12">
                                                        <div className="space-y-6">
                                                            <FormLabel required>Have you been convicted of a crime in the last 12 months?</FormLabel>
                                                            <div className="flex gap-4">
                                                                <RadioButton label="Yes" name={`last12_${app.id}`} value="yes" checked={app.convictedLast12Months === 'yes'} onChange={() => updateApp(app.id, 'convictedLast12Months', 'yes')} />
                                                                <RadioButton label="No" name={`last12_${app.id}`} value="no" checked={app.convictedLast12Months === 'no'} onChange={() => updateApp(app.id, 'convictedLast12Months', 'no')} />
                                                            </div>
                                                            {app.convictedLast12Months === 'yes' && (
                                                                <div className="bg-white p-6 rounded-2xl space-y-4 shadow-sm border border-blue-100">
                                                                    <FormLabel required>Crime Description (1,000 chars max)</FormLabel>
                                                                    <textarea maxLength="1000" value={app.crimeDescription} onChange={(e) => updateApp(app.id, 'crimeDescription', e.target.value)} className="w-full p-4 border-2 rounded-xl outline-none min-h-[100px]" />
                                                                    <FormLabel required>Which country?</FormLabel>
                                                                    <SexyCountrySelect countries={allCountries} value={app.convictionCountry} onChange={(v) => updateApp(app.id, 'convictionCountry', v)} />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-6 pt-8 border-t border-blue-100">
                                                            <FormLabel required>Were you sentenced to more than 12 months in prison?</FormLabel>
                                                            <div className="flex gap-4">
                                                                <RadioButton label="Yes" name={`sentenced_${app.id}`} value="yes" checked={app.sentencedOver12Months === 'yes'} onChange={() => updateApp(app.id, 'sentencedOver12Months', 'yes')} />
                                                                <RadioButton label="No" name={`sentenced_${app.id}`} value="no" checked={app.sentencedOver12Months === 'no'} onChange={() => updateApp(app.id, 'sentencedOver12Months', 'no')} />
                                                            </div>

                                                            {app.sentencedOver12Months === 'yes' && (
                                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                                                    <div className="space-y-4">
                                                                        <FormLabel required>Any other crimes in last 12 months?</FormLabel>
                                                                        <div className="flex gap-4">
                                                                            <RadioButton label="Yes" name={`otherCrim_${app.id}`} value="yes" checked={app.otherCrimesLast12Months === 'yes'} onChange={() => updateApp(app.id, 'otherCrimesLast12Months', 'yes')} />
                                                                            <RadioButton label="No" name={`otherCrim_${app.id}`} value="no" checked={app.otherCrimesLast12Months === 'no'} onChange={() => updateApp(app.id, 'otherCrimesLast12Months', 'no')} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-8 bg-white rounded-[2rem] border-2 border-blue-50 shadow-sm space-y-6">
                                                                        <h4 className="font-black text-[#002d85] text-lg uppercase tracking-tighter">Prison sentence details</h4>
                                                                        <div className="space-y-2">
                                                                            <FormLabel required>Crime description (500 chars limit)</FormLabel>
                                                                            <textarea maxLength="500" value={app.prisonSentenceDetails} onChange={(e) => updateApp(app.id, 'prisonSentenceDetails', e.target.value)} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85] min-h-[100px]" />
                                                                        </div>
                                                                        <div className="grid md:grid-cols-2 gap-6">
                                                                            <div className="space-y-2">
                                                                                <FormLabel required>Conviction Date</FormLabel>
                                                                                <div className="relative">
                                                                                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                                    <input 
                                                                                        type="date" 
                                                                                        max={today} 
                                                                                        value={app.convictionDate} 
                                                                                        onChange={(e) => updateApp(app.id, 'convictionDate', e.target.value)} 
                                                                                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#002d85] focus:bg-white font-semibold text-gray-700" 
                                                                                    />
                                                                                </div>
                                                                                <p className="mt-1 text-[10px] text-gray-400 font-bold uppercase">Must be today or in the past</p>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <FormLabel required>Country of Conviction</FormLabel>
                                                                                <SexyCountrySelect countries={allCountries} value={app.prisonConvictionCountry} onChange={(v) => updateApp(app.id, 'prisonConvictionCountry', v)} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="space-y-10">
                                                <SectionHeader title="Security Questions" />
                                                <FormLabel required>Have you ever been involved in, or suspected of, any of the following?</FormLabel>
                                                <ul className="list-disc ml-6 text-sm text-gray-500 space-y-2 font-medium italic">
                                                    <li>War crimes, genocide or crimes against humanity</li>
                                                    <li>Terrorism including support for, or membership of, terrorist groups</li>
                                                    <li>Supporting extremist groups or expressing extremist views</li>
                                                </ul>
                                                <div className="flex gap-4 mt-4">
                                                    <RadioButton label="Yes" name={`sec_${app.id}`} value="yes" checked={app.securityRisk === 'yes'} onChange={() => updateApp(app.id, 'securityRisk', 'yes')} />
                                                    <RadioButton label="No" name={`sec_${app.id}`} value="no" checked={app.securityRisk === 'no'} onChange={() => updateApp(app.id, 'securityRisk', 'no')} />
                                                </div>

                                                {app.securityRisk === 'yes' && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-8 bg-red-50/30 rounded-[2rem] border-2 border-red-100 space-y-4">
                                                        <FormLabel required>Select all that apply:</FormLabel>
                                                        {[
                                                            { key: 'warCrimes', label: 'War crimes', sub: 'Includes genocide or crimes against humanity' },
                                                            { key: 'terrorism', label: 'Terrorism', sub: 'Includes support for, or membership of groups' },
                                                            { key: 'extremism', label: 'Extremism', sub: 'Supporting groups or expressing views' }
                                                        ].map(risk => (
                                                            <label key={risk.key} className="flex items-start gap-4 p-4 bg-white rounded-2xl border cursor-pointer group">
                                                                <input type="checkbox" checked={app[risk.key]} onChange={(e) => updateApp(app.id, risk.key, e.target.checked)} className="mt-1 w-6 h-6 accent-red-600" />
                                                                <div>
                                                                    <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors uppercase text-xs">{risk.label}</p>
                                                                    <p className="text-[10px] text-gray-500">{risk.sub}</p>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </section>
                                    </>
                                ) : (
                                    /* Additional Applicant - Only Photo and Passport */
                                    <div className="space-y-16">
                                        <div className="p-6 bg-blue-50/30 rounded-[2rem] border border-blue-100">
                                            <p className="text-sm text-gray-600 font-medium">
                                                <FaShieldAlt className="inline mr-2 text-[#002d85]" />
                                                Additional applicants only need to provide passport copy and personal photo. All other details will be shared from the main applicant.
                                            </p>
                                        </div>
                                        
                                        <FileUploadField 
                                            label="Passport Copy" 
                                            id={`pass-${app.id}`} 
                                            file={app.passportFile} 
                                            setFile={(f) => updateApp(app.id, 'passportFile', f)}
                                            instructions={`Passport Copy*
The photo must be unaltered by effects or filters
original, not a screenshot or photocopy
in colour, horizontal (landscape)
all 4 corners of the personal details page must be visible
clear and in focus, without glare or reflections
JPEG, HEIC, PNG or PDF, 5MB max`}
                                            exampleImg="https://uketa.com/wp-content/themes/guide/guide_custom_form/imgs/passport.webp"
                                        />

                                        <FileUploadField 
                                            label="Personal Photo" 
                                            id={`photo-${app.id}`} 
                                            file={app.photoFile} 
                                            setFile={(f) => updateApp(app.id, 'photoFile', f)} 
                                            instructions={`Personal Photo*
JPEG, HEIC, PNG or PDF, 5MB max
The photo must be unaltered by effects or filters
original, not a screenshot or photocopy
with a plain light background
no objects or people behind you
with no shadows or glare on your face or behind you
without glasses
your head, shoulders and upper body must be visible
in colour, recently taken (no more than 3 months old)
vertical (portrait)
with a neutral facial expression`}
                                            exampleImg="https://uketa.com/wp-content/themes/guide/guide_custom_form/imgs/photo.webp"
                                            showMultipleExamples={true}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        <section className="p-12 md:p-20 space-y-12 bg-gray-50/50 border-t-4 border-gray-100">
                            <SectionHeader title="Declarations" />
                            <div className="flex items-start gap-5 p-8 bg-white rounded-[2.5rem] border border-gray-200 shadow-sm">
                                <input type="checkbox" checked={globalDeclarations.confirmCorrect} onChange={(e) => setGlobalDeclarations({...globalDeclarations, confirmCorrect: e.target.checked})} className="mt-1.5 w-6 h-6 min-w-[24px] accent-[#002d85]" />
                                <div className="text-sm text-gray-600 leading-relaxed font-medium">
                                    <span className="text-red-500 font-bold">*</span> By sending this application, you confirm that, to the best of your knowledge, the information you have given is correct.
                                    <div className="mt-4 space-y-2 text-[11px] text-gray-500 italic">
                                        <p className="font-bold uppercase text-gray-800 not-italic">False information results in:</p>
                                        <ul className="list-disc ml-5"><li>Refusal</li><li>Prosecution</li><li>UK Ban</li></ul>
                                    </div>
                                </div>
                            </div>
                            <label className="flex items-start gap-5 cursor-pointer group">
                                <input type="checkbox" checked={globalDeclarations.acceptTerms} onChange={(e) => setGlobalDeclarations({...globalDeclarations, acceptTerms: e.target.checked})} className="mt-1 w-6 h-6 min-w-[24px] accent-[#002d85]" />
                                <p className="text-sm text-gray-700 font-bold"><span className="text-red-500">*</span> I have read and understood the <a href="https://eeta.uk/terms" target="_blank" rel="noopener noreferrer" className="underline decoration-blue-200 hover:text-[#002d85]">Terms and Conditions</a> and <a href="https://eeta.uk/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-blue-200 hover:text-[#002d85]">Privacy Policy</a>.</p>
                            </label>
                            <label className="flex items-start gap-5 cursor-pointer group">
                                <input type="checkbox" checked={globalDeclarations.confirmBusinessDays} onChange={(e) => setGlobalDeclarations({...globalDeclarations, confirmBusinessDays: e.target.checked})} className="mt-1 w-6 h-6 min-w-[24px] accent-[#002d85]" />
                                <p className="text-sm text-gray-700 font-bold uppercase tracking-tight"><span className="text-red-500">*</span> I understand processing takes <span className="text-[#002d85]">UP TO 3 BUSINESS DAYS</span>. My arrival is at least 3 business days from today.</p>
                            </label>
                        </section>

                        <div className="bg-[#002d85] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="text-white">
                                <p className="text-blue-300 font-black uppercase text-xs mb-2">Processing fee</p>
                                <div className="text-7xl font-black tracking-tighter">${applicants.length * 120}.00</div>
                                <p className="text-blue-300/60 font-bold text-sm mt-2 uppercase tracking-widest">{applicants.length} Applicant(s) Included</p>
                            </div>
                            <div className="w-full md:w-[350px]">
                                {isSubmitting ? (
                                    <div className="text-white font-bold flex flex-col items-center"><FaSpinner className="animate-spin text-4xl mb-2" /> UPLOADING...</div>
                                ) : !showPayment ? (
                                    <div className="flex flex-col gap-4">
                                        {applicants.length < 10 && (
                                            <button onClick={addApplicant} className="bg-white/10 text-white border-2 border-white/20 py-4 rounded-3xl font-black uppercase text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-2"><FaPlus /> Add Applicant</button>
                                        )}
                                        <button onClick={() => validateAll() && setShowPayment(true)} className="w-full py-7 bg-white text-[#002d85] text-xl font-black rounded-[2rem] hover:scale-105 transition-all uppercase shadow-2xl">Confirm & Pay</button>
                                    </div>
                                ) : (
                                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                                        <PayPalButtons 
                                            createOrder={(d, a) => a.order.create({ purchase_units: [{ amount: { value: (applicants.length * 120).toString() } }] })}
                                            onApprove={(d, a) => a.order.capture().then(handlePaymentSuccess)}
                                        />
                                        <button onClick={() => setShowPayment(false)} className="w-full text-center text-[10px] text-gray-400 font-bold mt-2 uppercase">← Edit Details</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default UKETAApplication;