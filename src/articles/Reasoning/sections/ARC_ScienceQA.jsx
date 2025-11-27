import React from 'react';
import { LayoutGrid } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

export default function ARC_ScienceQA() {
    return (
        <Section title="ARC and Science QA Benchmarks (ARC-AGI-1 and ARC-AGI-2)" icon={LayoutGrid}>
            <div className="space-y-6">
                <p>
                    The <strong>Abstraction and Reasoning Corpus (ARC)</strong> is one of the most enduring benchmarks for scientific reasoning in language models. It was first introduced as <strong>ARC-AGI-1</strong> by <a href="https://arxiv.org/abs/1803.05457" className="text-blue-600 hover:underline">Clark et al. (2018)</a>, and later extended as <strong>ARC-AGI-2</strong> by <a href="https://arxiv.org/abs/2308.01405" className="text-blue-600 hover:underline">Clark et al. (2023)</a>. The two stages collectively trace the field's progress from information-retrieval-based question answering to reasoning-centric problem solving.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">ARC-AGI-1 (Original ARC Challenge)</h3>
                <h4 className="text-xl font-semibold text-slate-800 mt-6">Dataset Overview</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ARC-AGI-1 consists of 7,787 grade-school science questions drawn from standardized exams in the United States, divided into an <strong>Easy Set</strong> (requiring factual recall) and a <strong>Challenge Set</strong> (requiring reasoning, causality, and multi-hop inference).</li>
                    <li>Each item is multiple-choice with 3–5 answer options.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Why it matters for reasoning</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Unlike reading-comprehension tasks such as SQuAD, ARC's Challenge questions cannot be solved by surface matching; they require the model to <em>combine multiple scientific facts</em> to reach the answer.</li>
                    <li>For instance: "Why does placing a metal spoon in hot water make the handle warm?"</li>
                    <li>Answering requires the latent inference chain: <em>metal conducts heat <Equation>{`\\rightarrow`}</Equation> heat flows along the spoon <Equation>{`\\rightarrow`}</Equation> handle warms.</em></li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Evaluation</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Performance is computed as plain accuracy:
                        <EquationBlock><Equation>
                            {`\\text{Acc} = \\frac{1}{N}\\sum_i \\mathbb{I}[y_i = y_i^\\star].`}
                        </Equation></EquationBlock>
                    </li>
                    <li>However, modern setups also log reasoning traces <Equation>z</Equation> and check whether the final selected option follows a coherent causal explanation.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Key baselines</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>IR and PMI systems</strong> (2018–2019): retrieval + heuristics.</li>
                    <li><strong>Transformer baselines (BERT, RoBERTa)</strong>—e.g., <em>BERT by</em> <a href="https://arxiv.org/abs/1810.04805" className="text-blue-600 hover:underline">Devlin et al. (2018)</a>—achieved large gains but still trailed human performance.</li>
                    <li><strong>CoT prompting</strong> (2022 onward) improved Challenge-set accuracy sharply, showing that explicit reasoning helps even with multiple-choice formats.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">ARC-AGI-2 (The Abstraction and Generalization Intelligence benchmark)</h3>
                <h4 className="text-xl font-semibold text-slate-800 mt-6">Motivation</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>By 2023, large models surpassed 90% on the original ARC Challenge, largely through pattern matching and memorization.</li>
                    <li>To push beyond this, <a href="https://arxiv.org/abs/2308.01405" className="text-blue-600 hover:underline">Clark et al. (2023)</a> introduced <strong>ARC-AGI-2</strong>, built to evaluate <em>systematic generalization and abstraction</em> rather than recall.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Design</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ARC-AGI-2 redefines each task family as a visual–symbolic reasoning problem. Problems resemble simple "concept games" expressed as grid transformations or symbolic relations; they test the model's ability to infer <em>rules</em> and apply them to new instances.</li>
                    <li>This format inherits the design of the original "Abstraction and Reasoning Corpus" (ARC) by <a href="https://arxiv.org/abs/1911.01547" className="text-blue-600 hover:underline">Chollet (2019)</a> but formalizes it into a fixed AGI-style benchmark suite.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Dataset composition</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>400 training, 200 validation, and 400 test tasks.</li>
                    <li>Each task contains 2–5 input-output example pairs and a novel test case to solve.</li>
                    <li>Inputs and outputs are small colored grids (e.g., 10×10 arrays).</li>
                    <li>Tasks involve transformations such as symmetry, counting, pattern extension, or logical composition.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Why it matters</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ARC-AGI-2 tests for <em>compositional generalization</em>: models must discover and apply a hidden transformation rule from few examples, with no overlap between training and test transformations.</li>
                    <li>It is explicitly designed to resist memorization and to reward <strong>algorithmic reasoning</strong>.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Evaluation</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Performance is the fraction of tasks for which all output grids exactly match ground truth:
                        <EquationBlock><Equation>
                            {`\\text{Acc}_{\\text{task}} = \\frac{1}{N}\\sum_i \\mathbb{I}[y_i = y_i^\\star].`}
                        </Equation></EquationBlock>
                    </li>
                    <li>Since each task has a single correct transformation, partial credit is not given.</li>
                    <li>Some studies additionally compute <em>object-level F1</em> for graded evaluation.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Comparative insights: ARC vs. ARC-AGI-2</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Property</th>
                                <th className="px-6 py-3">ARC-AGI-1</th>
                                <th className="px-6 py-3">ARC-AGI-2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Domain</td>
                                <td className="px-6 py-4">Textual grade-school science</td>
                                <td className="px-6 py-4">Visual-symbolic abstraction</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Input format</td>
                                <td className="px-6 py-4">Multiple-choice text</td>
                                <td className="px-6 py-4">Grid-based pattern transformations</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Knowledge dependence</td>
                                <td className="px-6 py-4">Requires external science facts</td>
                                <td className="px-6 py-4">Minimal; focuses on reasoning rule induction</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Evaluation metric</td>
                                <td className="px-6 py-4">Accuracy on discrete choices</td>
                                <td className="px-6 py-4">Exact grid-match (task success)</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Reasoning type</td>
                                <td className="px-6 py-4">Multi-hop causal inference</td>
                                <td className="px-6 py-4">Program induction / rule synthesis</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Typical LLM interface</td>
                                <td className="px-6 py-4">CoT or retrieval-augmented QA</td>
                                <td className="px-6 py-4">Program-generation or symbolic-executor integration</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Empirical trends</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>CoT and retrieval-augmented prompting lifted ARC-AGI-1 accuracy above 80% on recent frontier models.</li>
                    <li>ARC-AGI-2 remains unsolved; even advanced models (GPT-4, Gemini 1.5 Pro, Claude 3 Opus) perform below 20%, highlighting a continuing gap in compositional abstraction.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Practical evaluation guidance</h3>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>For ARC-AGI-1</strong>, report separate Easy vs. Challenge accuracies and check reasoning trace consistency.</li>
                    <li><strong>For ARC-AGI-2</strong>, pair symbolic executors (e.g., Python grid interpreters) with LLMs and report both per-task accuracy and per-object F1.</li>
                    <li><strong>Control for contamination:</strong> ARC-AGI-2 tasks are meant to be unseen; verify models were not fine-tuned on similar puzzles.</li>
                    <li><strong>Visualize rule inference:</strong> Output transformation code or step reasoning to make results interpretable.</li>
                </ol>
            </div>
        </Section>
    );
}
