import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

const DeepRL = () => {
    return (
        <Section title="Deep Reinforcement Learning" icon={Brain}>
            <Paragraph>
                Deep RL combines RL with Deep Learning. Instead of a table to store values (Tabular RL), we use Neural Networks to approximate functions.
            </Paragraph>
            <ul className="list-disc list-inside mt-4 space-y-2 text-slate-700 dark:text-slate-300 ml-4">
                <li><strong>DQN (Deep Q-Network)</strong>: Uses a CNN to estimate Q-values from raw pixels (e.g., playing Atari games). Uses Experience Replay to stabilize training.</li>
                <li><strong>PPO (Proximal Policy Optimization)</strong>: A policy gradient method that constrains updates to prevent drastic policy changes, ensuring stability.</li>
                <li><strong>AlphaGo</strong>: Combined MCTS (Monte Carlo Tree Search) with Deep RL to defeat the world champion in Go.</li>
            </ul>
        </Section>
    );
};

export default DeepRL;
