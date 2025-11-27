import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';

const Overview = () => {
    return (
        <Section title="Overview" icon={Brain}>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment.
                Unlike supervised learning, where a model learns from a fixed dataset of labeled examples, RL focuses on learning from the consequences of actions.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                The agent seeks to maximize <strong>cumulative rewards</strong> by exploring different actions and learning which ones yield the best outcomes over time.
            </p>
        </Section>
    );
};

export default Overview;
