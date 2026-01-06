import React, { useState } from 'react';
import { RotateCw, Maximize } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import CodeBlock from '../../../components/CodeBlock';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const RopeViz = () => {
    const [theta, setTheta] = useState(0.5); // Base rotation amount
    const [pos1, setPos1] = useState(1);
    const [pos2, setPos2] = useState(2);

    // Initial vector x (e.g., [1, 0])
    const vec = { x: 1, y: 0 };
    const radius = 80;
    const center = 100;

    const rotate = (v, angle) => ({
        x: v.x * Math.cos(angle) - v.y * Math.sin(angle),
        y: v.x * Math.sin(angle) + v.y * Math.cos(angle)
    });

    // RoPE rotates vectors by m * theta
    const vec1 = rotate(vec, pos1 * theta);
    const vec2 = rotate(vec, pos2 * theta);

    // Relative attention depends on (m - n) * theta
    const relAngle = (pos2 - pos1) * theta;

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm text-slate-600">Base Theta Frequency</label>
                    <input type="range" min="0" max="3" step="0.1" value={theta} onChange={e => setTheta(parseFloat(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-slate-600">Position m (Query): {pos1}</label>
                    <input type="range" min="0" max="10" step="1" value={pos1} onChange={e => setPos1(parseInt(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-slate-600">Position n (Key): {pos2}</label>
                    <input type="range" min="0" max="10" step="1" value={pos2} onChange={e => setPos2(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="p-3 bg-purple-50 rounded border border-purple-100 text-sm text-purple-800">
                    Relative Rotation: <span className="font-bold">{(relAngle * (180 / Math.PI)).toFixed(1)}°</span>
                    <br />
                    Dot Product depends only on <Equation>m - n</Equation>!
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <svg width="200" height="200" className="bg-slate-50 rounded-full border border-slate-200">
                    {/* Axes */}
                    <line x1={center} y1="20" x2={center} y2="180" stroke="#e2e8f0" />
                    <line x1="20" y1={center} x2="180" y2={center} stroke="#e2e8f0" />

                    {/* Circle */}
                    <circle cx={center} cy={center} r={radius} fill="none" stroke="#cbd5e1" strokeDasharray="4 4" />

                    {/* Vectors */}
                    <g transform={`translate(${center}, ${center}) scale(1, -1)`}> {/* Fix coords */}
                        {/* Pos 1 */}
                        <line x1="0" y1="0" x2={vec1.x * radius} y2={vec1.y * radius} stroke="#3b82f6" strokeWidth="3" />
                        <circle cx={vec1.x * radius} cy={vec1.y * radius} r="4" fill="#3b82f6" />

                        {/* Pos 2 */}
                        <line x1="0" y1="0" x2={vec2.x * radius} y2={vec2.y * radius} stroke="#10b981" strokeWidth="3" />
                        <circle cx={vec2.x * radius} cy={vec2.y * radius} r="4" fill="#10b981" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

const RopeScalingViz = () => {
    const [scale, setScale] = useState(1);
    const [maxPos, setMaxPos] = useState(10); // Nominal training limit

    // We simulate a single frequency dimension
    // Standard RoPE: angle = pos * theta_base
    // Linear Scaling (PI): angle = (pos / scale) * theta_base

    const theta_base = Math.PI / 4; // 45 degrees per step base

    // Generate points
    // If scale = 1, we fit 'maxPos' points in the arc
    // If scale > 1, we can fit 'maxPos * scale' points in roughly the same arc dynamics

    const points = [];
    const numPointsToShow = Math.floor(maxPos * 1.5); // Show slightly beyond training limit

    for (let i = 0; i < numPointsToShow; i++) {
        const effPos = i / scale;
        const angle = effPos * theta_base;
        points.push({ i, angle, inDistribution: i <= maxPos });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-600">
                            <label>Scale Factor (PI): {scale.toFixed(1)}x</label>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="0.1"
                            value={scale}
                            onChange={e => setScale(parseFloat(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                        <Paragraph variant="caption">
                            Scale = 1.0: Original training.
                            Scale &gt; 1.0: "Squeezing" positions to fit longer context into known rotation range.
                        </Paragraph>
                    </div>

                    <div className="p-3 bg-orange-50 border border-orange-100 rounded text-sm text-orange-800">
                        <strong>Effect:</strong> Position <Equation>t=8</Equation> with Scale 2.0 behaves like position <Equation>t=4</Equation> used to.
                        <br />This is <strong>Linear Interpolation</strong>.
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <svg width="220" height="220" className="bg-slate-900 rounded-full overflow-visible">
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#334155" strokeWidth="1" />

                        {/* Training limit marker */}
                        {/* At scale 1, maxPos is at angle maxPos * theta_base */}
                        <path
                            d={`M 110 110 L ${110 + 80 * Math.cos(maxPos / scale * theta_base)} ${110 + 80 * Math.sin(maxPos / scale * theta_base)}`}
                            stroke="#ef4444"
                            strokeDasharray="4 2"
                            strokeWidth="2"
                        />
                        <text x="110" y="20" fill="#ef4444" fontSize="10" textAnchor="middle">Training Limit Horizon</text>

                        {points.map((p) => (
                            <g key={p.i} transform={`translate(110, 110) rotate(${(p.angle * 180 / Math.PI)})`}>
                                <line x1="60" y1="0" x2="80" y2="0" stroke={p.i > maxPos ? "#94a3b8" : "#fbbf24"} strokeWidth="2" />
                                <text x="95" y="4" fill="white" fontSize="10" transform={`rotate(-${(p.angle * 180 / Math.PI)})`}>{p.i}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
            <Paragraph variant="caption" className="italic text-center">
                Yellow ticks = Trained positions. Grey ticks = Extended positions.
                Notice how increasing Scale pulls the grey ticks back "into" the valid rotation range (before the red line).
            </Paragraph>
        </div>
    );
};

const RoPE = () => {
    return (
        <Section title="RoPE (Rotary Positional Embeddings)" icon={RotateCw}>
            <Paragraph>
                RoPE encodes position by <strong>rotating</strong> the query and key vectors.
                It unifies absolute and relative approaches: we apply an absolute operation (rotation by angle <Equation>m\theta</Equation>) that results in a relative interaction in the dot product.
            </Paragraph>

            <Equation block>
                {`\\begin{aligned}
 f(x, m) &= R_m x \\ 
 R_m &= \\begin{pmatrix} \\cos(m\\theta) & -\\sin(m\\theta) \\\\ \\sin(m\\theta) & \\cos(m\\theta) \\end{pmatrix} \\end{aligned}`}
            </Equation>

            <div className="my-6">
                <Header4 className="text-sm font-bold text-slate-800 mb-2">Implementation (Complex Numbers)</Header4>
                <Paragraph variant="small" className="mb-2">
                    In practice (e.g., Llama 3), RoPE is efficiently implemented by treating pairs of dimensions as complex numbers.
                </Paragraph>
                <CodeBlock code={`def apply_rope(xq, xk, freqs_cos, freqs_sin):
    # xq: [batch, seq_len, dim]
    # Standard trick: rotate pairs [-x2, x1]
    
    xq_out = xq * freqs_cos - rotate_half(xq) * freqs_sin
    xk_out = xk * freqs_cos - rotate_half(xk) * freqs_sin
    return xq_out, xk_out

def rotate_half(x):
    # Split last dim: [a, b, c, d] -> [-b, a, -d, c]
    x1, x2 = x[..., :x.shape[-1]//2], x[..., x.shape[-1]//2:]
    return torch.cat((-x2, x1), dim=-1)`} />
            </div>

            <Paragraph className="mt-4">
                When we take the dot product of Query at <Equation>m</Equation> and Key at <Equation>n</Equation>:
            </Paragraph>

            <Equation block>
                {`(R_m q) \\cdot (R_n k) = q^T (R_m^T R_n) k = q^T R_{n-m} k`}
            </Equation>

            <Paragraph variant="small" className="mb-6">
                The result only depends on <Equation>n - m</Equation> (relative distance).
            </Paragraph>

            <InteractiveCard title="Interactive Rotation">
                <RopeViz />
            </InteractiveCard>

            <div className="mt-8">
                <Header4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Maximize size={18} />
                    Context Extension & Interpolation
                </Header4>
                <Paragraph>
                    What happens if we want to use a model trained on 4k tokens for 16k tokens?
                    If we just continue rotating, we hit angles the model hasn't seen.
                    <br />
                    <strong>Position Interpolation (PI)</strong> solves this by "slowing down" the rotation (scaling), effectively squeezing the new longer sequence into the original rotation range.
                </Paragraph>
                <InteractiveCard title="RoPE Scaling (Linear Interpolation)">
                    <RopeScalingViz />
                </InteractiveCard>
            </div>
        </Section>
    );
};

export default RoPE;
