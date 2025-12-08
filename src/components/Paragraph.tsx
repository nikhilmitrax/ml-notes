import React, { ReactNode } from 'react';

type ParagraphVariant = 'default' | 'small' | 'caption';

interface ParagraphProps {
    children?: ReactNode;
    className?: string;
    variant?: ParagraphVariant;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className = "", variant = "default" }) => {
    const variants: Record<ParagraphVariant, string> = {
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
