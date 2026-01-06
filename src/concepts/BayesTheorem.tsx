import React from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Bayes' Theorem",
    description: "Fundamental law of probability describing how to update the probability for a hypothesis as more evidence or information becomes available."
};

const BayesTheorem = () => {
    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Bayes' Theorem</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Bayes' theorem is the foundation of inference. It allows us to calculate the probability of a cause (hypothesis) given its effect (evidence).
                </p>
                <Equation block>{`P(H|E) = \\frac{P(E|H)P(H)}{P(E)}`}</Equation>
            </section>

            <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-center py-6">
                    <div className="relative w-64 h-40 mt-4">
                        {/* Venn Diagram Representation */}
                        {/* Circle H (Prior) */}
                        <div className="w-40 h-40 rounded-full border-2 border-blue-200 bg-blue-50/50 flex items-center justify-center absolute left-0 top-0">
                            <span className="absolute -top-8 left-1/4 -translate-x-1/2 text-[10px] font-bold text-blue-600 uppercase whitespace-nowrap">Prior P(H)</span>
                        </div>
                        {/* Circle E (Evidence) */}
                        <div className="w-40 h-40 rounded-full border-2 border-emerald-200 bg-emerald-50/50 flex items-center justify-center absolute right-0 top-0 mix-blend-multiply">
                            <span className="absolute -top-8 right-1/4 translate-x-1/2 text-[10px] font-bold text-emerald-600 uppercase whitespace-nowrap">Evidence P(E)</span>
                        </div>

                        {/* Intersection Marker */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-slate-400 opacity-20"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 border border-slate-100 rounded bg-slate-50">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Likelihood</div>
                        <div className="text-sm font-bold text-slate-700">P(E|H)</div>
                    </div>
                    <div className="p-2 border border-slate-100 rounded bg-slate-50">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Prior</div>
                        <div className="text-sm font-bold text-slate-700">P(H)</div>
                    </div>
                </div>
            </div>

            <section className="space-y-4">
                <h4 className="text-md font-semibold text-slate-800">In Plain English</h4>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-1 bg-blue-100 rounded text-blue-700 text-[10px] font-bold">POSTERIOR</div>
                        <p className="text-xs text-slate-600">The probability of our theory being true <strong>after</strong> seeing the evidence.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-1 bg-emerald-100 rounded text-emerald-700 text-[10px] font-bold">PRIOR</div>
                        <p className="text-xs text-slate-600">Our belief in the theory <strong>before</strong> we saw any evidence.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-1 bg-slate-100 rounded text-slate-700 text-[10px] font-bold">EVIDENCE</div>
                        <p className="text-xs text-slate-600">How likely is the evidence itself to occur across all possibilities?</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BayesTheorem;
