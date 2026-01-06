import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const Overview = () => {
    return (
        <Section title="Overview and definition" icon={Brain}>
            <div className="space-y-6">
                <Paragraph>
                    Large Language Models (LLMs) are sequence models that learn a conditional distribution over tokens. Given a context <Equation>{`x_{<t}`}</Equation>, an LLM parameterized by <Equation>{`\\theta`}</Equation> predicts the next token via:
                </Paragraph>
                <Equation block>
                    {`p_\\theta(x_t \\mid x_{<t}) = \\mathrm{softmax}\\left(f_\\theta(x_{<t})\\right)`}
                </Equation>
                <Paragraph>
                    Reasoning, in this primer, is the process by which an LLM instantiates and manipulates intermediate structures to transform inputs into solutions that satisfy constraints beyond surface-level pattern completion. A useful abstraction is to introduce latent "thoughts" <Equation>z</Equation> and write:
                </Paragraph>
                <Equation block>
                    {`p_\\theta(y\\mid x)=\\sum_{z} p_\\theta(y\\mid x,z) p_\\theta(z\\mid x)`}
                </Equation>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        where <Equation>z</Equation> ranges over intermediate steps such as plans, subgoals, tool calls, or formal derivations. Externalizing <Equation>z</Equation> in the output (for example, step-by-step rationales) is one way we can probe, debug, and improve this process.
                    </li>
                </ul>
                <Paragraph>
                    From an architectural standpoint, modern LLMs implement this computation with transformers introduced in Attention Is All You Need by <a href="https://arxiv.org/abs/1706.03762" className="text-blue-600 hover:underline">Vaswani et al. (2017)</a>. Pretraining objectives and representations popularized by BERT by <a href="https://arxiv.org/abs/1810.04805" className="text-blue-600 hover:underline">Devlin et al. (2018)</a> helped establish bidirectional text understanding, while today's generative LLMs typically use decoder-only transformers. Scaling trends such as power-law loss curves in Scaling Laws for Neural Language Models by <a href="https://arxiv.org/abs/2001.08361" className="text-blue-600 hover:underline">Kaplan et al. (2020)</a> and compute-optimal training in Training Compute-Optimal Large Language Models ("Chinchilla") by <a href="https://arxiv.org/abs/2203.15556" className="text-blue-600 hover:underline">Hoffmann et al. (2022)</a> explain why larger, better-trained models often exhibit stronger reasoning—although how "reasoning" emerges remains an active debate, with claims of sharp emergent abilities in Emergent Abilities of Large Language Models by <a href="https://arxiv.org/abs/2206.07682" className="text-blue-600 hover:underline">Wei et al. (2022)</a> and counter-arguments that such "emergence" can be a metric artifact in Are Emergent Abilities of Large Language Models a Mirage? by <a href="https://arxiv.org/abs/2304.15004" className="text-blue-600 hover:underline">Schaeffer et al. (2023)</a>.
                </Paragraph>
                <Paragraph>
                    A practical working definition that guides the rest of this primer is that reasoning in LLMs can be understood as learned, compositional computation over latent steps <Equation>z</Equation> that yields verifiable conclusions.
                </Paragraph>
                <Paragraph>
                    This definition is agnostic to whether steps are printed as Chain-of-Thought (CoT), searched over as a tree, executed as code, or kept internal.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">What counts as "reasoning" for LLMs?</Header3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Deductive reasoning</strong>: Deriving logically necessary conclusions from premises, e.g., symbolic algebra, formal proofs, or rule application.
                    </li>
                    <li>
                        <strong>Inductive reasoning</strong>: Generalizing patterns from examples, e.g., few-shot extrapolation, schema induction, or pattern completion that yields testable hypotheses.
                    </li>
                    <li>
                        <strong>Abductive reasoning</strong>: Inferring the most plausible explanation for observations (hypothesis selection under uncertainty), common in diagnosis and root-cause analysis.
                    </li>
                    <li>
                        <strong>Procedural reasoning</strong>: Planning and multi-step control in which the model decomposes tasks, executes actions (possibly via tools), and revises plans.
                    </li>
                </ul>
                <Paragraph>
                    These categories are not mutually exclusive; many benchmarks interleave them.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Interfaces that elicit reasoning</Header3>
                <Paragraph>
                    Researchers have discovered prompting and decoding interfaces that expose or amplify the latent steps <Equation>z</Equation>.
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Chain-of-thought (CoT)</strong>: Providing or eliciting step-by-step rationales improves multi-step problem solving, as shown in <em>Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</em> by <a href="https://arxiv.org/abs/2201.11903" className="text-blue-600 hover:underline">Wei et al. (2022)</a> and Zero-shot CoT ("Let's think step by step") in <em>Large Language Models are Zero-Shot Reasoners</em> by <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Kojima et al. (2022)</a>. <em>Self-Consistency Improves CoT Reasoning in Language Models</em> by <a href="https://arxiv.org/abs/2203.11171" className="text-blue-600 hover:underline">Wang et al. (2022)</a> samples multiple reasoning paths and marginalizes to a consensus.
                    </li>
                    <li>
                        <strong>Search over thoughts</strong>: <em>Tree of Thoughts: Deliberate Problem Solving with Large Language Models</em> by <a href="https://arxiv.org/abs/2305.10601" className="text-blue-600 hover:underline">Yao et al. (2023)</a> treats intermediate steps as nodes and performs lookahead/backtracking, bridging LLM inference with classic heuristic search.
                    </li>
                    <li>
                        <strong>Reasoning and acting</strong>: <em>ReAct: Synergizing Reasoning and Acting in Language Models</em> by <a href="https://arxiv.org/abs/2210.03629" className="text-blue-600 hover:underline">Yao et al. (2022)</a> interleaves reasoning traces with tool or environment actions, enabling information gathering and plan revision.
                    </li>
                </ul>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">The role of scaling and the "aha" phenomenon</Header3>
                <Paragraph>
                    Scaling laws predict smoother loss improvements with model/data/compute, yet qualitative "jumps" in task performance are often reported. Two perspectives coexist:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Emergence view</strong>: Some abilities appear only beyond certain scales or training regimes, as argued by <a href="https://arxiv.org/abs/2206.07682" className="text-blue-600 hover:underline">Wei et al. (2022)</a>.
                    </li>
                    <li>
                        <strong>Measurement view</strong>: Apparent discontinuities arise from metric non-linearities or data scarcity, per <a href="https://arxiv.org/abs/2304.15004" className="text-blue-600 hover:underline">Schaeffer et al. (2023)</a>.
                    </li>
                </ul>
                <Paragraph>
                    In either view, improved interfaces and training often turn tacit competence into explicit problem solving. For instance, RL specialized to reward intermediate solution quality, as in DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning by <a href="https://arxiv.org/abs/2501.12948" className="text-blue-600 hover:underline">Guo et al. (2025)</a>, reports substantial gains on math and logic without supervised rationales, highlighting how credit assignment can shape useful latent computations.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">A minimal mathematical lens</Header3>
                <Paragraph>
                    Training typically minimizes the expected negative log-likelihood (cross-entropy) <Equation>{`\\mathcal{L}(\\theta)=\\mathbb{E}_{x\\sim \\mathcal{D}}\\left[-\\sum_{t}\\log p_\\theta(x_t\\mid x_{<t})\\right]`}</Equation>.
                </Paragraph>
                <Paragraph>
                    Reasoning-oriented inference augments this with structure over <Equation>z</Equation>:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>CoT-style sampling</strong>: Sample <Equation>{`z^{(k)}\\sim p_\\theta(z\\mid x)`}</Equation> and select <Equation>{`\\hat{y}`}</Equation> by majority or confidence weighting <Equation>{`\\hat{y}=\\arg\\max_y \\sum_{k} w \\left(z^{(k)}\\right) p_\\theta(y\\mid x,z^{(k)})`}</Equation>.
                    </li>
                    <li>
                        <strong>Search over thoughts</strong>: Define a scoring function <Equation>{`s(z_{1:t})`}</Equation> and expand nodes to maximize expected downstream reward, akin to beam/A* variants over textual states.
                    </li>
                    <li>
                        <strong>Reinforcement Learning for reasoning</strong>: Optimize <Equation>{`\\theta`}</Equation> against a task reward <Equation>{`R(y,z)`}</Equation>, shaping <Equation>{`p_\\theta(z\\mid x)`}</Equation> toward productive step structures rather than purely imitating text.
                    </li>
                </ul>
            </div>
        </Section>
    );
};

export default Overview;
