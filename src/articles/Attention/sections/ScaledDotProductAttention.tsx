import React, { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const AttentionVisualization = () => {
    const [query, setQuery] = useState([0.8, 0.2]);
    const [keys, setKeys] = useState([
        [0.9, 0.1],
        [0.1, 0.9],
        [0.5, 0.5]
    ]);
    const [values, setValues] = useState([
        [1.0, 0.0],
        [0.0, 1.0],
        [0.5, 0.5]
    ]);

    const dotProduct = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);

    const attentionScores = useMemo(() => {
        return keys.map(k => dotProduct(query, k));
    }, [query, keys]);

    const attentionWeights = useMemo(() => {
        const expScores = attentionScores.map(s => Math.exp(s));
        const sumExp = expScores.reduce((a, b) => a + b, 0);
        return expScores.map(s => s / sumExp);
    }, [attentionScores]);

    const output = useMemo(() => {
        return values.reduce((acc, v, i) => {
            return [
                acc[0] + v[0] * attentionWeights[i],
                acc[1] + v[1] * attentionWeights[i]
            ];
        }, [0, 0]);
    }, [values, attentionWeights]);

    const handleQueryChange = (idx, val) => {
        const newQuery = [...query];
        newQuery[idx] = parseFloat(val);
        setQuery(newQuery);
    };

    return (
        <div className="flex flex-col gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <SideBySide className="gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <Header4 className="font-semibold text-slate-700">Query Vector (Q)</Header4>
                    <div className="flex gap-2">
                        {query.map((q, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={q}
                                    onChange={(e) => handleQueryChange(i, e.target.value)}
                                    className="h-24 w-4 appearance-none bg-slate-200 rounded-full"
                                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                                />
                                <span className="text-xs font-mono mt-1">{q.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>

                    <Header4 className="font-semibold text-slate-700 mt-6">Key Vectors (K)</Header4>
                    <div className="space-y-2">
                        {keys.map((k, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-mono bg-white p-2 rounded border border-slate-200">
                                <span className="text-slate-400">K{i + 1}:</span>
                                <span>[{k.map(v => v.toFixed(1)).join(', ')}]</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calculations */}
                <div className="space-y-4">
                    <Header4 className="font-semibold text-slate-700">Attention Weights (Softmax)</Header4>
                    <div className="space-y-2">
                        {attentionWeights.map((w, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-12 text-xs font-mono text-right">{w.toFixed(2)}</div>
                                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-300"
                                        style={{ width: `${w * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Header4 className="font-semibold text-slate-700 mt-6">Output Vector (Weighted Sum of V)</Header4>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="font-mono text-lg text-blue-700 text-center">
                            [{output.map(v => v.toFixed(2)).join(', ')}]
                        </div>
                        <Paragraph variant="caption" className="text-blue-600 text-center mt-2">
                            Result = Σ (Weight_i × Value_i)
                        </Paragraph>
                    </div>
                </div>
            </SideBySide>
        </div>
    );
};

const ScaledDotProductAttention = () => {
    return (
        <Section title="Scaled Dot-Product Attention" icon={Eye}>
            <Paragraph className="mb-4">
                The core building block of modern Transformers is <strong>Scaled Dot-Product Attention</strong> (Vaswani et al., 2017).
            </Paragraph>
            <Equation block>
                {`Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V`}
            </Equation>
            <Paragraph className="mb-4 text-slate-700">
                The scaling factor <Equation>{`\\frac{1}{\\sqrt{d_k}}`}</Equation> prevents small gradients when dot products are large.
            </Paragraph>

            <Header3 className="text-lg font-semibold text-slate-800 mb-4">Comparative Analysis: Additive vs. Scaled Dot-Product Attention</Header3>
            <Paragraph className="mb-4 text-slate-700">
                Among the various types of attention mechanisms, additive attention and scaled dot-product attention are the most commonly used. Here is a detailed comparison:
            </Paragraph>

            <div className="space-y-6 mb-8">
                <div>
                    <Header4 className="font-bold text-slate-800 mb-2">1. Origins and Definitions</Header4>
                    <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                        <li>
                            <strong>Additive Attention</strong>: Proposed by Bahdanau et al. (2015). It computes the alignment score using a feed-forward neural network with a single hidden layer.
                            <Equation block>{`e_{ij} = v^T \\tanh(W_q q_i + W_k k_j)`}</Equation>
                        </li>
                        <li>
                            <strong>Scaled Dot-Product Attention</strong>: Introduced by Vaswani et al. (2017). It computes the alignment score by taking the dot product of query and key vectors, scaled by <Equation>{`\\sqrt{d_k}`}</Equation>.
                            <Equation block>{`e_{ij} = \\frac{q_i \\cdot k_j}{\\sqrt{d_k}}`}</Equation>
                        </li>
                    </ul>
                </div>

                <div>
                    <Header4 className="font-bold text-slate-800 mb-2">2. Computational Efficiency</Header4>
                    <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                        <li>
                            <strong>Additive Attention</strong>: More complex computation due to the feed-forward network. Generally slower in practice as it cannot fully leverage optimized matrix multiplication libraries. Requires additional parameters (<Equation>{`W_q, W_k, v`}</Equation>).
                        </li>
                        <li>
                            <strong>Scaled Dot-Product Attention</strong>: Much faster and space-efficient. Relies on highly optimized matrix multiplication. The scaling factor mitigates small gradients for large dot products.
                        </li>
                    </ul>
                </div>

                <div>
                    <Header4 className="font-bold text-slate-800 mb-2">3. Theoretical Complexity</Header4>
                    <Paragraph className="text-slate-700 ml-4">
                        Both have <Equation>{`O(n^2 \\cdot d)`}</Equation> complexity, but Dot-Product is faster in real-world applications due to hardware optimizations.
                    </Paragraph>
                </div>
            </div>

            <InteractiveCard title="Interactive Attention Calculation">
                <Paragraph className="mb-4 text-sm text-slate-600">
                    Adjust the <strong>Query Vector</strong> to see how it matches against different <strong>Key Vectors</strong>.
                </Paragraph>
                <AttentionVisualization />
            </InteractiveCard>
        </Section>
    );
};

export default ScaledDotProductAttention;
