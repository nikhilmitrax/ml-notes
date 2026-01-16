import React from 'react';
import { GitBranch } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const CoreVariants = () => {
    return (
        <Section title="Core Distillation Variants" icon={GitBranch}>
            <Header3>Response/Logit Distillation</Header3>
            <Paragraph>
                The original and most common form of distillation matches teacher and student at the <strong>final output layer</strong>. The student learns to produce the same probability distribution as the teacher.
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{logit} = D_{KL}\\left(\\sigma\\left(\\frac{z_T}{\\tau}\\right) \\| \\sigma\\left(\\frac{z_S}{\\tau}\\right)\\right)`}
            </Equation>
            <Paragraph>
                Advantages: Simple, architecture-agnostic (only requires matching output dimensions), no intermediate layer alignment needed. Limitations: Ignores how the teacher arrives at its predictions—the student may learn shortcuts that don't generalize.
            </Paragraph>

            <Header4>Decoupled Knowledge Distillation (DKD)</Header4>
            <Paragraph>
                Zhao et al. (CVPR 2022) decomposed logit distillation into two independent terms:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Target Class KD (TCKD):</strong> Alignment on the ground-truth class probability. Conveys sample difficulty.
                </ListItem>
                <ListItem>
                    <strong>Non-Target Class KD (NCKD):</strong> Alignment on the distribution over incorrect classes. This carries the "dark knowledge" about class similarities.
                </ListItem>
            </List>
            <Paragraph>
                Standard KD couples these terms, often allowing TCKD to dominate (especially with confident teachers). DKD decouples them, enabling independent weighting—typically boosting NCKD to preserve dark knowledge transfer.
            </Paragraph>

            <Header3>Feature Distillation</Header3>
            <Paragraph>
                Feature distillation matches <strong>intermediate representations</strong> rather than just outputs. This forces the student to learn similar internal representations to the teacher, often leading to better generalization.
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{feature} = \\sum_{l \\in \\mathcal{L}} \\left\\| f_T^{(l)}(x) - \\phi(f_S^{(l)}(x)) \\right\\|^2`}
            </Equation>
            <Paragraph>
                where <Equation>{`f_T^{(l)}`}</Equation> and <Equation>{`f_S^{(l)}`}</Equation> are teacher and student features at layer <Equation>{`l`}</Equation>, and <Equation>{`\\phi`}</Equation> is a projection head to align dimensions.
            </Paragraph>

            <Header4>FitNets (Romero et al., 2015)</Header4>
            <Paragraph>
                The foundational feature distillation method. Uses a "hint layer" from the teacher (typically middle layers) and trains "guided layers" in the student to match. Key insight: intermediate representations contain richer signals than outputs alone.
            </Paragraph>

            <Header4>Attention Transfer (Zagoruyko & Komodakis, 2017)</Header4>
            <Paragraph>
                Rather than matching raw activations, matches <strong>attention maps</strong>—spatial attention derived from activation statistics:
            </Paragraph>
            <Equation block>
                {`A(F) = \\sum_c |F_c|^p \\quad \\text{(sum over channels, } p=2 \\text{ typical)}`}
            </Equation>
            <Paragraph>
                This captures where the model "looks" rather than what specific features it computes, providing a more abstract transfer signal.
            </Paragraph>

            <Header3>Relation Distillation</Header3>
            <Paragraph>
                Instead of matching individual representations, relation distillation matches <strong>structural relationships</strong> between samples or between layers.
            </Paragraph>

            <Header4>Pairwise Similarity Matching</Header4>
            <Paragraph>
                Given a batch of inputs, compute pairwise similarities in both teacher and student representation spaces:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{relation} = \\left\\| G_T - G_S \\right\\|_F^2, \\quad G_{ij} = \\frac{f_i^\\top f_j}{\\|f_i\\| \\|f_j\\|}`}
            </Equation>
            <Paragraph>
                where <Equation>{`G`}</Equation> is the Gram matrix of normalized features. This captures how the model perceives relationships between examples, regardless of absolute representation values.
            </Paragraph>

            <Header4>Contrastive Representation Distillation (CRD)</Header4>
            <Paragraph>
                Uses contrastive learning to distill structural knowledge. Positive pairs: same sample across teacher/student. Negative pairs: different samples. The student learns to preserve the teacher's representation geometry.
            </Paragraph>

            <Header3>Self-Distillation</Header3>
            <Paragraph>
                In self-distillation, the <strong>student and teacher share the same architecture</strong>—but differ in some other dimension (training stage, head, depth).
            </Paragraph>

            <Header4>Born-Again Networks (Furlanello et al., 2018)</Header4>
            <Paragraph>
                Train model A, then train an identical model B using A as teacher. Surprisingly, B often outperforms A. This can be iterated: train C from B, D from C, etc. Each generation typically improves until convergence.
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Why it works:</strong> The soft labels from A provide implicit regularization and data augmentation. Label smoothing effect helps calibration.
                </ListItem>
                <ListItem>
                    <strong>Practical use:</strong> Free accuracy boost at the cost of extra training time. No architecture changes needed.
                </ListItem>
            </List>

            <Header4>Deep Mutual Learning (DML)</Header4>
            <Paragraph>
                Train two (or more) models simultaneously, each acting as teacher to the others. Each model's loss includes KD terms from all other models:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_i = \\mathcal{L}_{CE}(y, p_i) + \\sum_{j \\neq i} D_{KL}(p_j \\| p_i)`}
            </Equation>
            <Paragraph>
                All models improve together—no pretrained teacher required.
            </Paragraph>

            <Header4>Early Exit / Multi-Head Self-Distillation</Header4>
            <Paragraph>
                In architectures with multiple exit points (e.g., early classifiers attached to intermediate layers), deeper exits can distill to shallower exits. The final classifier is the "teacher" for intermediate classifiers.
            </Paragraph>

            <Header3>Online and Mutual Distillation</Header3>
            <Paragraph>
                Unlike offline distillation (pretrained, frozen teacher), online distillation trains teacher and student <strong>simultaneously</strong>.
            </Paragraph>

            <Header4>Online Knowledge Distillation (OKD)</Header4>
            <List>
                <ListItem>
                    <strong>Collaborative Learning:</strong> A cohort of students trains together. Each student's loss includes KD terms from peer outputs.
                </ListItem>
                <ListItem>
                    <strong>Average Ensemble:</strong> The "teacher" distribution is the average of all student outputs, updated each iteration.
                </ListItem>
                <ListItem>
                    <strong>Auxiliary Networks:</strong> Branch networks attached to the main model provide additional teaching signals.
                </ListItem>
            </List>
            <Callout type="tip" title="When to Use Online Distillation">
                Online distillation is valuable when: (1) No suitable pretrained teacher exists, (2) Domain-specific data requires training from scratch, (3) Computational budget allows training multiple models simultaneously.
            </Callout>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Variant</th>
                            <th className="px-4 py-2 border-b">What is Matched</th>
                            <th className="px-4 py-2 border-b">Pros</th>
                            <th className="px-4 py-2 border-b">Cons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Logit/Response</td>
                            <td className="px-4 py-2">Final output probabilities</td>
                            <td className="px-4 py-2">Simple, architecture-agnostic</td>
                            <td className="px-4 py-2">Ignores intermediate reasoning</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Feature</td>
                            <td className="px-4 py-2">Intermediate activations</td>
                            <td className="px-4 py-2">Richer signal, better generalization</td>
                            <td className="px-4 py-2">Requires layer alignment, projection heads</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Relation</td>
                            <td className="px-4 py-2">Pairwise/structural relationships</td>
                            <td className="px-4 py-2">Captures geometry, robust to scale</td>
                            <td className="px-4 py-2">Batch-dependent, more complex loss</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Self-Distillation</td>
                            <td className="px-4 py-2">Same arch, different stage/head</td>
                            <td className="px-4 py-2">Free accuracy boost, no arch change</td>
                            <td className="px-4 py-2">Extra training time</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Online/Mutual</td>
                            <td className="px-4 py-2">Peer models during training</td>
                            <td className="px-4 py-2">No pretrained teacher needed</td>
                            <td className="px-4 py-2">Higher compute, coordination complexity</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default CoreVariants;
