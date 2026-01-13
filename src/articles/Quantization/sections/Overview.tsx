import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const Overview = () => {
    return (
        <Section title="Overview: Why Quantization Matters" icon={Zap}>
            <Paragraph className="mb-4">
                <strong>Quantization</strong> is the process of reducing the numerical precision of neural network weights and activations from high-precision formats (typically FP32 or FP16) to lower-precision representations (INT8, INT4, or even binary). This transformation enables dramatic improvements across multiple dimensions critical for deployment.
            </Paragraph>

            <Header3>The Case for Quantization</Header3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Header4 className="text-blue-800 mb-2">Memory Reduction</Header4>
                    <Paragraph variant="small" className="text-blue-700">
                        INT8 uses <Equation>{`4\\times`}</Equation> less memory than FP32; INT4 uses <Equation>{`8\\times`}</Equation> less. For a 70B parameter model, this means 70GB → 17.5GB (INT8) or 8.75GB (INT4), enabling deployment on consumer GPUs.
                    </Paragraph>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <Header4 className="text-emerald-800 mb-2">Bandwidth Efficiency</Header4>
                    <Paragraph variant="small" className="text-emerald-700">
                        LLM inference is often <strong>memory-bandwidth bound</strong>. Smaller data types mean more weights per memory transaction, directly improving tokens/second during autoregressive generation.
                    </Paragraph>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <Header4 className="text-amber-800 mb-2">Latency & Throughput</Header4>
                    <Paragraph variant="small" className="text-amber-700">
                        Modern GPUs have dedicated INT8/FP8 tensor cores with <Equation>{`2\\times`}</Equation> to <Equation>{`4\\times`}</Equation> higher throughput than FP16. Combined with bandwidth savings, this translates to significantly lower latency.
                    </Paragraph>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <Header4 className="text-purple-800 mb-2">Energy Consumption</Header4>
                    <Paragraph variant="small" className="text-purple-700">
                        Lower-precision arithmetic consumes less energy per operation. INT8 multiply-accumulate uses ~30× less energy than FP32 on typical hardware, critical for edge deployment and data center costs.
                    </Paragraph>
                </div>
            </div>

            <Header3>The Fundamental Trade-off</Header3>
            <Paragraph className="mb-4">
                Quantization introduces <strong>quantization error</strong>—the difference between the original high-precision value and its quantized representation. The core challenge is minimizing this error while maximizing efficiency gains:
            </Paragraph>
            <Equation block>
                {`\\epsilon_q = x - Q^{-1}(Q(x))`}
            </Equation>
            <Paragraph className="mb-6 text-slate-600">
                where <Equation>{`Q(x)`}</Equation> is the quantization function and <Equation>{`Q^{-1}`}</Equation> is dequantization. The goal is to minimize <Equation>{`\\mathbb{E}[\\epsilon_q^2]`}</Equation> while using the fewest bits possible.
            </Paragraph>

            <Header3>Two Paradigms: PTQ vs QAT</Header3>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-3 border-b">Aspect</th>
                            <th className="px-4 py-3 border-b">Post-Training Quantization (PTQ)</th>
                            <th className="px-4 py-3 border-b">Quantization-Aware Training (QAT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Training Required</td>
                            <td className="px-4 py-3">No (uses calibration data)</td>
                            <td className="px-4 py-3">Yes (fine-tuning or full training)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-3 font-medium">Compute Cost</td>
                            <td className="px-4 py-3">Low (minutes to hours)</td>
                            <td className="px-4 py-3">High (comparable to training)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Accuracy at INT8</td>
                            <td className="px-4 py-3">Usually good</td>
                            <td className="px-4 py-3">Excellent</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-3 font-medium">Accuracy at INT4</td>
                            <td className="px-4 py-3">Requires careful tuning</td>
                            <td className="px-4 py-3">Better recovery possible</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Use Case</td>
                            <td className="px-4 py-3">Deploy existing models quickly</td>
                            <td className="px-4 py-3">Maximum accuracy at low precision</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="info" title="LLM Quantization Landscape">
                For large language models, <strong>weight-only quantization</strong> (INT4/INT8 weights, FP16 activations) has emerged as the dominant approach due to the memory-bound nature of autoregressive inference. Methods like GPTQ, AWQ, and SmoothQuant have made PTQ viable even at 4-bit precision with minimal quality loss.
            </Callout>

            <Header3>Article Roadmap</Header3>
            <List>
                <ListItem><strong>Fundamentals</strong>: Numeric formats, quantization functions, granularity, and error analysis</ListItem>
                <ListItem><strong>Calibration & Data</strong>: PTQ core—observers, statistics, static vs dynamic quantization</ListItem>
                <ListItem><strong>Rounding & Scaling</strong>: Accuracy tricks—rounding modes, outlier handling, bias correction</ListItem>
                <ListItem><strong>Training-Aware</strong>: QAT, straight-through estimators, mixed precision policies</ListItem>
                <ListItem><strong>LLM Quantization</strong>: GPTQ, AWQ, SmoothQuant, KV-cache quantization</ListItem>
                <ListItem><strong>Hardware & Kernels</strong>: INT8/FP8 pipelines, kernel fusion, bandwidth analysis</ListItem>
                <ListItem><strong>Evaluation & Debugging</strong>: Metrics, sensitivity analysis, deployment validation</ListItem>
            </List>
        </Section>
    );
};

export default Overview;
