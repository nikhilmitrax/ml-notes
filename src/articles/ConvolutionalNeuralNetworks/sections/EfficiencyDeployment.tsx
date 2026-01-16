import React from 'react';
import { Rocket } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';

const EfficiencyDeployment = () => {
    return (
        <Section title="Efficiency & Deployment" icon={Rocket}>
            <Header3>Quantization</Header3>
            <Callout type="info" title="See Also">
                For comprehensive quantization coverage, see the dedicated Quantization article.
            </Callout>

            <Header4>Post-Training Quantization (PTQ)</Header4>
            <List>
                <ListItem>Quantize trained FP32 model without retraining</ListItem>
                <ListItem>Calibration: run representative data to determine scale/zero-point</ListItem>
                <ListItem>INT8 weights + activations: ~4× memory reduction</ListItem>
                <ListItem>Works well for CNNs (usually &lt;1% accuracy drop)</ListItem>
                <ListItem>Methods: MinMax, MSE-optimal, KL-divergence calibration</ListItem>
            </List>

            <Header4>Quantization-Aware Training (QAT)</Header4>
            <List>
                <ListItem>Simulate quantization during training with fake quantization ops</ListItem>
                <ListItem>Model learns to be robust to quantization noise</ListItem>
                <ListItem>Better accuracy than PTQ, especially for aggressive quantization</ListItem>
                <ListItem>Requires training/fine-tuning (more expensive)</ListItem>
                <ListItem>Essential for INT4 or lower precision</ListItem>
            </List>

            <Header4>CNN-Specific Quantization Notes</Header4>
            <List>
                <ListItem><strong>Per-channel quantization</strong>: different scale per output channel (standard for weights)</ListItem>
                <ListItem><strong>BN folding</strong>: fold BatchNorm into conv before quantization
                    <List nested>
                        <ListItem>Reduces overhead and quantization error</ListItem>
                        <ListItem>Fused weight: <Equation>{`W' = \\frac{\\gamma}{\\sqrt{\\sigma^2 + \\epsilon}} W`}</Equation></ListItem>
                    </List>
                </ListItem>
                <ListItem>First/last layers often kept in higher precision (more sensitive)</ListItem>
            </List>

            <Header3>Pruning</Header3>

            <Header4>Unstructured Pruning</Header4>
            <List>
                <ListItem>Zero individual weights based on magnitude</ListItem>
                <ListItem>Produces sparse weight tensors</ListItem>
                <ListItem>High compression ratios possible (90%+ sparsity)</ListItem>
                <ListItem>Con: requires sparse matrix libraries for speedup</ListItem>
                <ListItem>Con: irregular memory access patterns</ListItem>
            </List>

            <Header4>Structured Pruning</Header4>
            <List>
                <ListItem>Remove entire filters, channels, or layers</ListItem>
                <ListItem>Produces smaller dense model (actual speedup without special libraries)</ListItem>
                <ListItem>Criteria: L1/L2 norm of filters, gradient-based importance</ListItem>
                <ListItem>Usually lower compression than unstructured, but practical speedup</ListItem>
            </List>

            <Header4>Pruning Workflow</Header4>
            <List>
                <ListItem>Train full model</ListItem>
                <ListItem>Prune (identify and zero/remove weights)</ListItem>
                <ListItem>Fine-tune to recover accuracy</ListItem>
                <ListItem>Repeat (iterative pruning often better than one-shot)</ListItem>
            </List>

            <Header3>Knowledge Distillation</Header3>
            <List>
                <ListItem><strong>Teacher</strong>: large, accurate model</ListItem>
                <ListItem><strong>Student</strong>: smaller, faster model to train</ListItem>
                <ListItem>Student learns from teacher's soft outputs (logits), not just hard labels</ListItem>
                <ListItem>
                    <strong>Distillation loss</strong>:
                    <Equation block>{`\\mathcal{L} = \\alpha \\cdot \\text{KL}(\\sigma(z_t/T), \\sigma(z_s/T)) + (1-\\alpha) \\cdot \\mathcal{L}_{CE}`}</Equation>
                </ListItem>
                <ListItem>Temperature <Equation>{`T`}</Equation>: softens probabilities (typical: 3-20)</ListItem>
                <ListItem>Soft labels contain more information than one-hot (inter-class relationships)</ListItem>
            </List>

            <Header4>Feature Distillation</Header4>
            <List>
                <ListItem>Match intermediate features, not just final outputs</ListItem>
                <ListItem>FitNets: student mimics teacher's hidden layer activations</ListItem>
                <ListItem>Attention transfer: match attention maps</ListItem>
                <ListItem>Often more effective than logit-only distillation</ListItem>
            </List>

            <Header3>Model Compression Trade-offs</Header3>
            <div className="overflow-x-auto mt-4 mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-3 py-2 border-b">Method</th>
                            <th className="px-3 py-2 border-b">Compression</th>
                            <th className="px-3 py-2 border-b">Speedup</th>
                            <th className="px-3 py-2 border-b">Accuracy</th>
                            <th className="px-3 py-2 border-b">Ease</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">INT8 PTQ</td>
                            <td className="px-3 py-2">4×</td>
                            <td className="px-3 py-2">2-4×</td>
                            <td className="px-3 py-2">~0%</td>
                            <td className="px-3 py-2">Easy</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2">INT4 QAT</td>
                            <td className="px-3 py-2">8×</td>
                            <td className="px-3 py-2">2-4×</td>
                            <td className="px-3 py-2">1-3%</td>
                            <td className="px-3 py-2">Medium</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">Structured Pruning</td>
                            <td className="px-3 py-2">2-5×</td>
                            <td className="px-3 py-2">2-5×</td>
                            <td className="px-3 py-2">1-2%</td>
                            <td className="px-3 py-2">Medium</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2">Distillation</td>
                            <td className="px-3 py-2">Variable</td>
                            <td className="px-3 py-2">Variable</td>
                            <td className="px-3 py-2">Student-dependent</td>
                            <td className="px-3 py-2">Medium</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">Combined</td>
                            <td className="px-3 py-2">10-50×</td>
                            <td className="px-3 py-2">5-20×</td>
                            <td className="px-3 py-2">2-5%</td>
                            <td className="px-3 py-2">Hard</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Inference Constraints</Header3>

            <Header4>Latency vs Throughput</Header4>
            <List>
                <ListItem><strong>Latency</strong>: time for single inference (real-time applications)</ListItem>
                <ListItem><strong>Throughput</strong>: inferences per second (batch processing)</ListItem>
                <ListItem>Trade-off: larger batches improve throughput but increase latency</ListItem>
                <ListItem><strong>Real-time</strong>: typically &lt;33ms latency (30 FPS) or &lt;16ms (60 FPS)</ListItem>
            </List>

            <Header4>Optimization Strategies</Header4>
            <List>
                <ListItem><strong>Operator fusion</strong>: combine Conv+BN+ReLU into single kernel</ListItem>
                <ListItem><strong>Memory planning</strong>: reuse buffers for non-overlapping tensors</ListItem>
                <ListItem><strong>Graph optimization</strong>: constant folding, dead code elimination</ListItem>
                <ListItem><strong>Input batching</strong>: accumulate requests for better GPU utilization</ListItem>
            </List>

            <Callout type="warning" title="Batch Size 1 Inefficiency">
                GPUs are underutilized with batch size 1. For real-time single-image inference, consider: dynamic batching, smaller models, or CPU deployment.
            </Callout>

            <Header3>Deployment Formats</Header3>

            <Header4>TorchScript</Header4>
            <List>
                <ListItem>PyTorch's serialization format for production</ListItem>
                <ListItem><strong>Tracing</strong>: record operations on example input (no control flow)</ListItem>
                <ListItem><strong>Scripting</strong>: compile Python to TorchScript IR (supports control flow)</ListItem>
                <ListItem>Can run without Python interpreter</ListItem>
                <ListItem>Supports quantization, fusion optimizations</ListItem>
            </List>

            <Header4>ONNX</Header4>
            <List>
                <ListItem>Open Neural Network Exchange — framework-agnostic format</ListItem>
                <ListItem>Export from PyTorch/TensorFlow, run on various runtimes</ListItem>
                <ListItem>Runtimes: ONNX Runtime, TensorRT, OpenVINO</ListItem>
                <ListItem>Good interoperability, widely supported</ListItem>
                <ListItem>May not support all operations (custom ops need work)</ListItem>
            </List>

            <Header4>Other Formats</Header4>
            <List>
                <ListItem><strong>TensorRT</strong>: NVIDIA's inference optimizer (fastest on NVIDIA GPUs)</ListItem>
                <ListItem><strong>TFLite</strong>: TensorFlow Lite (mobile/edge)</ListItem>
                <ListItem><strong>Core ML</strong>: Apple devices</ListItem>
                <ListItem><strong>OpenVINO</strong>: Intel hardware optimization</ListItem>
            </List>

            <Header4>Deployment Checklist</Header4>
            <List>
                <ListItem>☐ Benchmark latency/throughput on target hardware</ListItem>
                <ListItem>☐ Validate accuracy matches training (numerical precision)</ListItem>
                <ListItem>☐ Test edge cases and failure modes</ListItem>
                <ListItem>☐ Set up monitoring (latency P50/P99, error rates)</ListItem>
                <ListItem>☐ Plan for model updates (versioning, A/B testing)</ListItem>
            </List>
        </Section>
    );
};

export default EfficiencyDeployment;
