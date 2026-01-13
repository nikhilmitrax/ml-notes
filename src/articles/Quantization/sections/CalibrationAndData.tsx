import React from 'react';
import { Database } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const CalibrationAndData = () => {
    return (
        <Section title="Calibration & Data Issues" icon={Database}>
            <Paragraph className="mb-4">
                Post-Training Quantization (PTQ) relies on <strong>calibration</strong>—running the model on representative data to collect activation statistics. The quality of calibration directly determines quantization accuracy.
            </Paragraph>

            <Header3>Calibration Datasets</Header3>
            <Paragraph className="mb-4">
                The calibration dataset provides samples that "teach" observers the expected distribution of activations and weights. Key considerations:
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Representativeness</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Must cover the distribution of real inference data. For LLMs, this means diverse text: code, prose, Q&A, multilingual content. Mismatch causes scale errors at deployment.
                    </Paragraph>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Size vs Quality</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        More samples → better statistics, but diminishing returns. Typically 128–1024 samples suffice for LLMs. Quality matters more: diverse, clean samples beat large noisy datasets.
                    </Paragraph>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Sequence Length</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        For LLMs, calibrate at or near the target context length. Activations at position 4096 differ from position 64—RoPE, attention patterns, and layer norms all shift.
                    </Paragraph>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Common Choices</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        C4, WikiText, RedPajama subsets. For specialized domains (medicine, code), include domain-specific samples or risk distribution shift.
                    </Paragraph>
                </div>
            </div>

            <Callout type="caution" title="Calibration Pitfall">
                Using only English text for calibration can cause severe degradation on multilingual inputs. Similarly, calibrating on short prompts but deploying on long contexts leads to scale mismatches in later layers.
            </Callout>

            <Header3>Activation Statistics & Challenges</Header3>
            <Paragraph className="mb-4">
                Unlike weights (fixed after training), activations vary per input. This creates unique challenges for quantization.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Outliers</Header4>
            <Paragraph className="mb-4">
                Transformer activations often exhibit <strong>heavy-tailed distributions</strong> with outliers 10–100× larger than typical values. These outliers:
            </Paragraph>
            <List className="mb-4">
                <ListItem>Appear systematically in specific channels (often &lt;1% of channels)</ListItem>
                <ListItem>Concentrate in certain layers (embedding, early attention, final layers)</ListItem>
                <ListItem>Carry significant semantic information—clipping them degrades quality</ListItem>
            </List>

            <CodeBlock language="python" code={`# Example: detecting outlier channels
def find_outlier_channels(activations, threshold=6.0):
    """Find channels where max > threshold * median"""
    channel_max = activations.abs().max(dim=(0, 1))  # [hidden_dim]
    channel_median = activations.abs().median(dim=(0, 1))
    outlier_ratio = channel_max / (channel_median + 1e-6)
    return torch.where(outlier_ratio > threshold)[0]

# Typical finding: ~0.1-1% of channels are outliers
# These channels dominate the quantization range`} />

            <Header4 className="font-bold text-slate-800 mb-2 mt-6">Per-Layer Distribution Shift</Header4>
            <Paragraph className="mb-4">
                Different layers have vastly different activation distributions:
            </Paragraph>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Layer Type</th>
                            <th className="px-4 py-2 border-b">Typical Distribution</th>
                            <th className="px-4 py-2 border-b">Quantization Challenge</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Embedding</td>
                            <td className="px-4 py-2">Sharp peaks per token</td>
                            <td className="px-4 py-2">High variance across vocabulary</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">QKV Projections</td>
                            <td className="px-4 py-2">Near-Gaussian</td>
                            <td className="px-4 py-2">Relatively easy</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Attention Output</td>
                            <td className="px-4 py-2">Heavy tails from softmax concentration</td>
                            <td className="px-4 py-2">Outlier channels</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">FFN (after GELU/SiLU)</td>
                            <td className="px-4 py-2">Sparse, many near-zero</td>
                            <td className="px-4 py-2">Asymmetric, need good zero-point</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">LayerNorm Output</td>
                            <td className="px-4 py-2">Normalized but outliers persist</td>
                            <td className="px-4 py-2">Outliers amplified by γ scaling</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Static vs Dynamic Quantization</Header3>
            <Paragraph className="mb-4">
                The timing of scale computation defines two paradigms:
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Header4 className="text-blue-800 mb-2">Static Quantization</Header4>
                    <Paragraph variant="small" className="text-blue-700 mb-2">
                        Scales computed offline during calibration, fixed at inference.
                    </Paragraph>
                    <List className="text-blue-700 text-sm">
                        <ListItem><strong>Pro</strong>: No runtime overhead for scale computation</ListItem>
                        <ListItem><strong>Pro</strong>: Enables fully fused int8 kernels</ListItem>
                        <ListItem><strong>Con</strong>: Accuracy loss if test distribution differs</ListItem>
                        <ListItem><strong>Con</strong>: Sensitive to calibration quality</ListItem>
                    </List>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <Header4 className="text-emerald-800 mb-2">Dynamic Quantization</Header4>
                    <Paragraph variant="small" className="text-emerald-700 mb-2">
                        Scales computed per input (per batch or per token) at runtime.
                    </Paragraph>
                    <List className="text-emerald-700 text-sm">
                        <ListItem><strong>Pro</strong>: Adapts to each input's distribution</ListItem>
                        <ListItem><strong>Pro</strong>: No calibration data needed</ListItem>
                        <ListItem><strong>Con</strong>: Runtime overhead (min/max computation)</ListItem>
                        <ListItem><strong>Con</strong>: Harder to fuse with matmul</ListItem>
                    </List>
                </div>
            </div>

            <Callout type="info" title="Hybrid Approaches">
                Modern LLM quantization often uses <strong>static weight quantization</strong> (computed once) with <strong>dynamic activation quantization</strong> (per-token or per-tensor at runtime). This balances accuracy with kernel efficiency.
            </Callout>

            <Header3>Observer Design</Header3>
            <Paragraph className="mb-4">
                <strong>Observers</strong> are modules that collect statistics during calibration to determine optimal scales and zero-points. The choice of observer significantly impacts accuracy.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Min-Max Observer</Header4>
            <Paragraph className="mb-2">
                Tracks running min/max across all calibration batches:
            </Paragraph>
            <CodeBlock language="python" code={`class MinMaxObserver:
    def __init__(self):
        self.min_val = float('inf')
        self.max_val = float('-inf')
    
    def forward(self, x):
        self.min_val = min(self.min_val, x.min().item())
        self.max_val = max(self.max_val, x.max().item())
        return x
    
    def calculate_qparams(self, dtype=torch.qint8):
        # For symmetric: scale = max(|min|, |max|) / 127
        # For asymmetric: scale = (max - min) / 255, zp = -min/scale
        ...`} />

            <Header4 className="font-bold text-slate-800 mb-2 mt-6">Moving Average Observer</Header4>
            <Paragraph className="mb-2">
                Uses exponential moving average to reduce sensitivity to outlier batches:
            </Paragraph>
            <Equation block>
                {`\\mu_t = \\alpha \\cdot x_t + (1-\\alpha) \\cdot \\mu_{t-1}`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                where <Equation>{`\\alpha`}</Equation> is typically 0.01–0.1. Smooths out batch-to-batch variance.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Histogram Observer</Header4>
            <Paragraph className="mb-4">
                Builds a histogram of values, then uses percentile or KL-divergence to find optimal clipping:
            </Paragraph>
            <CodeBlock language="python" code={`class HistogramObserver:
    def __init__(self, bins=2048):
        self.histogram = torch.zeros(bins)
        self.min_val = float('inf')
        self.max_val = float('-inf')
    
    def forward(self, x):
        # Update histogram
        x_flat = x.flatten()
        self.min_val = min(self.min_val, x_flat.min())
        self.max_val = max(self.max_val, x_flat.max())
        hist = torch.histc(x_flat, bins=len(self.histogram), 
                          min=self.min_val, max=self.max_val)
        self.histogram += hist
        return x
    
    def calculate_qparams(self, method='entropy'):
        # method='percentile': clip at 99.99th percentile
        # method='entropy': minimize KL divergence
        # method='mse': minimize reconstruction error
        ...`} />

            <Header4 className="font-bold text-slate-800 mb-2 mt-6">Per-Token vs Per-Batch Statistics</Header4>
            <Paragraph className="mb-4">
                For dynamic quantization of activations:
            </Paragraph>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Granularity</th>
                            <th className="px-4 py-2 border-b">Scale Shape</th>
                            <th className="px-4 py-2 border-b">Accuracy</th>
                            <th className="px-4 py-2 border-b">Overhead</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Per-Tensor</td>
                            <td className="px-4 py-2 font-mono text-xs">[1]</td>
                            <td className="px-4 py-2">Low (all tokens share scale)</td>
                            <td className="px-4 py-2">Minimal</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Per-Token</td>
                            <td className="px-4 py-2 font-mono text-xs">[B, S, 1]</td>
                            <td className="px-4 py-2">High (adapts to each token)</td>
                            <td className="px-4 py-2">S reductions per layer</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Per-Channel-Token</td>
                            <td className="px-4 py-2 font-mono text-xs">[B, S, C]</td>
                            <td className="px-4 py-2">Highest</td>
                            <td className="px-4 py-2">Impractical overhead</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="LLM Practice">
                For LLM inference, <strong>per-token dynamic quantization</strong> is common for activations. The reduction to compute min/max over the hidden dimension (<Equation>{`d=4096`}</Equation>) is fast and amortized by the weight load. Per-tensor would waste precision on outlier tokens.
            </Callout>
        </Section>
    );
};

export default CalibrationAndData;
