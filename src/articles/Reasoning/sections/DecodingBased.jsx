import React, { useState } from 'react';
import { GitBranch, Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';

const SelfConsistencyVisualizer = () => {
    const [paths, setPaths] = useState([]);
    const [consensus, setConsensus] = useState(null);
    const [isSampling, setIsSampling] = useState(false);

    const samplePaths = () => {
        setIsSampling(true);
        setPaths([]);
        setConsensus(null);

        const newPaths = [
            { id: 1, text: "Path 1: ... therefore the answer is 42.", answer: "42", correct: true },
            { id: 2, text: "Path 2: ... calculation error ... answer is 40.", answer: "40", correct: false },
            { id: 3, text: "Path 3: ... thus we arrive at 42.", answer: "42", correct: true },
            { id: 4, text: "Path 4: ... so the result is 42.", answer: "42", correct: true },
            { id: 5, text: "Path 5: ... misinterpretation ... answer is 12.", answer: "12", correct: false },
        ];

        let delay = 0;
        newPaths.forEach((path, index) => {
            setTimeout(() => {
                setPaths(prev => [...prev, path]);
                if (index === newPaths.length - 1) {
                    setIsSampling(false);
                    setConsensus("42 (3/5 votes)");
                }
            }, delay);
            delay += 800;
        });
    };

    return (
        <InteractiveCard title="Self-Consistency: Majority Voting">
            <div className="space-y-4">
                <p className="text-sm text-slate-600">
                    Click to sample multiple reasoning paths for the same problem. The system will aggregate the final answers to find the most consistent one.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={samplePaths}
                        disabled={isSampling}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                    >
                        {isSampling ? <span className="animate-spin">⏳</span> : <Zap size={16} />}
                        <span>Sample 5 Reasoning Paths</span>
                    </button>
                </div>

                <div className="space-y-2">
                    {paths.map((path) => (
                        <div key={path.id} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex justify-between items-center animate-in fade-in slide-in-from-left-4 duration-500">
                            <span className="text-xs font-mono text-slate-600 truncate max-w-[70%]">{path.text}</span>
                            <span className={`text-sm font-bold ${path.answer === '42' ? 'text-green-600' : 'text-red-500'}`}>
                                Ans: {path.answer}
                            </span>
                        </div>
                    ))}
                </div>

                {consensus && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-center animate-in zoom-in duration-300">
                        <h4 className="text-green-800 font-semibold">Consensus Reached</h4>
                        <p className="text-green-700 text-lg font-bold">{consensus}</p>
                    </div>
                )}
            </div>
        </InteractiveCard>
    );
};

const DecodingBased = () => {
    return (
        <Section title="Decoding and Aggregation-Based Reasoning" icon={GitBranch}>
            <div className="space-y-6">
                <p>
                    <strong>Decoding and aggregation-based reasoning</strong> conceptualizes reasoning as a process of <strong>exploring multiple candidate reasoning trajectories during decoding</strong> and <strong>aggregating their outcomes</strong> to reach a consensus answer. Rather than committing to a single deterministic reasoning chain, these methods embrace <strong>stochastic diversity</strong>—sampling multiple reasoning paths via temperature-controlled decoding or beam search—and then consolidate the results through majority voting, weighted aggregation, or external verification (say with a different model, e.g., another LLM as a judge).
                </p>
                <p>
                    The central premise is that LLMs encode a distribution over many plausible reasoning paths; by <strong>sampling and marginalizing</strong> across this space, one can recover more reliable and consistent conclusions. This approach bridges statistical ensembling and reasoning robustness, effectively reducing variance and mitigating local hallucinations.
                </p>
                <p>
                    Representative methods in this family include <strong>Self-Consistency Decoding</strong> by <a href="https://arxiv.org/abs/2203.11171" className="text-blue-600 hover:underline">Wang et al. (2022)</a>, <strong>Majority-Vote CoT</strong>, <strong>Verifier-Guided Decoding</strong> by <a href="https://arxiv.org/abs/2305.20050" className="text-blue-600 hover:underline">Lightman et al. (2023)</a>, <strong>Weighted Self-Consistency</strong>, and <strong>Mixture-of-Reasoners / Ensemble CoT</strong> strategies. Together, they embody an ensemble-based philosophy of reasoning—achieving reliability not through a single flawless chain, but through <strong>statistical agreement among many plausible reasoning hypotheses.</strong>
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Self-Consistency Decoding</h3>
                <p>
                    <strong>Self-Consistency Decoding</strong> builds upon CoT prompting by introducing <strong>stochastic reasoning diversity</strong>—instead of generating a single reasoning chain, the model samples multiple independent reasoning paths and aggregates their final answers to reach a more reliable conclusion.
                </p>
                <p>
                    This method was proposed in <em>Self-Consistency Improves Chain-of-Thought Reasoning in Language Models</em> by <a href="https://arxiv.org/abs/2203.11171" className="text-blue-600 hover:underline">Wang et al. (2022)</a>.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <p>
                    LLMs can produce many plausible reasoning paths <Equation>{`z^{(1)}, z^{(2)}, \\ldots, z^{(K)}`}</Equation> for the same input <Equation>x</Equation>. Each path ends with a potential answer <Equation>{`y^{(k)}`}</Equation>. Rather than trusting the first decoded path (which may be incorrect due to randomness or local bias), the model aggregates across samples to find the most <strong>self-consistent</strong> answer.
                </p>
                <p>
                    Formally, this can be written as:
                </p>
                <EquationBlock><Equation>
                    {`\\hat{y} = \\arg\\max_{y} \\sum_{k=1}^{K} \\mathbb{I}[y^{(k)} = y]`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li><Equation>{`\\hat{y}`}</Equation>: the final predicted answer obtained by selecting the most frequently occurring outcome among sampled reasoning paths.</li>
                    <li><Equation>y</Equation>: a candidate answer being evaluated for consistency across reasoning trajectories.</li>
                    <li><Equation>{`y^{(k)}`}</Equation>: the final output generated from the <Equation>{`k^{th}`}</Equation> reasoning chain <Equation>{`z^{(k)}`}</Equation>.</li>
                    <li><Equation>K</Equation>: the total number of sampled reasoning paths (i.e., the number of independent reasoning attempts by the model).</li>
                    <li><Equation>{`\\mathbb{I}[y^{(k)} = y]`}</Equation>: an indicator function that equals 1 if the answer from the <Equation>{`k^{th}`}</Equation> reasoning path matches <Equation>y</Equation>, and 0 otherwise.</li>
                    <li><Equation>{`\\sum_{k=1}^{K} \\mathbb{I}[y^{(k)} = y]`}</Equation>: counts how many times each candidate answer <Equation>y</Equation> appears across all reasoning samples.</li>
                    <li><Equation>{`\\arg\\max_{y}`}</Equation>: selects the answer <Equation>y</Equation> that occurs most frequently (the <strong>mode</strong>) among the <Equation>K</Equation> generated reasoning paths, ensuring self-consistency through aggregation.</li>
                </ul>

                <div className="my-8">
                    <SelfConsistencyVisualizer />
                </div>

                <p>
                    In practice, <Equation>K</Equation> ranges from 5 to 50 samples depending on model size and task complexity.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Sampling phase:</strong> Use temperature sampling (e.g., <Equation>T = 0.7</Equation>) to generate diverse reasoning traces <Equation>{`z^{(k)}`}</Equation>.</li>
                    <li><strong>Aggregation phase:</strong> Extract the final answers <Equation>{`y^{(k)}`}</Equation> and perform majority voting or probabilistic marginalization.</li>
                    <li><strong>Selection phase:</strong> Choose the most frequent answer (or a weighted consensus based on log-probabilities).</li>
                </ol>
                <p>
                    This implicitly integrates over multiple latent reasoning variables <Equation>z</Equation>, approximating the marginalization in
                </p>
                <EquationBlock><Equation>
                    {`p_\\theta(y\\mid x) = \\sum_z p_\\theta(y\\mid x,z) p_\\theta(z\\mid x)`}
                </Equation></EquationBlock>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Intuition</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Different reasoning paths represent samples from the model's internal "belief distribution" over possible reasoning chains. Self-Consistency acts as a <strong>Bayesian marginalization</strong> step, improving robustness to local hallucinations and premature reasoning collapses.</li>
                    <li>Empirically, the method yields substantial gains on multi-step arithmetic and logic benchmarks such as GSM8K, MultiArith, and StrategyQA.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Reduces the variance and brittleness of individual CoT runs.</li>
                    <li>Encourages exploration of diverse reasoning paths.</li>
                    <li>Significantly improves accuracy on reasoning tasks without changing model parameters.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Computationally expensive (requires many samples).</li>
                    <li>Inefficient for tasks where answers are non-discrete or continuous.</li>
                    <li>Aggregation may fail if reasoning errors are systematic across samples.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Reflection and Self-Verification Loops</h3>
                <p>
                    <strong>Reflection and self-verification</strong> methods extend reasoning by allowing a model to <strong>analyze, critique, and improve its own outputs</strong>. Rather than generating a single reasoning trace and final answer, the model iteratively reviews its reasoning, identifies potential errors, and either revises the reasoning or re-generates the answer.
                </p>
                <p>
                    This meta-cognitive process—analogous to human self-checking—is central to recent efforts to make reasoning both <strong>more reliable</strong> and <strong>more factual</strong>.
                </p>
                <p>
                    A key paper introducing this paradigm is <em>Reflexion: Language Agents with Verbal Reinforcement Learning</em> by <a href="https://arxiv.org/abs/2303.11366" className="text-blue-600 hover:underline">Shinn et al. (2023)</a>, and <em>Self-Refine: Iterative Refinement with Self-Feedback</em> by <a href="https://arxiv.org/abs/2303.17651" className="text-blue-600 hover:underline">Madaan et al. (2023)</a>.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <p>
                    Reflection frameworks conceptualize reasoning as an <strong>iterative loop</strong> between <em>generation</em>, <em>evaluation</em>, and <em>revision</em>. A single pass through the LLM may produce a reasoning chain <Equation>z</Equation> and output <Equation>y</Equation>, but the model can further <em>reflect</em> on its own reasoning by generating a self-critique <Equation>c</Equation> that identifies flaws or inconsistencies.
                </p>
                <p>
                    This process can be formalized as:
                </p>
                <EquationBlock><Equation>
                    {`x \\xrightarrow{\\text{reason}} (z, y) \\xrightarrow{\\text{reflect}} c \\xrightarrow{\\text{revise}} (z', y')`}
                </Equation></EquationBlock>
                <p>
                    Each iteration ideally brings the reasoning trace closer to correctness or coherence.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Initial reasoning phase:</strong> The model generates a reasoning chain and provisional answer.</li>
                    <li><strong>Reflection phase:</strong> The model (or a secondary evaluator) reviews the reasoning for logical, factual, or procedural errors. Example prompt: <em>"Examine the above reasoning carefully. Identify mistakes or unsupported steps, and propose corrections."</em></li>
                    <li><strong>Revision phase:</strong> The model generates a new reasoning chain incorporating the critique. Optionally, feedback can be looped over multiple rounds.</li>
                    <li><strong>Termination:</strong> The loop ends when a confidence threshold or reflection limit is reached.</li>
                </ol>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Theoretical Framing</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Reflection can be viewed as <strong>approximate gradient descent in the space of reasoning traces</strong>, where the model updates its "beliefs" about a solution through internal self-assessment.</li>
                    <li>
                        Given an initial reasoning trace <Equation>{`z^{(0)}`}</Equation>, the update rule can be seen as:
                        <EquationBlock><Equation>
                            {`z^{(t+1)} = \\text{Refine}\\big(z^{(t)}, \\text{Critique}(z^{(t)})\\big)`}
                        </Equation></EquationBlock>
                        where <strong>Critique</strong> is an operator producing feedback and <strong>Refine</strong> modifies the reasoning accordingly.
                    </li>
                    <li>This closely parallels iterative inference in classical optimization and meta-learning frameworks.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Variants</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Reflexion</strong> (<a href="https://arxiv.org/abs/2303.11366" className="text-blue-600 hover:underline">Shinn et al. (2023)</a>): Uses verbal reinforcement (self-generated critique and reward).</li>
                    <li><strong>Self-Refine</strong> (<a href="https://arxiv.org/abs/2303.17651" className="text-blue-600 hover:underline">Madaan et al. (2023)</a>): Separates roles into <em>task solver</em>, <em>feedback provider</em>, and <em>reviser</em>.</li>
                    <li><strong>Critic–Judge systems</strong> (<a href="https://arxiv.org/abs/2305.20050" className="text-blue-600 hover:underline">Zhou et al. (2023)</a>): Introduces a secondary "critic" model to evaluate and score reasoning traces.</li>
                    <li><strong>RCOT (Reflective Chain-of-Thought)</strong> (<a href="https://arxiv.org/abs/2402.05402" className="text-blue-600 hover:underline">Zhang et al. (2024)</a>): Adds structured self-correction within CoT reasoning.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Improves factual correctness and logical soundness of reasoning chains.</li>
                    <li>Encourages interpretable, auditable reasoning corrections.</li>
                    <li>Can operate with minimal supervision—feedback is model-generated.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Computationally expensive due to iterative passes.</li>
                    <li>Susceptible to feedback loops—reflections may amplify minor errors.</li>
                    <li>Quality of reflection depends heavily on prompt design and model calibration.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Relationship to RL and CoT</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Reflection complements <strong>RL</strong> and <strong>CoT</strong>:
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li>Like RL, it provides a feedback signal, but in natural language form rather than scalar rewards.</li>
                            <li>Like CoT, it operates at the level of reasoning traces, but introduces a <strong>meta-layer</strong> of critique.</li>
                        </ul>
                    </li>
                    <li>This synergy is foundational in modern autonomous reasoning agents that continuously self-improve through reflection cycles.</li>
                </ul>
            </div>
        </Section>
    );
};

export default DecodingBased;
