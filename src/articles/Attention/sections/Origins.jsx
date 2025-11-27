import React from 'react';
import { History } from 'lucide-react';
import Section from '../../../components/Section';

const Origins = () => {
    return (
        <Section title="Origins of Attention" icon={History}>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In the context of NLP, the attention mechanism was first introduced in <a href="https://arxiv.org/pdf/1409.0473.pdf" className="text-blue-600 hover:underline">"Neural Machine Translation by Jointly Learning to Align and Translate"</a> at ICLR 2015 by Bahdanau et al. (2015). This served as a foundation upon which the self-attention mechanism in the Transformer paper was based.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                This was proposed in the context of machine translation, where given a sentence in one language, the model has to produce a translation for that sentence in another language. In the paper, the authors propose to tackle the problem of a fixed-length context vector in the original <strong>seq2seq</strong> model for machine translation (Cho et al., 2014).
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4 mt-8">Attention: Under the Hood</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                As previously discussed, the role of attention is to strategically focus on pertinent segments of the input sequence as required. This ability to tune into relevant sections enhances the model's overall processing efficiency.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In a shift from traditional practices, the encoder now funnels a significantly larger amount of data to the decoder. Rather than simply transmitting the last hidden state of the encoding phase, it channels <strong>all</strong> the hidden states to the decoder, ensuring a more comprehensive data transfer.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                A decoder utilizing attention features undertakes an additional step before generating its output. This step is designed to ensure the decoder's focus is appropriately honed on parts of the input that are relevant to the current decoding time step. To achieve this, the following operations are performed:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
                <li>
                    Each hidden state is multiplied by its respective softmax score. This results in an amplification of hidden states associated with high scores and effectively diminishes the impact of those with low scores. This selective amplification technique supports the model's ability to maintain focus on the more relevant parts of the input.
                </li>
            </ul>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In an encoder, we employ the mechanism of <strong>self-attention</strong>. This technique allows the model to focus on different parts of the input independently, assisting the overall understanding of the sequence. Conversely, in a decoder, <strong>cross-attention</strong> is applied. This allows the decoder to focus on different parts of the encoder's output, aiding in the generation of a more accurate translation.
            </p>
            <p className="mb-6 text-slate-700 leading-relaxed">
                With each step of the decoding process, a direct connection to the encoder is utilized to strategically zero in on a specific part of the input. This connection enables the model to maintain accuracy while parsing complex sequences.
            </p>
        </Section>
    );
};

export default Origins;
