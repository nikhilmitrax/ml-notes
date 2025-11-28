import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const Seq2SeqWithAttention = () => {
    return (
        <Section title="Sequence-to-Sequence Model with Attention" icon={Zap}>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The fixed-size context vector bottleneck was the main motivation for Bahdanau et al. (2015). They proposed an architecture where the <strong>encoder</strong> is a bidirectional RNN (forward and backward hidden states), and the <strong>decoder</strong> emulates searching through the source sentence during decoding.
            </Paragraph>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The decoder is equipped with an <strong>attention mechanism</strong>. To produce the output word <Equation>{`y_t`}</Equation>, the decoder uses a dynamically computed context vector <Equation>{`c_i`}</Equation> based on the input sequence.
            </Paragraph>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The probability of each output word is conditioned on a distinct context vector <Equation>{`c_i`}</Equation> for each target word <Equation>{`y_i`}</Equation>:
            </Paragraph>
            <EquationBlock><Equation>
                {`p(y_i | y_1, \\dots, y_{i-1}, x) = g(y_{i-1}, s_i, c_i)`}
            </Equation></EquationBlock>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The hidden state <Equation>{`s_i`}</Equation> is computed by:
            </Paragraph>
            <EquationBlock><Equation>
                {`s_i = f(s_{i-1}, y_{i-1}, c_i)`}
            </Equation></EquationBlock>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4 mt-8">Calculating the Context Vector</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The context vector <Equation>{`c_i`}</Equation> is a weighted sum of the annotations (hidden states) <Equation>{`h_j`}</Equation> produced by the encoder:
            </Paragraph>
            <EquationBlock><Equation>
                {`c_i = \\sum_{j=1}^{T_x} \\alpha_{ij} h_j`}
            </Equation></EquationBlock>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The weight <Equation>{`\\alpha_{ij}`}</Equation> of each annotation <Equation>{`h_j`}</Equation> is computed by a softmax function:
            </Paragraph>
            <EquationBlock><Equation>
                {`\\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_{k=1}^{T_x} \\exp(e_{ik})}`}
            </Equation></EquationBlock>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                where <Equation>{`e_{ij}`}</Equation> is an <strong>alignment score</strong> that models how well the inputs around position <Equation>{`j`}</Equation> and the output at position <Equation>{`i`}</Equation> match. The score is based on the decoder's previous hidden state <Equation>{`s_{i-1}`}</Equation> and the <Equation>{`j`}</Equation>-th annotation <Equation>{`h_j`}</Equation>:
            </Paragraph>
            <EquationBlock><Equation>
                {`e_{ij} = a(s_{i-1}, h_j) = v_a^T \\tanh(W_a s_{i-1} + U_a h_j)`}
            </Equation></EquationBlock>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                Here, <Equation>{`a`}</Equation> is a feed-forward neural network (alignment model) trained jointly with the rest of the system.
            </Paragraph>
        </Section>
    );
};

export default Seq2SeqWithAttention;
