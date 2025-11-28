import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

export default function MMLU_AGIEval() {
    return (
        <Section title="MMLU and AGIEval" icon={BookOpen}>
            <div className="space-y-6">
                <Paragraph>
                    <strong>MMLU</strong> (Massive Multitask Language Understanding) and <strong>AGIEval</strong> are "exam-style" benchmarks.
                </Paragraph>
                <SideBySide className="mt-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Header4 className="font-semibold text-slate-900 mb-2 mt-0">MMLU</Header4>
                        <Paragraph variant="small" className="mb-2">
                            Tests <strong>broad world knowledge</strong> across 57 subjects (STEM, humanities, etc.).
                        </Paragraph>
                        <Paragraph variant="small" className="mb-0">
                            <em>Limitation:</em> Primarily tests <strong>factual recall</strong> rather than multi-step reasoning. High scores correlate with pretraining breadth, not necessarily reasoning depth.
                        </Paragraph>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Header4 className="font-semibold text-slate-900 mb-2 mt-0">AGIEval</Header4>
                        <Paragraph variant="small" className="mb-2">
                            Based on <strong>human standardized exams</strong> (SAT, LSAT, GRE, Gaokao).
                        </Paragraph>
                        <Paragraph variant="small" className="mb-0">
                            <em>Strength:</em> Focuses on <strong>cognitive reasoning</strong> (deduction, reading comprehension) rather than just facts. CoT prompting yields significant gains here.
                        </Paragraph>
                    </div>
                </SideBySide>
            </div>
        </Section>
    );
}
