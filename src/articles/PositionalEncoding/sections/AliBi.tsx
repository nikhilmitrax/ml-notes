import React, { useState } from 'react';
import { Type } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import CodeBlock from '../../../components/CodeBlock';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const AlibiViz = () => {
    const [heads, setHeads] = useState(4);

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-center">
                <label className="text-sm text-slate-600">Number of Heads:</label>
                <div className="flex gap-2">
                    {[1, 2, 4, 8].map(h => (
                        <button
                            key={h}
                            onClick={() => setHeads(h)}
                            className={`px-3 py-1 rounded text-sm ${heads === h ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            {h}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: heads }).map((_, h) => {
                    const m = Math.pow(2, (8 * (h + 1)) / heads) / 256; // Simplified slope calc approx
                    // Actually standard Alibi is: m = 1 / 2^(8 * i / n)
                    // Let's use the paper's geometric sequence for visualization
                    const ratio = Math.pow(2, -(8 / heads));
                    const slope = Math.pow(ratio, h + 1);

                    return (
                        <div key={h} className="border border-slate-200 rounded p-2 bg-white">
                            <div className="text-xs font-bold text-slate-400 mb-2">Head {h + 1} (Slope ≈ {slope.toFixed(3)})</div>
                            <div className="grid grid-cols-5 gap-[1px] bg-slate-100 border border-slate-100">
                                {Array.from({ length: 25 }).map((_, i) => {
                                    const r = Math.floor(i / 5);
                                    const c = i % 5;
                                    const dist = Math.abs(r - c); // Causal mask usually, but for viz we show diff
                                    const penalty = dist * slope;
                                    const opacity = Math.max(0.1, 1 - penalty);

                                    return (
                                        <div
                                            key={i}
                                            className="aspect-square bg-orange-500"
                                            style={{ opacity }}
                                            title={`Dist: ${dist}, Bias: -${(dist * slope).toFixed(2)}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Paragraph variant="caption">
                Heatmaps show the attention penalty. Darker = higher attention retained.
                Different heads have different slopes, allowing the model to attend to varying context lengths.
            </Paragraph>
        </div>
    );
};

const AliBi = () => {
    return (
        <Section title="AliBi (Attention with Linear Biases)" icon={Type}>
            <Paragraph>
                AliBi abandons adding embeddings to the input. Instead, it modifies the <strong>attention score</strong> directly.
                It subtracts a static bias proportional to the distance between query and key.
            </Paragraph>

            <Equation block>
                {`\\text{Attention}(q_i, k_j) = \\text{softmax}(q_i k_j^T + m \\cdot -(i - j))`}
            </Equation>

            <div className="my-6">
                <Header4 className="text-sm font-bold text-slate-800 mb-2 mt-0">Implementation (Bias Injection)</Header4>
                <CodeBlock code={`def get_alibi_bias(seq_len, num_heads):
    # 1. Generate geometric slopes for each head
    slopes = get_slopes(num_heads) 
    
    # 2. Create relative distance matrix
    # e.g., [[0, -1, -2], [0, 0, -1]...] (masked)
    ctx_pos = torch.arange(seq_len)[:, None]
    mem_pos = torch.arange(seq_len)[None, :]
    diff = mem_pos - ctx_pos
    
    # 3. Compute bias
    # Shape: [1, num_heads, seq_len, seq_len]
    bias = slopes.view(1, num_heads, 1, 1) * diff
    return bias`} />
            </div>

            <Paragraph className="mt-4">
                <strong>Why it works:</strong> It imposes a strong prior that "nearby things are more important."
                The slope <Equation>m</Equation> is specific to each attention head, allowing some heads to focus locally and others to look further back.
                It has excellent extrapolation properties.
            </Paragraph>

            <InteractiveCard title="Bias Visualization per Head">
                <AlibiViz />
            </InteractiveCard>
        </Section>
    );
};

export default AliBi;
