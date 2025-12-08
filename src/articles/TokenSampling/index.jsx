import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Background from './sections/Background';
import Temperature from './sections/Temperature';
import GreedyDecoding from './sections/GreedyDecoding';
import ExhaustiveSearch from './sections/ExhaustiveSearch';
import BeamSearch from './sections/BeamSearch';
import ConstrainedBeamSearch from './sections/ConstrainedBeamSearch';
import TopK from './sections/TopK';
import TopP from './sections/TopP';
import GreedyVsTopKTopP from './sections/GreedyVsTopKTopP';
import MinP from './sections/MinP';
import References from './sections/References';

export const section = 'coalesced';

export default function TokenSampling() {
    return (
        <Article
            title="Token Sampling Methods"
            description="Generative LLMs understand text as tokens. Token sampling methods, or decoding strategies, control the randomness of output during inference, determining how the model selects the next token from the probability distribution."
        >
            <Overview />
            <Background />
            <Temperature />
            <GreedyDecoding />
            <ExhaustiveSearch />
            <BeamSearch />
            <ConstrainedBeamSearch />
            <TopK />
            <TopP />
            <GreedyVsTopKTopP />
            <MinP />
            <References />
        </Article>
    );
}
