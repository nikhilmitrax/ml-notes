import React from 'react';
import { MessageSquare } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const LLMQuantization = () => {
    return (
        <Section title="LLM-Specific Quantization" icon={MessageSquare}>
            <Paragraph className="mb-4">
                Large Language Models present unique quantization challenges: billions of parameters, memory-bandwidth-bound inference, attention mechanisms, and extreme sensitivity in certain layers. Modern LLM quantization has evolved specialized techniques to address these challenges.
            </Paragraph>

            <Header3>Weight-Only vs Weight+Activation Quantization</Header3>
            <Paragraph className="mb-4">
                The dominant approach for LLM inference is <strong>weight-only quantization</strong>: weights are stored in INT4/INT8, but activations remain in FP16/BF16. This differs from traditional quantization where both are quantized.
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Header4 className="text-blue-800 mb-2">Weight-Only (W4A16, W8A16)</Header4>
                    <List className="text-blue-700 text-sm">
                        <ListItem><strong>Weights</strong>: INT4 or INT8, stored compressed</ListItem>
                        <ListItem><strong>Activations</strong>: FP16/BF16, computed dynamically</ListItem>
                        <ListItem><strong>Matmul</strong>: Dequantize weights → FP16 GEMM</ListItem>
                        <ListItem><strong>Primary benefit</strong>: Memory reduction</ListItem>
                        <ListItem><strong>Use case</strong>: LLM inference (memory-bound)</ListItem>
                    </List>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <Header4 className="text-emerald-800 mb-2">Weight+Activation (W8A8, W4A4)</Header4>
                    <List className="text-emerald-700 text-sm">
                        <ListItem><strong>Weights</strong>: INT8 or INT4</ListItem>
                        <ListItem><strong>Activations</strong>: Also quantized to INT8/INT4</ListItem>
                        <ListItem><strong>Matmul</strong>: INT8×INT8 → INT32 kernels</ListItem>
                        <ListItem><strong>Primary benefit</strong>: Compute speedup + memory</ListItem>
                        <ListItem><strong>Use case</strong>: Compute-bound scenarios, batched inference</ListItem>
                    </List>
                </div>
            </div>

            <Callout type="info" title="Why Weight-Only Dominates for LLMs">
                Single-batch LLM inference is <strong>memory-bandwidth bound</strong>: loading weights dominates runtime. Compressing weights 4× provides ~4× speedup even with FP16 compute. Quantizing activations adds complexity with less benefit for the common case.
            </Callout>

            <Header3>Groupwise INT4/INT8 Quantization</Header3>
            <Paragraph className="mb-4">
                Per-tensor quantization wastes precision when weight distributions vary across a matrix. <strong>Groupwise quantization</strong> provides a middle ground between per-tensor and per-channel.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Group Size Trade-offs</Header4>
            <Equation block>
                {`W \\in \\mathbb{R}^{d_{out} \\times d_{in}} \\rightarrow \\{W_g, s_g, z_g\\}_{g=1}^{d_{out} \\cdot d_{in} / G}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Each group of <Equation>{`G`}</Equation> consecutive weights shares a scale <Equation>{`s_g`}</Equation> and zero-point <Equation>{`z_g`}</Equation>.
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Group Size</th>
                            <th className="px-4 py-2 border-b">Scale Overhead</th>
                            <th className="px-4 py-2 border-b">Accuracy</th>
                            <th className="px-4 py-2 border-b">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Per-tensor</td>
                            <td className="px-4 py-2">Negligible</td>
                            <td className="px-4 py-2">Poor</td>
                            <td className="px-4 py-2">Rarely used for LLMs</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Per-channel</td>
                            <td className="px-4 py-2"><Equation>{`O(d_{out})`}</Equation></td>
                            <td className="px-4 py-2">Good</td>
                            <td className="px-4 py-2">Standard for INT8</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">G=128</td>
                            <td className="px-4 py-2">+0.5 bits/weight</td>
                            <td className="px-4 py-2">Very good</td>
                            <td className="px-4 py-2">Common for INT4</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">G=64</td>
                            <td className="px-4 py-2">+1 bit/weight</td>
                            <td className="px-4 py-2">Excellent</td>
                            <td className="px-4 py-2">Higher quality, more overhead</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">G=32</td>
                            <td className="px-4 py-2">+2 bits/weight</td>
                            <td className="px-4 py-2">Near-FP16</td>
                            <td className="px-4 py-2">Diminishing returns</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Paragraph className="text-slate-600 mb-4">
                <strong>Effective bits per weight</strong> for INT4 with group size G: <Equation>{`4 + \\frac{32}{G}`}</Equation> (assuming FP16 scales). G=128 gives 4.25 bits, G=32 gives 5 bits.
            </Paragraph>

            <Header3>Activation Quantization Pain Points</Header3>
            <Paragraph className="mb-4">
                When quantizing activations (W8A8 scenarios), several components require special handling:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">LayerNorm / RMSNorm</Header4>
            <Paragraph className="mb-4">
                The normalization output can have a wide dynamic range due to the learned scale <Equation>{`\\gamma`}</Equation>:
            </Paragraph>
            <Equation block>
                {`\\text{RMSNorm}(x) = \\frac{x}{\\sqrt{\\frac{1}{d}\\sum_i x_i^2 + \\epsilon}} \\cdot \\gamma`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Outlier channels with large <Equation>{`\\gamma`}</Equation> values create extreme activations. <strong>Solutions</strong>: Fuse norm into next layer, use per-channel output quantization, or keep norm output in FP16.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Softmax</Header4>
            <Paragraph className="mb-4">
                Attention probabilities after softmax span <Equation>{`[0, 1]`}</Equation> with many values near 0:
            </Paragraph>
            <List className="mb-4">
                <ListItem>INT8 wastes range (127 levels for values 0-1)</ListItem>
                <ListItem>Small probabilities (0.001) round to 0, losing information</ListItem>
                <ListItem>For long sequences, attention becomes very sparse—most weights are ~0</ListItem>
            </List>
            <Paragraph className="text-slate-600 mb-4">
                <strong>Solution</strong>: Keep softmax in FP16/BF16. The matmul <Equation>{`(\\text{softmax}) \\times V`}</Equation> can still use FP16 or mixed precision.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Attention Score Scaling</Header4>
            <Paragraph className="mb-4">
                Pre-softmax attention scores <Equation>{`QK^T / \\sqrt{d_k}`}</Equation> can be very large (especially for long sequences with sharp attention), causing:
            </Paragraph>
            <List className="mb-4">
                <ListItem>INT8 overflow in <Equation>{`QK^T`}</Equation> accumulation</ListItem>
                <ListItem>Large magnitudes that are hard to quantize uniformly</ListItem>
            </List>
            <Paragraph className="text-slate-600 mb-4">
                <strong>Solutions</strong>: Use INT32 accumulators, apply scaling before quantization, or fuse with FlashAttention-style kernels that keep attention computation in higher precision.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">GELU / SiLU Activations</Header4>
            <Paragraph className="mb-4">
                Unlike ReLU (strictly non-negative), GELU and SiLU have negative regions:
            </Paragraph>
            <Equation block>
                {`\\text{SiLU}(x) = x \\cdot \\sigma(x), \\quad \\text{GELU}(x) = x \\cdot \\Phi(x)`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                The asymmetric output range and potential for outliers complicate quantization. <strong>Asymmetric quantization</strong> with careful range selection is essential.
            </Paragraph>

            <Header3>KV-Cache Quantization</Header3>
            <Paragraph className="mb-4">
                For long-context LLMs, the KV cache dominates memory. A 70B model with 128K context can require 100+ GB just for KV cache at FP16.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Memory Calculations</Header4>
            <Equation block>
                {`\\text{KV Cache} = 2 \\times L \\times S \\times n_h \\times d_h \\times \\text{bytes}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                where <Equation>{`L`}</Equation> = layers, <Equation>{`S`}</Equation> = sequence length, <Equation>{`n_h`}</Equation> = KV heads, <Equation>{`d_h`}</Equation> = head dim.
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">KV Precision</th>
                            <th className="px-4 py-2 border-b">70B @ 8K ctx</th>
                            <th className="px-4 py-2 border-b">70B @ 128K ctx</th>
                            <th className="px-4 py-2 border-b">Accuracy Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">FP16</td>
                            <td className="px-4 py-2">~8 GB</td>
                            <td className="px-4 py-2">~128 GB</td>
                            <td className="px-4 py-2">Baseline</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">INT8</td>
                            <td className="px-4 py-2">~4 GB</td>
                            <td className="px-4 py-2">~64 GB</td>
                            <td className="px-4 py-2">Minimal (~0.1% PPL)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">INT4</td>
                            <td className="px-4 py-2">~2 GB</td>
                            <td className="px-4 py-2">~32 GB</td>
                            <td className="px-4 py-2">Noticeable (0.5-2% PPL)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="caution" title="KV Quantization Pitfalls">
                <List>
                    <ListItem><strong>Keys more sensitive than values</strong>: K affects attention pattern directly</ListItem>
                    <ListItem><strong>Long-range tokens</strong>: Early tokens may be outdated statistics</ListItem>
                    <ListItem><strong>Latency overhead</strong>: Quantize during decode, dequantize for attention</ListItem>
                </List>
            </Callout>

            <Header3>Matmul Kernels and Layouts</Header3>
            <Paragraph className="mb-4">
                Efficient low-precision inference requires specialized kernel implementations that handle packing, dequantization, and fusion.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Weight Packing</Header4>
            <Paragraph className="mb-4">
                INT4 weights are packed into INT8 or INT32 for efficient storage and vectorized loads:
            </Paragraph>
            <CodeBlock language="python" code={`# Pack two INT4 values into one INT8
def pack_int4(w1, w2):
    # w1, w2 in range [-8, 7] + offset
    return (w1 & 0xF) | ((w2 & 0xF) << 4)

# Efficient layout: pack along inner dimension
# Shape [out, in] → packed [out, in//8] as INT32
# Each INT32 holds 8 INT4 weights`} />

            <Header4 className="font-bold text-slate-800 mb-2">Dequant-on-the-fly</Header4>
            <Paragraph className="mb-4">
                Rather than unpacking all weights to FP16, dequantize during the matmul:
            </Paragraph>
            <CodeBlock language="python" code={`# Fused kernel pseudocode (simplified)
for tile in tiles:
    # Load packed INT4 weights
    w_packed = load_int4_tile(W, tile)
    
    # Dequantize in registers (fast)
    w_fp16 = (unpack_int4(w_packed) - zero_point) * scale
    
    # FP16 matmul
    acc += x_tile @ w_fp16.T
    
# Never materialize full FP16 weight matrix`} />

            <Header4 className="font-bold text-slate-800 mb-2">Fused Dequant + GEMM</Header4>
            <Paragraph className="mb-4">
                Modern libraries (Marlin, AWQ kernels, exllama) fuse dequantization with matrix multiply. Key optimizations:
            </Paragraph>
            <List className="mb-6">
                <ListItem><strong>Register-level dequant</strong>: Unpack and convert in GPU registers, not memory</ListItem>
                <ListItem><strong>Tensor core utilization</strong>: Convert to FP16 for tensor core HMMA</ListItem>
                <ListItem><strong>Coalesced loads</strong>: Pack weights in tile-friendly layouts</ListItem>
                <ListItem><strong>Scale broadcasting</strong>: Share scales across threadblocks efficiently</ListItem>
            </List>

            <Header3>Modern PTQ Methods for LLMs</Header3>
            <Paragraph className="mb-4">
                Several methods have emerged for high-quality LLM quantization without retraining:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">GPTQ: Hessian-Based Weight Quantization</Header4>
            <Paragraph className="mb-4">
                GPTQ uses second-order information (the Hessian) to minimize reconstruction error when quantizing weights one-by-one:
            </Paragraph>
            <Equation block>
                {`\\min_{\\hat{W}} \\| WX - \\hat{W}X \\|_2^2 \\approx \\min_{\\hat{W}} (W - \\hat{W})^T H (W - \\hat{W})`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                where <Equation>{`H = XX^T`}</Equation> is the Hessian of the layer-wise squared error.
            </Paragraph>

            <CodeBlock language="python" code={`# GPTQ core algorithm (simplified)
def gptq_quantize(W, H, bits=4):
    """Quantize weights column by column"""
    W_hat = W.clone()
    Q = torch.zeros_like(W)
    
    for i in range(W.shape[1]):
        # Quantize column i
        Q[:, i] = quantize(W_hat[:, i], bits)
        error = W_hat[:, i] - Q[:, i]
        
        # Compensate error in remaining columns (key insight!)
        W_hat[:, i+1:] -= error.outer(H[i, i+1:] / H[i, i])
    
    return Q`} />

            <Paragraph className="mb-4">
                <strong>Key insight</strong>: After quantizing each column, adjust remaining columns to compensate. This "error propagation" is why GPTQ outperforms naive round-to-nearest.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">AWQ: Activation-Aware Weight Quantization</Header4>
            <Paragraph className="mb-4">
                AWQ observes that not all weights are equally important—those multiplied by large activations matter more:
            </Paragraph>
            <Equation block>
                {`\\text{Importance}(w_{ij}) \\propto |w_{ij}| \\cdot \\mathbb{E}[|x_j|]`}
            </Equation>

            <Paragraph className="mb-4">
                AWQ protects important weights by scaling:
            </Paragraph>
            <CodeBlock language="python" code={`# AWQ: scale weights by activation magnitude
def awq_scale(W, activations):
    """Scale weight channels by activation importance"""
    # Compute per-channel activation magnitudes
    act_scale = activations.abs().mean(dim=0)  # [in_features]
    
    # Find optimal scaling factor
    # s_j = (act_scale_j)^alpha, typically alpha=0.5
    s = act_scale.pow(0.5)
    
    # Scale weights: equivalent to W @ diag(s^-1) @ diag(s) @ x
    W_scaled = W * s.unsqueeze(0)  # [out, in] * [1, in]
    
    return W_scaled, s  # Need to apply s^-1 to activations`} />

            <Paragraph className="text-slate-600 mb-4">
                After scaling, important channels have larger magnitude and are quantized more accurately. The scale is absorbed into the preceding layer.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">SmoothQuant: Migration of Quantization Difficulty</Header4>
            <Paragraph className="mb-4">
                SmoothQuant addresses the core W8A8 challenge: activations have outliers, weights don't. It <strong>migrates</strong> difficulty from activations to weights:
            </Paragraph>
            <Equation block>
                {`Y = XW = (X \\text{diag}(s)^{-1})(\\text{diag}(s) W) = \\hat{X}\\hat{W}`}
            </Equation>

            <CodeBlock language="python" code={`# SmoothQuant: balance activation and weight ranges
def smooth_quant(X_calib, W, alpha=0.5):
    """Smooth activations by migrating outliers to weights"""
    # Per-channel activation scales (outlier magnitude)
    act_max = X_calib.abs().max(dim=0).values  # [hidden]
    
    # Per-channel weight scales
    w_max = W.abs().max(dim=0).values  # [hidden]
    
    # Smoothing factor: balance based on alpha
    s = (act_max.pow(alpha) / w_max.pow(1 - alpha)).clamp(min=1e-5)
    
    # Apply: shrink activations, expand weights
    X_smooth = X / s  # activations become smoother
    W_smooth = W * s  # weights absorb the outlier difficulty
    
    return X_smooth, W_smooth`} />

            <Callout type="tip" title="Method Comparison">
                <List>
                    <ListItem><strong>GPTQ</strong>: Best for weight-only INT4; slower calibration but excellent quality</ListItem>
                    <ListItem><strong>AWQ</strong>: Fast calibration, good quality, kernel-friendly INT4</ListItem>
                    <ListItem><strong>SmoothQuant</strong>: Enables W8A8 by taming activation outliers</ListItem>
                </List>
                In practice, many deployments use AWQ or GPTQ for INT4 weight-only, and SmoothQuant when INT8 activations are needed.
            </Callout>
        </Section>
    );
};

export default LLMQuantization;
