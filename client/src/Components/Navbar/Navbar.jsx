import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaBars, FaXmark } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isPolicyActive = [
    '/terms-of-Service', '/purchase-Refund', '/cookies', '/privacy-policy', '/disclaimer'
  ].includes(location.pathname);

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 mx-auto transition-all duration-500 ease-in-out font-sans z-[100]
        ${isVisible || isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'} 
        ${isScrolled 
          ? 'top-4 w-[95%] max-w-6xl rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 py-2 px-6' 
          : 'top-0 w-full rounded-none bg-white border-b border-gray-100 py-3 px-6 lg:px-12' 
        }`}
      >
        <div className="flex items-center justify-between h-full w-full">
          
          {/* LOGO & BRAND TEXT SECTION */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 z-[110] group">
            <img 
              src="LOGO1.png" 
              alt="Logo" 
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-12' : 'h-16'}`} 
            />
            
            {/* TEXT BRANDING */}
            <div className="flex flex-col border-l border-gray-300 pl-3 py-1">
              <div className="flex flex-col leading-none">
                <span className="text-[13px] md:text-[15px] font-black tracking-tighter text-gray-900 uppercase italic">
                  United Kingdom
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-blue-700 tracking-[0.1em] uppercase mt-0.5">
                  Online E-Visa
                </span>
              </div>
              {/* ETA Description - Hidden on small mobile to save space */}
              <span className="hidden sm:block text-[8px] md:text-[9px] text-gray-400 font-medium tracking-wide mt-1 uppercase">
                Electronic Travel Authorisation (ETA)
              </span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-gray-900">
            <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
            <NavLink to="/apply" label="Apply Now" isActive={location.pathname === '/apply'} />
            <NavLink to="/about" label="About Us" isActive={location.pathname === '/about'} />
            <NavLink to="/contact-us" label="Contact" isActive={location.pathname === '/contact-us'} />

            <div 
              className="relative group"
              onMouseEnter={() => setIsPolicyOpen(true)}
              onMouseLeave={() => setIsPolicyOpen(false)}
            >
              <button className={`flex items-center gap-1 py-3 transition-opacity border-b-2 ${isPolicyActive ? 'border-black' : 'border-transparent'}`}>
                POLICIES
                <FaChevronDown className={`text-[10px] transition-transform ${isPolicyOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute right-0 top-full pt-2 w-64 transition-all duration-300 ${isPolicyOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-white shadow-2xl border border-gray-100 rounded-xl py-4 flex flex-col">
                  <DropdownItem to="/terms-of-Service" label="Terms of Service" />
                  <DropdownItem to="/purchase-Refund" label="Purchase Policy" />
                  <DropdownItem to="/cookies" label="Cookie Policy" />
                  <DropdownItem to="/privacy-policy" label="Privacy Policy" />
                  <DropdownItem to="/disclaimer" label="Disclaimer" />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden text-2xl text-black p-2 z-[110]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-white z-[90] lg:hidden transition-transform duration-500 ease-in-out pt-32
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* ... Rest of your mobile menu code ... */}
      </div>
    </>
  );
};

// Helper Components (Keeping your original logic but refining styles)
const NavLink = ({ to, label, isActive }) => (
  <Link 
    to={to} 
    className={`relative py-1 transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
  >
    {label}
    <span className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </Link>
);

const DropdownItem = ({ to, label }) => (
  <Link 
    to={to} 
    className="px-6 py-3 text-[10px] font-bold text-gray-500 hover:text-black hover:bg-gray-50 uppercase tracking-widest transition-colors"
  >
    {label}
  </Link>
);

export default Navbar;