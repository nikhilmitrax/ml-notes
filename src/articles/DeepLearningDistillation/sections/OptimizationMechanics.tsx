import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const OptimizationMechanics = () => {
    return (
        <Section title="Optimization & Training Mechanics" icon={Settings}>
            <Header3>Temperature and Loss-Weight Schedules</Header3>
            <Paragraph>
                Fixed hyperparameters often underperform dynamic schedules that adapt during training.
            </Paragraph>

            <Header4>Temperature Annealing</Header4>
            <List>
                <ListItem>
                    <strong>High→Low:</strong> Start with high <Equation>{`\\tau`}</Equation> (e.g., 20) to capture broad structure, anneal to low <Equation>{`\\tau`}</Equation> (e.g., 4) to refine details. Common schedule: <Equation>{`\\tau(t) = \\tau_{max} \\cdot (\\tau_{min}/\\tau_{max})^{t/T}`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Warmup:</strong> Start at <Equation>{`\\tau=1`}</Equation> to establish baseline, then increase to distillation temperature.
                </ListItem>
            </List>

            <Header4>Loss Weight Annealing (α Schedule)</Header4>
            <Paragraph>
                The balance between distillation loss and hard-label loss can evolve:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Early Distillation Focus:</strong> Start with high <Equation>{`\\alpha`}</Equation> (0.9) to absorb teacher knowledge, anneal to lower <Equation>{`\\alpha`}</Equation> (0.5) to refine on ground truth.
                </ListItem>
                <ListItem>
                    <strong>Late Distillation:</strong> Start with low <Equation>{`\\alpha`}</Equation> (standard training), increase <Equation>{`\\alpha`}</Equation> late in training as a regularizer.
                </ListItem>
            </List>
            <Callout type="info" title="Jointly Tuning τ and α">
                Temperature and loss weight interact. Higher <Equation>{`\\tau`}</Equation> produces softer distributions, reducing the effective signal strength—compensate with higher <Equation>{`\\alpha`}</Equation>. Grid search or Bayesian optimization over <Equation>{`(\\tau, \\alpha)`}</Equation> pairs is recommended.
            </Callout>

            <Header3>Stability Tricks</Header3>

            <Header4>Gradient Stopping Through Teacher</Header4>
            <Paragraph>
                In online distillation or when teacher and student share parameters, gradients can flow through the teacher's forward pass. This often destabilizes training.
            </Paragraph>
            <Equation block>
                {`\\mathcal{L} = D_{KL}(\\text{stopgrad}(p_T) \\| p_S)`}
            </Equation>
            <Paragraph>
                Apply <code>stopgrad</code> (or <code>detach</code> in PyTorch) to teacher logits so gradients only update the student.
            </Paragraph>

            <Header4>Exponential Moving Average (EMA) Teachers</Header4>
            <Paragraph>
                Rather than using a static pretrained teacher, update the teacher as an EMA of the student:
            </Paragraph>
            <Equation block>
                {`\\theta_T^{(t+1)} = \\beta \\cdot \\theta_T^{(t)} + (1 - \\beta) \\cdot \\theta_S^{(t)}`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\beta \\in [0.99, 0.9999]`}</Equation>. Benefits:
            </Paragraph>
            <List>
                <ListItem>Teacher evolves with student, providing progressively harder targets.</ListItem>
                <ListItem>EMA smooths noise, providing more stable soft labels.</ListItem>
                <ListItem>Self-distillation effect: student learns from a smoothed version of itself.</ListItem>
            </List>
            <Paragraph>
                Used in: Mean Teacher (semi-supervised learning), BYOL, momentum distillation.
            </Paragraph>

            <Header4>Logit Smoothing and Clipping</Header4>
            <Paragraph>
                Extreme teacher logits can produce vanishing/exploding gradients when passed through softmax:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Logit Clipping:</strong> <Equation>{`z_{clipped} = \\text{clamp}(z, -c, c)`}</Equation> before softmax. Typical <Equation>{`c \\in [10, 50]`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Logit Normalization:</strong> Normalize logits to zero mean and unit variance before softmax.
                </ListItem>
            </List>

            <Header3>Gumbel-Softmax for Storage-Efficient Distillation</Header3>
            <Paragraph>
                Storing full teacher logits for large vocabularies (e.g., 100K+ tokens for LLMs) is prohibitively expensive. For each training example, you'd need to store a dense vector of <Equation>{`|V|`}</Equation> floats. <strong>Gumbel-Softmax</strong> provides a storage-efficient alternative by storing only sampled tokens while maintaining differentiability.
            </Paragraph>

            <Header4>The Storage Problem</Header4>
            <Paragraph>
                Consider distilling a 70B LLM with vocabulary size 128K:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Full logits:</strong> 128K × 4 bytes = 512KB per token position. For 1M training examples with 512 tokens each: ~250TB of logit storage.
                </ListItem>
                <ListItem>
                    <strong>Top-k logits:</strong> Store only top 100 logits + indices. Reduces to ~1KB per position, but loses tail distribution information.
                </ListItem>
                <ListItem>
                    <strong>Sampled tokens:</strong> Store only discrete samples. Just 2-4 bytes per position, but not differentiable.
                </ListItem>
            </List>

            <Header4>Gumbel-Softmax Trick</Header4>
            <Paragraph>
                The Gumbel-Softmax (or Concrete) distribution provides a differentiable approximation to categorical sampling:
            </Paragraph>
            <Equation block>
                {`y_i = \\frac{\\exp((\\log \\pi_i + g_i) / \\tau)}{\\sum_j \\exp((\\log \\pi_j + g_j) / \\tau)}`}
            </Equation>
            <Paragraph>
                where <Equation>{`g_i \\sim \\text{Gumbel}(0, 1)`}</Equation> (i.e., <Equation>{`g_i = -\\log(-\\log(u_i)), u_i \\sim \\text{Uniform}(0,1)`}</Equation>) and <Equation>{`\\tau`}</Equation> is the temperature.
            </Paragraph>
            <List>
                <ListItem>
                    <strong>As <Equation>{`\\tau \\to 0`}</Equation>:</strong> Approaches one-hot (hard) samples.
                </ListItem>
                <ListItem>
                    <strong>As <Equation>{`\\tau \\to \\infty`}</Equation>:</strong> Approaches uniform distribution.
                </ListItem>
                <ListItem>
                    <strong>Key property:</strong> Gradients flow through the sampling process via the reparameterization trick.
                </ListItem>
            </List>

            <Header4>Application to Distillation</Header4>
            <Paragraph>
                Instead of storing teacher's full logit distribution, store:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Gumbel noise seeds:</strong> Store the random seed used to generate <Equation>{`g_i`}</Equation>. Reproducible with ~8 bytes.
                </ListItem>
                <ListItem>
                    <strong>Teacher samples:</strong> Store the discrete token sampled from teacher. Just 2-4 bytes.
                </ListItem>
                <ListItem>
                    <strong>Optional top-k:</strong> Store top-k logits for important positions (e.g., high uncertainty).
                </ListItem>
            </List>
            <Paragraph>
                During training, reconstruct the soft distribution using Straight-Through Gumbel-Softmax:
            </Paragraph>
            <Equation block>
                {`\\hat{y} = \\text{onehot}(\\arg\\max_i y_i) + y_i - \\text{stopgrad}(y_i)`}
            </Equation>
            <Paragraph>
                Forward pass uses hard samples; backward pass uses soft gradients.
            </Paragraph>

            <Header4>Stochastic Soft Labels</Header4>
            <Paragraph>
                An alternative approach: instead of storing deterministic soft labels, store parameters of a distribution and sample during training:
            </Paragraph>
            <List>
                <ListItem>
                    Store teacher's top-1 prediction + entropy estimate.
                </ListItem>
                <ListItem>
                    Sample soft labels from a Dirichlet or mixture model parameterized by stored statistics.
                </ListItem>
                <ListItem>
                    Provides stochastic regularization effect similar to label smoothing.
                </ListItem>
            </List>

            <Callout type="tip" title="When to Use Gumbel-Softmax">
                <List>
                    <ListItem>Large vocabulary models (LLMs, machine translation) where logit storage is prohibitive.</ListItem>
                    <ListItem>Online distillation where you need differentiable discrete samples.</ListItem>
                    <ListItem>When you want to combine distillation with discrete latent variable models.</ListItem>
                </List>
            </Callout>

            <Header3>Regularization Interactions</Header3>
            <Paragraph>
                Regularization techniques interact with distillation in non-obvious ways:
            </Paragraph>

            <Header4>Dropout</Header4>
            <List>
                <ListItem>
                    <strong>During Teacher Inference:</strong> Usually disabled (deterministic outputs). But some methods enable dropout for uncertainty estimation.
                </ListItem>
                <ListItem>
                    <strong>During Student Training:</strong> Standard practice. Dropout provides additional regularization beyond distillation.
                </ListItem>
                <ListItem>
                    <strong>Dropout Rate:</strong> Distillation already regularizes; may want to reduce dropout rate compared to training from scratch.
                </ListItem>
            </List>

            <Header4>Weight Decay</Header4>
            <List>
                <ListItem>
                    <strong>Standard Weight Decay:</strong> Apply as usual. Soft labels don't change optimal weight decay behavior much.
                </ListItem>
                <ListItem>
                    <strong>Decoupled Weight Decay (AdamW):</strong> Recommended. Prevents weight decay from interacting poorly with adaptive learning rates.
                </ListItem>
            </List>

            <Header4>Data Augmentation</Header4>
            <List>
                <ListItem>
                    <strong>Augment then Distill:</strong> Apply augmentation to inputs; get teacher predictions on augmented inputs. Most common.
                </ListItem>
                <ListItem>
                    <strong>Consistency Regularization:</strong> Require student outputs to match teacher outputs on differently-augmented versions of the same input.
                </ListItem>
            </List>

            <Header3>Distillation During Fine-Tuning vs. Pretraining</Header3>
            <Paragraph>
                When to apply distillation in a model's lifecycle:
            </Paragraph>

            <div className="overflow-x-auto my-4">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Stage</th>
                            <th className="px-4 py-2 border-b">When to Use</th>
                            <th className="px-4 py-2 border-b">Considerations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Distillation during Pretraining</td>
                            <td className="px-4 py-2">Training student from scratch with teacher supervision</td>
                            <td className="px-4 py-2">High compute cost; produces general-purpose student; requires massive transfer data</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Distillation during Fine-Tuning</td>
                            <td className="px-4 py-2">Adapting pretrained student with teacher's task knowledge</td>
                            <td className="px-4 py-2">Lower cost; task-specific; can use smaller dataset</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Post-Training Distillation</td>
                            <td className="px-4 py-2">Student is already trained; distillation for alignment/refinement</td>
                            <td className="px-4 py-2">Quick iteration; may be limited by student's existing representations</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="Common Practice for LLMs">
                Most LLM distillation happens during <strong>fine-tuning</strong>: start with a pretrained small model (e.g., LLaMA-7B), fine-tune it on outputs from a larger model (e.g., GPT-4). This is cheaper than pretraining distillation and often sufficient for task-specific deployment.
            </Callout>
        </Section>
    );
};

export default OptimizationMechanics;
