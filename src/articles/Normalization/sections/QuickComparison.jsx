import React from 'react';
import { Grid } from 'lucide-react';
import Section from '../../../components/Section';

const QuickComparison = () => {
    return (
        <Section title="Quick Comparison" icon={Grid}>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Aspect</th>
                            <th className="px-6 py-3">BatchNorm</th>
                            <th className="px-6 py-3">LayerNorm</th>
                            <th className="px-6 py-3">GroupNorm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium">Normalizes over</td>
                            <td className="px-6 py-4">Batch dimension</td>
                            <td className="px-6 py-4">Feature dimension</td>
                            <td className="px-6 py-4">Channel groups</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium">Batch Dependent?</td>
                            <td className="px-6 py-4 text-red-600 font-bold">Yes (Critical)</td>
                            <td className="px-6 py-4 text-green-600">No</td>
                            <td className="px-6 py-4 text-green-600">No</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium">Train vs Inference</td>
                            <td className="px-6 py-4">Different</td>
                            <td className="px-6 py-4">Same</td>
                            <td className="px-6 py-4">Same</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-900">
                            <td className="px-6 py-4 font-medium">Primary Domain</td>
                            <td className="px-6 py-4">Computer Vision (CNNs)</td>
                            <td className="px-6 py-4">NLP (Transformers)</td>
                            <td className="px-6 py-4">Vision (Small Batch)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default QuickComparison;
