import React from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: 'Principal Component Analysis (PCA)',
    description: 'Dimensionality reduction method that preserves maximal variance.'
};

export const PCA = () => {
    return (
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Principal Component Analysis (PCA)</h3>
            <p className="text-sm text-slate-600 mb-3">
                Principal Component Analysis (PCA) is a dimensionality reduction method that transforms a large set of variables into a smaller one that still contains most of the information in the large set.
            </p>
            <Equation block>{`\\Sigma = \\frac{1}{n-1} X^T X = V \\Lambda V^T`}</Equation>

            <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-800">Variable Meanings:</p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                    <li><Equation>{`\\Sigma`}</Equation>: Covariance matrix of the data.</li>
                    <li><Equation>{`n`}</Equation>: Number of observations (samples).</li>
                    <li><Equation>{`X`}</Equation>: Centered data matrix (mean subtracted).</li>
                    <li><Equation>{`V`}</Equation>: Matrix of eigenvectors (principal components).</li>
                    <li><Equation>{`\\Lambda`}</Equation>: Diagonal matrix of eigenvalues (variance explained).</li>
                </ul>
            </div>

            <p className="text-sm text-slate-600 italic mt-4">
                It identifies the directions (principal components) along which the variation in the data is maximal.
            </p>
        </div>
    );
};

export default PCA;
