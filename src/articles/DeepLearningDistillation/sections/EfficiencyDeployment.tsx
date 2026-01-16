import React from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const EfficiencyDeployment = () => {
    return (
        <Section title="Efficiency & Deployment" icon={Cpu}>
            <Header3>Distillation + Compression Combos</Header3>
            <Paragraph>
                Distillation is rarely used in isolation for deployment. It combines with other compression techniques for maximum efficiency.
            </Paragraph>

            <Header4>Distillation + Quantization</Header4>
            <Paragraph>
                Two main approaches:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Distill then Quantize:</strong> First distill to a smaller FP model, then apply PTQ or QAT. Simple; each step is independent.
                </ListItem>
                <ListItem>
                    <strong>Quantization-Aware Distillation:</strong> Distillation loss includes quantization noise. Student learns to be robust to quantization during distillation.
                </ListItem>
            </List>
            <Equation block>
                {`\\mathcal{L} = D_{KL}(p_T \\| p_{Q(S)}) \\quad \\text{where } Q(S) \\text{ is quantized student}`}
            </Equation>

            <Header4>Distillation + Pruning</Header4>
            <List>
                <ListItem>
                    <strong>Prune then Distill:</strong> Prune teacher or student first. Risk: pruning removes important capacity.
                </ListItem>
                <ListItem>
                    <strong>Distill then Prune:</strong> Distill to dense student, then prune. Soft labels can guide which weights to preserve.
                </ListItem>
                <ListItem>
                    <strong>Joint Pruning-Distillation:</strong> Simultaneously learn sparse masks and distillation. Teacher guides which weights matter.
                </ListItem>
            </List>

            <Header4>Distillation + Low-Rank Factorization</Header4>
            <Paragraph>
                Replace large weight matrices with low-rank approximations, then use distillation to recover accuracy:
            </Paragraph>
            <Equation block>
                {`W \\approx UV^\\top, \\quad \\mathcal{L} = D_{KL}(p_T \\| p_S(UV^\\top))`}
            </Equation>
            <Paragraph>
                LoRA-style approaches: keep base model, distill knowledge into low-rank adapters.
            </Paragraph>

            <Header4>Weight Sharing</Header4>
            <Paragraph>
                Distillation can help weight-tied architectures (ALBERT-style). Teacher without tying provides soft labels for student with aggressive weight sharing.
            </Paragraph>

            <Header3>Latency and Throughput Constraints</Header3>
            <Paragraph>
                Deployment environments impose hard constraints that distillation must respect:
            </Paragraph>

            <Header4>Target Latency</Header4>
            <List>
                <ListItem>
                    <strong>Real-time (&lt;50ms):</strong> Mobile assistants, autocomplete. Requires very small students (1B params or less for LLMs) or aggressive caching.
                </ListItem>
                <ListItem>
                    <strong>Interactive (50-500ms):</strong> Chatbots, search. Medium students feasible.
                </ListItem>
                <ListItem>
                    <strong>Batch (&gt;1s):</strong> Summarization, document processing. Larger students acceptable.
                </ListItem>
            </List>

            <Header4>Throughput Optimization</Header4>
            <List>
                <ListItem>
                    <strong>Batching:</strong> Smaller students can batch more requests in same GPU memory. Throughput scales with batch size.
                </ListItem>
                <ListItem>
                    <strong>Speculative Decoding:</strong> Use distilled small model as draft model; large model verifies. Speeds up large model inference.
                </ListItem>
            </List>

            <Header4>KV-Cache Differences</Header4>
            <Paragraph>
                For LLMs, the KV-cache scales with sequence length and model dimensions. Distilled models have smaller caches:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Memory:</strong> <Equation>{`O(batch \\times seq \\times layers \\times d_{kv})`}</Equation>. Smaller <Equation>{`d_{kv}`}</Equation> = more sequences or longer contexts.
                </ListItem>
                <ListItem>
                    <strong>Bandwidth:</strong> Smaller cache = faster attention. Critical for memory-bound inference.
                </ListItem>
            </List>
            <Callout type="info" title="Design for Cache">
                When distilling, consider target KV-cache size. A 7B model with GQA (grouped-query attention) may be faster than a 3B model without GQA due to cache efficiency.
            </Callout>

            <Header3>Evaluation Beyond Accuracy</Header3>
            <Paragraph>
                Distillation can maintain task accuracy while degrading other important properties:
            </Paragraph>

            <Header4>Calibration</Header4>
            <Paragraph>
                Measure Expected Calibration Error (ECE):
            </Paragraph>
            <Equation block>
                {`ECE = \\sum_{b=1}^{B} \\frac{n_b}{N} |\\text{acc}(b) - \\text{conf}(b)|`}
            </Equation>
            <Paragraph>
                Students often become miscalibrated—confident but wrong. Apply temperature scaling post-hoc if needed.
            </Paragraph>

            <Header4>Robustness</Header4>
            <List>
                <ListItem>
                    <strong>Adversarial:</strong> Test with adversarial perturbations. Distillation from robust teachers can transfer robustness.
                </ListItem>
                <ListItem>
                    <strong>Distribution Shift:</strong> Test on OOD data. Soft labels may improve OOD generalization by regularizing overconfidence.
                </ListItem>
            </List>

            <Header4>Fairness</Header4>
            <Paragraph>
                Distillation can amplify or mitigate bias depending on teacher and data:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Risk:</strong> Biased teacher propagates bias to student via soft labels.
                </ListItem>
                <ListItem>
                    <strong>Opportunity:</strong> Debiased teacher or fairness-constrained distillation can improve student fairness.
                </ListItem>
            </List>

            <Header4>Safety Regressions</Header4>
            <Paragraph>
                For LLMs, distillation may bypass safety guardrails:
            </Paragraph>
            <List>
                <ListItem>Student may not learn refusal behaviors if distillation corpus lacks such examples.</ListItem>
                <ListItem>Teacher's safety training may not transfer through soft labels alone.</ListItem>
                <ListItem>Always evaluate on safety benchmarks after distillation.</ListItem>
            </List>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Metric</th>
                            <th className="px-4 py-2 border-b">What It Measures</th>
                            <th className="px-4 py-2 border-b">Risk from Distillation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">ECE</td>
                            <td className="px-4 py-2">Confidence-accuracy alignment</td>
                            <td className="px-4 py-2">High—students often overconfident</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">OOD Accuracy</td>
                            <td className="px-4 py-2">Generalization to new distributions</td>
                            <td className="px-4 py-2">Medium—depends on transfer data diversity</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Adversarial Acc.</td>
                            <td className="px-4 py-2">Robustness to perturbations</td>
                            <td className="px-4 py-2">High—robustness harder to transfer</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Demographic Parity</td>
                            <td className="px-4 py-2">Fairness across groups</td>
                            <td className="px-4 py-2">High—bias can amplify</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Refusal Rate</td>
                            <td className="px-4 py-2">Safety guardrail compliance</td>
                            <td className="px-4 py-2">High—may regress without explicit safety data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default EfficiencyDeployment;
