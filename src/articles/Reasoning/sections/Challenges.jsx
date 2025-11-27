import React from 'react';
import { Flag } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

export default function Challenges() {
    return (
        <Section title="Open Challenges and Future Directions" icon={Flag}>
            <div className="space-y-6">
                <p>
                    Despite progress, core problems remain:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Data Contamination:</strong> Benchmarks may leak into training data. Robust evaluation requires deduplication and smooth metrics (log-prob, Brier score).</li>
                    <li><strong>Process Fidelity:</strong> We lack scalable ways to label intermediate steps. Process supervision (PRMs) is promising but expensive.</li>
                    <li><strong>Stable Credit Assignment:</strong> In long reasoning chains, RL signals become sparse.</li>
                    <li><strong>Interface Pathologies:</strong> Models may "overthink," entering infinite loops or degrading with too much search budget.</li>
                </ul>
            </div>
        </Section>
    );
}
