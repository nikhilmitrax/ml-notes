import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const RoundingAndScaling = () => {
    return (
        <Section title="Rounding, Scaling & Accuracy Tricks" icon={Settings}>
            <Paragraph className="mb-4">
                Beyond basic quantization, several techniques can significantly improve accuracy without changing the bit width. These "tricks" address rounding bias, scale selection, and the critical problem of outliers.
            </Paragraph>

            <Header3>Rounding Modes</Header3>
            <Paragraph className="mb-4">
                The rounding function <Equation>{`\\text{round}(x)`}</Equation> seems trivial but its behavior profoundly affects quantization quality.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Round-to-Nearest-Even (Banker's Rounding)</Header4>
            <Paragraph className="mb-4">
                The standard for floating-point: ties (e.g., 0.5) round to the nearest even number. This eliminates systematic bias that would accumulate over many operations.
            </Paragraph>
            <CodeBlock language="python" code={`# Standard behavior in most frameworks
torch.round(torch.tensor([0.5, 1.5, 2.5, 3.5]))
# tensor([0., 2., 2., 4.])  # ties go to even`} />

            <Header4 className="font-bold text-slate-800 mb-2 mt-6">Stochastic Rounding</Header4>
            <Paragraph className="mb-2">
                Round up or down randomly, with probability proportional to the fractional part:
            </Paragraph>
            <Equation block>
                {`\\text{round}_{stoch}(x) = \\begin{cases} \\lfloor x \\rfloor & \\text{with prob } 1 - (x - \\lfloor x \\rfloor) \\\\ \\lceil x \\rceil & \\text{with prob } x - \\lfloor x \\rfloor \\end{cases}`}
            </Equation>
            <Paragraph className="mb-4 text-slate-600">
                <strong>Key property</strong>: <Equation>{`\\mathbb{E}[\\text{round}_{stoch}(x)] = x`}</Equation> — unbiased! Useful during QAT to avoid accumulating systematic errors.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Learned Rounding (AdaRound)</Header4>
            <Paragraph className="mb-4">
                Instead of fixed rounding, <strong>learn</strong> whether to round up or down for each weight. Introduced in "Up or Down? Adaptive Rounding for Post-Training Quantization" (2020).
            </Paragraph>
            <Equation block>
                {`\\hat{w} = s \\cdot \\text{clamp}\\left(\\lfloor w/s \\rceil + h(V), n, p\\right)`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                where <Equation>{`h(V) \\in \\{0, 1\\}`}</Equation> is a learned rounding offset. Optimized to minimize layer-wise reconstruction error.
            </Paragraph>

            <CodeBlock language="python" code={`# AdaRound: optimize rounding decisions
def adaround_loss(w_fp, w_q, x_calib):
    """Minimize ||Wx - Qx||^2 over rounding choices"""
    # V are continuous relaxations of binary rounding decisions
    # Optimized with gradient descent, then binarized
    out_fp = F.linear(x_calib, w_fp)
    out_q = F.linear(x_calib, w_q)  # w_q uses soft rounding
    return (out_fp - out_q).pow(2).mean()`} />

            <Callout type="tip" title="AdaRound Impact">
                AdaRound often recovers 0.5–2% accuracy over naive rounding, especially important at INT4 where each bit matters more. Many modern PTQ pipelines include AdaRound or variants.
            </Callout>

            <Header3>Scale & Zero-Point Selection</Header3>
            <Paragraph className="mb-4">
                How scales are represented and shared affects both accuracy and inference efficiency.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Power-of-Two Scaling</Header4>
            <Paragraph className="mb-4">
                Constrain scales to powers of 2: <Equation>{`s = 2^k`}</Equation>. Division becomes bit-shift, which is faster on some hardware:
            </Paragraph>
            <Equation block>
                {`\\frac{x}{s} = x \\gg k \\quad \\text{(right shift by } k \\text{ bits)}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Trade-off: Fewer scale options → slightly higher quantization error. Used in some edge/mobile deployments.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Shared Scales</Header4>
            <Paragraph className="mb-4">
                For weight+activation quantization, the output scale is the product of input scales:
            </Paragraph>
            <Equation block>
                {`(X \\cdot s_x) \\times (W \\cdot s_w) = XW \\cdot (s_x \\cdot s_w)`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                If activations use dynamic per-tensor scales, the combined scale must be computed at runtime. Fused kernels handle this efficiently.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Log-Domain Scaling</Header4>
            <Paragraph className="mb-4">
                Store scales in log domain to reduce numerical range: <Equation>{`s = e^{log\\_scale}`}</Equation>. Useful when scales vary over many orders of magnitude across layers.
            </Paragraph>

            <Header3>Bias Correction</Header3>
            <Paragraph className="mb-4">
                Quantization can introduce systematic bias in layer outputs. <strong>Bias correction</strong> techniques compensate without retraining.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Layerwise Bias Correction</Header4>
            <Paragraph className="mb-2">
                Compute the expected error on calibration data and subtract:
            </Paragraph>
            <Equation block>
                {`\\mathbb{E}[Wx - \\hat{W}x] = (W - \\hat{W})\\mathbb{E}[x] = \\Delta W \\cdot \\mu_x`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Add correction <Equation>{`b_{corr} = -\\Delta W \\cdot \\mu_x`}</Equation> to the bias term. Cheap to compute, often helps.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Cross-Layer Equalization (CLE)</Header4>
            <Paragraph className="mb-4">
                Rescale weights between adjacent layers to balance their ranges without changing the network function:
            </Paragraph>
            <Equation block>
                {`Y = W_2 \\cdot \\text{act}(W_1 \\cdot X) = (W_2 S^{-1}) \\cdot \\text{act}((S W_1) \\cdot X)`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Choose <Equation>{`S`}</Equation> to equalize the ranges of <Equation>{`W_1`}</Equation> and <Equation>{`W_2`}</Equation>. Reduces quantization error when one layer has much larger weights than adjacent layers.
            </Paragraph>

            <Header3>Outlier Handling</Header3>
            <Paragraph className="mb-4">
                Outliers are the primary challenge for activation quantization in transformers. Several strategies address them:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">1. Aggressive Clipping</Header4>
            <Paragraph className="mb-4">
                Simply clip outliers at a percentile threshold (e.g., 99.9%). Works if outliers are noise, but fails when they carry semantic information.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">2. Channel Splitting</Header4>
            <Paragraph className="mb-4">
                Duplicate outlier channels and halve their values. The sum is unchanged but each half fits in the quantization range:
            </Paragraph>
            <CodeBlock language="python" code={`# Before: channel c has outliers
x[:, :, c] = [large values]

# After: split into two channels, each halved
x[:, :, c] = [large values] / 2
x[:, :, c'] = [large values] / 2  # new channel

# Weight matrices updated to sum contributions
W[:, c] → W[:, c]/2, W[:, c'] = W[:, c]/2`} />
            <Paragraph className="text-slate-600 mb-4">
                Used in LLM.int8() for the small fraction (~0.1%) of channels with extreme outliers.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">3. Mixed Precision for Outliers</Header4>
            <Paragraph className="mb-4">
                Keep outlier channels in FP16/BF16, quantize the rest to INT8. The "mixed" matmul separates:
            </Paragraph>
            <Equation block>
                {`Y = X_{quant}W_{quant} + X_{outlier}W_{outlier}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                LLM.int8() uses this approach: ~99.9% of computation in INT8, ~0.1% in FP16. Minimal slowdown with significant accuracy recovery.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">4. Smoothing (SmoothQuant)</Header4>
            <Paragraph className="mb-4">
                The key insight: outliers in activations correspond to specific channels. We can <strong>migrate</strong> the difficulty from activations to weights:
            </Paragraph>
            <Equation block>
                {`Y = (X \\text{diag}(s)^{-1}) \\cdot (\\text{diag}(s) W) = \\hat{X} \\hat{W}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-2">
                where <Equation>{`s_j = \\max_i |X_{ij}|^\\alpha / \\max_k |W_{jk}|^{1-\\alpha}`}</Equation> balances smoothness between X and W.
            </Paragraph>
            <Paragraph className="mb-4">
                After smoothing, both <Equation>{`\\hat{X}`}</Equation> and <Equation>{`\\hat{W}`}</Equation> have more uniform ranges, making INT8 quantization viable for both.
            </Paragraph>

            <Callout type="info" title="SmoothQuant Trade-off">
                The hyperparameter <Equation>{`\\alpha \\in [0, 1]`}</Equation> controls the migration. <Equation>{`\\alpha = 0.5`}</Equation> (equal split) works for many models. Larger <Equation>{`\\alpha`}</Equation> pushes more difficulty to weights; smaller to activations. Optimal <Equation>{`\\alpha`}</Equation> is layer-dependent.
            </Callout>

            <Header4 className="font-bold text-slate-800 mb-2 mt-6">5. Rotation/Hadamard Transform</Header4>
            <Paragraph className="mb-4">
                Recent work (QuaRot, SpinQuant) applies orthogonal rotations to spread outlier magnitude across all channels:
            </Paragraph>
            <Equation block>
                {`\\tilde{X} = X \\cdot R, \\quad \\tilde{W} = R^T W`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                where <Equation>{`R`}</Equation> is an orthogonal matrix (often Hadamard). The rotation preserves the output but distributes outlier energy, making quantization easier. Requires fusing the rotation into adjacent operations.
            </Paragraph>

            <Header3>Summary: PTQ Enhancement Pipeline</Header3>
            <Paragraph className="mb-4">
                A typical modern PTQ pipeline combines multiple techniques:
            </Paragraph>
            <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <pre>{`1. Cross-layer equalization (balance weight ranges)
2. SmoothQuant (migrate activation outliers to weights)
3. Per-channel weight quantization with group size 128
4. AdaRound (optimize rounding decisions)
5. Bias correction (fix systematic errors)
6. (Optional) Mixed-precision for remaining outlier channels`}</pre>
            </div>
            <Paragraph className="text-slate-600">
                Each step typically adds 0.5–2% accuracy recovery. Combined, they enable INT4/INT8 quantization with near-FP16 quality.
            </Paragraph>
        </Section>
    );
};

export default RoundingAndScaling;
