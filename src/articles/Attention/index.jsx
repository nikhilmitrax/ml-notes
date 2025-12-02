import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Origins from './sections/Origins';
import Seq2Seq from './sections/Seq2Seq';
import Seq2SeqWithAttention from './sections/Seq2SeqWithAttention';
import Extensions from './sections/Extensions';
import ScaledDotProductAttention from './sections/ScaledDotProductAttention';
import MultiHeadAttention from './sections/MultiHeadAttention';
import GhostAttention from './sections/GhostAttention';
import FrontierLLMs from './sections/FrontierLLMs';
import DeepSeekMLA from './sections/DeepSeekMLA';
import ComplexityAnalysis from './sections/ComplexityAnalysis';

import References from './sections/References';

export default function Attention() {
    return (
        <Article
            title="Attention Mechanism"
            description="The attention mechanism has revolutionized many Natural Language Processing (NLP) and Computer Vision (CV) tasks by addressing the limitations of traditional seq2seq models by alleviating the context vector bottleneck. Attention enables models to dynamically focus on relevant parts of the input sequence, enhancing their ability to handle long and complex sentences."
        >
            <Overview />
            <Origins />
            <Seq2Seq />
            <Seq2SeqWithAttention />
            <Extensions />
            <ScaledDotProductAttention />
            <MultiHeadAttention />
            <GhostAttention />
            <FrontierLLMs />
            <DeepSeekMLA />
            <ComplexityAnalysis />
            <References />
        </Article>
    );
}
