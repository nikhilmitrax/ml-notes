import React from 'react';
import { Database } from 'lucide-react';
import Section from '../../../components/Section';

export default function References() {
    return (
        <Section title="References" icon={Database}>
            <div className="space-y-4 text-sm text-slate-600">
                <p><strong>Key Papers:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Wei et al. (2022). <em>Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</em>.</li>
                    <li>Wang et al. (2022). <em>Self-Consistency Improves Chain-of-Thought Reasoning</em>.</li>
                    <li>Yao et al. (2022). <em>ReAct: Synergizing Reasoning and Acting in Language Models</em>.</li>
                    <li>Guo et al. (2025). <em>DeepSeek-R1: Encouraging Reasoning in LLMs via Reinforcement Learning</em>.</li>
                    <li>Lightman et al. (2023). <em>Let's Verify Step by Step</em>.</li>
                </ul>
            </div>
        </Section>
    );
}
