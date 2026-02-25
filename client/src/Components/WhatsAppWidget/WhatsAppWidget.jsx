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
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
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
            </motion.button>

            {/* Text message - always visible */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-2xl border border-gray-100"
            >
                <div className="text-right text-sm font-semibold mb-1" style={{ direction: 'rtl' }}>للمساعدة اضغط هنا للتواصل</div>
                <div className="text-sm font-semibold">For assistance, press here</div>
            </motion.div>
        </motion.div>
    );
};

export default WhatsAppWidget;
