import React, { ReactNode } from 'react';

interface DecisionStepProps {
    number: number | string;
    title: string;
    children?: ReactNode;
}

const DecisionStep: React.FC<DecisionStepProps> = ({ number, title, children }) => (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-400 font-bold">
            {number}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {children}
            </div>
        </div>
    </div>
);

export default DecisionStep;
