import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const InvokingReasoning = () => {
    return (
        <Section title="Invoking reasoning in LLMs" icon={Zap}>
            <div className="space-y-6">
                <p>
                    Reasoning in LLMs is not an automatic or always-on capability—it is typically <strong>invoked</strong> through specific interfaces or training strategies that elicit structured intermediate computation. In other words, while an LLM can always generate text, certain <em>modes of interaction</em> encourage it to perform reasoning-like processes internally or externally.
                </p>
                <p>
                    Invoking reasoning can be viewed as shaping the latent variable <Equation>{`z`}</Equation> in the generative formulation <Equation>{`p_\\theta(y \\mid x)=\\sum_z p_\\theta(y \\mid x,z)p_\\theta(z \\mid x)`}</Equation>, so that the model generates more useful or verifiable intermediate structures (the "thoughts" <Equation>{`z`}</Equation>) instead of directly producing the final answer <Equation>{`y`}</Equation>.
                </p>
                <p>
                    At a top level, there are several paradigms (and methodologies per paradigm) to invoke reasoning:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Prompting-based</strong>: Purely contextual reasoning induction through examples and instructions within the prompt, without modifying model parameters or architecture.
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Chain-of-Thought (CoT) prompting</strong>: Encourages explicit step-by-step reasoning traces, guiding models to decompose complex problems into interpretable intermediate steps.</li>
                            <li><strong>Implicit reasoning via in-context composition</strong>: Induces structured reasoning by presenting compositional examples that demonstrate multi-step problem-solving directly within the input context.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Decoding and aggregation-based</strong> <Equation>{`\\rightarrow`}</Equation> Ensemble reasoning through sampling and consensus.
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Decoding and aggregation-based reasoning</strong>: Samples diverse reasoning paths via stochastic decoding and aggregates results through voting, confidence scoring, or verifier-based consensus.</li>
                            <li><strong>Reflection and self-verification loops</strong>: Iteratively critiques, revises, and improves its own reasoning outputs using self-feedback, enhancing correctness and logical consistency.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Search-based</strong> <Equation>{`\\rightarrow`}</Equation> Explicit reasoning exploration guided by evaluation.
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Tree-of-Thoughts (ToT) prompting/search</strong>: Expands reasoning as a branching search tree of partial thoughts, evaluating and pruning paths to find coherent solutions.</li>
                            <li><strong>Monte Carlo Tree Search (MCTS)-based reasoning</strong>: Conducts stochastic rollouts and value backpropagation to balance exploration and exploitation, refining reasoning through simulated decision trajectories.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Tool-augmented</strong> <Equation>{`\\rightarrow`}</Equation> Hybrid symbolic–neural reasoning.
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>ReAct frameworks</strong>: Integrates reasoning with environment actions, enabling models to think, act, and observe dynamically during problem-solving.</li>
                            <li><strong>Toolformer-based reasoning</strong>: Enables models to autonomously decide when and how to call external APIs or tools during inference, integrating symbolic computation, retrieval, or execution for improved factuality and reasoning precision.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>RL-based</strong> <Equation>{`\\rightarrow`}</Equation> Learning to reason through reward optimization.
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Reinforcement learning for reasoning (e.g., DeepSeek-R1)</strong>: Optimizes reasoning strategies using reward feedback to align reasoning depth, accuracy, and efficiency across diverse tasks.</li>
                        </ul>
                    </li>
                </ul>
                <p>
                    Each of these methods aims to transform a generic text generator into a compositional problem-solver, either through <em>prompting</em>, <em>decoding</em>, or <em>training modification</em>.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Methodologies for Invoking Reasoning in LLMs</h3>
                <p>
                    There are several overarching paradigms by which reasoning can be <em>invoked</em> in LLMs. Each family emphasizes a different mechanism—whether through prompting, decoding, exploration, tool use, or learning signals. Below, the principal methodologies are organized into five broad families.
                </p>
            </div>
        </Section>
    );
};

export default InvokingReasoning;
