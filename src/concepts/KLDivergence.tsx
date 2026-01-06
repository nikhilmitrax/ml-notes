import React from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: 'KL Divergence',
    description: 'Measures how one probability distribution differs from a reference distribution.'
};

export const KLDivergence = () => {
    return (
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">KL Divergence</h3>
            <p className="text-sm text-slate-600 mb-3">
                Kullback-Leibler (KL) divergence measures how one probability distribution <Equation>P</Equation> differs from a second, reference probability distribution <Equation>Q</Equation>.
            </p>
            <Equation block>{`D_{KL}(P \\parallel Q) = \\sum_{x \\in \\mathcal{X}} P(x) \\log\\left(\\frac{P(x)}{Q(x)}\\right)`}</Equation>
            <p className="text-sm text-slate-600 italic">
                Note: It is non-negative and non-symmetric.
            </p>
        </div>
    );
};

export default KLDivergence;
