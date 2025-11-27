import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const MultiHeadAttention = () => {
    return (
        <Section title="Multi-Head & Cross Attention" icon={Layers}>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Multi-Head Attention</h3>
            <p className="mb-4">
                Allows the model to focus on different subspaces of representation simultaneously.
            </p>
            <EquationBlock><Equation>
                {`\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O`}
            </Equation></EquationBlock>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">Cross Attention</h3>
            <p className="mb-4">
                Allows the decoder to attend to the encoder's output. Queries come from the decoder, while Keys and Values come from the encoder.
            </p>
        </Section>
    );
};

export default MultiHeadAttention;
