import React, { useState, useEffect } from 'react';
import { FaCrown, FaChevronDown, FaBars, FaXmark } from 'react-icons/fa6';
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

      // 1. Check if user has scrolled away from top (trigger floating effect)
      setIsScrolled(currentScrollY > 20);

      // 2. Hide/Show Logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll Down -> Hide
        setIsVisible(false);
      } else {
        // Scroll Up -> Show
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isPolicyActive = [
    '/terms-of-Service', 
    '/purchase-Refund', 
    '/cookies', 
    '/privacy-policy', 
    '/disclaimer'
  ].includes(location.pathname);

  return (
    <nav 
      className={`fixed z-50 transition-all duration-500 ease-in-out font-sans left-0 right-0 mx-auto
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'} 
      ${isScrolled 
        ? 'top-4 w-[92%] max-w-4xl rounded-full bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200 py-2 px-6' // Floating Pill Style
        : 'top-0 w-full rounded-none max-w-full bg-white border-b border-transparent py-3 px-6 lg:px-12' // Default Top Style
      }`}
    >
      <div className="flex items-center justify-between h-full w-full">
        
        {/* --- LEFT SIDE: LOGO & CTA --- */}
        <div className="flex items-center gap-4 lg:gap-12">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="flex items-center">
             
              <img 
                src="LOGO.png" 
                alt="Logo" 
                className={`transition-all duration-300 ${isScrolled ? 'h-16 w-auto' : 'h-20 w-auto'}`} 
              />
            </div>
          </Link>

          {/* <Link to="/apply">
            <button className="hidden lg:block bg-[#111] text-white px-6 py-2.5 rounded-full text-[10px] lg:text-xs font-bold tracking-widest hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap">
              APPLY NOW
            </button>
          </Link> */}
        </div>

        {/* --- RIGHT SIDE: NAVIGATION LINKS --- */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-md font-bold tracking-widest uppercase text-gray-900">
          <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
          <NavLink to="/apply" label="Apply Now" isActive={location.pathname === '/apply'} />
          <NavLink to="/about" label="About Us" isActive={location.pathname === '/about'} />
          <NavLink to="/contact-us" label="Contact" isActive={location.pathname === '/contact-us'} />

          {/* POLICIES DROPDOWN */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsPolicyOpen(true)}
            onMouseLeave={() => setIsPolicyOpen(false)}
          >
            <button className={`flex uppercase items-center gap-1 py-3 hover:opacity-70 transition-opacity border-b-2 ${isPolicyActive ? 'border-black' : 'border-transparent'}`}>
              Policies
              <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isPolicyOpen ? 'rotate-180' : ''}`} />
            </button>

            <div 
              className={`absolute right-0 top-full mt-2 w-64 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 rounded-xl py-4 flex flex-col transition-all duration-300 origin-top-right overflow-hidden ${
                isPolicyOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
              }`}
            >
              <DropdownItem to="/terms-of-Service" label="Terms of Service" />
              <DropdownItem to="/purchase-Refund" label="Purchase and Refund Policy" />
              <DropdownItem to="/cookies" label="Cookie Policy" />
              <DropdownItem to="/privacy-policy" label="Privacy Policy" />
              <DropdownItem to="/disclaimer" label="Disclaimer" />
            </div>
          </div>
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl text-black p-2">
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-white z-[-1] flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out lg:hidden pt-20 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <MobileLink to="/" label="HOME" onClick={toggleMobileMenu} />
        <MobileLink to="/apply" label="APPLY NOW" onClick={toggleMobileMenu} />
        <MobileLink to="/about" label="ABOUT US" onClick={toggleMobileMenu} />
        <MobileLink to="/contact-us" label="CONTACT" onClick={toggleMobileMenu} />
        
        <div className="flex flex-col items-center gap-4 mt-4 border-t border-gray-100 pt-8 w-1/2 text-center">
          <span className="text-xs text-gray-400 font-mono uppercase">Policies</span>
          <MobileLink to="/terms-of-Service" label="Terms of Service" onClick={toggleMobileMenu} isSmall />
          <MobileLink to="/purchase-Refund" label="Purchase Policy" onClick={toggleMobileMenu} isSmall />
          <MobileLink to="/cookies" label="Cookie Policy" onClick={toggleMobileMenu} isSmall />
          <MobileLink to="/privacy-policy" label="Privacy Policy" onClick={toggleMobileMenu} isSmall />
          <MobileLink to="/disclaimer" label="Disclaimer" onClick={toggleMobileMenu} isSmall />
        </div>
      </div>
    </nav>
  );
};

// --- HELPER COMPONENTS ---

const NavLink = ({ to, label, isActive }) => (
  <Link 
    to={to} 
    className={`relative py-1 group transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}`}
  >
    {label}
    <span className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </Link>
);

const DropdownItem = ({ to, label }) => (
  <Link 
    to={to} 
    className="px-6 py-3 text-xs font-bold text-gray-500 hover:text-black hover:bg-gray-50 uppercase tracking-wide transition-colors text-left"
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, onClick, isSmall }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`${isSmall ? 'text-sm font-medium hover:underline' : 'text-2xl font-bold tracking-tighter hover:text-gray-600'}`}
  >
    {label}
  </Link>
);

export default Navbar;