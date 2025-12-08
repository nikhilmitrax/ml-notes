import React, { ReactNode } from 'react';

interface SideBySideProps {
    children?: ReactNode;
    className?: string;
}

const SideBySide: React.FC<SideBySideProps> = ({ children, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
            {children}
        </div>
    );
};

export default SideBySide;
