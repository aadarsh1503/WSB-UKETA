import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components Imports
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import EtaApplicationForm from "./Components/EtaApplicationForm/EtaApplicationForm";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactSection from "./Components/ContactSection/ContactSection";
import TermsOfService from "./Components/TermsOfService/TermsOfService";
import PurchaseRefundPolicy from "./Components/TermsOfService/PurchaseRefundPolicy";
import CookiePolicy from "./Components/TermsOfService/CookiePolicy";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Disclaimer from "./Components/TermsOfService/Disclaimer";
import Navbar from "./Components/Navbar/Navbar";

// Import ScrollToTop Component
import ScrollToTop from "./Components/ScrollToTop"; 

function App() {
  return (
    <Router>
     
      <ScrollToTop />
      
      <Navbar />
      
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<EtaApplicationForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/terms-of-Service" element={<TermsOfService />} />
        <Route path="/purchase-Refund" element={<PurchaseRefundPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>


      <Footer />
    </Router>
  );
}

export default App;