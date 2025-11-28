import React from 'react';
import { Database } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function OpenThoughts3() {
    return (
        <Section title="OpenThoughts3: Large-Scale Open Reasoning Dataset" icon={Database}>
            <div className="space-y-6">
                <Paragraph>
                    The <strong>OpenThoughts3</strong> dataset (<a href="https://arxiv.org/abs/2506.04178" className="text-blue-600 hover:underline">Gokaslan et al. (2025)</a>) represents a new milestone in open-source reasoning evaluation. It builds on the OpenThoughts2-1M dataset, scaling the pipeline to 1.2 million question–response pairs and systematically optimizing every stage of data generation and filtering to improve reasoning quality across math, code, and science domains.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Design and Pipeline</Header3>
                <Paragraph>
                    OpenThoughts3 introduces a fully controlled, ablation-driven data construction pipeline designed to isolate and improve each component contributing to reasoning performance. The pipeline comprises six major stages:
                </Paragraph>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Question sourcing:</strong> Questions are drawn from both existing high-quality repositories (e.g., OpenR1-Math, AutoMathText, CodeFeedback) and newly generated datasets.</li>
                    <li><strong>Question mixing:</strong> Top-performing question sources are combined to enhance diversity.</li>
                    <li><strong>Filtering questions:</strong> FastText and LLM-based filters remove ambiguous or malformed inputs.</li>
                    <li><strong>Answer generation:</strong> Multiple candidate answers are produced per question using teacher models.</li>
                    <li><strong>Answer verification:</strong> Low-quality or inconsistent answers are filtered using LLM-based verification or majority consensus.</li>
                    <li><strong>Teacher selection:</strong> The best-performing teacher model is chosen empirically through small-scale fine-tuning trials.</li>
                </ol>
                <Paragraph>
                    This pipeline allows reproducible scaling and quality control at each stage. Experiments with controlled subsets of 31,600 examples were used to evaluate each design decision before scaling up to the full dataset.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Evaluation Framework</Header3>
                <Paragraph>
                    OpenThoughts3 evaluates reasoning performance across eight standardized benchmarks, spanning multiple domains:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Math:</strong> AIME24, AMC23, MATH500</li>
                    <li><strong>Code:</strong> CodeElo, CodeForces, LiveCodeBench (05/23–05/24)</li>
                    <li><strong>Science:</strong> GPQA Diamond, JEEBench</li>
                </ul>
                <Paragraph>
                    Each model trained on OpenThoughts3 is scored by average accuracy across these benchmarks, with decontamination procedures ensuring that no overlapping samples remain between training and test data. Evaluation uses the <em>Evalchemy</em> framework, with consistent metrics for accuracy, calibration, and robustness.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Results and Scaling Behavior</Header3>
                <Paragraph>
                    OpenThoughts3 outperforms prior supervised fine-tuning (SFT) reasoning datasets—including AM, Nemotron Nano, and LIMO—when all models are fine-tuned from <strong>Qwen-2.5-7B-Instruct</strong>. Scaling analyses (from 1K to 1M samples) demonstrate that OpenThoughts3 achieves higher asymptotic performance and stronger data efficiency, particularly on <strong>AIME 2025</strong>, <strong>LiveCodeBench</strong>, and <strong>GPQA Diamond</strong>, where it improves accuracy by 15–20 percentage points over comparable datasets.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Model Progression and Impact</Header3>
                <Paragraph>
                    Successive generations of models trained on OpenThoughts datasets—Bespoke-Stratos, OpenThinker, OpenThinker2, and OpenThinker3—illustrate consistent gains across reasoning domains:
                </Paragraph>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Model</th>
                                <th className="px-6 py-3">AIME24</th>
                                <th className="px-6 py-3">AIME25</th>
                                <th className="px-6 py-3">GPQA-D</th>
                                <th className="px-6 py-3">LiveCodeBench</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Bespoke-Stratos-7B</td>
                                <td className="px-6 py-4">14.3</td>
                                <td className="px-6 py-4">12.7</td>
                                <td className="px-6 py-4">31.8</td>
                                <td className="px-6 py-4">27.4</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">OpenThinker-7B</td>
                                <td className="px-6 py-4">29.3</td>
                                <td className="px-6 py-4">25.3</td>
                                <td className="px-6 py-4">44.1</td>
                                <td className="px-6 py-4">38.8</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">OpenThinker2-7B</td>
                                <td className="px-6 py-4">60.7</td>
                                <td className="px-6 py-4">38.7</td>
                                <td className="px-6 py-4">47.0</td>
                                <td className="px-6 py-4">56.3</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900"><strong>OpenThinker3-7B</strong></td>
                                <td className="px-6 py-4"><strong>69.0</strong></td>
                                <td className="px-6 py-4"><strong>53.3</strong></td>
                                <td className="px-6 py-4"><strong>53.7</strong></td>
                                <td className="px-6 py-4"><strong>64.5</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Paragraph>
                    The dataset's public availability and transparent pipeline make it a cornerstone for open benchmarking of reasoning in LLMs. It also serves as a model for reproducible dataset design, providing controlled ablations and fully open access to both data and evaluation scripts through <a href="https://openthoughts.ai" className="text-blue-600 hover:underline">openthoughts.ai</a>.
                </Paragraph>
            </div>
        </Section>
    );
}
