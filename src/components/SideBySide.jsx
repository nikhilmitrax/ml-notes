import React from 'react';

const SideBySide = ({ children, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
            {children}
        </div>
    );
};

export default SideBySide;
