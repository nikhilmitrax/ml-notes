import React, { useState, useMemo } from 'react';
import { Database } from 'lucide-react';
import Section from '../../../components/Section';
import InteractiveCard from '../../../components/InteractiveCard';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const LearnedVsFixedViz = () => {
    const [steps, setSteps] = useState(0);

    // Simulation of weights converging
    const gridSize = 8;
    const cells = useMemo(() => {
        return Array.from({ length: gridSize * gridSize }).map((_, i) => {
            // Mock random "learned" value converging to a pattern
            const noise = Math.sin(i * 123.45 + steps) * Math.exp(-steps / 5);
            const target = Math.sin(i / 5); // Target pattern
            return (target * (1 - Math.exp(-steps / 5))) + noise;
        });
    }, [steps]);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
                <Header4 className="font-semibold text-slate-700 flex items-center gap-2">
                    <Database size={16} /> Learned Embedding
                </Header4>
                <Paragraph variant="small">
                    Parameters are initialized randomly and updated via backprop.
                    They "learn" to represent position, but are limited to sequence lengths seen during training.
                </Paragraph>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Training Progress: {steps * 10}%</label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={steps}
                        onChange={e => setSteps(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                    />
                </div>
            </div>

            <div className="flex gap-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-32 h-32 grid grid-cols-8 gap-[1px] bg-slate-200 border border-slate-300">
                        {cells.map((val, i) => (
                            <div
                                key={i}
                                className="w-full h-full"
                                style={{ backgroundColor: `rgba(16, 185, 129, ${(val + 1) / 2})` }}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-medium text-slate-500">Learned (Evolving)</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-32 h-32 relative bg-slate-50 border border-slate-300 overflow-hidden">
                        {/* Static Sinusoidal Pattern */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="absolute left-0 right-0 border-t border-blue-200" style={{ top: `${i * 12.5}%` }}>
                                <svg width="100%" height="10" preserveAspectRatio="none">
                                    <path d={`M0,5 Q64,${5 + 10 * Math.sin(i)} 128,5`} fill="none" stroke="blue" strokeWidth="2" opacity="0.5" />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-medium text-slate-500">Fixed (Sinusoidal)</span>
                </div>
            </div>
        </div>
    );
};

const LearnedVsFixed = () => {
    return (
        <Section title="Learned vs. Fixed Encodings" icon={Database}>
            <Paragraph>
                Early Transformer models (like BERT and GPT-2) used <strong>Learned Positional Embeddings</strong>.
                The model simply learned a unique vector for Position 1, Position 2, etc., treating them as parameters to optimize.
            </Paragraph>
            <Paragraph className="mb-6">
                Later models (original Transformer, and modern Llama/Mistral via RoPE) use <strong>Fixed (Functional) Encodings</strong>.
                These are calculated mathematically, requiring no training updates and often generalizing better to unseen lengths.
            </Paragraph>

            <InteractiveCard title="Comparison: Evolving Weights vs. Mathematical Functions">
                <LearnedVsFixedViz />
            </InteractiveCard>
        </Section>
    );
};

export default LearnedVsFixed;
