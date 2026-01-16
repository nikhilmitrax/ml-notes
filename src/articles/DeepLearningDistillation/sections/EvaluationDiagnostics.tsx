import React from 'react';
import { Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const EvaluationDiagnostics = () => {
    return (
        <Section title="Evaluation & Diagnostics" icon={Activity}>
            <Header3>What to Measure</Header3>
            <Paragraph>
                A comprehensive evaluation of distilled models goes beyond task accuracy:
            </Paragraph>

            <Header4>Task Performance</Header4>
            <List>
                <ListItem>
                    <strong>Classification:</strong> Accuracy, F1, AUROC. Compare student vs. teacher on held-out test set.
                </ListItem>
                <ListItem>
                    <strong>Language Modeling:</strong> Perplexity on held-out data. Lower is better.
                </ListItem>
                <ListItem>
                    <strong>Generation:</strong> Task-specific metrics (BLEU, ROUGE, BERTScore for text; FID, IS for images).
                </ListItem>
            </List>

            <Header4>Calibration</Header4>
            <Paragraph>
                Expected Calibration Error (ECE) measures confidence-accuracy alignment:
            </Paragraph>
            <Equation block>
                {`ECE = \\sum_{m=1}^{M} \\frac{|B_m|}{n} |\\text{acc}(B_m) - \\text{conf}(B_m)|`}
            </Equation>
            <Paragraph>
                where <Equation>{`B_m`}</Equation> are bins of predictions grouped by confidence. Reliability diagrams visualize this.
            </Paragraph>

            <Header4>Robustness</Header4>
            <List>
                <ListItem>
                    <strong>Distribution Shift:</strong> Test on OOD benchmarks (ImageNet-C, WILDS for images; domain-shifted NLP sets).
                </ListItem>
                <ListItem>
                    <strong>Adversarial:</strong> PGD attack accuracy. Does the student inherit teacher robustness?
                </ListItem>
                <ListItem>
                    <strong>Spurious Correlations:</strong> Test on challenge sets designed to expose shortcut learning.
                </ListItem>
            </List>

            <Header4>Efficiency Metrics</Header4>
            <List>
                <ListItem>
                    <strong>Latency:</strong> Time per sample at target batch size and hardware.
                </ListItem>
                <ListItem>
                    <strong>Throughput:</strong> Samples per second at saturation.
                </ListItem>
                <ListItem>
                    <strong>Memory:</strong> Peak GPU memory during inference.
                </ListItem>
                <ListItem>
                    <strong>Model Size:</strong> Parameters and disk footprint.
                </ListItem>
            </List>

            <Header3>When Distillation Fails</Header3>
            <Paragraph>
                Understanding failure modes helps diagnose and fix poor distillation outcomes:
            </Paragraph>

            <Header4>Teacher Errors and Overfitting</Header4>
            <List>
                <ListItem>
                    <strong>Symptom:</strong> Student mimics teacher's systematic errors. Performs well on training distribution, poorly elsewhere.
                </ListItem>
                <ListItem>
                    <strong>Cause:</strong> Teacher is overfit to training data. Soft labels encode spurious patterns.
                </ListItem>
                <ListItem>
                    <strong>Fix:</strong> Increase hard label weight (<Equation>{`\\alpha`}</Equation>). Use ensemble of teachers. Regularize teacher before distillation.
                </ListItem>
            </List>

            <Header4>Student Undercapacity</Header4>
            <List>
                <ListItem>
                    <strong>Symptom:</strong> High distillation loss that doesn't decrease. Student outputs are generic/averaged.
                </ListItem>
                <ListItem>
                    <strong>Cause:</strong> Student lacks capacity to represent teacher's knowledge.
                </ListItem>
                <ListItem>
                    <strong>Fix:</strong> Increase student size. Use progressive distillation with intermediate teachers. Reduce task complexity (focus on subset).
                </ListItem>
            </List>

            <Header4>Architecture Mismatch</Header4>
            <List>
                <ListItem>
                    <strong>Symptom:</strong> Feature distillation fails; student representations don't converge to teacher's.
                </ListItem>
                <ListItem>
                    <strong>Cause:</strong> Fundamentally different inductive biases (CNN vs. Transformer). Layer alignment is arbitrary.
                </ListItem>
                <ListItem>
                    <strong>Fix:</strong> Use logit-only distillation. Add projection heads with sufficient capacity. Focus on relation distillation.
                </ListItem>
            </List>

            <Header4>Noisy or Biased Soft Labels</Header4>
            <List>
                <ListItem>
                    <strong>Symptom:</strong> Student learns teacher biases. Unexpected failures on specific subgroups.
                </ListItem>
                <ListItem>
                    <strong>Cause:</strong> Teacher has biased predictions. Transfer data is not representative.
                </ListItem>
                <ListItem>
                    <strong>Fix:</strong> Audit teacher on diverse test sets. Balance transfer data. Debias teacher first.
                </ListItem>
            </List>

            <Callout type="warning" title="Silent Failures">
                Distillation often "works" (loss decreases, accuracy preserved) while silently degrading calibration, robustness, or fairness. Always evaluate beyond accuracy.
            </Callout>

            <Header3>Standard Ablations</Header3>
            <Paragraph>
                When reporting distillation results, include ablations over:
            </Paragraph>

            <Header4>Temperature <Equation>{`(\\tau)`}</Equation></Header4>
            <Paragraph>
                Test <Equation>{`\\tau \\in \\{1, 2, 4, 8, 16, 20\\}`}</Equation>. Plot accuracy vs. temperature. Optimal <Equation>{`\\tau`}</Equation> is task and teacher-dependent.
            </Paragraph>

            <Header4>Loss Weight <Equation>{`(\\alpha)`}</Equation></Header4>
            <Paragraph>
                Test <Equation>{`\\alpha \\in \\{0.1, 0.3, 0.5, 0.7, 0.9, 1.0\\}`}</Equation>. Higher <Equation>{`\\alpha`}</Equation> emphasizes teacher; lower emphasizes ground truth.
            </Paragraph>

            <Header4>Which Layers (Feature Distillation)</Header4>
            <Paragraph>
                Compare: output only, last block, every N-th layer, all layers. More layers = more signal but more alignment complexity.
            </Paragraph>

            <Header4>Data Source</Header4>
            <Paragraph>
                Compare: original training data, held-out data, out-of-domain data, synthetic data. Soft labels on diverse data often help generalization.
            </Paragraph>

            <Header4>Teacher Quality</Header4>
            <Paragraph>
                Compare teachers of different sizes/quality. Larger teachers generally help, but there's a point of diminishing returns where teacher-student gap is too large.
            </Paragraph>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Ablation</th>
                            <th className="px-4 py-2 border-b">Typical Range</th>
                            <th className="px-4 py-2 border-b">Expected Finding</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Temperature</td>
                            <td className="px-4 py-2">1–20</td>
                            <td className="px-4 py-2">Optimal around 4–8 for classification</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">α (KD weight)</td>
                            <td className="px-4 py-2">0.1–1.0</td>
                            <td className="px-4 py-2">0.7–0.9 often best with good teacher</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Matched layers</td>
                            <td className="px-4 py-2">1 to all</td>
                            <td className="px-4 py-2">Final blocks most important</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Data diversity</td>
                            <td className="px-4 py-2">In-domain to OOD</td>
                            <td className="px-4 py-2">20-30% OOD improves generalization</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Teacher size</td>
                            <td className="px-4 py-2">2× to 100× student</td>
                            <td className="px-4 py-2">Diminishing returns past 10× gap</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default EvaluationDiagnostics;
