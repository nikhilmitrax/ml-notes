import React from 'react';
import { AlertTriangle, Database, Zap, Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

const ChallengesInRL = () => {
    return (
        <Section title="Challenges in RL" icon={AlertTriangle}>
            <ul className="space-y-4">
                <li className="flex gap-3">
                    <Database className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                    <div>
                        <strong className="text-slate-900 dark:text-white">Sample Inefficiency</strong>
                        <Paragraph variant="small">
                            RL algorithms often need millions of samples to learn simple tasks. Deep RL methods like Experience Replay help but are still data-hungry.
                        </Paragraph>
                    </div>
                </li>
                <li className="flex gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                    <div>
                        <strong className="text-slate-900 dark:text-white">Sparse & Delayed Rewards</strong>
                        <Paragraph variant="small">
                            The agent might make 100 moves and only get a reward at the end (e.g., winning a game). Assigning credit to the correct earlier moves (Credit Assignment Problem) is difficult.
                        </Paragraph>
                    </div>
                </li>
                <li className="flex gap-3">
                    <Activity className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <div>
                        <strong className="text-slate-900 dark:text-white">Stability & Convergence</strong>
                        <Paragraph variant="small">
                            Unlike supervised learning, the data distribution changes as the agent learns (non-stationary), which can lead to unstable training and divergence.
                        </Paragraph>
                    </div>
                </li>
            </ul>
        </Section>
    );
};

export default ChallengesInRL;
