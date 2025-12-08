import React from 'react';
import { CheckCircle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

export default function Blueprints() {
    return (
        <Section title="Bringing it Together: Blueprints" icon={CheckCircle}>
            <div className="space-y-6">
                <Paragraph>
                    How to build a reasoning system today?
                </Paragraph>
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Header4 className="font-semibold text-slate-900 mb-2 mt-0">Small Budget (Days)</Header4>
                        <Paragraph variant="small" className="mb-0">
                            Use <strong>ReAct</strong> + <strong>PAL</strong> (code execution). Sample <Equation>K=5</Equation> chains and use majority vote. No training required.
                        </Paragraph>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Header4 className="font-semibold text-slate-900 mb-2 mt-0">Medium Budget (Weeks)</Header4>
                        <Paragraph variant="small" className="mb-0">
                            Train a <strong>Process Reward Model (PRM)</strong> on step-level labels. Use it to guide decoding (best-of-N).
                        </Paragraph>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Header4 className="font-semibold text-slate-900 mb-2 mt-0">Large Budget (Months)</Header4>
                        <Paragraph variant="small" className="mb-0">
                            Full <strong>RL pipeline</strong> (DeepSeek-R1 style). Cold start with CoT data, then run PPO/GRPO with outcome + process rewards.
                        </Paragraph>
                    </div>
                </div>
            </div>
        </Section>
    );
}
