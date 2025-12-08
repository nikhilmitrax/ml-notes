import React from 'react';
import { Trophy } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

export default function AIME_IMO() {
    return (
        <Section title="AIME and IMO: Mathematical Olympiad–Level Reasoning" icon={Trophy}>
            <div className="space-y-6">
                <Paragraph>
                    One of the strongest indicators of genuine <em>mathematical reasoning</em> in LLMs comes from their performance on advanced competition problems such as the <strong>AIME (American Invitational Mathematics Examination)</strong> and <strong>IMO (International Mathematical Olympiad)</strong>. These benchmarks probe not just computation but <em>deep multi-step logical synthesis</em>, often requiring extended reasoning chains, proof sketches, and symbolic manipulation far beyond typical arithmetic datasets such as GSM8K or MATH.
                </Paragraph>
                <Paragraph>
                    In short, <strong>AIME and IMO tasks form the "upper bound" of reasoning evaluation</strong>—where models can no longer rely on patterns and must genuinely reason, often through symbolic, multi-turn computation.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">AIME Dataset (OpenAI's AIME and AIME24 Benchmarks)</Header3>
                <Paragraph>
                    The <strong>AIME</strong> benchmark originated from OpenAI's evaluations of <strong>mathematical reasoning competence</strong> in GPT models, with early references appearing in <a href="https://cdn.openai.com/papers/gpt-4-system-card.pdf" className="text-blue-600 hover:underline">OpenAI's technical system card for GPT-4 (2023)</a> and follow-up analyses by the research community. Recently, curated versions such as <strong>AIME24</strong>, <strong>AIME'23</strong>, and <strong>AIME'25</strong> test sets have been used to track reasoning evolution in frontier models including GPT-4, DeepSeek-R1, and Claude 3 Opus.
                </Paragraph>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Structure</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>15 competition-grade problems per year.</li>
                    <li>Each problem has an integer answer between 0 and 999.</li>
                    <li>Questions cover algebra, number theory, geometry, and combinatorics.</li>
                    <li>Each problem requires 3–10 reasoning steps—often with nested sub-problems.</li>
                </ul>
                <Paragraph className="mt-4">
                    <strong>Example:</strong> "How many positive integers <Equation>n</Equation> satisfy <Equation>n^2 + 12n - 2007 = k^2</Equation> for some integer <Equation>k</Equation>?"
                </Paragraph>
                <Paragraph>
                    Solving this requires:
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Completing the square: <Equation>n^2 + 12n = k^2 + 2007</Equation>.</li>
                        <li>Reformulating as a Diophantine condition.</li>
                        <li>Identifying integer constraints and counting solutions.</li>
                    </ol>
                </Paragraph>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Why AIME Is a "Pure" Reasoning Benchmark</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>AIME problems are deliberately <strong>non-retrievable</strong>—they do not rely on memorized facts but on algebraic and logical construction.</li>
                    <li>
                        This means models cannot rely on pattern recognition alone; instead, they must generate intermediate transformations such as:
                        <EquationBlock><Equation>
                            {`n^2 + 12n - 2007 = k^2 \\Rightarrow (n+6)^2 - k^2 = 2043.`}
                        </Equation></EquationBlock>
                        Then solve for integer factors of 2043, reasoning about parity and divisibility.
                    </li>
                    <li>Thus, performance on AIME directly reflects the model's <em>symbolic abstraction ability</em>, <em>logical completeness</em>, and <em>numerical stability</em> in long reasoning chains.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Evaluation Methodology</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Accuracy</strong> is measured as the percentage of correct integer answers across 15 problems:
                        <EquationBlock><Equation>
                            {`\\text{Acc} = \\frac{1}{15} \\sum_i \\mathbb{I}[y_i = y_i^\\star].`}
                        </Equation></EquationBlock>
                    </li>
                    <li>Given the discrete numeric range, random guessing yields only 0.1% expected accuracy. Hence, even modest accuracy (20–40%) represents nontrivial reasoning ability.</li>
                    <li>Modern evaluations also include <strong>CoT verification</strong>, where models must show step-by-step derivations.</li>
                    <li>For example, <a href="https://arxiv.org/abs/2501.12948" className="text-blue-600 hover:underline">DeepSeek-R1 (Guo et al. (2025))</a> achieved strong results on AIME'24 and AIME'25 using <em>unsupervised reinforcement fine-tuning</em> that directly optimized for reasoning correctness without labeled solutions.</li>
                </ul>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">IMO-Style Problems and Datasets</Header3>
                <Paragraph>
                    The <strong>International Mathematical Olympiad (IMO)</strong> represents the highest level of pre-college mathematical reasoning. Each annual IMO features six proof-based problems over two days, requiring creative, multi-lemma arguments rather than formulaic manipulation. While no official IMO benchmark exists for open LLM evaluation, several datasets have emerged that capture this flavor:
                </Paragraph>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        <strong>MiniF2F</strong> by <a href="https://arxiv.org/abs/2109.00128" className="text-blue-600 hover:underline">Zheng et al. (2021)</a>:
                        <ul className="list-circle pl-6 mt-1 space-y-1">
                            <li>488 formalized math competition problems, including AIME, AMC, and IMO-like tasks.</li>
                            <li>Formulated for theorem provers such as Lean and Isabelle.</li>
                            <li>Used to test formal reasoning and theorem-proving capabilities.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>IMO Grand Challenge (OpenAI Formal Mathematics Dataset 2022–2024):</strong>
                        <ul className="list-circle pl-6 mt-1 space-y-1">
                            <li>Informal and formal versions of IMO-level problems released for research on formal reasoning.</li>
                            <li>Evaluates both natural-language reasoning and formal proof synthesis.</li>
                            <li>Models must convert text statements into symbolic proof steps.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>ProofNet and LeanDojo</strong> (<a href="https://arxiv.org/abs/2202.01344" className="text-blue-600 hover:underline">Polu et al. (2022)</a>; <a href="https://arxiv.org/abs/2306.04788" className="text-blue-600 hover:underline">Zheng et al. (2023)</a>):
                        <ul className="list-circle pl-6 mt-1 space-y-1">
                            <li>Contain IMO-like formal proofs represented in Lean.</li>
                            <li>Allow objective scoring of proof correctness.</li>
                        </ul>
                    </li>
                </ol>
                <Paragraph>
                    These datasets bridge <strong>mathematical language understanding</strong> and <strong>formal symbolic reasoning</strong>, advancing LLMs from numeric manipulation to verifiable theorem-level reasoning.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">AIME and IMO in Modern Reasoning Research</Header3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>AIME as performance baseline:</strong> Many reasoning-focused models (e.g., DeepSeek-R1, OpenAI's o1, and OpenMath) report AIME'24 accuracy as their headline metric, reflecting pure reasoning improvement.</li>
                    <li><strong>IMO as reasoning frontier:</strong> Proof-oriented tasks from IMO data drive progress toward <em>formal reasoning alignment</em>—where LLMs are trained to generate coherent proof steps verified by theorem provers.</li>
                    <li><strong>Bridging informal and formal reasoning:</strong> The <em>MiniF2F</em> and <em>LeanDojo</em> datasets link natural language reasoning to symbolic proof checking, a key step toward automated theorem discovery.</li>
                </ul>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Comparative Summary</Header3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Benchmark</th>
                                <th className="px-6 py-3">Domain</th>
                                <th className="px-6 py-3">Problem Type</th>
                                <th className="px-6 py-3">Evaluation</th>
                                <th className="px-6 py-3">Reasoning Depth</th>
                                <th className="px-6 py-3">Typical Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">GSM8K</td>
                                <td className="px-6 py-4">Grade-school</td>
                                <td className="px-6 py-4">Arithmetic</td>
                                <td className="px-6 py-4">EM, verifier</td>
                                <td className="px-6 py-4">2–6 steps</td>
                                <td className="px-6 py-4">Introductory reasoning</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">MATH</td>
                                <td className="px-6 py-4">High school/college</td>
                                <td className="px-6 py-4">Symbolic</td>
                                <td className="px-6 py-4">EM + symbolic equivalence</td>
                                <td className="px-6 py-4">4–8 steps</td>
                                <td className="px-6 py-4">Formal algebraic reasoning</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">AIME</td>
                                <td className="px-6 py-4">Olympiad-level</td>
                                <td className="px-6 py-4">Integer/symbolic</td>
                                <td className="px-6 py-4">Numeric EM</td>
                                <td className="px-6 py-4">5–10 steps</td>
                                <td className="px-6 py-4">High-level logical synthesis</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">IMO / MiniF2F</td>
                                <td className="px-6 py-4">Olympiad/formal</td>
                                <td className="px-6 py-4">Proof synthesis</td>
                                <td className="px-6 py-4">Theorem verification</td>
                                <td className="px-6 py-4">10+ steps</td>
                                <td className="px-6 py-4">Formal and creative reasoning</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Why AIME and IMO Matter for Reasoning Evaluation</Header3>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>They minimize retrieval bias:</strong> Success depends on symbolic reasoning, not memorization.</li>
                    <li><strong>They require compositional thinking:</strong> Multi-step reasoning chains must stay coherent under symbolic constraints.</li>
                    <li><strong>They connect to formal verification:</strong> Proof datasets allow automated correctness checks.</li>
                    <li><strong>They expose limits of scaling:</strong> Even frontier models (GPT-4, DeepSeek-R1, Claude 3 Opus) plateau at 30–50% accuracy, far below expert humans.</li>
                </ol>
            </div>
        </Section>
    );
}
