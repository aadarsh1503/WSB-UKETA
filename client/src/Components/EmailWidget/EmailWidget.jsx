import React from 'react';
import { FiMail } from "react-icons/fi"; // Using Feather Icons for a sleek look
import './EmailWidget.css';

const EmailWidget = () => {
  // REPLACE THIS WITH YOUR EMAIL ADDRESS
  const emailAddress = "info@eeta.uk"; 

  return (
    <div className="email-widget-container">
      <a 
        href={`mailto:${emailAddress}`} 
        className="email-widget-btn"
        aria-label="Contact Us via Email"
      >
        <FiMail className="email-icon" />
      </a>
    </div>
  );
};

export default EmailWidget;