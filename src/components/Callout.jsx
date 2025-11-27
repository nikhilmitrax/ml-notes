import React from 'react';
import { AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';

const variants = {
    caution: {
        bg: 'bg-amber-50',
        border: 'border-amber-500',
        iconColor: 'text-amber-600',
        titleColor: 'text-amber-800',
        textColor: 'text-amber-700',
        icon: AlertTriangle,
        defaultTitle: 'Caution'
    },
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-800',
        textColor: 'text-blue-700',
        icon: Info,
        defaultTitle: 'Note'
    },
    warning: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        iconColor: 'text-red-600',
        titleColor: 'text-red-800',
        textColor: 'text-red-700',
        icon: AlertCircle,
        defaultTitle: 'Warning'
    },
    tip: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-500',
        iconColor: 'text-emerald-600',
        titleColor: 'text-emerald-800',
        textColor: 'text-emerald-700',
        icon: CheckCircle,
        defaultTitle: 'Tip'
    }
};

const Callout = ({ type = 'info', title, children, className = '' }) => {
    const variant = variants[type] || variants.info;
    const Icon = variant.icon;

    return (
        <div className={`${variant.bg} border-l-4 ${variant.border} p-4 mb-6 rounded-r-lg ${className}`}>
            <div className="flex items-start gap-3">
                <div className="mt-0.5">
                    <Icon className={variant.iconColor} size={24} />
                </div>
                <div>
                    <h4 className={`font-bold ${variant.titleColor} mb-1`}>
                        {title || variant.defaultTitle}
                    </h4>
                    <div className={`${variant.textColor} text-sm`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Callout;
