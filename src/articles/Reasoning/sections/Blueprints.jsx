import React from 'react';
import { CheckCircle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

export default function Blueprints() {
    return (
        <Section title="Bringing it Together: Blueprints" icon={CheckCircle}>
            <div className="space-y-6">
                <p>
                    How to build a reasoning system today?
                </p>
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2">Small Budget (Days)</h4>
                        <p className="text-sm text-slate-600">
                            Use <strong>ReAct</strong> + <strong>PAL</strong> (code execution). Sample <Equation>K=5</Equation> chains and use majority vote. No training required.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2">Medium Budget (Weeks)</h4>
                        <p className="text-sm text-slate-600">
                            Train a <strong>Process Reward Model (PRM)</strong> on step-level labels. Use it to guide decoding (best-of-N).
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2">Large Budget (Months)</h4>
                        <p className="text-sm text-slate-600">
                            Full <strong>RL pipeline</strong> (DeepSeek-R1 style). Cold start with CoT data, then run PPO/GRPO with outcome + process rewards.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
