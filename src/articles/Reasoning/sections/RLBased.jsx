import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

export default function RLBased() {
    return (
        <Section title="Reinforcement Learning-Based Reasoning" icon={Zap}>
            <div className="space-y-6">
                <p>
                    RL approaches frame reasoning as <strong>policy optimization over reasoning trajectories</strong>. The model learns to generate structured, verifiable chains that maximize explicit or implicit rewards.
                </p>
                <p>
                    RL for reasoning treats reasoning as a <em>goal-directed policy optimization problem</em>, where the model learns to produce multi-step reasoning traces that maximize a task-specific reward. Rather than relying only on imitation of reasoning traces (as in supervised fine-tuning or CoT), this approach uses reward signals—explicit or implicit—to guide models toward <strong>useful</strong> intermediate reasoning behaviors.
                </p>
                <p>
                    Emerging <strong>agentic reasoning paradigms</strong> extend this RL framing to encompass <em>tool-integrated</em>, <em>interactive</em>, and <em>judgmental</em> reasoning. Recent systems such as <strong>ToRL</strong>, <strong>ReTool</strong>, and <strong>SimpleTIR</strong> demonstrate how reinforcement learning enables LLMs to act as autonomous agents that reason through iterative tool use—executing, verifying, and refining their own outputs via external environments (e.g., code interpreters or search engines). This <strong>tool-integrated reasoning</strong> (TIR) broadens the feasible reasoning space beyond text-only models by breaking the "invisible leash" that constrains standard RL within the model's pretraining distribution. Furthermore, reinforcement-trained reasoning extends beyond task-solving to include <strong>LLM-as-judge</strong> and <strong>reward-model</strong> architectures, where models evaluate or shape reasoning quality through learned, hierarchical feedback loops—constituting early forms of <em>reasoning beyond general-purpose LLMs</em>.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">WebGPT</h3>
                <p>
                    The paper <a href="https://arxiv.org/abs/2112.09332" className="text-blue-600 hover:underline">WebGPT: Browser-assisted Question-answering with Human Feedback</a> by Nakano et al. (2021) represents one of the earliest large-scale implementations of <strong>reinforcement learning from human feedback (RLHF)</strong> for reasoning. It extends LLMs beyond static text reasoning by introducing a controlled web-browsing interface, enabling them to search, navigate, and cite external information sources while answering questions.
                </p>
                <p>
                    By combining human preference modeling with interactive tool use, WebGPT laid the foundation for verifiable, tool-augmented reasoning systems.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>WebGPT extends the RL-style reasoning paradigm by equipping an LLM with a controlled web-browser interface: the model can query, click, scroll, and quote webpages in a simulated browsing environment.</li>
                    <li>It then uses human feedback (via a reward model trained on pairwise comparisons) to select its best answers. In this way, the model's reasoning trajectories include <em>external information retrieval and verification steps</em>, making reasoning more grounded and verifiable.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>The model begins with imitation learning (behavior cloning) on human browsing demonstrations, learning to execute search <Equation>{`\\rightarrow`}</Equation> navigate <Equation>{`\\rightarrow`}</Equation> quote chains.</li>
                    <li>Next, a separate reward model is trained to predict human preference among answer–reference pairs. Answers are harvested via browsing and then compared.</li>
                    <li>Finally, the policy is refined via rejection sampling (and optionally RL) with respect to that reward model: the top-ranked answers by the reward model are selected.</li>
                    <li>
                        <strong>Browsing environment:</strong> At each time step <Equation>t</Equation> the model is given browser state <Equation>{`s_t`}</Equation>, chooses an action <Equation>{`a_t \\in \\{\\text{Search}, \\text{Click}, \\text{Scroll}, \\text{Quote}\\}`}</Equation>, and obtains the next state <Equation>{`s_{t+1}`}</Equation>. After <Equation>T</Equation> steps, it produces answer <Equation>y</Equation> with supporting references <Equation>z</Equation>. The reward model assigns <Equation>{`R(y,z)`}</Equation>. The training objective is to increase the probability of trajectories leading to high <Equation>R</Equation>.
                        <EquationBlock><Equation>
                            {`\\mathcal{J}(\\theta) = \\mathbb{E}_{(x, (z,y) \\sim \\pi_\\theta(\\cdot\\mid x))} [R(y,z)]`}
                        </Equation></EquationBlock>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li>where <Equation>x</Equation> is the question and <Equation>z</Equation> is the set of quoted references.</li>
                        </ul>
                    </li>
                    <li><strong>Use of citations:</strong> The model is required to produce citations so that humans can verify factual accuracy.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">DeepSeek-R1</h3>
                <p>
                    The most prominent example of RL for reasoning is <strong>DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning</strong> by <a href="https://arxiv.org/abs/2501.12948" className="text-blue-600 hover:underline">Guo et al. (2025)</a>.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <p>
                    DeepSeek-R1 applies RL to improve reasoning performance <em>without supervised rationales</em>. The model learns to generate intermediate steps that lead to verifiably correct outcomes, using a <strong>reinforcement signal</strong> that rewards correct or efficient reasoning trajectories.
                </p>
                <p>
                    Formally, for a given problem <Equation>x</Equation>, reasoning trace <Equation>z</Equation>, and final answer <Equation>y</Equation>,
                </p>
                <EquationBlock><Equation>
                    {`R(y, z) = \\mathbb{I}[\\text{correct}(y)] - \\lambda \\cdot \\text{cost}(z)`}
                </Equation></EquationBlock>
                <p>
                    ... and the objective is to maximize the expected reward:
                </p>
                <EquationBlock><Equation>
                    {`\\mathcal{J}(\\theta) = \\mathbb{E}_{x \\sim \\mathcal{D}, z,y \\sim p_\\theta(\\cdot\\mid x)}[R(y, z)]`}
                </Equation></EquationBlock>
                <p>
                    The model parameters are updated using RL methods such as policy gradient or Proximal Policy Optimization (PPO).
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        <strong>Base model:</strong> Start with a pretrained LLM capable of multi-step reasoning (e.g., instruction-tuned).
                    </li>
                    <li>
                        <strong>Reward design:</strong>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><em>Outcome-based rewards:</em> correctness of final answer.</li>
                            <li><em>Process-based rewards:</em> alignment with logical or stylistic reasoning norms.</li>
                            <li><em>Efficiency penalties:</em> shorter, more coherent chains get higher reward.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Policy optimization:</strong> Update the model parameters <Equation>{`\\theta`}</Equation> to maximize expected reward using policy-gradient methods.
                        <EquationBlock><Equation>
                            {`\\nabla_\\theta \\mathcal{J}(\\theta) = \\mathbb{E}[(R - b)\\nabla_\\theta \\log p_\\theta(y,z\\mid x)]`}
                        </Equation></EquationBlock>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li>where <Equation>b</Equation> is a baseline to reduce variance.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Iterative refinement:</strong> Feedback from reward models, verification models, or external evaluators is used to shape the model's reasoning distribution.
                    </li>
                </ol>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">DeepSeek-R1 Highlights</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>No human-annotated rationales:</strong> The system learns reasoning <em>emergently</em> through reward shaping.</li>
                    <li><strong>Curriculum design:</strong> Rewards evolve from simple tasks (e.g., arithmetic) to complex reasoning (e.g., proofs, logical deduction).</li>
                    <li><strong>Outcome:</strong> Demonstrated significant improvements on mathematical and logic benchmarks, outperforming supervised CoT-trained baselines.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Reinforcement Learning for Tool-Integrated Reasoning</h3>
                <p>
                    <strong>Tool-Integrated Reasoning (TIR)</strong> marks a paradigm shift in how LLMs perform complex reasoning tasks. Instead of relying solely on text-based inference, TIR enables models to <strong>invoke external tools</strong>—such as code interpreters, APIs, databases, or symbolic solvers—within their reasoning trajectories.
                </p>
                <p>
                    Through this mechanism, models alternate between <em>linguistic reasoning</em> and <em>computational execution</em>, forming a hybrid cognitive process that grounds natural language thought in verifiable computation. Formally, a TIR process can be expressed as:
                </p>
                <EquationBlock><Equation>
                    {`s_t = \\{r_1, c_1, o_1, \\ldots, r_t, c_t, o_t\\}`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where <Equation>{`r_t`}</Equation> is a reasoning step, <Equation>{`c_t`}</Equation> a tool command, and <Equation>{`o_t = I(c_t)`}</Equation> the corresponding output from an interpreter <Equation>I</Equation>.</li>
                </ul>
                <p>
                    <strong>Tool-Integrated Reinforcement Learning (TIRL)</strong> extends this paradigm by introducing <strong>reinforcement learning (RL)</strong> into the TIR loop. In TIRL, models are not merely taught to use tools—they <strong>learn</strong> when and how to use them optimally through trial, feedback, and reward.
                </p>
                <EquationBlock><Equation>
                    {`J(\\theta) = \\mathbb{E}_{\\pi_\\theta} \\left[\\sum_{t=0}^{T} \\gamma^t r(s_t, a_t, o_t)\\right]`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where the policy <Equation>{`\\pi_\\theta(a_t \\mid s_t)`}</Equation> produces both reasoning and tool actions.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Tool-Integrated Reinforcement Learning (ToRL)</h4>
                <p>
                    The <a href="https://arxiv.org/abs/2503.23383" className="text-blue-600 hover:underline">Tool-Integrated Reinforcement Learning (ToRL)</a> framework by Li et al. (2025) directly scales reinforcement learning from base models—without supervised fine-tuning—to autonomously acquire computational tool usage.
                </p>
                <p>
                    ToRL enables unrestricted RL exploration with embedded interpreters (e.g., Python) for solving mathematical reasoning problems. Through repeated interaction between analytical reasoning and code execution, the model learns to balance symbolic reasoning with computational accuracy.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Reinforcement Learning for Strategic Tool Use (ReTool)</h4>
                <p>
                    <a href="https://arxiv.org/abs/2504.11536" className="text-blue-600 hover:underline">ReTool</a> by Feng et al. (2025) extends the RL paradigm by <em>explicitly embedding tool execution into the rollout process</em>. It introduces an <strong>interleaved reasoning and code execution framework</strong> for dynamic tool invocation and reflection.
                </p>
                <p>
                    ReTool's training integrates real-time <strong>code interpreter feedback</strong> within the PPO objective, allowing the model to learn <em>when</em> and <em>how</em> to invoke code execution within multi-turn reasoning rollouts.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Tool-Integrated Reinforcement Learning for LLM Judges (TIR-Judge)</h4>
                <p>
                    <a href="https://arxiv.org/abs/2510.23038" className="text-blue-600 hover:underline">TIR-Judge</a> by Xu et al. (2025) extends tool-augmented RL beyond reasoning tasks to <strong>evaluation and alignment</strong>. It trains <em>LLM-based judges</em> that can autonomously verify, compute, and reason during the evaluation of model responses.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Tool-Augmented Reward Modeling (Themis)</h3>
                <p>
                    The paper <a href="https://arxiv.org/abs/2310.01045" className="text-blue-600 hover:underline">Tool-Augmented Reward Modeling (Themis)</a> by Li et al. (2024) introduces an RLHF-based framework that directly enhances reasoning through external tool usage during the reward modeling process. The key idea is to allow reward models (RMs) to <strong>access external tools</strong>—such as search engines, calculators, and code interpreters—while evaluating responses, thereby grounding the reasoning process in factual and computational evidence.
                </p>
                <p>
                    In summary, Themis operationalizes the idea that <strong>reasoning should be rewardable</strong>—transforming RLHF from passive alignment into active, evidence-grounded reasoning optimization.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Tool Learning with Foundation Models</h3>
                <p>
                    The paper <a href="https://doi.org/10.1145/3704435" className="text-blue-600 hover:underline">Tool Learning with Foundation Models</a> by Qin et al. (2024) provides a comprehensive survey of how large foundation models acquire, use, and reason with tools—situating RL within a broader <em>tool-augmented reasoning paradigm</em>.
                </p>
                <p>
                    Tool learning expands the scope of reasoning beyond static text generation to <strong>interactive environments</strong>, where a foundation model acts as a <em>controller</em> that plans, executes, and refines multi-step tool usage.
                </p>
                <EquationBlock><Equation>
                    {`\\text{Reason} \\rightarrow \\text{Act (via tools)} \\rightarrow \\text{Observe} \\rightarrow \\text{Reward} \\rightarrow \\text{Refine}`}
                </Equation></EquationBlock>

            </div>
        </Section>
    );
}
