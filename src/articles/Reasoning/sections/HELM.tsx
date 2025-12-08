import React from 'react';
import { Compass } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

export default function HELM() {
    return (
        <Section title="HELM: Holistic Evaluation" icon={Compass}>
            <div className="space-y-6">
                <Paragraph>
                    The <strong>Holistic Evaluation of Language Models (HELM)</strong> (<a href="https://arxiv.org/abs/2211.09110" className="text-blue-600 hover:underline">Liang et al., 2022</a>) argues that single-number accuracy is insufficient. It evaluates reasoning as a multi-dimensional trade-off:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Accuracy:</strong> Correctness of the output.</li>
                    <li><strong>Calibration:</strong> Does confidence match correctness? (Crucial for reliable reasoning).</li>
                    <li><strong>Robustness:</strong> Stability under paraphrasing.</li>
                    <li><strong>Fairness, Efficiency, Transparency.</strong></li>
                </ul>
                <Paragraph>
                    HELM reveals that some models may be accurate but poorly calibrated (overconfident hallucinations), while others are less accurate but more self-aware.
                </Paragraph>
            </div>
        </Section>
    );
}
