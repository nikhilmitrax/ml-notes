import React from 'react';
import { Hash } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

export default function DROP() {
    return (
        <Section title="DROP and Numerical Reading-Comprehension Reasoning" icon={Hash}>
            <div className="space-y-6">
                <p>
                    The <strong>DROP dataset</strong> (<em>Discrete Reasoning Over Paragraphs</em>) was introduced by <a href="https://arxiv.org/abs/1903.00161" className="text-blue-600 hover:underline">Dua et al. (2019)</a> as a benchmark to test reading comprehension that goes <strong>beyond span extraction</strong> and requires <strong>numerical, logical, and discrete reasoning</strong> grounded in text. It remains a canonical benchmark for assessing <em>textual reasoning with numbers</em> and has influenced numerous architectures and evaluation methods that integrate symbolic or programmatic reasoning into LLMs.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Dataset Overview</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Source</strong>: Passages drawn from Wikipedia.</li>
                    <li><strong>Scale</strong>: ~96,000 question–answer pairs.</li>
                    <li><strong>Format</strong>: Each instance consists of a paragraph and a question requiring counting, addition/subtraction, sorting, or comparison.</li>
                    <li><strong>Answer types</strong>: integers, dates, or text spans that must be <em>computed</em>, not just extracted.</li>
                </ul>
                <p className="mt-4">
                    <strong>Example:</strong>
                    <br />
                    <strong>Paragraph:</strong> "The Lakers scored 30 points in the first quarter, 27 in the second, and 33 in the third."
                    <br />
                    <strong>Question:</strong> "How many points did they score in the first three quarters?"
                    <br />
                    <strong>Answer:</strong> 90.
                </p>
                <p>
                    A standard span-based model (like BERT QA) fails here because the answer does not appear verbatim in the paragraph—it must be <strong>derived</strong>.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Motivation and Reasoning Focus</h3>
                <p>
                    DROP was created to probe whether language models can perform <strong>discrete reasoning operations</strong>—arithmetic, comparison, and logic—over textual contexts. It shifts evaluation from "pattern recognition" to <em>programmatic inference</em>, where solving a question entails recovering the latent computational procedure:
                </p>
                <EquationBlock><Equation>
                    {`y^\\star = f(x) = \\text{Compute}(\\text{Extract}(x)).`}
                </Equation></EquationBlock>
                <p>
                    Here, Extract identifies relevant numbers and entities, while Compute performs arithmetic or comparison.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Evaluation Metrics</h3>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        <strong>Exact Match (EM):</strong>
                        <EquationBlock><Equation>
                            {`\\text{EM} = \\frac{1}{N}\\sum_i \\mathbb{I}[y_i = y_i^\\star]`}
                        </Equation></EquationBlock>
                        This metric is strict—minor numeric formatting differences cause failure.
                    </li>
                    <li>
                        <strong>F1 (Token-level Overlap):</strong> Measures partial overlap for non-numeric answers (e.g., names, events).
                    </li>
                    <li>
                        <strong>Programmatic Evaluation (Optional):</strong> Later models include execution-based scoring where answers are verified via symbolic solvers.
                    </li>
                    <li>
                        <strong>Rationale Correctness:</strong> Optional metric where model-generated reasoning chains are compared against gold reasoning traces.
                    </li>
                </ol>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Baselines and Key Results</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>BERT + span extraction</strong> (2019 baseline): ~33 F1 on dev set—failed on arithmetic.</li>
                    <li><strong>NumNet and NAQANet</strong> by <a href="https://arxiv.org/abs/1903.00161" className="text-blue-600 hover:underline">Dua et al. (2019)</a>: introduced neural modules for number reasoning (addition, counting).</li>
                    <li><strong>T5, GPT-3, GPT-4</strong> family models (2020–2024): surpassed 90 F1 using CoT and tool-augmented reasoning (calling calculators or parsers).</li>
                    <li><strong>ReAct frameworks</strong> (see <a href="https://arxiv.org/abs/2210.03629" className="text-blue-600 hover:underline">Yao et al. (2022)</a>): used reasoning + acting loops to dynamically extract, compute, and verify numeric answers.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Reasoning Interfaces and Enhancements</h3>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        <strong>CoT + Numeric Parsing</strong>: LLMs produce structured reasoning steps such as:
                        <pre className="bg-slate-100 p-2 rounded mt-2 text-sm">
                            Let's add the points: 30 + 27 + 33 = 90.
                            The answer is 90.
                        </pre>
                        Evaluation then checks whether intermediate steps correspond to correct operations.
                    </li>
                    <li>
                        <strong>Tool-Augmented Solvers</strong>: Toolformer (<a href="https://arxiv.org/abs/2302.04761" className="text-blue-600 hover:underline">Schick et al. (2023)</a>) and PAL (<a href="https://arxiv.org/abs/2211.10435" className="text-blue-600 hover:underline">Gao et al. (2022)</a>) approaches delegate computation to external interpreters (Python), converting reasoning into verifiable program traces.
                    </li>
                    <li>
                        <strong>Process Verification</strong>: Verifier-based checks, inspired by GSM8K's verification setup (<a href="https://arxiv.org/abs/2110.14168" className="text-blue-600 hover:underline">Cobbe et al. (2021)</a>), score the consistency between the reasoning chain and the numerical result.
                    </li>
                </ol>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Dataset Extensions and Successors</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>QASC</strong> (<a href="https://arxiv.org/abs/2001.07166" className="text-blue-600 hover:underline">Khot et al. (2020)</a>): tests multi-hop science reasoning with facts, complementing DROP's numerical focus.</li>
                    <li><strong>MathQA-NL</strong> (<a href="https://arxiv.org/abs/1905.13319" className="text-blue-600 hover:underline">Amini et al. (2019)</a>): converts math word problems into natural language arithmetic reasoning tasks.</li>
                    <li><strong>NumGLUE</strong> (<a href="https://arxiv.org/abs/2204.05456" className="text-blue-600 hover:underline">Lin et al. (2022)</a>): provides broader numeric reasoning tasks across diverse NLP settings.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Key Insights from DROP</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Discrete reasoning is bottlenecked by arithmetic grounding</strong>, not linguistic comprehension.</li>
                    <li><strong>Tool augmentation</strong> consistently boosts performance by externalizing computation.</li>

                    <li><strong>Self-verification</strong> (reflection) improves robustness to arithmetic hallucinations.</li>
                    <li><strong>Evaluation beyond accuracy</strong>—including reasoning trace validity—is essential for judging genuine reasoning.</li>
                </ul>
            </div>
        </Section>
    );
}
