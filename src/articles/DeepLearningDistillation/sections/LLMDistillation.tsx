import React from 'react';
import { MessageSquare } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const LLMDistillation = () => {
    return (
        <Section title="Distillation for LLMs" icon={MessageSquare}>
            <Header3>Sequence-Level Distillation (SeqKD)</Header3>
            <Paragraph>
                In sequence-level KD, the teacher generates complete output sequences, and the student trains on (input, teacher_output) pairs as if they were ground truth:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{SeqKD} = -\\sum_{t=1}^{T} \\log p_S(y_t^T | y_{<t}^T, x)`}
            </Equation>
            <Paragraph>
                where <Equation>{`y^T`}</Equation> is the teacher-generated sequence.
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Advantages:</strong> Bypasses tokenizer alignment issues. Simple—just supervised fine-tuning on teacher outputs.
                </ListItem>
                <ListItem>
                    <strong>Disadvantages:</strong> Loses token-level probability information. Student can't learn teacher uncertainty.
                </ListItem>
                <ListItem>
                    <strong>When to use:</strong> Different tokenizers, very large teacher (expensive to query for token logits), task-specific distillation.
                </ListItem>
            </List>

            <Header3>Token-Level Distillation</Header3>
            <Paragraph>
                Token-level distillation matches teacher and student probability distributions at each position:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{token} = \\sum_{t=1}^{T} D_{KL}(p_T(\\cdot | y_{<t}, x) \\| p_S(\\cdot | y_{<t}, x))`}
            </Equation>

            <Header4>Teacher-Forcing and Exposure Bias</Header4>
            <Paragraph>
                Standard token-level KD uses <strong>teacher-forcing</strong>: the context <Equation>{`y_{<t}`}</Equation> is ground-truth tokens. This creates an exposure bias—during training, the student sees perfect context; during inference, it sees its own (imperfect) generations.
            </Paragraph>
            <Callout type="warning" title="The Compounding Error Problem">
                If the student makes one error, subsequent predictions are conditioned on a context it never saw during training. Errors compound. This is especially problematic for long-form generation.
            </Callout>

            <Header3>MiniLLM: Reverse KL for Text</Header3>
            <Paragraph>
                MiniLLM (Gu et al., ICLR 2024) applies <strong>Reverse KL</strong> to text generation:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{MiniLLM} = D_{KL}(P_{student} \\| P_{teacher})`}
            </Equation>
            <Paragraph>
                Implementation via policy gradient (reward = log-probability under teacher):
            </Paragraph>
            <List>
                <ListItem>Student generates sequence <Equation>{`y \\sim p_S`}</Equation>.</ListItem>
                <ListItem>Compute reward: <Equation>{`r = \\log p_T(y | x)`}</Equation>.</ListItem>
                <ListItem>Update student with REINFORCE: <Equation>{`\\nabla \\mathcal{L} \\propto (r - b) \\nabla \\log p_S(y | x)`}</Equation>.</ListItem>
            </List>
            <Paragraph>
                Result: Student generates only tokens the teacher approves. Mode-seeking rather than mode-covering. Reduces hallucinations and generic outputs.
            </Paragraph>

            <Header3>Generalized Knowledge Distillation (GKD)</Header3>
            <Paragraph>
                GKD addresses exposure bias by unifying distillation with <strong>on-policy learning</strong>:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>On-Policy Sampling:</strong> Student generates sequences <Equation>{`y \\sim p_S`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Teacher Feedback:</strong> For each position in the student-generated sequence, query the teacher for the target distribution.
                </ListItem>
                <ListItem>
                    <strong>Learn Recovery:</strong> Student learns how to recover from its own mistakes—teacher provides guidance from suboptimal states.
                </ListItem>
            </List>
            <Paragraph>
                This aligns training and inference distributions, dramatically improving generation quality on long-form tasks.
            </Paragraph>

            <Header3>Chain-of-Thought Distillation</Header3>
            <Paragraph>
                For reasoning tasks (math, coding, logic), distilling just the final answer is insufficient. <strong>CoT distillation</strong> transfers the reasoning process.
            </Paragraph>

            <Header4>Reasoning Trace Distillation</Header4>
            <Paragraph>
                Instead of <Equation>{`Q \\to A`}</Equation>, distill <Equation>{`Q \\to \\text{Reasoning} \\to A`}</Equation>:
            </Paragraph>
            <List>
                <ListItem>Teacher generates step-by-step reasoning traces for each problem.</ListItem>
                <ListItem>Filter traces: keep only those leading to correct answers.</ListItem>
                <ListItem>Train student on (problem, reasoning_trace, answer) triples.</ListItem>
            </List>
            <Paragraph>
                Recent examples: Orca, WizardLM, Phi-series use extensive CoT distillation from GPT-4/DeepSeek-R1.
            </Paragraph>

            <Header4>Distilling Reasoning vs. Memorizing Answers</Header4>
            <Paragraph>
                Key insight: The value of CoT distillation is teaching the <em>process</em>, not just providing more training data. Students learn to decompose problems, check intermediate steps, and apply general strategies.
            </Paragraph>

            <Header3>Instruction-Following Distillation</Header3>
            <Paragraph>
                Distillation for instruction-tuned models focuses on following diverse, open-ended commands:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Data Generation:</strong> Teacher generates responses to diverse instruction prompts (Self-Instruct, Evol-Instruct).
                </ListItem>
                <ListItem>
                    <strong>Quality Filtering:</strong> Filter teacher outputs by length, coherence, following-instructions criteria.
                </ListItem>
                <ListItem>
                    <strong>Diverse Coverage:</strong> Ensure the distillation set covers many task types, styles, and difficulty levels.
                </ListItem>
            </List>
            <Callout type="info" title="Alpaca, Vicuna, and Similar">
                Many open-source instruction-following models are distilled from GPT-3.5/GPT-4 outputs on instruction datasets. This is pure sequence-level KD with filtered quality control.
            </Callout>

            <Header3>Preference Distillation (DPO-Style)</Header3>
            <Paragraph>
                Beyond distilling outputs, we can distill <strong>preferences</strong>—which outputs are better than others.
            </Paragraph>

            <Header4>Direct Preference Optimization (DPO)</Header4>
            <Paragraph>
                Given preference pairs <Equation>{`(y_w, y_l)`}</Equation> (winner, loser), DPO optimizes:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{DPO} = -\\log \\sigma\\left( \\beta \\log \\frac{p_S(y_w|x)}{p_{ref}(y_w|x)} - \\beta \\log \\frac{p_S(y_l|x)}{p_{ref}(y_l|x)} \\right)`}
            </Equation>

            <Header4>Preference Data from Teacher</Header4>
            <Paragraph>
                Instead of human preferences, generate preference pairs using the teacher:
            </Paragraph>
            <List>
                <ListItem>Generate multiple candidate responses.</ListItem>
                <ListItem>Teacher ranks or scores them (via perplexity, reward model, or direct comparison).</ListItem>
                <ListItem>Use ranked pairs for DPO training of student.</ListItem>
            </List>

            <Header4>Constitutional AI and Self-Improvement</Header4>
            <Paragraph>
                Teacher critiques its own or student's outputs according to principles (safety, helpfulness). Critique-revised pairs become preference data. The student learns the teacher's values, not just its outputs.
            </Paragraph>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Method</th>
                            <th className="px-4 py-2 border-b">What is Distilled</th>
                            <th className="px-4 py-2 border-b">Key Benefit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">SeqKD</td>
                            <td className="px-4 py-2">Complete sequences</td>
                            <td className="px-4 py-2">Simple; vocabulary-agnostic</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Token-level KD</td>
                            <td className="px-4 py-2">Per-token distributions</td>
                            <td className="px-4 py-2">Rich signal; captures uncertainty</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">MiniLLM</td>
                            <td className="px-4 py-2">Reverse KL distribution match</td>
                            <td className="px-4 py-2">Mode-seeking; reduces hallucination</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">GKD</td>
                            <td className="px-4 py-2">On-policy token distributions</td>
                            <td className="px-4 py-2">Addresses exposure bias</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">CoT Distillation</td>
                            <td className="px-4 py-2">Reasoning traces</td>
                            <td className="px-4 py-2">Transfers reasoning ability</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Preference/DPO</td>
                            <td className="px-4 py-2">Pairwise rankings</td>
                            <td className="px-4 py-2">Transfers values and preferences</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default LLMDistillation;
