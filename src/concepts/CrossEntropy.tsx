import React, { useState } from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Cross-Entropy",
    description: "Measures the average number of bits needed to identify an event from a set of possibilities, if we use a coding scheme optimized for P while the events actually come from Q."
};

const CrossEntropy = () => {
    // Probabilities for 3 classes
    const [q1, setQ1] = useState(0.2); // Predicted probability for class 1
    const p1 = 0.9; // True label (highly likely it's class 1)

    // Derived values for normalization (simplified to 2 classes for the math)
    const p2 = 0.1;
    const q2 = 1 - q1;

    // Cross entropy H(p, q) = - (p1 * log(q1) + p2 * log(q2))
    const ce = -(p1 * Math.log2(q1 + 0.0001) + p2 * Math.log2(q2 + 0.0001));

    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cross-Entropy</h3>
                <p className="text-slate-600 mb-4 text-sm">
                    Cross-entropy is a measure from information theory that quantified the difference between two probability distributions <Equation>P</Equation> (true) and <Equation>Q</Equation> (predicted).
                </p>
                <Equation block>{`H(P, Q) = -\\sum_{x \\in \\mathcal{X}} P(x) \\log Q(x)`}</Equation>
            </section>

            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex justify-between">
                        <span>Predicted Probability <Equation>{`Q(\\text{Class 1})`}</Equation></span>
                        <span className="font-mono text-blue-600 font-bold">Loss = {ce.toFixed(2)} bits</span>
                    </label>
                    <input
                        type="range" min="0.01" max="0.99" step="0.01" value={q1}
                        onChange={(e) => setQ1(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-2 text-center italic">
                        The true label <Equation>P</Equation> is fixed at 0.9 for Class 1. Watch the loss skyrocket as <Equation>Q</Equation> moves away!
                    </p>
                </div>

                <div className="flex items-end justify-around gap-4 h-32 relative pt-8">
                    {/* True Distribution P */}
                    <div className="flex flex-col items-center flex-1">
                        <div className="w-12 bg-slate-200 rounded-t h-24 relative">
                            <div className="absolute bottom-0 w-full bg-slate-800 rounded-t transition-all duration-300" style={{ height: '90%' }}></div>
                        </div>
                        <span className="text-[10px] mt-2 font-bold text-slate-800">P (True)</span>
                    </div>

                    {/* Predicted Distribution Q */}
                    <div className="flex flex-col items-center flex-1">
                        <div className="w-12 bg-slate-200 rounded-t h-24 relative">
                            <div className="absolute bottom-0 w-full bg-blue-500 rounded-t transition-all duration-300" style={{ height: `${q1 * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] mt-2 font-bold text-blue-600">Q (Pred)</span>
                    </div>

                    {/* Warning/Error indicator */}
                    {ce > 2 && (
                        <div className="absolute top-0 right-0 p-1 bg-red-100 text-red-600 rounded text-[10px] font-bold animate-pulse">
                            High Entropy!
                        </div>
                    )}
                </div>
            </div>

            <section className="space-y-3">
                <h4 className="text-md font-semibold text-slate-800">Entropy vs Cross-Entropy</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                    While <strong>Entropy</strong> <Equation>H(P)</Equation> measures the inherent uncertainty in a single distribution,
                    <strong>Cross-Entropy</strong> <Equation>H(P,Q)</Equation> measures the bits wasted by assuming the distribution is <Equation>Q</Equation> when it is actually <Equation>P</Equation>.
                </p>
                <div className="p-3 bg-blue-50 rounded border border-blue-100 text-[10px] text-blue-800 font-mono">
                    H(P, Q) = H(P) + D_KL(P || Q)
                </div>
            </section>
        </div>
    );
};

export default CrossEntropy;
