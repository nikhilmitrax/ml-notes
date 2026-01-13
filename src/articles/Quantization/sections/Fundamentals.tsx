import React, { useState, useMemo } from 'react';
import { Binary } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import InteractiveCard from '../../../components/InteractiveCard';

// Interactive visualization for quantization error
const QuantizationErrorVisualization = () => {
    const [bitWidth, setBitWidth] = useState(8);
    const [symmetric, setSymmetric] = useState(true);

    const numLevels = Math.pow(2, bitWidth);
    const range = symmetric ? 2.0 : 1.0; // -1 to 1 for symmetric, 0 to 1 for asymmetric
    const step = range / (numLevels - 1);

    // Generate sample values and their quantized versions
    const samples = useMemo(() => {
        const values = [];
        for (let i = 0; i < 50; i++) {
            const x = symmetric ? (i / 49) * 2 - 1 : i / 49;
            const quantized = Math.round(x / step) * step;
            const clampedQuantized = symmetric
                ? Math.max(-1, Math.min(1, quantized))
                : Math.max(0, Math.min(1, quantized));
            values.push({ original: x, quantized: clampedQuantized, error: Math.abs(x - clampedQuantized) });
        }
        return values;
    }, [bitWidth, symmetric, step]);

    const maxError = step / 2;
    const avgError = samples.reduce((sum, s) => sum + s.error, 0) / samples.length;

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700">Bit Width:</label>
                    <input
                        type="range"
                        min="2"
                        max="8"
                        value={bitWidth}
                        onChange={(e) => setBitWidth(parseInt(e.target.value))}
                        className="w-24"
                    />
                    <span className="font-mono text-slate-600 w-8">{bitWidth}</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700">Mode:</label>
                    <button
                        onClick={() => setSymmetric(true)}
                        className={`px-3 py-1 text-sm rounded ${symmetric ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                        Symmetric
                    </button>
                    <button
                        onClick={() => setSymmetric(false)}
                        className={`px-3 py-1 text-sm rounded ${!symmetric ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                        Asymmetric
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded border">
                    <div className="text-2xl font-bold text-blue-600">{numLevels}</div>
                    <div className="text-xs text-slate-500">Quantization Levels</div>
                </div>
                <div className="bg-white p-3 rounded border">
                    <div className="text-2xl font-bold text-amber-600">{step.toFixed(4)}</div>
                    <div className="text-xs text-slate-500">Step Size</div>
                </div>
                <div className="bg-white p-3 rounded border">
                    <div className="text-2xl font-bold text-red-600">{(avgError * 100).toFixed(2)}%</div>
                    <div className="text-xs text-slate-500">Avg Error</div>
                </div>
            </div>

            {/* Visual representation */}
            <div className="h-32 bg-white rounded border p-2 relative">
                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Original values line */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />

                    {/* Quantization levels */}
                    {Array.from({ length: Math.min(numLevels, 32) }, (_, i) => {
                        const y = 10 + (80 * i) / (Math.min(numLevels, 32) - 1);
                        return (
                            <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                        );
                    })}

                    {/* Sample points */}
                    {samples.map((s, i) => {
                        const x = (i / 49) * 380 + 10;
                        const yOrig = 50 - s.original * 40;
                        const yQuant = 50 - s.quantized * 40;
                        return (
                            <g key={i}>
                                <line x1={x} y1={yOrig} x2={x} y2={yQuant} stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                                <circle cx={x} cy={yOrig} r="2" fill="#10b981" />
                                <circle cx={x} cy={yQuant} r="2" fill="#3b82f6" />
                            </g>
                        );
                    })}
                </svg>
                <div className="absolute bottom-1 left-2 text-xs text-slate-500">
                    <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mr-1"></span>Original
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full ml-3 mr-1"></span>Quantized
                    <span className="inline-block w-3 h-1 bg-red-400 ml-3 mr-1"></span>Error
                </div>
            </div>

            <Paragraph variant="caption">
                Adjust bit width to see how quantization error scales. Lower bits = fewer levels = larger step size = more error.
            </Paragraph>
        </div>
    );
};

const Fundamentals = () => {
    return (
        <Section title="Quantization Fundamentals" icon={Binary}>
            <Header3>Numeric Formats</Header3>
            <Paragraph className="mb-4">
                The choice of numeric format determines the trade-off between dynamic range, precision, and hardware support. Modern quantization uses a variety of formats depending on the target hardware and accuracy requirements.
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-3 py-2 border-b">Format</th>
                            <th className="px-3 py-2 border-b">Bits</th>
                            <th className="px-3 py-2 border-b">Layout</th>
                            <th className="px-3 py-2 border-b">Dynamic Range</th>
                            <th className="px-3 py-2 border-b">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">FP32</td>
                            <td className="px-3 py-2">32</td>
                            <td className="px-3 py-2 font-mono text-xs">1s + 8e + 23m</td>
                            <td className="px-3 py-2"><Equation>{`\\pm 3.4 \\times 10^{38}`}</Equation></td>
                            <td className="px-3 py-2">Training baseline</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">FP16</td>
                            <td className="px-3 py-2">16</td>
                            <td className="px-3 py-2 font-mono text-xs">1s + 5e + 10m</td>
                            <td className="px-3 py-2"><Equation>{`\\pm 6.5 \\times 10^{4}`}</Equation></td>
                            <td className="px-3 py-2">Mixed precision training</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">BF16</td>
                            <td className="px-3 py-2">16</td>
                            <td className="px-3 py-2 font-mono text-xs">1s + 8e + 7m</td>
                            <td className="px-3 py-2"><Equation>{`\\pm 3.4 \\times 10^{38}`}</Equation></td>
                            <td className="px-3 py-2">Training (same range as FP32)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">FP8 (E4M3)</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2 font-mono text-xs">1s + 4e + 3m</td>
                            <td className="px-3 py-2"><Equation>{`\\pm 448`}</Equation></td>
                            <td className="px-3 py-2">Weights, forward pass</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">FP8 (E5M2)</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2 font-mono text-xs">1s + 5e + 2m</td>
                            <td className="px-3 py-2"><Equation>{`\\pm 5.7 \\times 10^{4}`}</Equation></td>
                            <td className="px-3 py-2">Gradients (wider range)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">INT8</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2 font-mono text-xs">signed integer</td>
                            <td className="px-3 py-2"><Equation>{`[-128, 127]`}</Equation></td>
                            <td className="px-3 py-2">Inference (most common)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">INT4</td>
                            <td className="px-3 py-2">4</td>
                            <td className="px-3 py-2 font-mono text-xs">signed integer</td>
                            <td className="px-3 py-2"><Equation>{`[-8, 7]`}</Equation></td>
                            <td className="px-3 py-2">LLM weight quantization</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">NF4</td>
                            <td className="px-3 py-2">4</td>
                            <td className="px-3 py-2 font-mono text-xs">normalized float</td>
                            <td className="px-3 py-2">16 levels (non-uniform)</td>
                            <td className="px-3 py-2">QLoRA</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="FP8: E4M3 vs E5M2">
                NVIDIA H100 supports both FP8 variants. <strong>E4M3</strong> (4 exponent, 3 mantissa bits) provides higher precision for weights and activations. <strong>E5M2</strong> (5 exponent, 2 mantissa bits) has wider dynamic range, better for gradients where outliers are common.
            </Callout>

            <Header3>Quantization Functions</Header3>
            <Paragraph className="mb-4">
                The quantization function <Equation>{`Q(x)`}</Equation> maps continuous values to discrete levels. The two main families are <strong>uniform</strong> (equal spacing) and <strong>non-uniform</strong> (variable spacing).
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Uniform Quantization</Header4>
            <Paragraph className="mb-2">
                <strong>Symmetric quantization</strong> centers the range around zero, using a single scale factor:
            </Paragraph>
            <Equation block>
                {`Q(x) = \\text{clamp}\\left(\\text{round}\\left(\\frac{x}{s}\\right), -2^{b-1}, 2^{b-1}-1\\right)`}
            </Equation>
            <Paragraph className="mb-4 text-slate-600">
                where <Equation>{`s = \\frac{\\max(|x|)}{2^{b-1}-1}`}</Equation> is the scale and <Equation>{`b`}</Equation> is the bit width.
            </Paragraph>

            <Paragraph className="mb-2">
                <strong>Asymmetric quantization</strong> uses both scale and zero-point, utilizing the full integer range:
            </Paragraph>
            <Equation block>
                {`Q(x) = \\text{clamp}\\left(\\text{round}\\left(\\frac{x}{s}\\right) + z, 0, 2^b-1\\right)`}
            </Equation>
            <Paragraph className="mb-4 text-slate-600">
                where <Equation>{`s = \\frac{x_{max} - x_{min}}{2^b - 1}`}</Equation> and <Equation>{`z = \\text{round}\\left(-\\frac{x_{min}}{s}\\right)`}</Equation>. The zero-point <Equation>{`z`}</Equation> ensures that the real value 0 maps exactly to an integer.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Non-Uniform Quantization</Header4>
            <Paragraph className="mb-4">
                Non-uniform schemes allocate more levels to regions with higher density. <strong>NF4</strong> (4-bit NormalFloat) from QLoRA uses quantile-based levels optimized for normally-distributed weights:
            </Paragraph>
            <CodeBlock language="python" code={`# NF4 levels (normalized to [-1, 1])
nf4_levels = [
    -1.0, -0.6962, -0.5251, -0.3949, -0.2844, -0.1848, -0.0911, 0.0,
    0.0796, 0.1609, 0.2461, 0.3379, 0.4407, 0.5626, 0.7230, 1.0
]
# Quantize by finding nearest level
def quantize_nf4(x, absmax):
    x_norm = x / absmax  # normalize to ~[-1, 1]
    return argmin([|x_norm - level| for level in nf4_levels])`} />

            <Header3>Quantization Granularity</Header3>
            <Paragraph className="mb-4">
                <strong>Granularity</strong> determines at what level scale factors are computed. Finer granularity reduces quantization error but increases overhead.
            </Paragraph>

            <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Per-Tensor</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Single scale/zero-point for the entire weight tensor. Minimal overhead but high error if distribution varies across channels.
                    </Paragraph>
                    <Equation block>{`W_q = Q(W; s_{tensor}, z_{tensor})`}</Equation>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Per-Channel (Per-Output-Channel)</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Separate scale for each output channel. Standard for CNN/Linear layer weights. Adds <Equation>{`O(C_{out})`}</Equation> overhead.
                    </Paragraph>
                    <Equation block>{`W_q[c, :] = Q(W[c, :]; s_c, z_c)`}</Equation>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Per-Group / Blockwise</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Divide each channel into groups of <Equation>{`g`}</Equation> elements (typically 32, 64, or 128). Common in LLM INT4 quantization. Adds <Equation>{`O(\\frac{C_{in} \\cdot C_{out}}{g})`}</Equation> overhead.
                    </Paragraph>
                    <Equation block>{`W_q[c, i:i+g] = Q(W[c, i:i+g]; s_{c,i/g}, z_{c,i/g})`}</Equation>
                </div>
            </div>

            <Callout type="info" title="Group Size Trade-offs">
                Smaller group sizes (e.g., 32) provide better accuracy but require more scale storage and complicate kernel design. Group size 128 is a common compromise for INT4 LLM quantization—it adds only 0.5 bits per weight in scale overhead while significantly reducing quantization error vs per-channel.
            </Callout>

            <Header3>Ranges and Clipping</Header3>
            <Paragraph className="mb-4">
                Choosing the quantization range <Equation>{`[x_{min}, x_{max}]`}</Equation> critically affects accuracy. Too wide wastes precision; too narrow clips outliers.
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Min/Max</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Use observed <Equation>{`\\min(x), \\max(x)`}</Equation>. Simple but sensitive to outliers—a single extreme value can waste most of the quantization range.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Percentile Clipping</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Use <Equation>{`p`}</Equation>-th and <Equation>{`(100-p)`}</Equation>-th percentiles (e.g., 99.9%). Clips outliers, trading clipping error for better resolution in the main distribution.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">MSE-Optimal</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Search for clipping threshold that minimizes <Equation>{`\\mathbb{E}[(x - \\hat{x})^2]`}</Equation>. Balances clipping error vs quantization error optimally.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">KL Divergence</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Minimize <Equation>{`D_{KL}(P \\| Q)`}</Equation> between original and quantized distributions. Used in TensorRT; works well for activation quantization.
                    </Paragraph>
                </div>
            </div>

            <Header3>Quantization Error Analysis</Header3>
            <Paragraph className="mb-4">
                Understanding error sources helps diagnose and fix quantization degradation.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Error Decomposition</Header4>
            <Equation block>
                {`\\epsilon = \\underbrace{(x - \\hat{x})_{\\text{round}}}_\\text{rounding error} + \\underbrace{(x - x_{clip})}_\\text{clipping error}`}
            </Equation>

            <div className="space-y-4 mb-6 mt-4">
                <div className="flex items-start gap-3">
                    <div className="w-24 flex-shrink-0 font-semibold text-slate-700">Rounding</div>
                    <Paragraph variant="small" className="text-slate-600">
                        Bounded by <Equation>{`\\pm \\frac{s}{2}`}</Equation>. Uniform, zero-mean noise with variance <Equation>{`\\frac{s^2}{12}`}</Equation>.
                    </Paragraph>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-24 flex-shrink-0 font-semibold text-slate-700">Clipping</div>
                    <Paragraph variant="small" className="text-slate-600">
                        Unbounded for outliers. Introduces bias toward the clipping threshold. More severe in heavy-tailed distributions.
                    </Paragraph>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-24 flex-shrink-0 font-semibold text-slate-700">Accumulation</div>
                    <Paragraph variant="small" className="text-slate-600">
                        Errors compound through layers. For <Equation>{`L`}</Equation> layers, worst-case error grows as <Equation>{`O(L)`}</Equation>. Mitigation: higher precision for sensitive layers.
                    </Paragraph>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-24 flex-shrink-0 font-semibold text-red-700">Overflow</div>
                    <Paragraph variant="small" className="text-slate-600">
                        INT8×INT8 → INT16/INT32 accumulation handles typical cases. But very long sequences or large batch sizes can overflow accumulators, causing catastrophic errors.
                    </Paragraph>
                </div>
            </div>

            <InteractiveCard title="Interactive Quantization Error">
                <Paragraph className="mb-4 text-sm text-slate-600">
                    Adjust the bit width to see how quantization error scales with precision. Notice how error increases dramatically below 4 bits.
                </Paragraph>
                <QuantizationErrorVisualization />
            </InteractiveCard>
        </Section>
    );
};

export default Fundamentals;
