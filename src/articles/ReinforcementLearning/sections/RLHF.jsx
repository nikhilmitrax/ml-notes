import React from 'react';
import { Target } from 'lucide-react';
import Section from '../../../components/Section';

const RLHF = () => {
    return (
        <Section title="RLHF: RL for LLMs" icon={Target}>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                <strong>Reinforcement Learning from Human Feedback (RLHF)</strong> is crucial for modern LLMs (like GPT-4, Gemini).
            </p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">The Process</h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li><strong>SFT</strong>: Supervised Fine-Tuning on high-quality instruction data.</li>
                    <li><strong>Reward Modeling</strong>: Train a model to predict human preference (ranking responses).</li>
                    <li><strong>RL Optimization</strong>: Use PPO (Proximal Policy Optimization) to fine-tune the LLM to maximize the reward score while staying close to the original model.</li>
                </ol>
            </div>
        </Section>
    );
};

export default RLHF;
