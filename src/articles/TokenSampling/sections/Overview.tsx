import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const Overview = () => {
    return (
        <Section title="Overview" icon={BookOpen}>
            <List>
                <ListItem>Generative Large Language Models (LLMs) understand input and output text as strings of "tokens," which can be words but also punctuation marks and parts of words.</ListItem>
                <ListItem>LLM have some token selection parameters which control the randomness of output during inference or runtime. The method of selecting output tokens (specifically called token sampling methods or decoding strategies) is a key concept in text generation with language models.</ListItem>
                <ListItem>At its core, the technical underpinnings of token sampling involve constantly generating a mathematical function called a probability distribution to decide the next token (e.g. word) to output, taking into account all previously outputted tokens. Put simply, for generating text, LLMs perform sampling which involves randomly picking the next word according to its conditional probability distribution.</ListItem>
                <ListItem>In the case of OpenAI-hosted systems like ChatGPT, after the distribution is generated, OpenAI's server does the job of sampling tokens according to the distribution. There's some randomness in this selection; that's why the same text prompt can yield a different response.</ListItem>
                <ListItem>In this primer, we will talk about different token sampling methods and related concepts such as Temperature, Greedy Decoding, Exhaustive Search Decoding, Beam Search, top-<Equation>k</Equation>, top-<Equation>p</Equation>, and min-<Equation>p</Equation>.</ListItem>
            </List>
        </Section>
    );
};

export default Overview;
