import React from 'react';
import { FileText } from 'lucide-react';
import Section from '../../../components/Section';

export default function Citation() {
    return (
        <Section title="Citation" icon={FileText}>
            <div className="bg-slate-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`@article{Chadha2020DistilledReasoningInLLMs,
  title   = {Reasoning in LLMs},
  author  = {Chadha, Aman and Jain, Vinija},
  journal = {Distilled AI},
  year    = {2020},
  note    = {\\url{https://aman.ai}}
}`}</pre>
            </div>
        </Section>
    );
}
