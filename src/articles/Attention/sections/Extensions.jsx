import React from 'react';
import { GitMerge } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const Extensions = () => {
    return (
        <Section title="Extensions to Classic Attention" icon={GitMerge}>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Luong et al. (2015) proposed alternative functions to compute the alignment score, simplifying the mechanism.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-2">Bahdanau (Concat)</h4>
                    <EquationBlock><Equation>
                        {`score(s_t, h_i) = v_a^T \\tanh(W_a [s_t; h_i])`}
                    </Equation></EquationBlock>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-2">Luong (Dot)</h4>
                    <EquationBlock><Equation>
                        {`score(s_t, h_i) = s_t^T h_i`}
                    </Equation></EquationBlock>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-2">Luong (General)</h4>
                    <EquationBlock><Equation>
                        {`score(s_t, h_i) = s_t^T W_a h_i`}
                    </Equation></EquationBlock>
                </div>
            </div>
        </Section>
    );
};

export default Extensions;
