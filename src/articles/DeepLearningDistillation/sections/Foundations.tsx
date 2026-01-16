import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const Foundations = () => {
    return (
        <Section title="Foundations" icon={Brain}>
            <Header3>Teacher–Student Setup</Header3>
            <Paragraph>
                The core insight of knowledge distillation is that a teacher model's <strong>soft probability outputs</strong> contain richer information than hard labels alone. When a teacher classifies an image of a dog, it doesn't just output "dog"—it outputs a probability distribution that might assign 0.7 to "dog", 0.15 to "wolf", 0.05 to "cat", and small probabilities to many other classes. These "dark knowledge" signals encode structural relationships between classes that pure one-hot labels cannot capture.
            </Paragraph>
            <Paragraph>
                Formally, given a teacher model <Equation>{`T`}</Equation> with parameters <Equation>{`\\theta_T`}</Equation> and a student model <Equation>{`S`}</Equation> with parameters <Equation>{`\\theta_S`}</Equation>, the student learns by minimizing the divergence between its outputs and the teacher's outputs on a transfer dataset <Equation>{`\\mathcal{D}`}</Equation>.
            </Paragraph>

            <Header3>Temperature Scaling and Softened Softmax</Header3>
            <Paragraph>
                Raw logits from confident teachers are often near one-hot, providing little signal about inter-class relationships. <strong>Temperature scaling</strong> softens these distributions to expose more structure:
            </Paragraph>
            <Equation block>
                {`p_i^{(T)} = \\frac{\\exp(z_i / \\tau)}{\\sum_j \\exp(z_j / \\tau)}`}
            </Equation>
            <Paragraph>
                where <Equation>{`z_i`}</Equation> are the logits and <Equation>{`\\tau`}</Equation> is the temperature. Key properties:
            </Paragraph>
            <List>
                <ListItem>
                    <strong><Equation>{`\\tau = 1`}</Equation>:</strong> Standard softmax. High-confidence predictions are near one-hot.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\tau > 1`}</Equation>:</strong> Softer distribution. Reveals relative similarities between classes. Typical values: 2–20.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\tau \\to \\infty`}</Equation>:</strong> Approaches uniform distribution. All information lost.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\tau \\to 0`}</Equation>:</strong> Approaches hard argmax (one-hot).
                </ListItem>
            </List>
            <Callout type="tip" title="Hinton's Original Insight">
                Higher temperature exposes the "dark knowledge" that makes distillation work. A teacher might output near-zero probability for "cat" vs "car" when classifying a dog, but at <Equation>{`\\tau = 20`}</Equation>, the difference becomes visible—"cat" gets higher probability because it's more similar to "dog" than "car" is.
            </Callout>

            <Header3>Loss Functions for Distillation</Header3>

            <Header4>KL Divergence on Soft Labels</Header4>
            <Paragraph>
                The standard distillation loss minimizes KL divergence between teacher and student soft distributions:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{KD} = \\tau^2 \\cdot D_{KL}(p^T \\| p^S) = \\tau^2 \\sum_i p_i^T \\log \\frac{p_i^T}{p_i^S}`}
            </Equation>
            <Paragraph>
                The <Equation>{`\\tau^2`}</Equation> factor compensates for the gradient magnitude change from temperature scaling. Without it, higher temperatures would reduce gradient magnitudes, slowing learning.
            </Paragraph>

            <Header4>Mixing Soft and Hard Labels (α/β Weighting)</Header4>
            <Paragraph>
                Pure soft-label training can overfit to teacher errors. The standard approach combines distillation loss with cross-entropy on ground-truth labels:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{total} = \\alpha \\cdot \\mathcal{L}_{KD}(p^T, p^S; \\tau) + (1 - \\alpha) \\cdot \\mathcal{L}_{CE}(y, p^S)`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\alpha \\in [0, 1]`}</Equation> balances the two objectives. Common settings:
            </Paragraph>
            <List>
                <ListItem>
                    <strong><Equation>{`\\alpha = 0.9`}</Equation>:</strong> Heavy reliance on teacher. Good when teacher is much larger/better.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\alpha = 0.5`}</Equation>:</strong> Balanced. Good default when uncertain.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\alpha = 0.1`}</Equation>:</strong> Primarily hard labels with soft regularization. When teacher may have errors.
                </ListItem>
            </List>
            <Callout type="info" title="Alternative Formulation">
                Some papers use separate weights <Equation>{`\\alpha`}</Equation> and <Equation>{`\\beta`}</Equation> without the <Equation>{`(1-\\alpha)`}</Equation> constraint, or incorporate label smoothing as a third component.
            </Callout>

            <Header3>Forward KL vs Reverse KL Divergence</Header3>
            <Paragraph>
                The choice of divergence direction fundamentally affects distillation behavior:
            </Paragraph>

            <Header4>Forward KL (Standard): <Equation>{`D_{KL}(P_T \\| P_S)`}</Equation></Header4>
            <Equation block>
                {`D_{KL}(P_T \\| P_S) = \\sum_{x} P_T(x) \\log \\frac{P_T(x)}{P_S(x)}`}
            </Equation>
            <List>
                <ListItem>
                    <strong>Mass-Covering:</strong> Forces student to cover all teacher modes. Penalty is high if <Equation>{`P_T(x) > 0`}</Equation> but <Equation>{`P_S(x) \\to 0`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Good for:</strong> Classification where all classes matter. Captures "dark knowledge" about class similarities.
                </ListItem>
                <ListItem>
                    <strong>Failure mode:</strong> In generative tasks, leads to blurry outputs (averaging over modes) or generic text.
                </ListItem>
            </List>

            <Header4>Reverse KL (Generative): <Equation>{`D_{KL}(P_S \\| P_T)`}</Equation></Header4>
            <Equation block>
                {`D_{KL}(P_S \\| P_T) = \\sum_{x} P_S(x) \\log \\frac{P_S(x)}{P_T(x)}`}
            </Equation>
            <List>
                <ListItem>
                    <strong>Mode-Seeking:</strong> Student can ignore some teacher modes. Penalty is high only if <Equation>{`P_S(x) > 0`}</Equation> but <Equation>{`P_T(x) \\approx 0`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Good for:</strong> Generative models where sharp, high-quality samples matter more than coverage.
                </ListItem>
                <ListItem>
                    <strong>Used by:</strong> MiniLLM, distribution matching distillation for diffusion models.
                </ListItem>
            </List>

            <Header3>Calibration and Uncertainty</Header3>
            <Paragraph>
                A key consideration in distillation is how <strong>calibration</strong>—the alignment between predicted confidence and actual correctness—transfers from teacher to student.
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Overconfident Teachers:</strong> Large models trained with cross-entropy often become overconfident (high confidence even on incorrect predictions). Distilling from such teachers can propagate this miscalibration to students.
                </ListItem>
                <ListItem>
                    <strong>Temperature as Regularization:</strong> Higher distillation temperatures naturally soften overconfident predictions, acting as implicit calibration.
                </ListItem>
                <ListItem>
                    <strong>Entropy Considerations:</strong> Monitoring the entropy of teacher outputs helps diagnose calibration issues. Very low entropy (near one-hot) suggests the teacher may be overconfident.
                </ListItem>
            </List>
            <Callout type="warning" title="Calibration Degradation">
                Students can become <em>worse</em> calibrated than teachers if the capacity mismatch is large. The student may learn the teacher's confident predictions without the underlying reasoning that justifies them. Always measure ECE (Expected Calibration Error) after distillation.
            </Callout>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Issue</th>
                            <th className="px-4 py-2 border-b">Symptom</th>
                            <th className="px-4 py-2 border-b">Mitigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Overconfident teacher</td>
                            <td className="px-4 py-2">Soft labels near one-hot even at <Equation>{`\\tau > 1`}</Equation></td>
                            <td className="px-4 py-2">Increase <Equation>{`\\tau`}</Equation>, use label smoothing on teacher</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">High entropy teacher</td>
                            <td className="px-4 py-2">Near-uniform distributions, weak signal</td>
                            <td className="px-4 py-2">Lower <Equation>{`\\tau`}</Equation>, increase hard label weight</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Student undercapacity</td>
                            <td className="px-4 py-2">High loss, poor accuracy</td>
                            <td className="px-4 py-2">Progressive distillation, increase student size</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Calibration drift</td>
                            <td className="px-4 py-2">High ECE despite good accuracy</td>
                            <td className="px-4 py-2">Post-hoc temperature scaling, focal loss</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default Foundations;
