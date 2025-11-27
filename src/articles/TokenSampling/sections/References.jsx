import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const References = () => {
    return (
        <Section title="References" icon={BookOpen}>
            <List>
                <ListItem><a href="https://aman.ai" className="text-blue-600 hover:underline">Chadha, Aman. "Token Sampling Methods." Distilled AI (2020)</a></ListItem>
                <ListItem><a href="https://arxiv.org/abs/1503.02531" className="text-blue-600 hover:underline">Hinton, Geoffrey, Oriol Vinyals, and Jeff Dean. "Distilling the knowledge in a neural network." arXiv preprint arXiv:1503.02531 (2015)</a></ListItem>
                <ListItem><a href="https://cs.stackexchange.com/questions/79241/what-is-temperature-in-lstm-and-neural-networks-generally" className="text-blue-600 hover:underline">What is Temperature in LSTM (and neural networks generally)?</a></ListItem>
                <ListItem><a href="https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/slides/cs224n-2019-lecture08-nmt.pdf" className="text-blue-600 hover:underline">Stanford CS224n</a></ListItem>
                <ListItem><a href="https://towardsdatascience.com/foundations-of-nlp-explained-visually-beam-search-how-it-works-1586b9849a24" className="text-blue-600 hover:underline">Ketan Doshi's Foundations of NLP Explained Visually: Beam Search, How it Works</a></ListItem>
                <ListItem><a href="https://docs.cohere.ai/docs/controlling-generation-with-top-k-top-p" className="text-blue-600 hover:underline">Cohere Top k and Top p</a></ListItem>
                <ListItem><a href="https://huggingface.co/blog/constrained-beam-search" className="text-blue-600 hover:underline">HuggingFace: Constrained Beam Search</a></ListItem>
            </List>
        </Section>
    );
};

export default References;
