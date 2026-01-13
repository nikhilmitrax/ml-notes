import React from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const HardwareKernels = () => {
    return (
        <Section title="Hardware & Kernel Realities" icon={Cpu}>
            <Paragraph className="mb-4">
                Quantization benefits only materialize when hardware supports the target precision and kernels are optimized to exploit it. Understanding the hardware pipeline is essential for effective deployment.
            </Paragraph>

            <Header3>Integer Math Pipeline</Header3>
            <Paragraph className="mb-4">
                Modern GPUs (NVIDIA Turing, Ampere, Hopper) include dedicated integer tensor cores that perform INT8 matrix multiply with INT32 accumulation.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">INT8×INT8 → INT32 Accumulation</Header4>
            <Paragraph className="mb-4">
                The fundamental operation for INT8 quantized inference:
            </Paragraph>
            <Equation block>
                {`C_{int32} = \\sum_{k} A_{int8}[i,k] \\cdot B_{int8}[k,j]`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Accumulation in INT32 prevents overflow: <Equation>{`n`}</Equation> INT8 products sum to at most <Equation>{`n \\cdot 127^2 \\approx 16000 \\cdot n`}</Equation>. For GEMM with <Equation>{`k=4096`}</Equation>, max sum is ~65M, well within INT32.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Requantization</Header4>
            <Paragraph className="mb-4">
                After INT32 accumulation, convert back to INT8 for the next layer:
            </Paragraph>
            <CodeBlock language="python" code={`# Requantization: INT32 -> INT8
def requantize(acc_int32, scale_in, scale_weight, scale_out):
    """Convert INT32 accumulator to INT8 activation"""
    # The scale factors combine:
    # Original: y = (x * sx) @ (w * sw) = x @ w * (sx * sw)
    # Requantize: y_int8 = round(y / scale_out)
    combined_scale = (scale_in * scale_weight) / scale_out
    
    # Apply combined rescaling and round to INT8
    return clamp(round(acc_int32 * combined_scale), -128, 127).to(int8)`} />

            <Header4 className="font-bold text-slate-800 mb-2">Saturation Behavior</Header4>
            <Paragraph className="mb-4">
                When values exceed INT8 range during requantization, they <strong>saturate</strong> (clamp to ±127) rather than wrap. This is safer but can hide precision issues—always monitor for saturation during calibration.
            </Paragraph>

            <Callout type="caution" title="Potential Overflow">
                While INT32 handles typical matmuls, edge cases can overflow:
                <List className="mt-2">
                    <ListItem><strong>Very long reduction</strong>: Matmuls with <Equation>{`k > 10^6`}</Equation> can approach INT32 limits</ListItem>
                    <ListItem><strong>Extreme values</strong>: If all inputs are ±127, overflow is possible</ListItem>
                    <ListItem><strong>Fused operations</strong>: bias add + activation can push past limits</ListItem>
                </List>
                Solution: Split large matmuls or use INT64/FP32 accumulation for sensitive operations.
            </Callout>

            <Header3>FP8 Pipelines</Header3>
            <Paragraph className="mb-4">
                NVIDIA Hopper (H100) and Ada Lovelace GPUs introduce native FP8 tensor cores. FP8 provides a middle ground between INT8 (no exponent, limited range) and FP16 (excessive precision for inference).
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">FP8 Variants</Header4>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Format</th>
                            <th className="px-4 py-2 border-b">Layout</th>
                            <th className="px-4 py-2 border-b">Max Value</th>
                            <th className="px-4 py-2 border-b">Min Normal</th>
                            <th className="px-4 py-2 border-b">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">E4M3</td>
                            <td className="px-4 py-2 font-mono">1s + 4e + 3m</td>
                            <td className="px-4 py-2">448</td>
                            <td className="px-4 py-2"><Equation>{`2^{-9}`}</Equation></td>
                            <td className="px-4 py-2">Weights, activations (fwd)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">E5M2</td>
                            <td className="px-4 py-2 font-mono">1s + 5e + 2m</td>
                            <td className="px-4 py-2">57344</td>
                            <td className="px-4 py-2"><Equation>{`2^{-16}`}</Equation></td>
                            <td className="px-4 py-2">Gradients (wider range)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4 className="font-bold text-slate-800 mb-2">Scaling Factors & Amax Tracking</Header4>
            <Paragraph className="mb-4">
                FP8 has limited dynamic range, requiring per-tensor scaling. The <strong>amax</strong> (absolute maximum) is tracked to set scales:
            </Paragraph>
            <CodeBlock language="python" code={`# FP8 with delayed scaling (common approach)
class FP8Linear:
    def __init__(self):
        self.amax_history = []  # Track amax over iterations
        self.scale = 1.0
    
    def forward(self, x, w):
        # Use scale from previous iteration
        x_fp8 = (x / self.x_scale).to(float8_e4m3)
        w_fp8 = (w / self.w_scale).to(float8_e4m3)
        
        # FP8 matmul with FP32/FP16 accumulation
        y = matmul_fp8(x_fp8, w_fp8) * (self.x_scale * self.w_scale)
        
        # Update amax for next iteration
        self.amax_history.append(x.abs().max())
        self.x_scale = self.compute_scale(max(self.amax_history[-N:]))
        
        return y
    
    def compute_scale(self, amax, fp8_max=448):
        """Scale such that amax maps to fp8_max"""
        return amax / fp8_max`} />

            <Header4 className="font-bold text-slate-800 mb-2">Per-Tensor vs Per-Block Scaling</Header4>
            <Paragraph className="mb-4">
                Two strategies for FP8 scaling granularity:
            </Paragraph>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Per-Tensor Scaling</Header4>
                    <List className="text-sm text-slate-600">
                        <ListItem>One scale for entire tensor</ListItem>
                        <ListItem>Simple, minimal overhead</ListItem>
                        <ListItem>Accuracy loss if range varies</ListItem>
                        <ListItem>Used in most current deployments</ListItem>
                    </List>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Per-Block (Tile) Scaling</Header4>
                    <List className="text-sm text-slate-600">
                        <ListItem>Scale per 128×128 or 256×256 tile</ListItem>
                        <ListItem>Better accuracy for varied distributions</ListItem>
                        <ListItem>More complex kernel, storage overhead</ListItem>
                        <ListItem>Emerging in advanced frameworks</ListItem>
                    </List>
                </div>
            </div>

            <Header3>Operator Coverage</Header3>
            <Paragraph className="mb-4">
                Not all operations can be quantized efficiently. The typical fallback pattern:
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Operation</th>
                            <th className="px-4 py-2 border-b">Quantizable?</th>
                            <th className="px-4 py-2 border-b">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Linear (GEMM)</td>
                            <td className="px-4 py-2 text-emerald-600">✓ Yes</td>
                            <td className="px-4 py-2">Primary target, excellent support</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Conv2D</td>
                            <td className="px-4 py-2 text-emerald-600">✓ Yes</td>
                            <td className="px-4 py-2">Via im2col or direct int convolution</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Embedding Lookup</td>
                            <td className="px-4 py-2 text-emerald-600">✓ Yes</td>
                            <td className="px-4 py-2">Table stored in INT8/INT4</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">LayerNorm</td>
                            <td className="px-4 py-2 text-amber-600">Partial</td>
                            <td className="px-4 py-2">Often kept in FP16 or fused</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Softmax</td>
                            <td className="px-4 py-2 text-red-600">✗ No</td>
                            <td className="px-4 py-2">Requires FP16+; exp() is expensive in INT</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">GELU/SiLU</td>
                            <td className="px-4 py-2 text-amber-600">Partial</td>
                            <td className="px-4 py-2">LUT-based INT or stay FP16</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Residual Add</td>
                            <td className="px-4 py-2 text-amber-600">Partial</td>
                            <td className="px-4 py-2">Scale mismatch issues; often FP</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Attention (QK·V)</td>
                            <td className="px-4 py-2 text-amber-600">Partial</td>
                            <td className="px-4 py-2">QK^T can be INT8; softmax stays FP</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="info" title="Why Partial Quantization Helps">
                Even if only Linear layers are quantized (60-80% of parameters in LLMs), the memory and bandwidth savings are substantial. FP16 "glue" operations between quantized GEMMs add minimal overhead.
            </Callout>

            <Header3>Kernel Fusion</Header3>
            <Paragraph className="mb-4">
                Fusing multiple operations into a single kernel reduces memory traffic and kernel launch overhead—critical for quantized inference.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Common Fusion Patterns</Header4>
            <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Linear + Bias + Activation</Header4>
                    <CodeBlock language="python" code={`# Fused: dequant -> GEMM -> bias -> GELU in one kernel
y = fused_linear_gelu(x_int8, w_int4, bias, scales)

# Instead of:
w_fp16 = dequant(w_int4, scale)
y = x @ w_fp16
y = y + bias
y = gelu(y)`} />
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">QKV Projection Fusion</Header4>
                    <Paragraph variant="small" className="text-slate-600 mb-2">
                        Compute Q, K, V projections in a single kernel, sharing input loads:
                    </Paragraph>
                    <CodeBlock language="python" code={`# Fused: compute Q, K, V together
Q, K, V = fused_qkv_proj(x, W_qkv_int4, scales)
# W_qkv is [3*d, d] stacked; one dequant + GEMM kernel`} />
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Attention Fusion</Header4>
                    <Paragraph variant="small" className="text-slate-600 mb-2">
                        Flash-style attention with quantized KV cache:
                    </Paragraph>
                    <CodeBlock language="python" code={`# Fused attention with INT8 KV cache
out = fused_attention(
    Q,                    # FP16
    K_cache_int8,         # INT8 -> dequant on load
    V_cache_int8,         # INT8 -> dequant on load
    k_scale, v_scale
)
# Never materializes full [S, S] attention matrix`} />
                </div>
            </div>

            <Header3>Memory Bandwidth vs Compute Analysis</Header3>
            <Paragraph className="mb-4">
                Quantization's primary benefit for LLM inference is <strong>memory bandwidth</strong>, not compute. Understanding when you're bandwidth-bound vs compute-bound determines optimal strategy.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Arithmetic Intensity</Header4>
            <Equation block>
                {`\\text{Arithmetic Intensity} = \\frac{\\text{FLOPs}}{\\text{Bytes Transferred}}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Operations with low arithmetic intensity are <strong>memory-bound</strong>; high intensity are <strong>compute-bound</strong>.
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Scenario</th>
                            <th className="px-4 py-2 border-b">FLOPs</th>
                            <th className="px-4 py-2 border-b">Bytes (FP16)</th>
                            <th className="px-4 py-2 border-b">Intensity</th>
                            <th className="px-4 py-2 border-b">Bound</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Single token (B=1)</td>
                            <td className="px-4 py-2"><Equation>{`2d^2`}</Equation></td>
                            <td className="px-4 py-2"><Equation>{`2d^2`}</Equation> (weights)</td>
                            <td className="px-4 py-2">~1 FLOP/byte</td>
                            <td className="px-4 py-2 text-red-600 font-medium">Memory</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Batch=32</td>
                            <td className="px-4 py-2"><Equation>{`64d^2`}</Equation></td>
                            <td className="px-4 py-2"><Equation>{`2d^2`}</Equation> (weights)</td>
                            <td className="px-4 py-2">~32 FLOP/byte</td>
                            <td className="px-4 py-2 text-amber-600 font-medium">Balanced</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Batch=256</td>
                            <td className="px-4 py-2"><Equation>{`512d^2`}</Equation></td>
                            <td className="px-4 py-2"><Equation>{`2d^2`}</Equation> (weights)</td>
                            <td className="px-4 py-2">~256 FLOP/byte</td>
                            <td className="px-4 py-2 text-emerald-600 font-medium">Compute</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4 className="font-bold text-slate-800 mb-2">Quantization Impact</Header4>
            <Paragraph className="mb-4">
                For memory-bound scenarios (single-token generation), INT4 weights reduce memory traffic 4×, providing near-linear speedup:
            </Paragraph>
            <Equation block>
                {`\\text{Speedup}_{memory} \\approx \\frac{\\text{Bytes}_{FP16}}{\\text{Bytes}_{INT4}} = \\frac{16}{4} = 4\\times`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                For compute-bound scenarios (large batches), INT8 tensor cores provide 2× throughput over FP16:
            </Paragraph>
            <Equation block>
                {`\\text{Speedup}_{compute} \\approx \\frac{\\text{TOPS}_{INT8}}{\\text{TOPS}_{FP16}} = \\frac{\\sim 3000}{\\sim 1500} \\approx 2\\times \\text{ (A100)}`}
            </Equation>

            <Callout type="tip" title="Practical Guidance">
                <List>
                    <ListItem><strong>Single-user inference (B=1)</strong>: Prioritize weight quantization (INT4/INT8). Memory-bound regime.</ListItem>
                    <ListItem><strong>Batched inference (B≥32)</strong>: Consider W8A8 to utilize INT8 tensor cores. Compute starts to matter.</ListItem>
                    <ListItem><strong>Training</strong>: FP8 for both forward and backward. Compute-bound, tensor core throughput critical.</ListItem>
                </List>
            </Callout>
        </Section>
    );
};

export default HardwareKernels;
