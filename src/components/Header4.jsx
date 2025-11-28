import React from 'react';

const Header4 = ({ children, className = "" }) => {
    return (
        <h4 className={`font-bold text-slate-800 dark:text-slate-100 mb-2 mt-6 ${className}`}>
            {children}
        </h4>
    );
};

export default Header4;
