import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
    const phoneNumber = '+966554026599';

    const handleClick = () => {
        const text = 'Hello! I need help with my UK ETA application.';
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            className="fixed bottom-6 left-6 z-50"
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className="relative group"
            >
                {/* Animated rings */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-2xl"
                />
                
                {/* Main button */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center">
                    <FaWhatsapp className="text-3xl text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    Chat with us on WhatsApp
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                </div>
            </motion.button>
        </motion.div>
    );
};

export default WhatsAppWidget;
