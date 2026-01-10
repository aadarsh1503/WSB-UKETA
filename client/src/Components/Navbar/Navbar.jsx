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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 z-[110] group">
            <img 
              src="LOGO1.png" 
              alt="Logo" 
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`} 
            />
            
            {/* SINGLE ROW BRANDING */}
            <div className="sm:flex items-center"> 
  <span className="text-[11px] md:text-[14px] font-black tracking-tighter text-gray-900 uppercase italic leading-tight md:leading-none">
    United Kingdom online E-Visa 
    <span className="block md:inline md:ml-2 font-bold opacity-70 not-italic">
      ( Electronic Travel Authorisation ETA )
    </span>
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
                <div className="flex flex-col items-center gap-6 py-10">
          {/* Primary Mobile Links */}
          <MobileLink to="/" label="HOME" onClick={toggleMobileMenu} />
          <MobileLink to="/apply" label="APPLY NOW" onClick={toggleMobileMenu} />
          <MobileLink to="/about" label="ABOUT US" onClick={toggleMobileMenu} />
          <MobileLink to="/contact-us" label="CONTACT" onClick={toggleMobileMenu} />
          
          {/* Policy Section */}
          <div className="w-2/3 border-t border-gray-100 mt-6 pt-8 flex flex-col items-center gap-5">
            <span className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mb-2">Legal Policies</span>
            <MobileLink to="/terms-of-Service" label="Terms of Service" onClick={toggleMobileMenu} isSmall />
            <MobileLink to="/purchase-Refund" label="Purchase Policy" onClick={toggleMobileMenu} isSmall />
            <MobileLink to="/cookies" label="Cookie Policy" onClick={toggleMobileMenu} isSmall />
            <MobileLink to="/privacy-policy" label="Privacy Policy" onClick={toggleMobileMenu} isSmall />
            <MobileLink to="/disclaimer" label="Disclaimer" onClick={toggleMobileMenu} isSmall />
          </div>
        </div>
      </div>
    </>
  );
};

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

const MobileLink = ({ to, label, onClick, isSmall }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`transition-colors duration-300 text-xs font-bold text-gray-500 hover:text-black tracking-widest uppercase ${isSmall ? 'text-[10px]' : ''}`}
  >
    {label}
  </Link>
);

export default Navbar;