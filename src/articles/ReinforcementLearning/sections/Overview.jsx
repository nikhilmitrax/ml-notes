import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

const Overview = () => {
    return (
        <Section title="Overview" icon={Brain}>
            <Paragraph>
                Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment.
                Unlike supervised learning, where a model learns from a fixed dataset of labeled examples, RL focuses on learning from the consequences of actions.
            </Paragraph>
            <Paragraph className="mt-4">
                The agent seeks to maximize <strong>cumulative rewards</strong> by exploring different actions and learning which ones yield the best outcomes over time.
            </Paragraph>
        </Section>
    );
};

export default Overview;
