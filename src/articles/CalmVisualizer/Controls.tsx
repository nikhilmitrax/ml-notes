import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Paragraph from '../../components/Paragraph';
import { STEPS } from './constants';

const Controls = ({ stepIndex, setStepIndex, kValue, setKValue }) => {
    const step = STEPS[stepIndex];

    return (
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none flex flex-col justify-end h-full">
            <div className="max-w-3xl mx-auto w-full pointer-events-auto space-y-4">

                {/* Explanation Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-2 text-violet-600">
                        <div className="p-2 bg-violet-100 rounded-lg">
                            {step.icon}
                        </div>
                        <h2 className="text-xl font-bold">{step.title}</h2>
                    </div>
                    <Paragraph className="text-slate-600 leading-relaxed">
                        {step.description}
                    </Paragraph>

                    {/* K-Value Slider (Only for relevant steps) */}
                    {(step.id === 'autoencoder' || step.id === 'comparison') && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-slate-500">Chunk Size (K): {kValue}</span>
                                <span className="text-xs text-slate-400">Higher K = More Compression</span>
                            </div>
                            <input
                                type="range"
                                min="2"
                                max="8"
                                step="1"
                                value={kValue}
                                onChange={(e) => setKValue(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>2</span>
                                <span>8</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
                        disabled={stepIndex === 0}
                        className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors
              ${stepIndex === 0 ? 'bg-slate-100 text-slate-400' : 'bg-white text-slate-700 hover:bg-slate-50 shadow-lg'}
            `}
                    >
                        <ArrowLeft size={16} /> Previous
                    </button>

                    <div className="flex gap-2">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === stepIndex ? 'bg-violet-600' : 'bg-slate-300'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setStepIndex(Math.min(STEPS.length - 1, stepIndex + 1))}
                        disabled={stepIndex === STEPS.length - 1}
                        className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg
              ${stepIndex === STEPS.length - 1
                                ? 'bg-slate-100 text-slate-400'
                                : 'bg-violet-600 text-white hover:bg-violet-700 hover:scale-105'}
            `}
                    >
                        {stepIndex === STEPS.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
