import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Paragraph from '../../../components/Paragraph';

export default function FailureAnalysis() {
    return (
        <Section title="Failure Analysis" icon={AlertTriangle}>
            <div className="space-y-6">
                <Paragraph>
                    When reasoning fails, diagnose the root cause:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Premise Error:</strong> The model hallucinated a fact. <em>Fix:</em> Add RAG + Citations.</li>
                    <li><strong>Computation Slip:</strong> Arithmetic error. <em>Fix:</em> Use Python tool (PAL).</li>
                    <li><strong>Unfaithful CoT:</strong> The reasoning doesn't match the answer. <em>Fix:</em> Test by editing the rationale (counterfactuals).</li>
                    <li><strong>Instability:</strong> Answer flips with prompt phrasing. <em>Fix:</em> Increase sampling <Equation>K</Equation> or use a verifier.</li>
                </ul>
            </div>
        </Section>
    );
}
