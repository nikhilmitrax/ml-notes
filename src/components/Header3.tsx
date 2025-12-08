import React, { ReactNode } from 'react';

interface Header3Props {
    children?: ReactNode;
    className?: string;
}

const Header3: React.FC<Header3Props> = ({ children, className = "" }) => {
    return (
        <h3 className={`text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 mt-8 ${className}`}>
            {children}
        </h3>
    );
};

export default Header3;
