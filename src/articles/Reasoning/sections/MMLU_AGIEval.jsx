import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';

export default function MMLU_AGIEval() {
    return (
        <Section title="MMLU and AGIEval" icon={BookOpen}>
            <div className="space-y-6">
                <p>
                    <strong>MMLU</strong> (Massive Multitask Language Understanding) and <strong>AGIEval</strong> are "exam-style" benchmarks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2">MMLU</h4>
                        <p className="text-sm text-slate-600 mb-2">
                            Tests <strong>broad world knowledge</strong> across 57 subjects (STEM, humanities, etc.).
                        </p>
                        <p className="text-sm text-slate-600">
                            <em>Limitation:</em> Primarily tests <strong>factual recall</strong> rather than multi-step reasoning. High scores correlate with pretraining breadth, not necessarily reasoning depth.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2">AGIEval</h4>
                        <p className="text-sm text-slate-600 mb-2">
                            Based on <strong>human standardized exams</strong> (SAT, LSAT, GRE, Gaokao).
                        </p>
                        <p className="text-sm text-slate-600">
                            <em>Strength:</em> Focuses on <strong>cognitive reasoning</strong> (deduction, reading comprehension) rather than just facts. CoT prompting yields significant gains here.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
