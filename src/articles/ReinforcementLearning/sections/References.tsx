import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const References = () => {
    return (
        <Section title="References" icon={BookOpen}>
            <List>
                <ListItem>
                    <a href="https://towardsdatascience.com/monte-carlo-tree-search-in-reinforcement-learning-b97d3e743d0f" className="text-blue-600 hover:underline">Monte Carlo Tree Search in Reinforcement Learning</a>
                </ListItem>
                <ListItem>
                    <a href="https://huggingface.co/learn/deep-rl-course/unit0/introduction?fw=pt" className="text-blue-600 hover:underline">🤗 Deep Reinforcement Learning Course</a>
                </ListItem>
                <ListItem>
                    <a href="https://allam.vercel.app/post/dpo/" className="text-blue-600 hover:underline">Unveiling the Hidden Reward System in Language Models: A Dive into DPO</a>
                </ListItem>
                <ListItem>
                    <a href="https://aman.ai" className="text-blue-600 hover:underline">Chadha, Aman. "Reinforcement Learning." Distilled AI (2020)</a>
                </ListItem>
            </List>
        </Section>
    );
};

export default References;
