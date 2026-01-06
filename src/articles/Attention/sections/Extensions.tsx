import React from 'react';
import { GitMerge } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const Extensions = () => {
    return (
        <Section title="Extensions to Classic Attention" icon={GitMerge}>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                Luong et al. (2015) proposed alternative functions to compute the alignment score, simplifying the mechanism.
            </Paragraph>
            <SideBySide className="mb-6">
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <Header4 className="font-bold text-slate-800 mb-2">Bahdanau (Concat)</Header4>
                    <Equation block>
                        {`score(s_t, h_i) = v_a^T \\tanh(W_a [s_t; h_i])`}
                    </Equation>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <Header4 className="font-bold text-slate-800 mb-2">Luong (Dot)</Header4>
                    <Equation block>
                        {`score(s_t, h_i) = s_t^T h_i`}
                    </Equation>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <Header4 className="font-bold text-slate-800 mb-2">Luong (General)</Header4>
                    <Equation block>
                        {`score(s_t, h_i) = s_t^T W_a h_i`}
                    </Equation>
                </div>
            </SideBySide>
        </Section>
    );
};

export default Extensions;
