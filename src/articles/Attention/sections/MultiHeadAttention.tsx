import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const MultiHeadAttention = () => {
    return (
        <Section title="Multi-Head & Cross Attention" icon={Layers}>
            <Header3 className="text-lg font-semibold text-slate-800 mb-2">Multi-Head Attention</Header3>
            <Paragraph className="mb-4">
                Allows the model to focus on different subspaces of representation simultaneously.
            </Paragraph>
            <Equation block>
                {`\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O`}
            </Equation>

            <Header3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">Cross Attention</Header3>
            <Paragraph className="mb-4">
                Allows the decoder to attend to the encoder's output. Queries come from the decoder, while Keys and Values come from the encoder.
            </Paragraph>
        </Section>
    );
};

export default MultiHeadAttention;
