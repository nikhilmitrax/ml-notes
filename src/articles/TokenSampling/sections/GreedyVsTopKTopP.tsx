import React from 'react';
import { MousePointer } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

const GreedyVsTopKTopP = () => {
    return (
        <Section title="Greedy vs. top-k and top-p" icon={MousePointer}>
            <div className="overflow-x-auto my-6 rounded-lg border border-slate-200">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-semibold">
                        <tr>
                            <th className="p-3 border-b border-slate-200 w-1/4">Feature</th>
                            <th className="p-3 border-b border-slate-200 w-1/3">Greedy Decoding</th>
                            <th className="p-3 border-b border-slate-200 w-1/3">Top-<Equation>{`k`}</Equation> / Top-<Equation>{`p`}</Equation></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-900 align-top">Nature</td>
                            <td className="p-3 text-slate-700 align-top">
                                <strong>Deterministic</strong><br />
                                Always picks the highest probability token.
                            </td>
                            <td className="p-3 text-slate-700 align-top">
                                <strong>Stochastic</strong><br />
                                Introduces randomness into the selection process.
                            </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-900 align-top">Selection Method</td>
                            <td className="p-3 text-slate-700 align-top">
                                Selects the single token with the highest probability (Top-1).
                            </td>
                            <td className="p-3 text-slate-700 align-top">
                                Once the top candidates are selected, the choice can be <strong>uniform</strong> (equal chance) or <strong>proportional</strong> to their probabilities.
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-900 align-top">Output Characteristics</td>
                            <td className="p-3 text-slate-700 align-top">
                                Safe and less creative.
                            </td>
                            <td className="p-3 text-slate-700 align-top">
                                Can generate more novel and varied text, but with a higher chance of producing irrelevant or nonsensical output.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default GreedyVsTopKTopP;
