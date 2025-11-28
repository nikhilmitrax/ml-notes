import React from 'react';

const Paragraph = ({ children, className = "", variant = "default" }) => {
    const variants = {
        default: "text-gray-700 dark:text-slate-300 leading-relaxed mb-4 text-base",
        small: "text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-4",
        caption: "text-xs text-gray-500 dark:text-slate-500 leading-normal mb-2"
    };

    return (
        <p className={`${variants[variant] || variants.default} ${className}`}>
            {children}
        </p>
    );
};

export default Paragraph;
