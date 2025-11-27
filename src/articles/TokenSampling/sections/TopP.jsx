import React from 'react';
import { Filter } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import { SamplingVisualizer } from './TopK'; // Reusing the visualizer
import Header3 from '../../../components/Header3';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Quote from '../../../components/Quote';

const TopP = () => {
    return (
        <Section title="Top-p (nucleus sampling)" icon={Filter}>
            <List>
                <ListItem>The difficulty of selecting the best value of <Equation>{`k`}</Equation> in case of top-<Equation>{`k`}</Equation> sampling opens the door for a popular decoding strategy that dynamically sets the size of the shortlist of tokens. This method, called top-<Equation>{`p`}</Equation> or nucleus sampling, shortlists the top tokens whose sum of likelihoods, i.e., cumulative probability, does not exceed a certain threshold <Equation>{`p`}</Equation>, and then choose one of them randomly based on their probabilities.</ListItem>
            </List>

            <InteractiveCard title="Interactive Sampling Visualization (Top-p)">
                <SamplingVisualizer defaultMethod="top-p" />
            </InteractiveCard>

            <List>
                <ListItem>Put simply, nucleus sampling, which has a hyperparameter top-<Equation>{`p`}</Equation>, chooses from the smallest possible set of tokens whose summed probability (i.e., probability mass) exceeds top-<Equation>{`p`}</Equation> during decoding. Given this set of tokens, we re-normalize the probability distribution based on each token's respective probability and then sample. Re-normalization involves adjusting these probabilities so they sum up to 1. This adjustment is necessary because the original probabilities were part of a larger set. After re-normalization, a new probability distribution is formed exclusively from this smaller, selected set of tokens, ensuring a fair sampling process within this subset. This is different from top-<Equation>{`k`}</Equation>, which just samples from the <Equation>{`k`}</Equation> tokens with the highest probability.</ListItem>
            </List>
            <Quote>
                Similar to top-<Equation>{`k`}</Equation> sampling, the choice between uniform and proportional selection in top-<Equation>{`k`}</Equation> sampling depends on the desired balance between diversity and coherence in the generated text. Uniform sampling promotes diversity by giving equal chance to all top <Equation>{`k`}</Equation> tokens, while proportional sampling favors coherence and contextual relevance by weighting tokens according to their probabilities. The specific application and user preference ultimately dictate the most suitable approach.
            </Quote>
            <List>
                <ListItem>In terms of practical usage, nucleus sampling can be controlled by setting the top-<Equation>{`p`}</Equation> parameter in most language model APIs.</ListItem>
            </List>

            <Header3>How is nucleus sampling useful?</Header3>
            <List>
                <ListItem>Top-<Equation>{`p`}</Equation> is more suitable for tasks that require more fine-grained control over the diversity and fluency of the output, such as language modeling and text summarization. However, in reality, <Equation>{`p`}</Equation> is actually set a lot higher (about 75%) to limit the long tail of low probability tokens that may have been sampled.</ListItem>
                <ListItem>Furthermore, consider a case where a single token has a very high probability (i.e., larger than top-<Equation>{`p`}</Equation>). In this case, nucleus sampling will always sample this token. Alternatively, assigning more uniform probability across tokens may cause a larger number of tokens to be considered during decoding. Put simply, nucleus sampling can dynamically adjust the number of tokens that are considered during decoding based on their probabilities.</ListItem>
                <ListItem>Additionally top-<Equation>{`k`}</Equation> and top-<Equation>{`p`}</Equation> can work simultaneously, but <Equation>{`p`}</Equation> will always come after <Equation>{`k`}</Equation>.</ListItem>
            </List>

            <Header3>Nucleus sampling v/s Temperature</Header3>
            <List>
                <ListItem>Based on OpenAI's GPT-3 API below, we should only use either nucleus sampling or temperature and that these parameters cannot be used in tandem. Put simply, these are different and disjoint methods of controlling the randomness of a language model's output.</ListItem>
            </List>
            <img src="/assets/TokenSampling/API.jpg" alt="API" className="w-full rounded-lg my-4 border border-slate-200" />
        </Section>
    );
};

export default TopP;
