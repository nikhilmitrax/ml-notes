import React from 'react';
import { Database } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const DataAndObjectives = () => {
    return (
        <Section title="Data and Objectives" icon={Database}>
            <Header3>Data Selection Strategies</Header3>
            <Paragraph>
                The choice of transfer dataset—the data on which the student learns from the teacher—significantly affects distillation quality.
            </Paragraph>

            <Header4>In-Domain vs. Out-of-Domain Data</Header4>
            <List>
                <ListItem>
                    <strong>In-Domain:</strong> Data from the same distribution as the target task. Best for task-specific distillation. Risk: overfitting to narrow domain.
                </ListItem>
                <ListItem>
                    <strong>Out-of-Domain:</strong> Data from different distributions. Can improve generalization and robustness. The teacher's soft labels provide supervision even without ground truth on this data.
                </ListItem>
                <ListItem>
                    <strong>Mixed:</strong> Combine in-domain and out-of-domain data. Common practice: 70-80% in-domain, 20-30% diverse out-of-domain.
                </ListItem>
            </List>
            <Callout type="tip" title="Unlabeled Data for Distillation">
                A key advantage of distillation: the transfer dataset doesn't need ground-truth labels since the teacher provides soft labels. This enables using vast amounts of unlabeled data.
            </Callout>

            <Header4>Curriculum and Difficulty Scheduling</Header4>
            <Paragraph>
                Ordering training examples by difficulty can improve distillation:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Easy-to-Hard:</strong> Start with high-confidence teacher predictions (clear examples), then progress to low-confidence (ambiguous examples). Builds student capacity before tackling hard cases.
                </ListItem>
                <ListItem>
                    <strong>Hard-First:</strong> Prioritize examples where teacher and student disagree most. Focuses training budget on the knowledge gap.
                </ListItem>
                <ListItem>
                    <strong>Uncertainty Sampling:</strong> Prioritize examples where teacher entropy is high—these contain the richest "dark knowledge" signal.
                </ListItem>
            </List>

            <Header4>Transfer Data Size</Header4>
            <Paragraph>
                How much data is needed for effective distillation?
            </Paragraph>
            <List>
                <ListItem>
                    <strong>For fine-tuning small students:</strong> Often 10-50K examples suffice.
                </ListItem>
                <ListItem>
                    <strong>For training from scratch:</strong> Scale with student size—millions of examples for billion-parameter students.
                </ListItem>
                <ListItem>
                    <strong>Diminishing returns:</strong> Beyond ~10× the original training set, additional transfer data shows minimal gains.
                </ListItem>
            </List>

            <Header3>Data-Free and Synthetic Distillation</Header3>
            <Paragraph>
                When the original training data is unavailable (privacy, license, size), data-free distillation generates training examples from the teacher itself.
            </Paragraph>

            <Header4>Generator-Based Approaches</Header4>
            <Paragraph>
                Train a generator network to produce inputs that maximize teacher confidence or expose student-teacher disagreement:
            </Paragraph>
            <Equation block>
                {`\\max_G \\mathbb{E}_{z \\sim p(z)} \\left[ D_{KL}(p_T(G(z)) \\| p_S(G(z))) \\right]`}
            </Equation>
            <Paragraph>
                The generator finds inputs where the student most needs to learn from the teacher.
            </Paragraph>

            <Header4>Teacher-Generated Outputs</Header4>
            <Paragraph>
                For generative models (LLMs, diffusion), the teacher can simply generate outputs:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>LLMs:</strong> Teacher generates text completions. Student trains on these as ground truth (sequence-level KD).
                </ListItem>
                <ListItem>
                    <strong>Diffusion:</strong> Teacher generates images. Student learns to produce the same distribution.
                </ListItem>
            </List>

            <Header4>Augmentation-Based Approaches</Header4>
            <Paragraph>
                Apply aggressive data augmentation to a small seed dataset, using teacher predictions on augmented versions as soft labels.
            </Paragraph>

            <Header3>Hard vs. Soft Target Trade-offs</Header3>
            <Paragraph>
                The balance between hard (ground-truth) and soft (teacher) targets reflects a bias-variance trade-off:
            </Paragraph>
            <div className="overflow-x-auto my-4">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Target Type</th>
                            <th className="px-4 py-2 border-b">Signal</th>
                            <th className="px-4 py-2 border-b">Bias</th>
                            <th className="px-4 py-2 border-b">Variance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Hard Labels Only</td>
                            <td className="px-4 py-2">Ground truth</td>
                            <td className="px-4 py-2">Low (true labels)</td>
                            <td className="px-4 py-2">High (no inter-class info)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Soft Labels Only</td>
                            <td className="px-4 py-2">Teacher predictions</td>
                            <td className="px-4 py-2">Teacher errors propagate</td>
                            <td className="px-4 py-2">Low (rich signal)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Mixed</td>
                            <td className="px-4 py-2">Both</td>
                            <td className="px-4 py-2">Moderate</td>
                            <td className="px-4 py-2">Moderate</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4>Label Smoothing vs. Distillation</Header4>
            <Paragraph>
                Label smoothing and distillation share a similar mechanism—both regularize training by softening targets—but differ in their source:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Label Smoothing:</strong> <Equation>{`y_{smooth} = (1-\\epsilon) \\cdot y_{hard} + \\epsilon / K`}</Equation>. Uniform noise across non-target classes.
                </ListItem>
                <ListItem>
                    <strong>Distillation:</strong> Non-uniform soft targets from teacher. Captures actual class similarities, not just regularization noise.
                </ListItem>
            </List>
            <Paragraph>
                Distillation is strictly more informative than label smoothing—it provides <em>structured</em> rather than <em>random</em> soft targets.
            </Paragraph>

            <Header3>Multitask and Multi-Label Distillation</Header3>
            <Paragraph>
                When distilling models trained on multiple tasks or with multi-label outputs, additional considerations apply:
            </Paragraph>

            <Header4>Multitask Distillation</Header4>
            <List>
                <ListItem>
                    <strong>Task-Specific Teachers:</strong> Use separate teachers per task, combine their signals.
                </ListItem>
                <ListItem>
                    <strong>Single Multi-Task Teacher:</strong> Distill all tasks simultaneously. Risk: task interference.
                </ListItem>
                <ListItem>
                    <strong>Task Weighting:</strong> Balance losses across tasks. <Equation>{`\\alpha_t`}</Equation> per task, tuned on validation.
                </ListItem>
            </List>

            <Header4>Multi-Label Distillation</Header4>
            <Paragraph>
                With multi-label outputs (e.g., image tagging), each label is an independent binary classification:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{multilabel} = \\sum_{l=1}^{L} BCE(\\sigma(z_S^l / \\tau), \\sigma(z_T^l / \\tau))`}
            </Equation>
            <Paragraph>
                Apply temperature scaling independently to each label's logit, then compute binary cross-entropy.
            </Paragraph>
        </Section>
    );
};

export default DataAndObjectives;
