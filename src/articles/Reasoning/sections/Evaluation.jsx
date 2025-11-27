import React from 'react';
import { Target } from 'lucide-react';
import Section from '../../../components/Section';

export default function Evaluation() {
    return (
        <Section title="Evaluation of reasoning using datasets" icon={Target}>
            <div className="space-y-6">
                <p>
                    Evaluating reasoning is fundamentally harder than evaluating knowledge. A model can answer "What is the capital of France?" by rote memorization, but answering "If Paris were in Italy, would it be north of Rome?" requires manipulating geographical concepts.
                </p>
                <p>
                    We categorize reasoning benchmarks into tiers based on the <strong>depth of reasoning</strong> required:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Tier 1: Arithmetic & Simple Logic</strong> (GSM8K, SVAMP) — Single-step or short-chain deduction.</li>
                    <li><strong>Tier 2: Complex Symbolic Reasoning</strong> (MATH, Theorem Proving) — Multi-step manipulation of abstract symbols.</li>
                    <li><strong>Tier 3: Planning & Algorithmic Reasoning</strong> (ARC, Code Generation) — Inductive generalization and search.</li>
                    <li><strong>Tier 4: Generalist Reasoning</strong> (BigBench Hard, MMLU) — Broad, multi-domain inference.</li>
                </ul>
            </div>
        </Section>
    );
}
