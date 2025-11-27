import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const Seq2Seq = () => {
    return (
        <Section title="The Classic Sequence-to-Sequence Model" icon={Layers}>
            <p className="mb-4 text-slate-700 leading-relaxed">
                The seq2seq model is composed of two main components: an encoder and a decoder.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                The <strong>encoder</strong> reads the input sentence, a sequence of vectors <Equation>{`x = (x_1, \\dots, x_T)`}</Equation>, into a fixed-length vector <Equation>{`c`}</Equation>. The encoder is a recurrent neural network (typically GRU or LSTM) such that:
            </p>
            <EquationBlock><Equation>
                {`h_t = f(x_t, h_{t-1})`}
            </Equation></EquationBlock>
            <EquationBlock><Equation>
                {`c = q(h_1, \\dots, h_T)`}
            </Equation></EquationBlock>
            <p className="mb-4 text-slate-700 leading-relaxed">
                where <Equation>{`h_t`}</Equation> is a hidden state at time <Equation>{`t`}</Equation>, <Equation>{`c`}</Equation> is a vector generated from the sequence of hidden states, and <Equation>{`f`}</Equation> and <Equation>{`q`}</Equation> are nonlinear functions.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                The <strong>decoder</strong> is trained to predict the next word <Equation>{`y_t`}</Equation> given the context vector <Equation>{`c`}</Equation> and all previously predicted words <Equation>{`\\{y_1, \\dots, y_{t-1}\\}`}</Equation>. It defines a probability over the translation <Equation>{`\\mathbf{y}`}</Equation> by decomposing the joint probability:
            </p>
            <EquationBlock><Equation>
                {`p(\\mathbf{y}) = \\prod_{t=1}^{T} p(y_t | \\{y_1, \\dots, y_{t-1}\\}, c)`}
            </Equation></EquationBlock>
            <p className="mb-4 text-slate-700 leading-relaxed">
                With an LSTM/GRU, each conditional probability is computed as:
            </p>
            <EquationBlock><Equation>
                {`p(y_t | \\{y_1, \\dots, y_{t-1}\\}, c) = g(y_{t-1}, s_t, c)`}
            </Equation></EquationBlock>
            <p className="mb-4 text-slate-700 leading-relaxed">
                where <Equation>{`g`}</Equation> is a nonlinear function, <Equation>{`s_t`}</Equation> is the hidden state of the decoder, and <Equation>{`c`}</Equation> is the context vector.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In a simple seq2seq model, the last output of the LSTM/GRU is the context vector, encoding context from the entire sequence. This fixed-size context vector becomes a bottleneck, especially for long sentences.
            </p>
        </Section>
    );
};

export default Seq2Seq;
