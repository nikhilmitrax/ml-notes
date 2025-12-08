import React, { ReactNode } from 'react';

interface Header4Props {
    children?: ReactNode;
    className?: string;
}

const Header4: React.FC<Header4Props> = ({ children, className = "" }) => {
    return (
        <h4 className={`font-bold text-slate-800 dark:text-slate-100 mb-2 mt-6 ${className}`}>
            {children}
        </h4>
    );
};

export default Header4;
