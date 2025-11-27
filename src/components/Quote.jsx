import React from 'react';

const Quote = ({ children, className = "" }) => {
    return (
        <blockquote className={`border-l-4 border-slate-300 pl-4 italic text-slate-600 mb-4 ${className}`}>
            {children}
        </blockquote>
    );
};

export default Quote;
