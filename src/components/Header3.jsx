import React from 'react';

const Header3 = ({ children, className = "" }) => {
    return (
        <h3 className={`text-xl font-semibold text-slate-800 mb-4 mt-8 ${className}`}>
            {children}
        </h3>
    );
};

export default Header3;
