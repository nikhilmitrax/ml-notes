import React from 'react';
import { GraduationCap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const TrainingAware = () => {
    return (
        <Section title="Quantization-Aware Training" icon={GraduationCap}>
            <Paragraph className="mb-4">
                When PTQ fails to achieve acceptable accuracy—especially at very low bit widths (INT4, INT2)—<strong>Quantization-Aware Training (QAT)</strong> adapts the model during training to be robust to quantization effects.
            </Paragraph>

            <Header3>PTQ vs QAT: When to Use Each</Header3>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Scenario</th>
                            <th className="px-4 py-2 border-b">Recommended</th>
                            <th className="px-4 py-2 border-b">Reasoning</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">INT8 on most models</td>
                            <td className="px-4 py-2 text-blue-600 font-medium">PTQ</td>
                            <td className="px-4 py-2">Usually sufficient; QAT overhead not justified</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">INT4 weights (LLM)</td>
                            <td className="px-4 py-2 text-blue-600 font-medium">PTQ (GPTQ/AWQ)</td>
                            <td className="px-4 py-2">Modern PTQ methods achieve excellent results</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">INT4 weights + activations</td>
                            <td className="px-4 py-2 text-emerald-600 font-medium">QAT</td>
                            <td className="px-4 py-2">Activation quantization at INT4 usually needs QAT</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">INT2 / Binary</td>
                            <td className="px-4 py-2 text-emerald-600 font-medium">QAT</td>
                            <td className="px-4 py-2">Extreme quantization requires training adaptation</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Accuracy-critical deployment</td>
                            <td className="px-4 py-2 text-emerald-600 font-medium">QAT</td>
                            <td className="px-4 py-2">Max accuracy recovery when compute budget allows</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">No training data access</td>
                            <td className="px-4 py-2 text-blue-600 font-medium">PTQ</td>
                            <td className="px-4 py-2">QAT requires representative training data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4 className="font-bold text-slate-800 mb-2">PTQ Failure Modes</Header4>
            <List className="mb-6">
                <ListItem><strong>Severe accuracy drop</strong>: &gt;5% degradation indicates PTQ is insufficient</ListItem>
                <ListItem><strong>Activation outliers</strong>: Some layers have extreme outliers that PTQ cannot handle</ListItem>
                <ListItem><strong>Very low bit-width</strong>: Below 4 bits, quantization error dominates</ListItem>
                <ListItem><strong>Sensitive architectures</strong>: Models with tight tolerances (e.g., some ViTs) resist PTQ</ListItem>
            </List>

            <Header3>The Straight-Through Estimator (STE)</Header3>
            <Paragraph className="mb-4">
                The fundamental challenge of QAT is that quantization is <strong>non-differentiable</strong>—the rounding function has zero gradient almost everywhere. The <strong>Straight-Through Estimator</strong> provides a practical workaround.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">The Problem</Header4>
            <Equation block>
                {`\\frac{\\partial Q(x)}{\\partial x} = \\frac{\\partial \\text{round}(x/s)}{\\partial x} = 0 \\quad \\text{(almost everywhere)}`}
            </Equation>
            <Paragraph className="mb-4 text-slate-600">
                With zero gradients, backpropagation cannot update weights through quantized operations.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">The STE Solution</Header4>
            <Paragraph className="mb-2">
                During the backward pass, <strong>pretend the quantization function is the identity</strong>:
            </Paragraph>
            <Equation block>
                {`\\frac{\\partial L}{\\partial x} \\approx \\frac{\\partial L}{\\partial Q(x)} \\cdot 1 = \\frac{\\partial L}{\\partial Q(x)}`}
            </Equation>

            <CodeBlock language="python" code={`class FakeQuantize(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x, scale, zero_point, quant_min, quant_max):
        # Forward: actual quantization
        x_q = torch.clamp(torch.round(x / scale) + zero_point, 
                         quant_min, quant_max)
        x_dq = (x_q - zero_point) * scale  # dequantize
        ctx.save_for_backward(x, scale)
        ctx.quant_min, ctx.quant_max = quant_min, quant_max
        return x_dq
    
    @staticmethod
    def backward(ctx, grad_output):
        x, scale = ctx.saved_tensors
        # STE: pass gradient through, but zero outside clamp range
        x_q = x / scale
        mask = (x_q >= ctx.quant_min) & (x_q <= ctx.quant_max)
        grad_input = grad_output * mask.float()
        return grad_input, None, None, None, None`} />

            <Callout type="info" title="Why STE Works">
                Despite its mathematical incorrectness, STE works because:
                <List className="mt-2">
                    <ListItem>It provides a <strong>biased but non-zero</strong> gradient signal</ListItem>
                    <ListItem>The network learns to produce values that are <strong>robust to rounding</strong></ListItem>
                    <ListItem>Weights converge to "quantization-friendly" values near grid points</ListItem>
                </List>
            </Callout>

            <Header3>Fake Quantization Modules</Header3>
            <Paragraph className="mb-4">
                <strong>Fake quantization</strong> simulates quantization during training while keeping computations in floating-point. The model experiences quantization effects but gradients still flow.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Where to Insert Fake Quantization</Header4>
            <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Weight Quantization</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Insert before each linear/conv layer. Quantize → dequantize weights, then do FP matmul. Common for all QAT.
                    </Paragraph>
                    <CodeBlock language="python" code={`# In forward pass
w_q = fake_quantize(self.weight, self.w_scale, self.w_zp)
out = F.linear(x, w_q, self.bias)`} />
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Activation Quantization</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Insert after activations (ReLU, GELU) and before next layer. Simulates the quantized activation path.
                    </Paragraph>
                    <CodeBlock language="python" code={`# After activation
x = F.gelu(x)
x = fake_quantize(x, self.act_scale, self.act_zp)  # simulate quant
x = self.next_layer(x)`} />
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-2">Accumulator Quantization</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        For extreme quantization, also simulate the limited accumulator precision (INT32 for INT8×INT8). Less common—usually accumulators are wide enough.
                    </Paragraph>
                </div>
            </div>

            <Header3>Quantization-Friendly Training Techniques</Header3>
            <Paragraph className="mb-4">
                Beyond fake quantization, several training modifications improve quantized model quality:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">1. Loss Scaling</Header4>
            <Paragraph className="mb-4">
                Scale the loss to prevent underflow in low-precision gradient computations. Similar to mixed-precision training, but especially important when gradients flow through quantization.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">2. Weight Regularization</Header4>
            <Paragraph className="mb-2">
                Encourage weights to fall near quantization grid points:
            </Paragraph>
            <Equation block>
                {`L_{reg} = \\lambda \\sum_i \\left| w_i - s \\cdot \\text{round}(w_i / s) \\right|`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                This "round-to-nearest" regularizer penalizes weights far from grid points.
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">3. Gradually Decreasing Bit Width</Header4>
            <Paragraph className="mb-4">
                Start training at high precision, gradually reduce to target bit width. The model smoothly adapts rather than facing a sharp transition.
            </Paragraph>
            <CodeBlock language="python" code={`# Progressive quantization schedule
for epoch in range(total_epochs):
    if epoch < warmup_epochs:
        bits = 32  # FP32 warmup
    else:
        progress = (epoch - warmup_epochs) / (total_epochs - warmup_epochs)
        bits = int(32 - progress * (32 - target_bits))  # 32 → 8
    model.set_quantization_bits(bits)`} />

            <Header4 className="font-bold text-slate-800 mb-2">4. Knowledge Distillation</Header4>
            <Paragraph className="mb-4">
                Train the quantized student to match a full-precision teacher:
            </Paragraph>
            <Equation block>
                {`L_{distill} = \\alpha \\cdot L_{task} + (1-\\alpha) \\cdot D_{KL}(p_{teacher} \\| p_{student})`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                The teacher provides "soft targets" that transfer dark knowledge, helping the quantized model recover accuracy.
            </Paragraph>

            <Callout type="tip" title="QAT for LLMs">
                For LLMs, full QAT is expensive. <strong>QLoRA</strong> provides a practical middle ground: train LoRA adapters on top of a frozen 4-bit quantized base model. This enables fine-tuning with minimal memory while adapting to quantization.
            </Callout>

            <Header3>Mixed Precision Policies</Header3>
            <Paragraph className="mb-4">
                Not all operations need the same precision. <strong>Mixed precision</strong> assigns bit widths based on sensitivity and hardware support.
            </Paragraph>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Operation</th>
                            <th className="px-4 py-2 border-b">Typical Precision</th>
                            <th className="px-4 py-2 border-b">Reasoning</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Linear/Conv weights</td>
                            <td className="px-4 py-2 font-mono">INT8 / INT4</td>
                            <td className="px-4 py-2">Most parameters, high tolerance</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Linear/Conv activations</td>
                            <td className="px-4 py-2 font-mono">INT8 / FP16</td>
                            <td className="px-4 py-2">Dynamic range considerations</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Attention scores</td>
                            <td className="px-4 py-2 font-mono">FP16 / BF16</td>
                            <td className="px-4 py-2">Softmax needs precision for small values</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">LayerNorm/RMSNorm</td>
                            <td className="px-4 py-2 font-mono">FP16 / FP32</td>
                            <td className="px-4 py-2">Variance computation sensitive</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Embeddings</td>
                            <td className="px-4 py-2 font-mono">FP16 / INT8</td>
                            <td className="px-4 py-2">First layer, high impact on downstream</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Output logits</td>
                            <td className="px-4 py-2 font-mono">FP16 / FP32</td>
                            <td className="px-4 py-2">Final layer, directly affects predictions</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Residual adds</td>
                            <td className="px-4 py-2 font-mono">FP16 / FP32</td>
                            <td className="px-4 py-2">Precision needed to avoid drift</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4 className="font-bold text-slate-800 mb-2">Sensitivity-Based Selection</Header4>
            <Paragraph className="mb-4">
                Automatically determine which layers can tolerate lower precision:
            </Paragraph>
            <CodeBlock language="python" code={`def compute_layer_sensitivity(model, calib_data, metric='perplexity'):
    """Measure how much each layer degrades under quantization"""
    baseline = evaluate(model, calib_data, metric)
    sensitivities = {}
    
    for name, layer in model.named_modules():
        if is_quantizable(layer):
            # Quantize just this layer
            layer_backup = copy(layer.weight)
            layer.weight = quantize(layer.weight, bits=4)
            
            degradation = evaluate(model, calib_data, metric) - baseline
            sensitivities[name] = degradation
            
            layer.weight = layer_backup  # restore
    
    return sensitivities
    
# Assign precision: sensitive layers get more bits
# layers with degradation > threshold → FP16
# others → INT8/INT4`} />

            <Callout type="info" title="Practical Mixed Precision">
                A common LLM setup: <strong>INT4 weights</strong> + <strong>FP16 activations</strong> + <strong>FP32 accumulators</strong>. The weight compression provides memory savings; FP16 activations avoid outlier issues; FP32 accumulators prevent overflow in long sequences.
            </Callout>
        </Section>
    );
};

export default TrainingAware;
