import React, { useState, useMemo } from 'react';
import { Move } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import CodeBlock from '../../../components/CodeBlock';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const SinusoidalViz = () => {
    const [pos, setPos] = useState(50);
    const d_model = 64;

    const data = useMemo(() => {
        const rows = [];
        for (let i = 0; i < d_model / 2; i++) {
            const divTerm = Math.exp(2 * i * -Math.log(10000.0) / d_model);
            const val = pos * divTerm;
            rows.push({ i: 2 * i, val: Math.sin(val), type: 'sin' });
            rows.push({ i: 2 * i + 1, val: Math.cos(val), type: 'cos' });
        }
        return rows.sort((a, b) => a.i - b.i);
    }, [pos]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-600 w-20">Position (t): {pos}</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={(e) => setPos(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
            <div className="h-24 w-full flex items-end gap-[1px] bg-slate-50 p-2 rounded border border-slate-100">
                {data.map((d) => (
                    <div
                        key={d.i}
                        className={`flex-1 rounded-t-sm ${d.type === 'sin' ? 'bg-blue-500' : 'bg-emerald-500'}`}
                        style={{
                            height: `${((d.val + 1) / 2) * 100}%`,
                            opacity: 0.8
                        }}
                        title={`Dim ${d.i} (${d.type}): ${d.val.toFixed(2)}`}
                    />
                ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 px-2">
                <span>Dim 0</span>
                <span>Dim {d_model}</span>
            </div>
            <Paragraph variant="caption" className="mt-2">
                Blue = Sine, Green = Cosine. Notice how lower dimensions (left) oscillate rapidly while higher dimensions (right) change slowly as Position increases.
            </Paragraph>
        </div>
    );
};

const SinusoidalDotProductViz = () => {
    const [refPos, setRefPos] = useState(50);
    const d_model = 64;
    const maxPos = 100;

    // Helper to get vector for a position
    const getVec = (p) => {
        const vec = [];
        for (let i = 0; i < d_model / 2; i++) {
            const divTerm = Math.exp(2 * i * -Math.log(10000.0) / d_model);
            const val = p * divTerm;
            vec.push(Math.sin(val));
            vec.push(Math.cos(val));
        }
        return vec;
    };

    // Calculate dot products with reference position
    const dots = useMemo(() => {
        const refVec = getVec(refPos);
        const results = [];
        for (let i = 0; i <= maxPos; i++) {
            const vec = getVec(i);
            let dot = 0;
            for (let j = 0; j < d_model; j++) {
                dot += refVec[j] * vec[j];
            }
            // Normalize roughly for visualization
            results.push({ pos: i, val: dot });
        }
        return results;
    }, [refPos]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Reference Position: {refPos}</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={refPos}
                    onChange={(e) => setRefPos(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                />
            </div>

            <div className="h-40 w-full bg-slate-50 border border-slate-200 rounded relative flex items-end overflow-hidden">
                {/* Center Line */}
                <div className="absolute w-full h-[1px] bg-slate-300 top-1/2 left-0"></div>

                {dots.map((d, idx) => {
                    // Map val approx -32 to 32 to 0-100% height. 
                    // Max dot product is d_model/2 (since sin^2 + cos^2 = 1 per pair). d_model=64 -> max 32.
                    const norm = (d.val + 32) / 64 * 100;
                    const isRef = idx === refPos;

                    return (
                        <div
                            key={idx}
                            className={`flex-1 hover:opacity-100 transition-all ${isRef ? 'bg-indigo-600 z-10' : 'bg-indigo-300 opacity-60'}`}
                            style={{
                                height: `${Math.min(100, Math.max(0, norm))}%`,
                            }}
                            title={`Pos ${d.pos}: Dot Product = ${d.val.toFixed(2)}`}
                        />
                    );
                })}
            </div>
            <Paragraph variant="caption">
                This graph shows <Equation>PE_t \cdot PE_x</Equation>. Notice the peak at <Equation>x=t</Equation> and the symmetrical decay.
                This "bump" allows the model to easily attend to nearby tokens purely based on position.
            </Paragraph>
        </div>
    );
};

const StandardSinusoidal = () => {
    return (
        <Section title="Standard Sinusoidal (Absolute)" icon={Move}>
            <Paragraph>
                Proposed in the original "Attention is All You Need" paper. It assigns a unique fixed vector to each absolute position <Equation>{'(0, 1, 2...)'}</Equation>.
                It uses frequencies that form a geometric progression.
            </Paragraph>

            <Equation block>
                {`\\begin{aligned}
PE_{(pos, 2i)} &= \\sin(pos / 10000^{2i/d_{model}}) \\ 
PE_{(pos, 2i+1)} &= \\cos(pos / 10000^{2i/d_{model}}) \\end{aligned}`}
            </Equation>

            <div className="my-6">
                <Header4 className="text-sm font-bold text-slate-800 mb-2">Implementation (PyTorch Style)</Header4>
                <CodeBlock code={`def get_sinusoidal_embeddings(seq_len, d_model):
    # 1. Create position indices [0, 1, ..., seq_len-1]
    position = torch.arange(seq_len).unsqueeze(1)
    
    # 2. Compute geometric progression of frequencies
    div_term = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))
    
    # 3. Compute Sine and Cosine (interleaved or concatenated)
    pe = torch.zeros(seq_len, 1, d_model)
    pe[:, 0, 0::2] = torch.sin(position * div_term)
    pe[:, 0, 1::2] = torch.cos(position * div_term)
    return pe`} />
            </div>

            <InteractiveCard title="Visualizing Frequencies">
                <SinusoidalViz />
            </InteractiveCard>

            <div className="mt-8">
                <Header4 className="font-bold text-slate-800 mb-2">The "Relative" Secret</Header4>
                <Paragraph>
                    A key property of sinusoidal encodings is that for any fixed offset <Equation>k</Equation>, <Equation>PE_{'{pos+k}'}</Equation> can be represented as a linear function of <Equation>PE_{'{pos}'}</Equation>.
                    This suggests the model <em>can</em> learn relative distances easily.
                    <br /><br />
                    Below, observe how the dot product between a reference position and all others decays symmetrically, forming a distinct "attention bump."
                </Paragraph>
                <InteractiveCard title="Positional Dot Product Decay">
                    <SinusoidalDotProductViz />
                </InteractiveCard>
            </div>
        </Section>
    );
};

export default StandardSinusoidal;
